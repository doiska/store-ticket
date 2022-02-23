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
        "title": "Testar sistema",
        "description": "Clique no botão de acordo com o **assunto** para ver o formulário",
        "image_url": "",
        "footer": "TwokeiStore @ 2022"
    },
    "channelMessage": {
        "title": "Ticket | TwokeiStore",
        "description": "Parabéns! Você criou um novo ticket.\nPor ser uma versão de testes, você consegue Salvar/Trancar/Destrancar, normalmente, essas funções são bloqueadas para os cargos configurados.",
        "image_url": "",
        "footer": "Esperamos que goste!",
        "categoryId": "944741071282405426"
    },
    "prompters": {
        "products": {
            "button": {
                "text": "Botão azul",
                "color": "PRIMARY",
                "enabled": true
            },
            "modal": {
                "title": "Titulo do Form",
                "questions": [
                    {
                        "label": "Campo com texto pequeno (obrigatório)",
                        "type": "SHORT",
                        "required": true
                    },
                    {
                        "label": "Campo com texto pequeno (obrigatório)",
                        "type": "SHORT",
                        "required": true
                    },
                    {
                        "label": "Campo com parágrafo (não obrigatório)",
                        "type": "PARAGRAPH"
                    }
                ]
            }
        },
        "whitelist": {
            "button": {
                "text": "Botão cinza",
                "color": "SECONDARY",
                "enabled": true
            },
            "modal": {
                "title": "Titulo do Form",
                "questions": [
                    {
                        "label": "Texto simples (não obrigatório)",
                        "type": "SHORT",
                        "required": false
                    },
                    {
                        "label": "Texto grande (obrigatório)",
                        "type": "PARAGRAPH",
                        "required": true
                    }
                ]
            }
        }
    }
}

export default Config;