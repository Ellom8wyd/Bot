// !relationship @user1 [@user2]
const fs = require('fs-extra');
module.exports = {
  name: 'relationship',
  description: 'Show relationship between two users',
  async execute(message, args) {
    const [m1, m2] = message.mentions.members.size === 2
      ? [...message.mentions.members.values()]
      : [message.mentions.members.first(), message.member];
    if (!m1) return message.reply('Usage: !relationship @User1 [@User2]');

    const data = await fs.readJson('data/social.json');
    // spouse?
    if (data.marriages[m1.id] === m2.id) {
      return message.channel.send(`${m1.user.tag} and ${m2.user.tag} are married.`);
    }
    // parent/child?
    if ((data.parents[m2.id] || []).includes(m1.id)) {
      return message.channel.send(`${m1.user.tag} is a parent of ${m2.user.tag}.`);
    }
    if ((data.parents[m1.id] || []).includes(m2.id)) {
      return message.channel.send(`${m2.user.tag} is a parent of ${m1.user.tag}.`);
    }
    message.channel.send(`No direct relationship found between them.`);
  },
};
