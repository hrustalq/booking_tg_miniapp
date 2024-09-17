import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PcsModule } from './pcs/pcs.module';
import { ZonesModule } from './zones/zones.module';
import { BranchesModule } from './branches/branches.module';
import { BookingsModule } from './bookings/bookings.module';
import { UsersModule } from './users/users.module';
import { NewsModule } from './news/news.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PaymentsModule } from './payments/payments.module';

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
  ],
})
export class AppModule {}
