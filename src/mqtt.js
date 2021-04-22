require('dotenv').config()
const logger = require('pino')();
const { PRIORITY_NORMAL } = require('constants');
const fs = require('fs');
var mqtt = require('mqtt');

// var client = mqtt.connect('mqtt://test.mosquitto.org')

var pemFile = fs.readFileSync(process.env.IOT_PEM);

const options = {
    host: process.env.IOT_HOST,
    protocol: process.env.IOT_PROTOCOL,
    username: process.env.IOT_USERNAME,
    port: process.env.IOT_SECURE_PORT,
    password: process.env.IOT_PASSWORD,
    clientId: process.env.IOT_CLIENTID,
};


const client = mqtt.connect(options);


client.on('connect', function () {
    logger.info('connected');
    client.subscribe('presence', function (err) {
        client.end(() => logger.info('connection closed'));
    })
})