import TicketClient from "./TicketClient";

const start = async () => {
    await TicketClient.login(process.env.TICKET_TOKEN);
}

start();