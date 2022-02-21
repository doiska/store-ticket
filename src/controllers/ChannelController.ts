import { TextChannel } from "discord.js";
import { MessageEmbed } from "discord.js";
import { GuildMember } from "discord.js";
import ExtendedTicketClient from "../client/ExtendedTicketClient";
import { fastEmbed } from "../helpers/Embed";

export type Field = {
    title: string,
    answer: string
}

export default class ChannelController {

    private client: ExtendedTicketClient
    private categoryId: string;

    //TODO: better channel filtering.

    constructor(client: ExtendedTicketClient) {
        this.client = client;
        this.categoryId = client.config.channelMessage.categoryId;
    }

    async createTicketChannel(member: GuildMember, fields: Field[]) {
        const category = await member.guild.channels.fetch(this.categoryId);

        if (!category)
            throw new Error('Could not find any category with this Id.');

        if (category.type !== 'GUILD_CATEGORY')
            return undefined;

        const channelName = `${member.displayName}`.substring(0, 30);

        const channel = await member.guild.channels.create(`${channelName}-${member.user.id}`, {
            type: 'GUILD_TEXT',
            parent: this.categoryId
        }).catch((e) => {
            console.log(e);
            return undefined;
        });

        if (!channel)
            return undefined;

        const { title, description, image_url, footer } = this.client.config.channelMessage;

        const mainEmbed = fastEmbed({
            title: title ?? 'Configurações do formulário',
            description: description ?? '',
            image: {
                url: image_url ?? ''
            },
            footer: {
                text: footer ?? ''
            }
        })

        await channel.send({ embeds: [mainEmbed] })

        for (const field of fields) {
            const response = new MessageEmbed()
                .setTitle(`${field.title}`)
                .setDescription(`${field.answer}`);

            await channel.send({ embeds: [response] })
        }

        return channel;
    }

    async validateTicketChannel(member: GuildMember): Promise<TextChannel | undefined> {
        const channels = await member.guild.channels.fetch(this.categoryId);

        if (channels?.type === 'GUILD_CATEGORY') {
            const childrens = channels.children;

            const filterId = (child: string) => {
                const split = child.split('-');
                return split?.[split.length - 1].replace(' ', '');
            };

            const channel = childrens.find(child => child.type === 'GUILD_TEXT' && filterId(child.name) === member.id);

            if (channel && channel.isText())
                return channel as TextChannel;
        }
    }
}