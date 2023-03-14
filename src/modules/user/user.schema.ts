import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { DatabaseCollectionNames } from '../../shared/enums/db.enum';

@Schema({
  timestamps: true,
  collection: DatabaseCollectionNames.USER,
})
export class User {
  // email is the unique identifier of the user
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: 'john@example.com',
  })
  @Prop({
    required: true,
  })
  email: string;

  // password is the hashed password of the user
  @ApiHideProperty()
  @Prop({
    required: true,
  })
  password: string;

  // name is the full name of the user
  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  @Prop()
  name: string;

  // verified is a boolean value that indicates whether the user has verified their email address
  @ApiProperty({
    description: 'Indicates whether the user has verified their email address',
    example: true,
  })
  @Prop({
    type: MongooseSchema.Types.Boolean,
    default: false,
  })
  verified: boolean;

  // verificationCode is a 6-digit number that is sent to the user's email address to verify their email address
  @ApiHideProperty()
  @Prop({
    type: MongooseSchema.Types.Number,
  })
  verificationCode: number;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
