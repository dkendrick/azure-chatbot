import * as builder from 'botbuilder';
import restify from 'restify';

// Setup Restify Server
const server = restify.createServer();
server.listen(process.env.PORT || 3978, () => {
  console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
const connector = new builder.ChatConnector({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword,
});

server.get('/', (req, res, cb) => {
  res.send('Hello from ig-chatbot!');
  return cb();
});

server.post('/api/messages', connector.listen());

const bot = new builder.UniversalBot(connector, (session) => {
  session.send(`${session.message.text}%s?`);
});
