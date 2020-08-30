module.exports = {
    name: 'ar',
    aliases: [],
    permissions: [],
    ownerOnly: true,
    enabled: true,
    cooldown: 0,
    exec: async (client, message, args) => {
        let role = message.guild.roles.cache.find(role => role.id === "690951418861060208");

        let member = message.member();
        
        // or the person who made started the command: let member = message.member;
        
        //adds the role
        member.roles.add(role)
    },
};