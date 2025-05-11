// !divorce
const fs = require('fs-extra');
module.exports = {
  name: 'divorce',
  description: 'End your marriage',
  async execute(message) {
    const data = await fs.readJson('data/social.json');
    const spouseId = data.marriages[message.author.id];
    if (!spouseId) return message.reply('You are not married.');

    // remove both sides
    delete data.marriages[message.author.id];
    delete data.marriages[spouseId];
    await fs.writeJson('data/social.json', data, { spaces: 2 });
    message.channel.send(`💔 ${message.author.tag} is now divorced.`);
  },
};
