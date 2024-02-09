# RetroMC AutoDelete

- Developed by blckhrt for the RetroMC discord server. Used to auto-delete messages 30 seconds after they are sent.
- Base files (command handlers, event handlers, logging, registering commands) developed by Music Maker

## Setup

### Installing Node.JS

[Node.JS website](https://nodejs.org/en)
- LTS or current version is highly recommended. NOTE: Node v17 or below won't work

### Installing NPM packages
- `npm install discord.js`
-` npm install pm2 -g` (OPTIONAL IF YOU RUN OTHER BOTS DIFFERENTLY, this is just how I do it)
    - `discord.js`
        - used to interact with Discord's API
    - `pm2`
        - used to keep the bot permanently online and handle any errors, global install

### config.json
- edit `EXAMPLE-config.json` and add your token, application ID, and the ID of the channel you want to autodelete messages in
- rename `EXAMPLE-config.json` to `config.json`

## Starting the bot
- with `pm2`
    - `cd` into the project directory`
    - run `pm2 start index.js` to start the bot
    - run `pm2 stop index.js` to stop the bot
    - run `pm2 monit` to monitor the bot and any errors
    - stays online permanently and handles errors
- with Node.JS
    - `cd` into the project directory
    - run `node .` 
    - may not handle errors
    - may not stay online permanently