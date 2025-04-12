# RetroMC Utils

- Developed by 1blckhrt for the RetroMC Discord Guild. Used to deploy embeds and auto delete messages in the login channel 30 seconds after they are sent.

- Requires TypeScript to be installed (all dependencies can be installed by running `npm install`)

- `src/config.json` will be provided by blckhrt

- `EXAMPLE.env` will need a token, guild ID, and application ID to be put in the corresponding fields. The file then needs to be renamed to `.env`. Tokens and application IDs can be generated at the Discord Developer Portal

- `package.json` will need line 9 updated to say `"compile": "npm run clean-linux && tsc",` if in a Linux environment, otherwise no changes are necessary

# Setup

- `git clone` this repository into specified directory
- `npm install` to install all dependencies
- put `config.json` provided by blckhrt in `src` directory
- fill out `EXAMPLE.env` with necessary fields and invite the bot using Permissions Calculator website found [here](https://discordapi.com/permissions.html#)
  - needed permissions are `View Channels`, `Send Messages`, `Embed Links`, `Manage Messages`, `Use Application Commands`
- rename file to `.env`
- edit `package.json` if in Linux environment, details above
- run `npm compile` to transpile the codebase into JavaScript
- run with pm2
- run `/deploy-embeds` to deploy embeds
