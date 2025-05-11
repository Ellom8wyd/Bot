const fs = require('fs-extra');
module.exports = {
  name: 'clearwarns',
  description: 'Clear all warnings for a user',
  async execute(message, args) {
    const target = message.mentions.members.first();
    if (!target) return message.reply('Please mention a user to clear warnings.');

    const warnings = await fs.readJson('data/warnings.json');
    delete warnings[target.id];
    await fs.writeJson('data/warnings.json', warnings, { spaces: 2 });

    message.channel.send(`Cleared all warnings for ${target.user.tag}.`);
  },
};
