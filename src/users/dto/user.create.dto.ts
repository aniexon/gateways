
import { IsEnum, IsString, IsEmail} from "class-validator";


export enum TipoUsuario {
  alumno = 'alumno',
  docente = 'docente'
}

export class UserCreateDTO {
    @IsString()
    nombre: string;

    @IsEmail()
    email: string;

    @IsEnum(TipoUsuario)
    tipo: TipoUsuario;

}
