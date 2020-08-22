module.exports = {
    name: 'pogchamp',
    aliases: ['poggers','pog'],
    permissions: [],
    ownerOnly: false,
    enabled: true,
    cooldown: 0,
    exec: async (client, message, args) => {
        const pogLink = "https://img.pngio.com/emote-pogchamp-twitchtv-greenbluerup-emoticon-png-clipart-pogchamp-emote-discord-728_508.jpg";
        const embed = new Discord.MessageEmbed()
        .setImage (pogLink)
        .setTitle (`**Poggers!**`)
        .setFooter (`POGGERS!`)
    
        message.channel.send(embed);
        },
    };