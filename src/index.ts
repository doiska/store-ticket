import TicketClient from "./FormClient";

const start = async () => {
    console.log(TicketClient.config.bot.token)
    TicketClient.login(TicketClient.config.bot.token).then(console.log).catch(console.error);

    process.on('uncaughtException', (error) => console.error(`Uncaught exception: ${error}`))
    process.on('unhandledRejection', (error) => console.error(`Uncaught exception: ${error}`))
}

start();