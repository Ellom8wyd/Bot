// !emancipate @user
const fs = require('fs-extra');
module.exports = {
  name: 'emancipate',
  description: 'Remove one of your parents',
  async execute(message) {
    const parent = message.mentions.members.first();
    if (!parent) return message.reply('Usage: !emancipate @User');

    const data = await fs.readJson('data/social.json');
    data.parents[message.author.id] = (data.parents[message.author.id] || []).filter(id => id !== parent.id);
    await fs.writeJson('data/social.json', data, { spaces: 2 });
    message.channel.send(`🏃 ${message.author.tag} has emancipated from ${parent.user.tag}.`);
  },
};
