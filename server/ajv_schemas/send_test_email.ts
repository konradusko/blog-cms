import { RoleSmtp } from "../enums/role_enum"
export const ajv_schema_smtp_send_test_email = {
    type: "object",
    allOf: [
        {
            properties: {
                "type":{
                    enum:[RoleSmtp.newsletter,RoleSmtp.system]
                }
            },
            additionalProperties: false,
        },
    ],
    required: ["type"],
    errorMessage: {
        type: "Dane powinny być obiektem!",
        properties: {

            type:"Należy podać poprawny typ"
        },
        _: 'Uzupełnij wszystkie dane',
    },
}