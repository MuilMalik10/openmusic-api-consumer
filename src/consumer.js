require('dotenv').config();

const amqp = require('amqplib');
const Listener = require('./Listener');
const MailSender = require('./MailSender');
const PlaylistSongsService = require('./PlaylistSongsService');

const init = async () => {
  const playlistSongsService = new PlaylistSongsService();
  const mailSender = new MailSender();
  const listener = new Listener(playlistSongsService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);

  const channel = await connection.createChannel();
  await channel.assertQueue('export:songs', {
    durable: true,
  });

  await channel.consume('export:songs', listener.listen, { noAck: true });
};

init();
