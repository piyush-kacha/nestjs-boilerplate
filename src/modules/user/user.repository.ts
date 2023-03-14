import { FilterQuery, Model, QueryOptions, UpdateQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { DatabaseCollectionNames } from '../../shared/enums/db.enum';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(DatabaseCollectionNames.USER) private userModel: Model<UserDocument>) {}

  async find(filter: FilterQuery<UserDocument>): Promise<UserDocument[]> {
    return this.userModel.find(filter).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async findOne(filter: FilterQuery<UserDocument>): Promise<UserDocument | null> {
    return this.userModel.findOne(filter).exec();
  }

  async create(user: User): Promise<UserDocument> {
    return this.userModel.create(user);
  }

  async findOneAndUpdate(filter: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument>, options: QueryOptions<UserDocument>): Promise<UserDocument | null> {
    return this.userModel.findOneAndUpdate(filter, update, options);
  }
}
