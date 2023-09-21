import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop()
    email: string;
    
    @Prop()
    userName: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    role: string;

    @Prop()
    uuid: string;

    @Prop({
        default: true
    })
    isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass( User );
