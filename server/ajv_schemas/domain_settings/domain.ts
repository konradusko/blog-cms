export const ajv_schema_set_new_domain_name = {
    type: "object",
    allOf: [
        {
            properties: {
                "domain": { type: "string", minLength: 1, maxLength: 300 },
            },
            additionalProperties: false,
        },
    ],
    required: ["domain"],
    errorMessage: {
        type: "Dane powinny być obiektem!",
        properties: {
            domain: "Proszę podać nową domenę",
        },
        _: 'Uzupełnij wszystkie dane',
    },
}