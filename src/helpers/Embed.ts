import { EmbedFieldData } from "discord.js";
import { MessageEmbedThumbnail } from "discord.js";
import { MessageEmbedVideo } from "discord.js";
import { MessageEmbedFooter } from "discord.js";
import { MessageEmbedImage } from "discord.js";
import { MessageEmbedAuthor } from "discord.js";
import { ColorResolvable } from "discord.js";
import { MessageEmbed } from "discord.js"

export interface MessageEmbedOptions {
    title: string;
    description: string;
    url?: string;
    timestamp?: Date | number;
    color?: ColorResolvable;
    fields?: EmbedFieldData[];
    author?: Partial<MessageEmbedAuthor> & { icon_url?: string; proxy_icon_url?: string };
    thumbnail?: Partial<MessageEmbedThumbnail> & { proxy_url?: string };
    image?: Partial<MessageEmbedImage> & { proxy_url?: string };
    video?: Partial<MessageEmbedVideo> & { proxy_url?: string };
    footer?: Partial<MessageEmbedFooter> & { icon_url?: string; proxy_icon_url?: string };
}

export function fastEmbed(options: MessageEmbedOptions) {
    return new MessageEmbed(options)
}