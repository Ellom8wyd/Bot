module.exports = {
    name: 'removerole',
    description: 'Remove a role from a user',
    async execute(message, args) {
      const target = message.mentions.members.first();
      const roleName = args.slice(1).join(' ');
      if (!target || !roleName) return message.reply('Usage: !removerole @user RoleName');
  
      const role = message.guild.roles.cache.find(r => r.name === roleName);
      if (!role) return message.reply(`Role "${roleName}" not found.`);
  
      await target.roles.remove(role);
      message.channel.send(`Removed role "${roleName}" from ${target.user.tag}.`);
    },
  };
  