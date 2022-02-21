export type Condition = {
    labels: string[]
    min: number,
    max: number
}

export function validateFields(validateFields: Condition[]) {

    const invalidFields = [] as string[];

    for (let { labels, min, max } of validateFields) {
        if (!Array.isArray(labels))
            labels = [labels];

        for (const label of labels) {
            if (label.length > max || label.length < min)
                invalidFields.push(label);
        }
    }

    return invalidFields;
}