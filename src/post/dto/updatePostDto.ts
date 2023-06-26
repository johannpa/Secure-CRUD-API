import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdatePosteDto {
    @IsNotEmpty()
    @IsOptional()
    readonly title? : string;
    
    @IsNotEmpty()
    @IsOptional()
    readonly body? : string;
}