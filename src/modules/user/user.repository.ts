import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { DatabaseCollectionNames } from '../../shared/enums/db.enum';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(DatabaseCollectionNames.USER) private userModel: Model<UserDocument>) {}

  async find(filter: FilterQuery<UserDocument>): Promise<User[]> {
    return this.userModel.find(filter).exec();
  }
}
