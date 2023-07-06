import { IsEmail, IsNotEmpty } from "class-validator"

export class SignupDto {
    @IsNotEmpty()
    readonly userName: string
    @IsNotEmpty()
    @IsEmail()
    readonly email: string
    @IsNotEmpty()
    readonly password: string
}