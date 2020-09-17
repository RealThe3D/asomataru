module.exports = {
    name: "birthday",
    aliases: ['bday'],
    permissions: [],
    ownerOnly: true,
    enabled: true,
    cooldown: 0,
    exec: async (client, message, args) => {
        // Public on Septemeber 17th!
        const Discord = require('discord.js');
        const Eri = ['https://media1.tenor.com/images/f282775bfa181e9251023892a726037b/tenor.gif?itemid=16645535',
                     'https://media.tenor.com/images/804187a5ae8a39af449d06d353800692/tenor.gif',
                     'https://media.tenor.com/images/f81582db3a15b82df5a0b44f378b7898/tenor.gif',
                     'https://media.tenor.com/images/c4297bc2cf2afd60e2defdaa6bf18dcc/tenor.gif',
                     'https://media.tenor.com/images/ac76b9ffb3548c1d4cac11f0f5c15218/tenor.gif'
                     
            ]
        var EriRandom = Eri[Math.floor(Math.random() * Eri.length)];
        const embed = new Discord.MessageEmbed()
        .setColor('FFC0CB')
        .setTitle('HAPPY BIRTHDAY, The3D!')
        .setImage(EriRandom)
        .setFooter(`It is 3D's Birthday today!, DM The3D#1120 a happy birthday!`)

        message.channel.send(embed)
    },
};
