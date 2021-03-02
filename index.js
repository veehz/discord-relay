const Discord = require("discord.js");
const events = require("events");

let token = null;
let channel = null;

class DiscordRelayClient {
  constructor(id, prefix) {
    this.events = new events.EventEmitter();
    this.client = new Discord.Client();
    this.client.login(token);
    this.id = id;
    this.prefix = prefix;
  }
  send(type, msg="") {
    console.log(channel);
    this.client.channels.cache.get(channel).send(`${this.prefix} ${this.id} ${type} ${msg}`);
  }
}

module.exports = {
  async init(id = null, startMessage = "", prefix = "$EMITTER", hideSelf=false) {
    if (!id) id = Math.floor(Math.random() * 1000000000).toString();
    const thisClient = new DiscordRelayClient(id, prefix);
    if (id.includes(" ")) {
      console.log(
        "discord-relay Warning: ID should not include spaces. Proceeding as usual."
      );
    }
    
    thisClient.client.on("message", async (message) => {
      if (message.channel.id != channel) return;
      if (!message.content.startsWith(prefix)) return;
      message = message.content.slice(prefix.length + 1);
      thisClient.events.emit("fullMessage", message);
      let args = message.split(" ");
      const thisId = args.shift();
      const type = args.shift();
      const msg = args.join(" ");
      if (thisId != id && hideSelf) thisClient.events.emit("message", thisId, type, msg);
    });

    thisClient.client.once("ready", () => {
      thisClient.client.channels.cache
        .get(channel)
        .send(`${prefix} ${id} READY ${startMessage}`);
      thisClient.events.emit("ready");
      return thisClient;
    });

    await events.once(thisClient.client, "ready");
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
