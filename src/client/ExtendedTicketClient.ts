import { TwokeiClient } from 'twokei-xframework';
import Config, { IConfig } from '../config'
import ChannelController from '../controllers/ChannelController';
import { validateFields } from '../helpers/FieldValidator';

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

        const _title = {
            labels: [title],
            min: 1,
            max: 256
        }

        const _description = {
            labels: [description],
            min: 1,
            max: 2048
        }

        const _footer = {
            labels: [footer],
            min: 1,
            max: 256
        }

        const invalidFields = validateFields([_title, _description, _footer]);

        if (invalidFields.length) {
            throw new Error(`Existem campos inválidos na userConfig key: channelMessage | ${invalidFields.join('\n')}`);
        }
    }

    private validatePrompters() {
        console.log('Validating question prompters...');
        for (const [key, value] of Object.entries(this.config.prompters)) {
            const title = {
                labels: [value.modal.title],
                min: 1,
                max: 15
            };

            const buttonText = {
                labels: [value.modal.title],
                min: 1,
                max: 15
            }

            const questions = {
                labels: value.modal.questions.map((question) => question.label),
                min: 1,
                max: 45
            };

            const invalidFields = validateFields([title, buttonText, questions]);

            if (invalidFields.length)
                throw new Error(`Existem campos inválidos na userConfig key: ${key} | ${invalidFields.join('\n')}`);
        }
        console.log('Question prompters successfully validated.');
    }
}