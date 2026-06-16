import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollectesModule } from '../collectes/collectes.module';

@Module({
  imports: [CollectesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
