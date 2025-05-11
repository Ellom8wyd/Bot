const fs = require('fs-extra');
module.exports = {
  name: 'warnings',
  description: 'Show warnings for a user',
  async execute(message, args) {
    const target = message.mentions.members.first() || message.member;
    const warnings = await fs.readJson('data/warnings.json');
    const data = warnings[target.id];

    if (!data) return message.reply(`${target.user.tag} has no warnings.`);
    const list = data.reasons.map((r, i) => `${i + 1}. ${r}`).join('\n');
    message.channel.send(`${target.user.tag} has ${data.count} warnings:\n${list}`);
  },
};
