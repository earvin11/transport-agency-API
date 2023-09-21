import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Flight extends Document {
    @Prop()
    origin: string;
    @Prop()
    destination: string;
    @Prop()
    departureTime: number;
    @Prop()
    arrivalTime: number;
    @Prop()
    estimatedTime: string;
    @Prop()
    departureDate: string;
    @Prop()
    arrivalDate: string;
    @Prop()
    price: number;
    @Prop()
    seatsAvailable: number;
    @Prop({
        default: true
    })
    isActive: boolean;
    @Prop()
    uuid: string;
}

export const FlightSchema = SchemaFactory.createForClass( Flight );
