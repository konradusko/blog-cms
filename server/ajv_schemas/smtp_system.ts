import { RoleSmtp } from "../enums/role_enum"
export const ajv_schema_smtp = {
    type: "object",
    allOf: [
        {
            properties: {
                "host": { type: "string", minLength: 1, maxLength: 300 },
                "user": { type: "string", minLength: 1, maxLength: 300 },
                "password": { type: "string", minLength: 1, maxLength: 300 },
                "type":{
                    enum:[RoleSmtp.newsletter,RoleSmtp.system]
                }
            },
            additionalProperties: false,
        },
    ],
    required: ["user","password","host","type"],
    errorMessage: {
        type: "Dane powinny być obiektem!",
        properties: {
            user :"Proszę podać nazwe użytkownika do logowania",
            password:"Należy podać hasło",
            host:'Należy podać host smtp',
            type:"Należy podać poprawny typ"
        },
        _: 'Uzupełnij wszystkie dane',
    },
}


