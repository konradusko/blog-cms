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
import { DomainSettings } from "../../enums/domain_settings_enums"
export const ajv_schema_set_change_domain_settings = {
    type: "object",
    allOf: [
        {
            properties: {
                "type":{
                    enum:[DomainSettings.https,DomainSettings.ip]
                }
            },
            additionalProperties: false,
        },
    ],
    required: ["type"],
    errorMessage: {
        type: "Dane powinny być obiektem!",
        properties: {
            type: "Proszę podać rodzaj zmiany",
        },
        _: 'Uzupełnij wszystkie dane',
    },
}