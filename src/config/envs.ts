import 'dotenv/config';
import * as joi from 'joi';

interface IEnvironmentsVar {
    HOST: string;
    PORT: number;
    USERS_MS_HOST: string;
    USERS_MS_PORT: number;
    BOOKS_MS_HOST: string;
    BOOKS_MS_PORT: number;
   
}

const envsSchema = joi.object<IEnvironmentsVar>({
    HOST: joi.string().required(),
    PORT: joi.number().required(),
    USERS_MS_HOST: joi.string().required(),
    USERS_MS_PORT:joi.number().required(),
    BOOKS_MS_HOST: joi.string().required(),
    BOOKS_MS_PORT:joi.number().required()
}).unknown(true)

const { error, value } = envsSchema.validate(process.env);

if (error)
    throw new Error(`Error de validación de variables de entorno: ${error}`)

const envVars: IEnvironmentsVar = value;

export const environmentVars = {
    HOST: envVars.HOST,
    PORT: envVars.PORT,
    USERS_MS_HOST: envVars.USERS_MS_HOST,
    USERS_MS_PORT: envVars.USERS_MS_PORT,
    BOOKS_MS_HOST: envVars.BOOKS_MS_HOST,
    BOOKS_MS_PORT: envVars.BOOKS_MS_PORT,

}