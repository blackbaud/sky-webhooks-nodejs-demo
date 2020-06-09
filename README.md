# SKY Webhooks Demo (NodeJS)

A simple NodeJS application to highlight all the moving pieces for registering and receiving webhook subscriptions. A more thorough [SKY Developer Webhooks tutorial](https://developer.blackbaud.com/skyapi/apis/webhook/tutorial) explaining all the mechanics is available in C#. This is a complimentary tutorial for anyone more familiar with JavaScript.

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
