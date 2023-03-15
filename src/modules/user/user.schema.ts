import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { DatabaseCollectionNames } from '../../shared/enums/db.enum';

@Schema({
  timestamps: true,
  collection: DatabaseCollectionNames.USER,
})
export class User {
  // _id is the unique identifier of the user
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '5f9f1c9b9c9c9c9c9c9c9c9c',
  })
  @Expose()
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    auto: true,
  })
  _id?: Types.ObjectId;

  // email is the unique identifier of the user
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: 'john@example.com',
  })
  @Expose()
  @Prop({
    required: true,
  })
  email: string;

  // password is the hashed password of the user
  @ApiHideProperty()
  @Exclude()
  @Prop({
    required: true,
  })
  password: string;

  // name is the full name of the user
  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  @Expose()
  @Prop()
  name: string;

  // verified is a boolean value that indicates whether the user has verified their email address
  @ApiProperty({
    description: 'Indicates whether the user has verified their email address',
    example: true,
  })
  @Expose()
  @Prop({
    type: MongooseSchema.Types.Boolean,
    default: false,
  })
  verified: boolean;

  // verificationCode is a 6-digit number that is sent to the user's email address to verify their email address
  @ApiHideProperty()
  @Exclude()
  @Prop({
    type: MongooseSchema.Types.Number,
  })
  verificationCode: number;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
