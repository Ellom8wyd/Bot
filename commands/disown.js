// !disown @user
const fs = require('fs-extra');
module.exports = {
  name: 'disown',
  description: 'Disown one of your adopted children',
  async execute(message) {
    const child = message.mentions.members.first();
    if (!child) return message.reply('Usage: !disown @User');

    const data = await fs.readJson('data/social.json');
    data.parents[child.id] = (data.parents[child.id] || []).filter(id => id !== message.author.id);
    await fs.writeJson('data/social.json', data, { spaces: 2 });
    message.channel.send(`🚫 ${message.author.tag} has disowned ${child.user.tag}.`);
  },
};
