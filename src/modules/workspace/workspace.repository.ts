import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { DatabaseCollectionNames } from '../../shared/enums/db.enum';
import { Workspace, WorkspaceDocument } from './workspace.schema';

@Injectable()
export class WorkspaceRepository {
  constructor(@InjectModel(DatabaseCollectionNames.WORKSPACE) private workspaceModel: Model<WorkspaceDocument>) {}

  async find(filter: FilterQuery<WorkspaceDocument>): Promise<Workspace[]> {
    return this.workspaceModel.find(filter).exec();
  }
}
