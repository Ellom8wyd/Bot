module.exports = {
    name: 'kick',
    description: 'Kick a member from the server',
    async execute(message, args) {
      const target = message.mentions.members.first();
      if (!target) return message.reply('Please mention a user to kick.');
      if (!target.kickable) return message.reply('I cannot kick this user.');
  
      const reason = args.slice(1).join(' ') || 'No reason provided';
      await target.kick(reason);
      message.channel.send(`${target.user.tag} was kicked. Reason: ${reason}`);
    },
  };
  