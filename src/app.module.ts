import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpisodesModule } from './episodes/episodes.module';

@Module({
  imports: [EpisodesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
