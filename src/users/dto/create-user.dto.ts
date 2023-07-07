import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class CreateUserDto {
    
    @IsNotEmpty()
    @IsString()
    firstName : string
    
    @IsNotEmpty()
    @IsString()
    lastName : string
    
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    emailAddress :string
}