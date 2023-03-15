import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { DatabaseCollectionNames } from '../../shared/enums/db.enum';
import { User } from '../user/user.schema';

@Schema({
  timestamps: true,
  collection: DatabaseCollectionNames.WORKSPACE,
})
export class Workspace {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    auto: true,
  })
  _id?: Types.ObjectId;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: DatabaseCollectionNames.USER })
  createdBy: User | Types.ObjectId;
}

export type WorkspaceDocument = HydratedDocument<Workspace>;
export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
