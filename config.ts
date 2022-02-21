export type IConfig = {
    bot: {
        token: string,
        prefix: string,
        managmentRoles: string | string[]
    },
    setupMessage: {
        color?: string,
        title: string,
        description: string,
        image_url?: string
        footer?: string
    },
    channelMessage: {
        categoryId: string,
        color?: string,
        title: string,
        description: string,
        image_url?: string
        footer?: string
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

const Config: IConfig = {
    "bot": {
        "token": "OTQyMDU1MjM5OTM3MzE4OTUy.Yge7Tw.eKhvqO8XKwU6okCChAC8NV8X1co",
        "prefix": "T!",
        "managmentRoles": ['945392862567215155']
    },
    "setupMessage": {
        "title": "Atendimento",
        "description": "Clique no botão de acordo com o **assunto** que deseja tratar via Ticket.",
        "image_url": "https://img.gta5-mods.com/q95/images/fivem-flag-fivem-singleplayer/f8ceb7-20200227125013_1.jpg",
        "footer": "TwokeiStore @ 2022"
    },
    "channelMessage": {
        "title": "Ticket | TwokeiStore",
        "description": "A administração já foi notificada de seu ticket, certifique-se de adicionar outros membros se necessário.",
        "image_url": "https://img.gta5-mods.com/q95/images/fivem-flag-fivem-singleplayer/f8ceb7-20200227125013_1.jpg",
        "footer": "Agradecemos seu contato!",
        "categoryId": "944741071282405426"
    },
    "prompters": {
        "products": {
            "button": {
                "text": "Compras",
                "color": "PRIMARY",
                "enabled": true
            },
            "modal": {
                "title": "Produtos",
                "questions": [
                    {
                        "label": "Informe seu nome",
                        "type": "SHORT",
                        "required": true
                    },
                    {
                        "label": "Qual produto deseja comprar?",
                        "type": "SHORT",
                        "required": true
                    },
                    {
                        "label": "Meio de pagamento",
                        "type": "SHORT",
                        "required": true
                    },
                    {
                        "label": "Por onde conheceu a loja?",
                        "type": "SHORT"
                    }
                ]
            }
        },
        "whitelist": {
            "button": {
                "text": "Whitelist",
                "color": "SECONDARY",
                "enabled": true
            },
            "modal": {
                "title": "Sua whitelist",
                "questions": [
                    {
                        "label": "Informe o nome do personagem",
                        "type": "SHORT",
                        "required": true
                    },
                    {
                        "label": "Informe a história do seu personagem",
                        "type": "PARAGRAPH",
                        "required": true
                    }
                ]
            }
        }
    }
}

export default Config;