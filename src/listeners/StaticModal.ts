import { GuildMember } from "discord.js";
import { ModalSubmitInteraction } from "discord.js";
import { Interaction, CacheType } from "discord.js";
import { DiscordListener } from "twokei-xframework";
import ExtendedModal from "../structures/ExtendedModal";
import TicketClient from "../TicketClient";

type Prompter = {
    [key: string]: {
        title: string,
        text: string,
        questions: {
            type: string,
            description: string
        }[]
    }
}

export default class ModalPreProcess extends DiscordListener<'interactionCreate'> {

    constructor() {
        super({
            event: 'interactionCreate',
            once: false
        })
    }

    run(interaction: Interaction<CacheType>): void {

        if (!interaction.isMessageComponent())
            return;

        const customId = interaction.customId;
        const config = TicketClient.config;

        console.log(customId);
        if (!customId?.startsWith('ticket-'))
            return;

        const prompter = config.prompters as Prompter;
        const targetName = customId.replace('ticket-', '');
        const target = prompter?.[targetName]

        if (!target)
            return;

        const modal = new ExtendedModal(interaction)
            .prepare('custom-id-modal', 'Tïtulo do modal')
            .setTitle(target.title)

        let i = 0;
        for (const question of target.questions) {
            modal.addInput({
                customId: `${customId}-${targetName}-${i}`,
                label: `${question.description}`,
                style: question.type === 'PARAGRAPH' ? 'PARAGRAPH' : 'SHORT',
                type: 'TEXT_INPUT',
                required: false
            })
            i++;
        }
        modal
            .show({ time: 30000 })
            .then(async (received) => {

                if (!received)
                    return;

                if (received.components.length < target.questions.length)
                    return;

                const userTicketChannel = await TicketClient.ticketController.validateTicketChannel(interaction.member as GuildMember)
                if (userTicketChannel) {
                    received.reply({
                        content: 'Você já possui um ticket em aberto: ' + userTicketChannel.toString(),
                        ephemeral: true
                    });
                    return;
                }

                const fields = received.components.map((component, index) => {
                    const questionTitle = target.questions[index]?.description;
                    return component.components.map(component => ({
                        title: questionTitle,
                        answer: component.value === '' ? 'N/A' : component.value
                    }))?.[0]
                })

                const result = await TicketClient.ticketController.createTicketChannel((interaction.member as GuildMember), target.title, fields);

                if (!result) {
                    received.reply('Ocorreu um erro durante a criação de seu Ticket, contate diretamente um administrador.');
                    return;
                }

                received.reply({
                    content: 'Feito! Seu ticket foi criado em ' + result.toString(),
                    ephemeral: true
                })
            }).catch(() => { });
    }
}