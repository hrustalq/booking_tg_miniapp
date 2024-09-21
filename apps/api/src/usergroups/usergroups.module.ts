import { Module } from '@nestjs/common';
import { UserGroupsController } from './usergroups.controller';
import { UserGroupsService } from './usergroups.service';
import { BranchesModule } from '../branches/branches.module';

@Module({
  imports: [BranchesModule],
  controllers: [UserGroupsController],
  providers: [UserGroupsService],
  exports: [UserGroupsService],
})
export class UserGroupsModule {}
