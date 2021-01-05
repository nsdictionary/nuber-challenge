import { Query, Resolver } from '@nestjs/graphql';
import { PodcastsService } from './podcasts.service';
import { Podcast } from './entities/podcast.entity';

@Resolver(() => Podcast)
export class PodcastResolver {
  constructor(private readonly podcastService: PodcastsService) {}

  @Query(() => [Podcast])
  podcasts(): { podcasts: Podcast[]; err: string | null } {
    return this.podcastService.getAllPodcasts();
  }
}
