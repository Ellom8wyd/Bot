const fs = require('fs-extra');
module.exports = {
  name: 'setwarnaction',
  description: 'Configure an action at a given warning count: !setwarnaction <count> <action> [duration]',
  async execute(message, args) {
    if (!message.member.permissions.has('ADMINISTRATOR'))
      return message.reply('Only admins can configure warn actions.');

    const [countStr, action, durationStr] = args;
    const count = parseInt(countStr, 10);
    if (!count || !['mute','ban','kick'].includes(action))
      return message.reply('Usage: !setwarnaction <count> <mute|ban|kick> [duration mins]');

    const duration = durationStr ? parseInt(durationStr, 10) : undefined;
    const actions = await fs.readJson('data/warnActions.json');
    // Remove existing for this count
    const filtered = actions.filter(a => a.count !== count);
    filtered.push({ count, action, ...(duration ? { duration } : {}) });
    await fs.writeJson('data/warnActions.json', filtered, { spaces: 2 });

    message.channel.send(`Warn-action set: at ${count} warns → ${action}${duration ? ` for ${duration}m` : ''}.`);
  },
};
