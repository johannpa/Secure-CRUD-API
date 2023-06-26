import { IsNotEmpty } from "class-validator";

export class CommnentDto {
    @IsNotEmpty()
    readonly content: string
}