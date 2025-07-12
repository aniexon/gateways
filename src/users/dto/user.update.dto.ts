
import { PartialType } from "@nestjs/mapped-types";
import { UserCreateDTO } from "./user.create.dto";
import { IsNumber } from "class-validator";

export class UserUpdateDTO extends PartialType(UserCreateDTO) {
   @IsNumber()
    id: number;
}