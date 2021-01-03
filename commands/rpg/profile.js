module.exports = {
    name: 'profile',
    aliases: ['stats'],
    permissions: [],
    ownerOnly: false,
    enabled: true,
    cooldown: 0,
    exec: async (client, message, args) => {
      const { data } = require('../../scripts/profile/newProfile.js')
      //const User = require('../../models/userModel.js');
      const Discord = require('discord.js');

      let member = message.guild.member(message.mentions.users.first() || message.author)
      if(member.user.bot) return message.reply(`That is a bot.`)
    
  
      const userStats = [
        `Balance: ${data.coins} Coins`,
        `HP: ${data.hp} Health`,
        `Level: ${data.level}`,
        `XP: ${data.xp} XP`,
        `XP to Level Up: ${data.xptoNextLevel}`,
        ` `,
        `**Fish**`,
        `Salmon: ${data.fish.salmon}`,
        `Bass: ${data.fish.bass}`,
        `Eels: ${data.fish.eel}`,
        `Pufferfish: ${data.fish.pufferfish}`
      ]
      

      const embed = new Discord.MessageEmbed()
      .setTitle(`${member.user.username}'s Stats`)
      .setDescription(userStats)
      .setFooter('Asomataru RPG System v0.2 Beta!')
      message.channel.send(embed)
      }
    }