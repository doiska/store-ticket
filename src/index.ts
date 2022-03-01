import TicketClient from "./FormClient";

const start = async () => {
    TicketClient.login(TicketClient.config.bot.token).catch(console.error);

    process.on('uncaughtException', (error) => console.error(`Uncaught exception: ${error}`))
    process.on('unhandledRejection', (error) => console.error(`Uncaught exception: ${error}`))
}

start();