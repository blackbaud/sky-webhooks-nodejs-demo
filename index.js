const WEBHOOK_SECRET_KEY = 'fZnxW^n*fU9ChDjLAs43';

async function setupNgrok(port) {
  const ngrok = require('ngrok');
  
  // Additional ngrok options available at https://www.npmjs.com/package/ngrok
  const url = await ngrok.connect({
     addr: port
  });

  console.log(`Ngrok instance created: ${url}`);
  return url;
}

async function setupExpress(port) {
  const express = require('express');
  const bodyParser = require('body-parser');
  const app = express();

  // Needed to read `application/cloudevents+json` type
  const cloudEventsParser = bodyParser.json({ 
    type: 'application/*+json'
  });

  // Needed for initial subscription handshake
  app.options('*', (req, res) => {

    // Validate the handshake header is set
    if (req.headers['webhook-request-origin'] === 'eventgrid.azure.net') {

      // Valid the request contains our unique key
      if (req.query.key === WEBHOOK_SECRET_KEY) {
        res.set({
          'WebHook-Allowed-Origin': 'eventgrid.azure.net',
          'WebHook-Allowed-Rate': '100',
          'Allow': 'POST'
        });
        console.log('Successfully handled CloudEvent Abuse Protection Handshake');
      } else {
        console.warn('Received a handshake request with an invalid key.');
      }
    }

    res.end();
  });

  // Actual event handler
  app.post('*', cloudEventsParser, (req, res) => {

    // Validate the request contains our unique key
    if (req.query.key === WEBHOOK_SECRET_KEY) {
      switch (req.body.type) {
        case 'com.blackbaud.constituent.emailaddress.change.v1':
          console.log('Received handled email address event.');
          console.log(req.body);
        break;
        default:
          console.warn('Received an unhandled event.');
        break;
      }
    } else {
      console.warn('Received an event with an invalid key.');
    }

    res.sendStatus(200);
  });

  // Not needed.  Just making ngrok appear happy.
  app.get('*', (req, res) => {
    res.send('Local instance successfully running.');
  });

  await app.listen(port);
  console.log(`Local instance created: http://localhost:${port}`);
}

(async function setup() {
  const args = require('minimist')(process.argv.slice(2));
  const port = args.port || process.env.port || 5000;

  if (args.ngrok !== false) {
    console.log('Starting ngrok setup');
    await setupNgrok(port);
  } else {
    console.log('Skipping ngrok setup');
  }

  if (args.express !== false) {
    console.log('Starting Express setup');
    await setupExpress(port);
  } else {
    console.log('Skipping Express setup');
  }
})();