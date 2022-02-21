import { TwokeiClient } from 'twokei-xframework';
import { IConfig } from '../../config';
import Config from '../config'
import ChannelController from '../controllers/ChannelController';
import { Condition, validateFields } from '../helpers/FieldValidator';

export default class ExtendedTicketClient extends TwokeiClient {

    public config = Config as IConfig;
    public ticketController: ChannelController;

    constructor() {
        super({
            baseDirectoryUrl: Config.root,
            prefix: Config.bot.prefix,
            intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGE_REACTIONS', 'GUILD_PRESENCES', 'GUILD_MESSAGES'],
        })

        this.validateDefaultMessage();
        this.validatePrompters();

        this.ticketController = new ChannelController(this);

        this.on('error', console.log);
        this.on('warn', console.log);
    }


    private validateDefaultMessage() {
        console.log('Validating default embed message...');

        let { title, description, footer } = this.config.channelMessage;

        const invalidFields = validateFields(
            [
                {
                    labels: [title],
                    min: 1,
                    max: 256
                },
                {
                    labels: [description],
                    min: 1,
                    max: 2048
                },
                {
                    labels: [footer ?? ''],
                    min: 1,
                    max: 256
                }
            ]
        );

        if (invalidFields.length) {
            throw new Error(`Existem campos inválidos na userConfig key: channelMessage | ${invalidFields.join('\n')}`);
        }
    }

    private validatePrompters() {
        console.log('Validating question prompters...');

        for (const [key, value] of Object.entries(this.config.prompters)) {

            const invalidFields = validateFields(
                [
                    {
                        labels: [value.modal.title],
                        min: 1,
                        max: 50
                    },
                    {
                        labels: value.modal.questions.map((question) => question.label),
                        min: 1,
                        max: 45
                    }
                ]
            );

            if (invalidFields.length)
                throw new Error(`Existem campos inválidos na userConfig key: ${key} | ${invalidFields.join('\n')}`);
        }

        console.log('Question prompters successfully validated.');
    }
}