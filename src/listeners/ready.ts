import { Client } from "discord.js";
import { DiscordListener, TwokeiClient } from "twokei-framework";

export default class ReadyEvent extends DiscordListener<'ready'> {
    constructor() {
        super({
            event: 'ready',
            once: true
        })
    }

    onLoad(client: TwokeiClient<boolean>): void {
        console.log('onLoad readyEvent')
    }

    public run(client: Client<true>): void {
        console.log('Ready event.');
    }
}