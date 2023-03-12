import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseCollectionNames } from '../../shared/enums/db.enum';
import { WorkspaceSchema } from './workspace.schema';
import { WorkspaceService } from './workspace.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: DatabaseCollectionNames.WORKSPACE, schema: WorkspaceSchema }])],
  providers: [WorkspaceService],
})
export class WorkspacesModule {}
