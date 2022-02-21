import { MessageButton } from "discord.js";
import { TextChannel } from "discord.js";
import { PermissionOverwriteOptions } from "discord.js";
import { Collection } from "discord.js";
import { Snowflake } from "discord.js";
import { GuildMember } from "discord.js";
import { MessageButtonStyle } from "discord.js";
import { Interaction, CacheType } from "discord.js";
import { DiscordListener } from "twokei-xframework";

const fastButton = (id: string, label: string, style: MessageButtonStyle) => {
    return new MessageButton().setCustomId(id).setLabel(label).setStyle(style);
}

const setChannelPermission = (channel: TextChannel, members: Collection<Snowflake, GuildMember>, options: PermissionOverwriteOptions) => {
    for (const [key, member] of members) {
        channel.permissionOverwrites.edit(member, options);
    }
}

const buttons = {
    "save": {
        button: fastButton('ticket-fun-save', '💾 Salvar e arquivar', 'PRIMARY'),
        exec: (channel: TextChannel) => {
            //TODO: criar categoria na config e mover canal para o arquivo juntamente da transcricao
        }
    },
    "lock": {
        button: fastButton('ticket-fun-lock', '🔒 Trancar', 'SECONDARY'),
        exec: (channel: TextChannel) => {
            setChannelPermission(channel, channel.members, { SEND_MESSAGES: false })
        }
    },
    "unlock": {
        button: fastButton('ticket-fun-lock', '🔓 Destrancar', 'SUCCESS'),
        exec: (channel: TextChannel) => {
            setChannelPermission(channel, channel.members, { SEND_MESSAGES: true })
        }
    }
}

export default class ChannelManagement extends DiscordListener<'interactionCreate'> {
    constructor() {
        super({
            event: 'interactionCreate',
            once: false,
        });
    }

    run(interaction: Interaction<CacheType>): void {

        if (!interaction.isButton())
            return;

        // const customId = interaction.customId;

        // if (!customId.startsWith(''))
        //     return;

        // throw new Error("Method not implemented.");
    }
}