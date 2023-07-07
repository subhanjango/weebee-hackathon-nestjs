import { Transform, Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsDate, IsNotEmpty, IsNumber, MinDate, ValidateNested } from "class-validator";
import { CreateUserDto } from "../../users/dto/create-user.dto";
import { getMinDateFormat } from "../../helpers";

export class CreateBookingDto {
    @IsNumber()
    @IsNotEmpty()
    providerServiceId : number

    @Transform( ({ value }) => new Date(value))
    @IsDate()
    @IsNotEmpty()
    @MinDate(new Date(getMinDateFormat() + ' 00:00'))
    date : string

    @IsNotEmpty()
    startTime : string

    @IsNotEmpty()
    endTime : string

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateUserDto)
    users : CreateUserDto[]
}