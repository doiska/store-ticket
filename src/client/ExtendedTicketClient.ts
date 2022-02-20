import { TwokeiClient } from 'twokei-xframework';
import Config from '../config'
import TicketChannelController from '../controllers/TicketChannelController';

export default class ExtendedTicketClient extends TwokeiClient {

    public config = Config;
    public ticketController: TicketChannelController;

    constructor() {
        super({
            baseDirectoryUrl: Config.root,
            prefix: 't!',
            intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGE_REACTIONS', 'GUILD_PRESENCES', 'GUILD_MESSAGES'],
        })
        this.ticketController = new TicketChannelController(this);
    }
}