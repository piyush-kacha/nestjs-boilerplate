import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseCollectionNames } from '../../shared/enums/db.enum';

import { BotRepository } from './bot.repository';
import { BotSchema } from './bot.schema';
import { BotService } from './bot.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: DatabaseCollectionNames.BOT, schema: BotSchema }])],
  providers: [BotService, BotRepository],
  exports: [BotService],
})
export class BotsModule {}
