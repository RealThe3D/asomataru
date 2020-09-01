module.exports = {
    name: 'profile',
    aliases: ['stats'],
    permissions: [],
    ownerOnly: false,
    enabled: true,
    cooldown: 0,
    exec: async (client, message, args) => {
      const User = require('../../models/userModel.js');
      const Discord = require('discord.js');
      let member = message.guild.member(message.mentions.users.first() || message.author)
      if(member.user.bot) return message.reply(`That is a bot.`)
      let data = await User.findOne({userID: member.user.id })
  
      if(!data) { await User.create({ userID: member.user.id })
      message.channel.send(`Your account has created, ${message.author.username}!`)
    } else {
  
      const userStats = [
        `Balance: ${data.coins} Coins`,
        `HP: ${data.hp} Health`,
        `Level: ${data.level}`,
        `XP: ${data.xp} XP`,
        `XP to Level Up: ${data.xp - data.xpRemaining}`,
      ]
      const userStatsifLevelUp = [
        `Balance: ${data.coins} Coins`,
        `HP: ${data.hp} Health`,
        `Level: ${data.level}`,
        `XP: ${data.xp} XP`,
        `You can level up! Use level command to rank up!`,
      ]
      const embed = new Discord.MessageEmbed()
      .setTitle(`${message.author.username}'s Stats`)
      .setDescription(userStats)
      .setFooter('Asomataru RPG System v0.1 Beta!')
      message.channel.send(embed)
      }
    }
  }