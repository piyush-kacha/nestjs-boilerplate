import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseCollectionNames } from '../../shared/enums';
import { UserRepository } from './user.repository';
import { UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: DatabaseCollectionNames.USER, schema: UserSchema }])],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UsersModule {}
