export const ajv_schema_login_post = {
    type: "object",
    allOf: [
        {
            properties: {
                "login": { type: "string", minLength: 1, maxLength: 300 },
                "password": { type: "string", minLength: 1, maxLength: 300 },
            },
            additionalProperties: false,
        },
    ],
    required: ["login","password"],
    errorMessage: {
        type: "Dane powinny być obiektem!",
        properties: {
            login: "Proszę podać login",
            password:"Należy podać hasło"
        },
        _: 'Uzupełnij wszystkie dane',
    },
}