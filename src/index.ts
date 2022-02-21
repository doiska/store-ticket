import TicketClient from "./TicketClient";

const start = async () => {
    console.log(TicketClient.config.bot.token)
    TicketClient.login(TicketClient.config.bot.token).then(console.log).catch(console.error);
}

start();