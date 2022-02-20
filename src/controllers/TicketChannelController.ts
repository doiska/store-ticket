import { TextChannel } from "discord.js";
import { MessageEmbed } from "discord.js";
import { GuildMember } from "discord.js";
import ExtendedTicketClient from "../client/ExtendedTicketClient";

export type Field = {
    title: string,
    answer: string
}

export default class TicketChannelController {

    private categoryId: string;

    //TODO: better channel filtering.

    constructor(client: ExtendedTicketClient) {
        this.categoryId = client.config.bot.ticketCategoryId;
    }

    async createTicketChannel(member: GuildMember, title: string, fields: Field[]) {
        const category = await member.guild.channels.fetch(this.categoryId);

        if (!category)
            throw new Error('Could not find any category with this Id.');

        if (category.type !== 'GUILD_CATEGORY')
            return undefined;

        const channelName = `${member.displayName}`.substring(0, 30);

        const channel = await member.guild.channels.create(`${channelName}-${member.user.id}`, {
            type: 'GUILD_TEXT',
            parent: this.categoryId
        }).catch(console.log);

        if (!channel)
            return undefined;

        const mainEmbed = new MessageEmbed().setTitle('Título').setDescription('Configurações do Ticket, adicionar usuário, etc.')

        const response = new MessageEmbed();

        for (const field of fields) {
            response.addField(`Q: ${field.title}`, `A: ${field.answer}`);
        }

        channel.send({ embeds: [mainEmbed] })

        channel.send({
            embeds: [response]
        })

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