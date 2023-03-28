const channel = "andrewcore"
const twitchClient = new TwitchChatClient("justinfan777", channel, undefined, (msg) => {
    generateChatMessage({
        username: msg.username
    }, msg.message)
})
twitchClient.connect()