import { Global, Module } from '@nestjs/common';
import { ApiClientService } from './api-client.service';

@Global()
@Module({
  providers: [ApiClientService],
  exports: [ApiClientService],
})
export class ApiClientModule {}
