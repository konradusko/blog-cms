import Ajv, { DefinedError } from 'ajv'
import ajvErrors from "ajv-errors";
const ajv = new Ajv({ allErrors: true })
ajvErrors(ajv)
export{ajv,DefinedError}