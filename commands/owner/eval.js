module.exports = {
    name: "eval",
    aliases: [],
    permissions: [],
    ownerOnly: true,
    enabled: true,
    cooldown: 0,
    exec: async (client, message, args) => {
        const code = args.join(" ");
        return evalCmd(message, code);

        function evalCmd(message, code) {
            try {
                let evaled = eval(code);
                if (typeof evaled !== "string")
                    evaled = util.inspect(evaled);
                    message.channel.send(clean(evaled), {code:"xl"});
            } catch (err) {
                message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
            }
        }
    }
}