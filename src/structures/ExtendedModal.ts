import { MessageComponentInteraction, TextInputComponentOptions } from "discord.js";
import { ModalActionRowComponent } from "discord.js";
import { BaseMessageComponentOptions } from "discord.js";
import { TextInputStyleResolvable } from "discord.js";
import { MessageActionRow } from "discord.js";
import { AwaitModalSubmitOptions } from "discord.js";
import { Modal, ModalOptions, ModalSubmitInteraction } from "discord.js";

type ModalCallback = (interaction: ModalSubmitInteraction) => void

export interface InputOptions extends BaseMessageComponentOptions {
    customId: string;
    label?: string;
    minLength?: number;
    maxLength?: number;
    placeholder?: string;
    required?: boolean;
    style: TextInputStyleResolvable;
    value?: string;
}

export default class ExtendedModal extends Modal {

    private interaction: MessageComponentInteraction;

    constructor(interaction: MessageComponentInteraction, data?: Modal | ModalOptions) {
        super(data);
        this.interaction = interaction;
    }

    public prepare(customId: string, title: string) {
        super.setCustomId(customId);
        super.setTitle(title);
        return this;
    }

    public addInput(data: InputOptions | InputOptions[]) {

        data = Array.isArray(data) ? data : [data];

        const row = new MessageActionRow<ModalActionRowComponent>({
            type: 'ACTION_ROW',
            components: [...data]
        })

        super.addComponents(row);
        return this;
    }

    public async show(options?: AwaitModalSubmitOptions<ModalSubmitInteraction>): Promise<ModalSubmitInteraction | undefined> {

        this.interaction.showModal(this).catch(console.log);
        if (options)
            return this.interaction.awaitModalSubmit(options ?? {});
    }
}