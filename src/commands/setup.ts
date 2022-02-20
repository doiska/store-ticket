import { MessageActionRow } from "discord.js";
import { MessageButton } from "discord.js";
import { GuildMember } from "discord.js";
import { ICommand, ICommandResponse } from "twokei-xframework";
import TicketClient from "../TicketClient";

export default class PingCommand implements ICommand {
    name: string = 'setup';

    callback({ message }: ICommandResponse) {

        console.log('Command')
        if (!message)
            return;

        const member: GuildMember | null = message!.member;

        if (!member) {
            console.log('Not a member.');
            return;
        }

        if (!member.permissions.has('ADMINISTRATOR')) {
            console.log('You must be an administrator');
            return;
        }

        message.delete();

        const rows = [] as MessageActionRow[];
        for (const [key, value] of Object.entries(TicketClient.config.prompters)) {
            rows.push(new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId(`ticket-${key}`)
                        .setLabel(value.text)
                        .setStyle('PRIMARY')
                ))
        }

        message.channel.send({
            content: 'xd',
            components: rows
        })
    }
}