// commands/help.js
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'List all available commands',
  async execute(message) {
    const commands = message.client.commands;
    const embed = new EmbedBuilder()
      .setTitle('Help — Command List')
      .setColor(0x00AE86)
      .setDescription('Here are all the commands you can use:')
      .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

    // Add each command name and description
    for (const command of commands.values()) {
      embed.addFields({ name: `!${command.name}`, value: command.description || 'No description.', inline: false });
    }

    // Send as DM if possible, otherwise in channel
    try {
      await message.author.send({ embeds: [embed] });
      if (message.channel.type !== 1) {
        message.reply('I\'ve sent you a DM with all my commands!');
      }
    } catch (err) {
      // Fallback if DMs are closed
      message.channel.send({ embeds: [embed] });
    }
  },
};
