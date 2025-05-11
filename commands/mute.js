module.exports = {
    name: 'mute',
    description: 'Mute a member by assigning the "Muted" role',
    async execute(message, args) {
      const target = message.mentions.members.first();
      if (!target) return message.reply('Please mention a user to mute.');
  
      const muteRole = message.guild.roles.cache.find(r => r.name === 'Muted');
      if (!muteRole) return message.reply('No "Muted" role found.');
  
      await target.roles.add(muteRole);
      message.channel.send(`${target.user.tag} has been muted.`);
    },
  };
  