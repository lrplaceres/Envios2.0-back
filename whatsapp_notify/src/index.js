#!/usr/bin/env node

var amqp = require("amqplib/callback_api");
const { whatsapp } = require("./lib/whatsapp");
whatsapp.initialize()


amqp.connect(
  "amqp://rabbitmq:rabbitmq@localhost",
  function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }

      var queue = "notify_wh";

      channel.assertQueue(queue, {
        durable: false,
      });

      console.log(
        " [*] Waiting for messages in %s. To exit press CTRL+C",
        queue
      );

      channel.consume(
        queue,
        async function (msg) {
          const mensajeRecibido = msg.content.toString();
          const objetoRecibido = JSON.parse(mensajeRecibido);
          console.log(" [x] Received %s", objetoRecibido);

          const tel = objetoRecibido.cellphone;
          const chatId = tel.substring(1) + "@c.us";
          const number_details = await whatsapp.getNumberId(chatId);
          console.log("aki")
          console.log("number_details %s",number_details)
          /*if (number_details) {
            const mensaje = objetoRecibido.text;
            await whatsapp.sendMessage(chatId, mensaje);
          }*/
        },
        {
          noAck: true,
        }
      );
    });
  }
);
