module.exports = {
    name: 'ban',
    description: 'Ban a member from the server',
    async execute(message, args) {
      const target = message.mentions.members.first();
      if (!target) return message.reply('Please mention a user to ban.');
      if (!target.bannable) return message.reply('I cannot ban this user.');
  
      const reason = args.slice(1).join(' ') || 'No reason provided';
      await target.ban({ reason });
      message.channel.send(`${target.user.tag} was banned. Reason: ${reason}`);
    },
  };
  