// !parent [@user]
const fs = require('fs-extra');
module.exports = {
  name: 'parent',
  description: 'Show someone’s parent(s)',
  async execute(message) {
    const target = message.mentions.members.first() || message.member;
    const data = await fs.readJson('data/social.json');
    const parents = data.parents[target.id] || [];
    if (parents.length === 0) return message.reply(`${target.user.tag} has no recorded parents.`);
    const mentions = await Promise.all(parents.map(id => message.guild.members.fetch(id)));
    message.channel.send(`${target.user.tag}’s parent(s): ${mentions.map(m=>m.user.tag).join(', ')}`);
  },
};
