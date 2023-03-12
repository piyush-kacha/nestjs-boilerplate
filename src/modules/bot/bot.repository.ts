import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { Bot, BotDocument } from './bot.schema';
import { DatabaseCollectionNames } from '../../shared/enums/db.enum';

@Injectable()
export class BotRepository {
  constructor(@InjectModel(DatabaseCollectionNames.BOT) private botModel: Model<BotDocument>) {}

  async find(filter: FilterQuery<BotDocument>): Promise<Bot[]> {
    return this.botModel.find(filter).exec();
  }
}
