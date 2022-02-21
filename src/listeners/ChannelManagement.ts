import { MessageButton } from "discord.js";
import { TextChannel } from "discord.js";
import { PermissionOverwriteOptions } from "discord.js";
import { Collection } from "discord.js";
import { Snowflake } from "discord.js";
import { MessageEmbed } from "discord.js";
import { GuildMember } from "discord.js";
import { MessageButtonStyle } from "discord.js";
import { Interaction, CacheType } from "discord.js";
import { DiscordListener } from "twokei-xframework";
import FormClient from "../FormClient";
import CustomIds from "../helpers/CustomIds";

const fastButton = (id: string, label: string, style: MessageButtonStyle) => {
    return new MessageButton().setCustomId(`${CustomIds.EDIT_CHANNEL}${id}`).setLabel(label).setStyle(style);
}

const setChannelPermission = (channel: TextChannel, members: Collection<Snowflake, GuildMember>, options: PermissionOverwriteOptions) => {
    for (const [key, member] of members) {
        channel.permissionOverwrites.edit(member, options);
    }
}

type Buttons = {
    [key: string]: {
        message: string,
        button: MessageButton;
        exec: (channel: TextChannel) => void;
    };
};

export const ChannelButtons: Buttons = {
    "save": {
        message: 'Salvo e arquivado.',
        button: fastButton('save', '💾 Salvar e arquivar', 'PRIMARY'),
        exec: (channel: TextChannel) => {
            //TODO: criar categoria na config e mover canal para o arquivo juntamente da transcricao
        }
    },
    "lock": {
        message: 'Canal trancado.',
        button: fastButton('lock', '🔒 Trancar', 'SECONDARY'),
        exec: (channel: TextChannel) => {
            setChannelPermission(channel, channel.members, { SEND_MESSAGES: false })
        }
    },
    "unlock": {
        message: 'Canal destrancado.',
        button: fastButton('unlock', '🔓 Destrancar', 'SUCCESS'),
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

        if (!interaction.isButton() || !interaction.member || !interaction.channel || interaction.channel.type !== 'GUILD_TEXT')
            return;

        const customId = interaction.customId;

        if (!customId.startsWith(CustomIds.EDIT_CHANNEL))
            return;

        const member = interaction.member as GuildMember;

        const managmentRoles = FormClient.config.bot.managmentRoles

        //TODO: mudar para FormClient
        const roles = Array.isArray(managmentRoles) ? managmentRoles : [managmentRoles]

        let found;
        for (const role of roles) {
            if (member.roles.cache.has(role)) {
                found = role;
                break;
            }
        }

        if (!found) {
            interaction.reply({
                content: 'Você não possui permissão para alterar as configurações do canal.',
                ephemeral: true
            })
            return;
        }

        const button = ChannelButtons?.[customId.replace(CustomIds.EDIT_CHANNEL, '')];

        if (!button)
            return;

        button.exec(interaction.channel as TextChannel);
        interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle('As propriedades do canal foram alteradas.')
                    .addField('Responsável', `${member.displayName}`, true)
                    .addField('Função', `${button.message}`, true)
                    .setFooter({
                        text: `https://twokei.store`
                    })
                    .setTimestamp()
            ]
        })
    }
}