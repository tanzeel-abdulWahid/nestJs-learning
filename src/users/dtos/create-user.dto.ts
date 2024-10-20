import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    fname: string;

    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(20)
    lname: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: "Password not strong"
    })
    password: string;

}