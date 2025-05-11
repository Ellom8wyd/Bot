const fs = require('fs-extra');
module.exports = {
  name: 'warn',
  description: 'Warn a user with a reason',
  async execute(message, args) {
    if (!message.member.permissions.has('KICK_MEMBERS'))
      return message.reply('You lack permission to warn.');

    const target = message.mentions.members.first();
    if (!target) return message.reply('Please mention someone to warn.');

    const reason = args.slice(1).join(' ') || 'No reason provided';

    // Update warning count
    const warnings = await fs.readJson('data/warnings.json');
    const id = target.id;
    const count = (warnings[id]?.count || 0) + 1;
    warnings[id] = {
      count,
      reasons: [...(warnings[id]?.reasons||[]), reason]
    };
    await fs.writeJson('data/warnings.json', warnings, { spaces: 2 });

    message.channel.send(`${target.user.tag} warned (${count}). Reason: ${reason}`);

    // Load configured actions
    const actions = await fs.readJson('data/warnActions.json');
    const entry = actions.find(e => e.count === count);
    if (entry) {
      if (entry.action === 'mute') {
        const muteRole = message.guild.roles.cache.find(r => r.name === 'Muted');
        if (muteRole) {
          await target.roles.add(muteRole);
          message.channel.send(`${target.user.tag} muted for ${entry.duration} minutes (warn threshold).`);
          // auto-unmute after duration
          setTimeout(() => target.roles.remove(muteRole), entry.duration * 60 * 1000);
        }
      } else if (entry.action === 'ban') {
        await target.ban({ reason: 'Reached warn threshold' });
        message.channel.send(`${target.user.tag} banned (warn threshold).`);
      } else if (entry.action === 'kick') {
        await target.kick('Reached warn threshold');
        message.channel.send(`${target.user.tag} kicked (warn threshold).`);
      }
    }
  },
};
