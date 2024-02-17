# RetroMC AutoDelete

- Developed by blckhrt for the RetroMC discord server. Used to auto-delete messages 30 seconds after they are sent.
- Base files (command handlers, event handlers, logging, registering commands) developed by Music Maker

## Setup

### Installing Node.JS

[Node.JS website](https://nodejs.org/en)

- LTS or current version is highly recommended. NOTE: Node v17 or below won't work

### Installing NPM packages

- `npm install discord.js`
- `npm install pm2 -g` (OPTIONAL IF YOU RUN OTHER BOTS DIFFERENTLY, this is just how I do it)
  - `discord.js`
    - used to interact with Discord's API
  - `pm2`
    - used to keep the bot permanently online and handle any errors, global install

### config.json

- edit `EXAMPLE-config.json` and add your token, application ID, the channel you want to delete messages in, and any user IDs you would like to bypass
- rename `EXAMPLE-config.json` to `config.json`

- should look like this, put all IDs and tokens within the empty double quotes
  ```
  {
    "TOKEN": "", <- Discord Bot Token goes here
    "APP_ID": "", <- Discord Application ID goes here
    "autoDeleteChannel": "", <- The channel you want to delete messages in goes here (in our case #login)
    "bypassDeletion": "" <- The ID of a user you don't want messages deleted from goes here (in our case the pinned message)
  }
  ```

## Starting the bot

- with `pm2`
  - `cd` into the project directory
  - run `pm2 start index.js` to start the bot
  - run `pm2 stop index.js` to stop the bot
  - run `pm2 monit` to monitor the bot and any errors
  - stays online permanently and handles errors
- with Node.JS
  - `cd` into the project directory
  - run `node .`
  - may not handle errors
  - may not stay online permanently
