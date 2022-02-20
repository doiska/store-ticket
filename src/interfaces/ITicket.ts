type TicketPrompters = {
    [key: string]: TicketPromptData
}

type TicketPromptData = {
    text: string,
    questions: TicketQuestionData[]
}

type TicketQuestionData = {
    title: string,
    description: string
}

export { TicketPrompters, TicketPromptData, TicketQuestionData }