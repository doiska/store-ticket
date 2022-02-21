import { ModalSubmitInteraction } from "discord.js";
import { Interaction, CacheType } from "discord.js";
import { DiscordListener } from "twokei-xframework";
import { handleSubmit } from "../controllers/ChannelSubmitController";
import CustomIds from "../helpers/CustomIds";
import ExtendedModal from "../structures/ExtendedModal";
import TicketClient from "../FormClient";

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

        if (!customId?.startsWith(CustomIds.OPEN_MODAL))
            return;

        const promptId = customId.replace(CustomIds.OPEN_MODAL, '');
        const target = config.prompters?.[promptId]

        if (!target)
            return;

        let randomKey = (Math.random() + 1).toString(36).substring(2);

        const modalId = `modal-id-${randomKey}`
        const modal = new ExtendedModal(interaction).prepare(modalId, target.modal.title);

        modal.addInput(
            target.modal.questions.map(({ label, type, required }, index) => {
                return {
                    customId: `${customId}-${promptId}-${index}`,
                    label: `${label}`,
                    style: type === 'PARAGRAPH' ? 'PARAGRAPH' : 'SHORT',
                    type: 'TEXT_INPUT',
                    required: required ?? false
                };
            })
        )

        modal.show({ time: 30000, filter: (filter) => filter.customId === modalId }).then(async (received: ModalSubmitInteraction | undefined) => {

            if (!received)
                return;

            const creationResult = await handleSubmit(received, target);

            received.reply({
                content: creationResult,
                ephemeral: true
            })
        }).catch(() => { });
    }
}