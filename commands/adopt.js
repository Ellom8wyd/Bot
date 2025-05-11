// !adopt @user
const fs = require('fs-extra');
module.exports = {
  name: 'adopt',
  description: 'Adopt another user as your child',
  async execute(message) {
    const child = message.mentions.members.first();
    if (!child) return message.reply('Usage: !adopt @User');

    const data = await fs.readJson('data/social.json');
    data.parents[child.id] = data.parents[child.id] || [];
    if (data.parents[child.id].includes(message.author.id))
      return message.reply('You have already adopted them.');

    data.parents[child.id].push(message.author.id);
    await fs.writeJson('data/social.json', data, { spaces: 2 });
    message.channel.send(`👨‍👩‍👧 ${message.author.tag} has adopted ${child.user.tag}!`);
  },
};
