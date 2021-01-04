import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PodcastsController } from './podcasts/podcasts.controller';

@Module({
  imports: [],
  controllers: [AppController, PodcastsController],
  providers: [AppService],
})
export class AppModule {}
