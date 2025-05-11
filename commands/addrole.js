module.exports = {
    name: 'addrole',
    description: 'Add a role to a user',
    async execute(message, args) {
      const target = message.mentions.members.first();
      const roleName = args.slice(1).join(' ');
      if (!target || !roleName) return message.reply('Usage: !addrole @user RoleName');
  
      const role = message.guild.roles.cache.find(r => r.name === roleName);
      if (!role) return message.reply(`Role "${roleName}" not found.`);
  
      await target.roles.add(role);
      message.channel.send(`Added role "${roleName}" to ${target.user.tag}.`);
    },
  };
  