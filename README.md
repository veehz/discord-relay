# Discord-relay
Relays messages via a discord channel.

## Example Usage

### Config
```js
const drelay = require("@veehz/discord-relay");

drelay.config("==DISCORD BOT TOKEN==", "==CHANNEL ID==");
// OR
drelay.token("==DISCORD BOT TOKEN==");
drelay.channel("==CHANNEL ID==");
```

### Usage
```js
async function run(){
    // Create relay, accepts four optional arguments: id, startMsg, prefix, hideself
    // id is the code identifying the current instance
    // startMsg is the message to be fired with the READY instance 
    // prefix is attached to every event sent
    // hideSelf (default=false) is explained below.
    const Relay = await drelay.init();

    // message event: fired every time an event was received, with id, type, msg. An id sent by itself will be ignored if hideSelf is set to true.
    Relay.events.on("message", (id, type, msg) => {
        console.log(id, type, msg);
    });

    // fullMessage event: fired every time an event was received, with whole content without prefix.
    Relay.events.on("fullMessage", (msg) => {
        console.log(msg);
    });

    // send: sends content with event type
    Relay.send("msg", "my message");
}

run();
```
