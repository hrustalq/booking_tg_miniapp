import { Module } from '@nestjs/common';
import { BillingProfilesController } from './billing-profiles.controller';
import { BillingProfilesService } from './billing-profiles.service';
import { BranchesModule } from '../branches/branches.module';

@Module({
  imports: [BranchesModule],
  controllers: [BillingProfilesController],
  providers: [BillingProfilesService],
  exports: [BillingProfilesService],
})
export class BillingProfilesModule {}
