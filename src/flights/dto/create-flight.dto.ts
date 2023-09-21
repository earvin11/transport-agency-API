import { IsString, MinLength, IsInt, IsPositive } from 'class-validator';

export class CreateFlightDto {
    @IsString()
    @MinLength(5)
    origin: string;

    @IsString()
    @MinLength(5)
    destination: string;

    @IsInt()
    departureTime: number;

    @IsInt()
    arrivalTime: number;

    @IsString()
    estimatedTime: string;

    @IsString()
    departureDate: string;

    @IsString()
    arrivalDate: string;

    @IsInt()
    @IsPositive()
    price: number;

    @IsInt()
    seatsAvailable: number;  
};
