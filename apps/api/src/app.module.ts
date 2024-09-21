import { Module } from '@nestjs/common';
import { PrismaModule } from './shared/prisma/prisma.module';
import { PcsModule } from './pcs/pcs.module';
import { ZonesModule } from './zones/zones.module';
import { BranchesModule } from './branches/branches.module';
import { BookingsModule } from './bookings/bookings.module';
import { UsersModule } from './users/users.module';
import { NewsModule } from './news/news.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PaymentsModule } from './payments/payments.module';
import { ApiClientModule } from './shared/api-client/api-client.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';
import { BillingProfilesModule } from './billing-profiles/billing-profiles.module';
import { UserGroupsModule } from './usergroups/usergroups.module';

@Module({
  imports: [
    PrismaModule,
    PcsModule,
    ZonesModule,
    BranchesModule,
    BookingsModule,
    UsersModule,
    NewsModule,
    NotificationsModule,
    PaymentsModule,
    ApiClientModule,
    BillingProfilesModule,
    ScheduleModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
    }),
    UserGroupsModule,
  ],
})
export class AppModule {}
