import { GuildMember } from "discord.js";
import { ModalSubmitInteraction } from "discord.js";
import { IPrompter } from "../../config";
import TicketClient from "../TicketClient";

export async function handleSubmit(interaction: ModalSubmitInteraction, target: IPrompter) {

    const userTicketChannel = await TicketClient.ticketController.validateTicketChannel(interaction.member as GuildMember);

    if (userTicketChannel)
        return 'Você já possui um ticket em aberto: ' + userTicketChannel.toString();

    const fields = interaction.components.map((component, index) => {
        const questionTitle = target.modal.questions[index]?.label;
        return component.components.map(component => ({
            title: questionTitle,
            answer: component.value === '' ? 'N/A' : component.value
        }))?.[0];
    });


    const result = await TicketClient.ticketController.createTicketChannel((interaction.member as GuildMember), fields);

    if (!result)
        return 'Ocorreu um erro durante a criação de seu Ticket, contate diretamente um administrador.';

    return 'Feito! Seu ticket foi criado em ' + result.toString()
}