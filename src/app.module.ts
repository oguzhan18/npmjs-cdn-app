import { Module } from '@nestjs/common';
import { CdnController } from './cdn/cdn.controller';
import { CdnService } from './cdn/cdn.service';

@Module({
  imports: [],
  controllers: [CdnController],
  providers: [CdnService],
})
export class AppModule {}
