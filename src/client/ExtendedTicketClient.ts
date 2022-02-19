import { GatewayIntentBits } from 'discord.js';
import { TwokeiClient } from 'twokei-framework';
import Config from '../config'

export default class ExtendedTicketClient extends TwokeiClient {

    constructor() {
        super({
            baseDirectoryUrl: Config.root,
            prefix: '2!',
            intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.Guilds],
        })
    }
}