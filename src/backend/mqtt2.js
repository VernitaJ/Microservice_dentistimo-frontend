import mqtt from "mqtt";
const websocketUrl = "wss://test.mosquitto.org:9001";

function getClient() {
  const client = mqtt.connect(websocketUrl);
  client.stream.on("error", (err) => {
    console.log(`Connection to ${websocketUrl} failed`);
    client.end();
  });
  return client;
}

function subscribe(client) {
  const callBack = (err, granted) => {
    if (err) {
      console.log("Subscription request failed");
    }
  };
  return client.subscribe("dentistimo/availability/*", callBack);
}

function onMessage(client, callBack) {
  client.on("message", (topic, message, packet) => {
    callBack(JSON.parse(new TextDecoder("utf-8").decode(message)));
  });
}

function unsubscribe(client) {
  client.unsubscribe("dentistimo/availability/*");
}

function closeConnection(client) {
  client.end();
}

const mqttHandler = {
  getClient,
  subscribe,
  onMessage,
  unsubscribe,
  closeConnection,
};
export default mqttHandler;