import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { DatabaseCollectionNames } from '../../shared/enums/db.enum';

@Schema({
  timestamps: true,
  collection: DatabaseCollectionNames.USER,
})
export class User {
  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: number;

  @Prop()
  name: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
