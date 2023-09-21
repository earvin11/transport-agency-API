import { IsString, IsInt, IsPositive, Min } from 'class-validator';

export class BuySeatsDto {
    @IsInt()
    @IsPositive()
    @Min(1)
    quantity: number;

    @IsString()
    uuid: string;
};
