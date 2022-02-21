import { MessageActionRow, MessageActionRowComponent } from "discord.js";
import { MessageButton } from "discord.js";
import { MessageEmbed } from "discord.js";
import { GuildMember } from "discord.js";
import { ICommand, ICommandResponse } from "twokei-xframework";
import CustomIds from "../helpers/CustomIds";
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

        const buttons = [] as MessageActionRowComponent[];
        for (const [key, value] of Object.entries(TicketClient.config.prompters)) {
            buttons.push(new MessageButton()
                .setCustomId(CustomIds.OPEN_MODAL + key)
                .setLabel(value.button.text)
                .setStyle('PRIMARY'))
        }

        const { title, description, footer } = TicketClient.config.channelMessage;

        const embed = new MessageEmbed()
            .setTitle(title ?? 'Solicitar atendimento')
            .setDescription(description ?? 'Selecione uma das opções abaixo e preencha o formulário para abrir o ticket.')
            .setFooter({ text: footer ?? 'https://twokei.website' })

        message.channel.send({
            embeds: [embed],
            components: [new MessageActionRow().addComponents(buttons)]
        })
    }
}