# RetroMC Utilities

- Developed by 1blckhrt for the RetroMC Discord Guild. Used to deploy embeds and auto delete messages in the login channel.

## Installation

- `git clone` the repository
- `npm install` to install dependencies
- `src/config.ts` - Edit the config file to include your channel ID and login message ID (provided by blckhrt)
- `.env` - Edit the `EXAMPLE.env` file to include your bot token and application ID, then rename it to `.env`
- `npm run build` to build the project
- `pm2 start ecosystem.config.cjs` to start the bot
- `pm2 logs` to view the logs
- `pm2 stop RMC-Utilities` to stop the bot
- `pm2 restart RMC-Utilities` to restart the bot
- `pm2 save` to save the process list (useful to restore after a reboot)
- `pm2 resurrect` to restore the process list after a reboot

## License

- This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
