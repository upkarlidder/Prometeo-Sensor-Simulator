const logger = require('pino')();
const { PRIORITY_NORMAL } = require('constants');
const fs = require('fs');
var mqtt = require('mqtt');

logger.info('starting src/server.js');

logger.info(process.env);

function main() {
    // the clientid format from the docs: d:orgId:deviceType:deviceId. 
    // const clientID = process.env.IOT_CLIENTID + `-${Date.now()}`;
    const options = {
        host: process.env.IOT_HOST,
        protocol: process.env.IOT_PROTOCOL,
        username: process.env.IOT_USERNAME,
        port: process.env.IOT_SECURE_PORT,
        password: process.env.IOT_PASSWORD,
        clientId: process.env.IOT_CLIENTID
    };

    const client = mqtt.connect(options);

    client.on('connect', function (err) {
        logger.info('connnected and ready to publish!');
        // publish(client, process.env);

        const data = {
            "firefighter_id": process.env.IOT_FIREFIGHTER_ID,
            "device_id": process.env.IOT_DEVICE_ID,
            "device_battery_level": (Math.random() * (0.00 - 100.00) + 0.0200).toFixed(2),
            "temperature": (Math.random() * 50).toFixed(2),
            "humidity": (Math.random() * 100).toFixed(2),
            "carbon_monoxide": (Math.random() * 150).toFixed(2),
            "nitrogen_dioxide": (Math.random() * 10).toFixed(2),
            "formaldehyde": (Math.random() * 10).toFixed(2),
            "acrolein": (Math.random() * 10).toFixed(2),
            "benzene": (Math.random() * 10).toFixed(2),
            "device_timestamp": getUTCTime()
        }

        const topic = `iot-2/evt/myevt/fmt/json`;

        client.publish(topic, JSON.stringify(data), (err) => {
            if (err) {
                logger.error(err);
            } else {
                logger.info(`\n\n\nfinished publishing data: ${JSON.stringify(data)}`);
            }

            client.end();
        });

    });

    client.on('message', onMessage)

    client.on('close', onClose)

    client.on('disconnect', onDisconnect)

    client.on('error', onError)
}

function onMessage(topic, message) {
    logger.info('\n\n\n\n');
    logger.info(message.toString())
}

function onClose(err) {
    if (err) { logger.info(err) };
    logger.info('connection closed');
}

function onDisconnect(err) {
    logger.info('connection disconnected');
}

function onError(err) {
    logger.error('connection error');
    logger.error(err);
}

function getUTCTime() {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var hours = dateObj.getUTCHours();
    var minutes = dateObj.getUTCMinutes();
    var seconds = dateObj.getUTCSeconds();

    var newdate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    return newdate;
}

logger.info('calling main');
// main()