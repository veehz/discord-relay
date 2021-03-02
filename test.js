const drelay = require("./index.js");

drelay.channel("816256933036163092");
drelay.token("NTU2NDY5NDQ0MDc1OTc4NzY2.XqgwyQ.v_EZF41ZMz5KqgxIgYRPya33qn8");
const Relay = drelay.init();

Relay.events.on("message", (id, type, msg) => {
  console.log(id, type, msg);
});
