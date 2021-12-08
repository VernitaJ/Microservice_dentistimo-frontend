import mqtt from 'mqtt';
import dotenv from 'dotenv';

const MQTT_BROKER_URI = `mqtt://localhost:8080`;
const MQTT_LOCALHOST_URI = `mqtt://localhost:1883`

const availability_FRONTEND_TOPIC = "frontend/availability/#"; 
const availability_REQRES_TOPIC = "dentistimo/availability/#";
const Broker = () => {

console.log("gere");
dotenv.config();

const MQTT_SETTINGS = {
    clean: true,
    connectTimeout: 4000,
    username: process.env.BROKER_USERNAME,
    password: process.env.BROKER_PASSWORD
}

const broker = mqtt.connect(MQTT_BROKER_URI, MQTT_SETTINGS);

broker.on("connect", () => {
    console.log("Connected! Hello there, " + process.env.BROKER_USERNAME || "undefined user!");
    
    subscribe(availability_REQRES_TOPIC);
    subscribe(availability_FRONTEND_TOPIC);
});

broker.on("message", (topic, message) => {
    if (topic === "dentistimo/availability/req") {
        console.log(message.toString("utf-8"));
        // availabilityHandler.handleavailabilityRequest(message.toString("utf-8"));
    }
    if (topic === `dentistimo/availability/availability/${message.requestId}/res`) {
        console.log(message.toString("utf-8"));
        // availabilityHandler.handleavailabilityResponse(message.toString("utf-8"));
    }
    if (topic === `frontend/availability/confirmation/req`) {
        console.log(message.toString("utf-8"));
        // DataHandler.handleDataRequest(message.toString("utf-8"));
    }
    if (topic === availability_FRONTEND_TOPIC) {
        console.log(message.toString("utf-8"));
    }
});

// broker.on("close", () => {
//     console.log("MQTT client has been disconnected");
// });

broker.on("error", (err) => {
    console.error(err.stack);
    broker.end();
});

// Publishes to MQTT
const publish = (topic, message) => {
    const options = {
        qos: 2,
        retain: false, 
    }
    broker.publish(topic, JSON.stringify(message), options);
}

// Subscribes to MQTT
const subscribe = (topic) => {
    broker.subscribe(topic, { qos: 2 }, (error, accepted) => {
        error ? console.log(error) : console.log(`was subscribed to!`);
    });
}

/* broker = accesses default MQTT broker commands
   publish/subscribe = convenience methods
*/
}

export default Broker
