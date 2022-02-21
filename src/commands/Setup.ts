import { MessageActionRow, MessageActionRowComponent } from "discord.js";
import { MessageButton } from "discord.js";
import { MessageEmbed } from "discord.js";
import { MessageButtonStyleResolvable } from "discord.js";
import { GuildMember } from "discord.js";
import { ICommand, ICommandResponse } from "twokei-xframework";
import CustomIds from "../helpers/CustomIds";
import { fastEmbed } from "../helpers/Embed";
import TicketClient from "../FormClient";

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

        const buttons = [] as MessageActionRowComponent[];
        for (const [key, value] of Object.entries(TicketClient.config.prompters)) {
            buttons.push(new MessageButton()
                .setCustomId(CustomIds.OPEN_MODAL + key)
                .setLabel(value.button.text)
                .setStyle(value.button.color as MessageButtonStyleResolvable ?? 'PRIMARY'))
        }

        const { title, description, image_url, footer } = TicketClient.config.setupMessage;

        const embed = fastEmbed({
            title: title ?? 'Solicitar atendimento',
            description: description ?? 'Selecione uma das opções abaixo e preencha o formulário para abrir o ticket.',
            color: '#2C2F33',
            footer: { text: footer ?? 'https://twokei.website' },
            image: {
                url: image_url ?? ''
            }
        })

        message.channel.send({
            embeds: [embed],
            components: [new MessageActionRow().addComponents(buttons)]
        })
    }
}