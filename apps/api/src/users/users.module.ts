import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { BranchesModule } from 'src/branches/branches.module';

@Module({
  imports: [PrismaModule, BranchesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
