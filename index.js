const Discord = require("discord.js");
const events = require("events");

let token = null;
let channel = null;

class DiscordRelayClient {
  constructor(id, prefix) {
    this.events = new events.EventEmitter();
    this.client = new Discord.Client();
    this.id = id;
    this.prefix = prefix;
  }
  send(type, msg) {
    client.channels.cache.get(channel).send(`${prefix} ${id} ${type} ${msg}`);
  }
}

module.exports = {
  init(id = null, startMessage = "", prefix = "$EMITTER") {
    if (!id) id = Math.floor(Math.random() * 1000000000).toString();
    const thisClient = new DiscordRelayClient(id, prefix);
    if (id.includes(" ")) {
      console.log(
        "discord-relay Warning: ID should not include spaces. Proceeding as usual."
      );
    }

    thisClient.client.once("ready", () => {
      thisClient.client.channels.cache
        .get(channel)
        .send(`${prefix} ${id} READY ${startMessage}`);
      thisClient.events.emit("ready");
    });

    thisClient.client.on("message", async (message) => {
      if (message.channel.id != channel) return;
      if (!message.content.startsWith(prefix)) return;
      message = message.content.slice(prefix.length + 1);
      thisClient.events.emit("fullMessage", message);
      let args = message.split(" ");
      const thisId = args.shift();
      const type = args.shift();
      const msg = args.join(" ");
      if (thisId != id) thisClient.events.emit("message", thisId, type, msg);
    });

    thisClient.client.login(token);

    return thisClient;
  },

  config(t, c) {
    token = t;
    channel = c;
  },
  token(t) {
    token = t;
  },
  channel(c) {
    channel = c;
  },
};
