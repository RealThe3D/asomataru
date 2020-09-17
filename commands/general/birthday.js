module.exports = {
    name: "birthday",
    aliases: ['bday'],
    permissions: [],
    ownerOnly: false,
    enabled: true,
    cooldown: 0,
    exec: async (client, message, args) => {
        // Public on Septemeber 17th!
        const Discord = require('discord.js');
        const Eri = ['https://media1.tenor.com/images/f282775bfa181e9251023892a726037b/tenor.gif?itemid=16645535',
                     'https://media1.tenor.com/images/a276be1f5dd04a52672bb930d35c1e28/tenor.gif?itemid=16475061',
                     'https://media.tenor.com/images/f81582db3a15b82df5a0b44f378b7898/tenor.gif',
                     'https://media.tenor.com/images/c4297bc2cf2afd60e2defdaa6bf18dcc/tenor.gif',
                     'https://media.tenor.com/images/ac76b9ffb3548c1d4cac11f0f5c15218/tenor.gif'
                     
            ]
        var EriRandom = Eri[Math.floor(Math.random() * Eri.length)];
        const embed = new Discord.MessageEmbed()
        .setColor('FFC0CB')
        .setTitle('HAPPY BIRTHDAY, The3D!')
        .setImage(EriRandom)
        .setFooter(`DM The3D#1120 and wish him a Happy Birthday!`)

        message.channel.send(embed)
    },
};
