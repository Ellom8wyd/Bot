// !partner [@user]
const fs = require('fs-extra');
module.exports = {
  name: 'partner',
  description: 'Show who someone’s partner is',
  async execute(message) {
    const target = message.mentions.members.first() || message.member;
    const data = await fs.readJson('data/social.json');
    const spouseId = data.marriages[target.id];
    if (!spouseId) return message.reply(`${target.user.tag} has no partner.`);
    const spouse = await message.guild.members.fetch(spouseId);
    message.channel.send(`${target.user.tag} is partnered with ${spouse.user.tag}.`);
  },
};
