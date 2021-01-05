import { Module } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';
import { PodcastResolver } from './podcast.resolver';

@Module({
  providers: [PodcastsService, PodcastResolver],
})
export class PodcastsModule {}
