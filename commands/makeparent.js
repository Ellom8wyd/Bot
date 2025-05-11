// !makeparent @user
const fs = require('fs-extra');
module.exports = {
  name: 'makeparent',
  description: 'Ask someone to be your parent',
  async execute(message) {
    const parent = message.mentions.members.first();
    if (!parent) return message.reply('Usage: !makeparent @User');

    const data = await fs.readJson('data/social.json');
    data.parents[message.author.id] = data.parents[message.author.id] || [];
    if (data.parents[message.author.id].includes(parent.id))
      return message.reply('They are already your parent.');

    data.parents[message.author.id].push(parent.id);
    await fs.writeJson('data/social.json', data, { spaces: 2 });
    message.channel.send(`🤝 ${parent.user.tag} is now marked as a parent of ${message.author.tag}.`);
  },
};
