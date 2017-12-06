import * as builder from 'botbuilder';
import restify from 'restify';

// Setup Restify Server
const server = restify.createServer();
server.listen(process.env.PORT || 3000, () => {
  console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
const connector = new builder.ChatConnector({
  appId: 'YourAppId',
  appPassword: 'YourAppPassword',
});
const bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Create bot dialogs
bot.dialog('/', (session) => {
  session.send('Hello World');
});
