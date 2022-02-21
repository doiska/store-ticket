import userConfig from "../userConfig.json"

export type IConfig = {
    bot: {
        token: string,
        prefix: string
    },
    setupMessage: {
        title: string,
        description: string,
        footer: string
    },
    channelMessage: {
        categoryId: string,
        title: string,
        description: string,
        footer: string
    },
    prompters: {
        [key: string]: IPrompter
    }
}

export type IPrompter = {
    button: {
        text: string,
        color: string,
        enabled: boolean
    }
    modal: {
        title: string
        questions: {
            label: string,
            type: string,
            min?: number,
            max?: number
            required?: boolean
        }[]
    }
}

export const Config = {
    ...userConfig,
    root: __dirname
};

export default Config;