// !marry @user
const fs = require('fs-extra');
module.exports = {
  name: 'marry',
  description: 'Propose and automatically marry another user',
  async execute(message) {
    const [mention] = message.mentions.members.values();
    if (!mention) return message.reply('Usage: !marry @User');
    const data = await fs.readJson('data/social.json');
    if (data.marriages[message.author.id] === mention.id)
      return message.reply('You’re already married to them.');

    // overwrite any existing marriages
    data.marriages[message.author.id] = mention.id;
    data.marriages[mention.id] = message.author.id;
    await fs.writeJson('data/social.json', data, { spaces: 2 });
    message.channel.send(`💍 ${message.author.tag} is now married to ${mention.user.tag}!`);
  },
};
