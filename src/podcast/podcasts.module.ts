import { Module } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';
import { EpisodeResolver, PodcastResolver } from './podcast.resolver';

@Module({
  providers: [PodcastsService, PodcastResolver, EpisodeResolver],
})
export class PodcastsModule {}
