import * as builder from 'botbuilder';
import * as cognitiveservices from 'botbuilder-cognitiveservices';
import restify from 'restify';

// https://docs.moodle.org/24/en/About_Moodle_FAQ

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

const bot = new builder.UniversalBot(connector);

const recognizer = new cognitiveservices.QnAMakerRecognizer({
  knowledgeBaseId: process.env.KnowledgeBaseId,
  subscriptionKey: process.env.KnowledgeBaseKey,
});

const basicQnAMakerDialog = new cognitiveservices.QnAMakerDialog({
  recognizers: [recognizer],
  defaultMessage: 'No match! Try changing the query terms!',
  qnaThreshold: 0.3,
});

bot.dialog('/', basicQnAMakerDialog);
