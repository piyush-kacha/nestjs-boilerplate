import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { BotChannelNames, DatabaseCollectionNames } from '../../shared/enums';
import { Workspace } from '../workspace/workspace.schema';

@Schema({
  timestamps: true,
  collection: DatabaseCollectionNames.BOT,
})
export class Bot {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    auto: true,
  })
  _id?: Types.ObjectId;

  @Prop()
  name: string;

  @Prop({
    enum: BotChannelNames,
  })
  channel: BotChannelNames;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: DatabaseCollectionNames.WORKSPACE })
  workspace: Workspace | Types.ObjectId;
}

export type BotDocument = HydratedDocument<Bot>;
export const BotSchema = SchemaFactory.createForClass(Bot);
