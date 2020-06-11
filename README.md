# sky-webhooks-nodejs-demo

NodeJS / JavaScript version of the [SKY Developer Webhooks Tutorial](https://developer.blackbaud.com/skyapi/apis/webhook/tutorial)

## Usage

- `npm install`
- `npm start` OR `npm run dev` (if making local changes)
- Use the ngrok URL when you register your webhook subscription

## Options

### `--no-ngrok`

If running `npm run dev` and making local changes, you'll get a different instance of `ngrok` each time the application restarts (unless you pay for a premium version of ngrok). 

To combat this, I suggest downloading the [local distributable of ngrok](https://dashboard.ngrok.com/get-started/setup) and using separate terminal windows.

- `./ngrok http 5000`
- `npm run dev -- --no-ngrok`

### `--no-express`

I'm not sure what scenario you would use this in, but my OCD meant keeping the code consistent.