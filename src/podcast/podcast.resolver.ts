import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PodcastsService } from './podcasts.service';
import { Podcast } from './entities/podcast.entity';
import { AllPodcastOutput } from './dtos/all-podcast.dto';
import {
  CreatePodcastInput,
  CreatePodcastOutput,
} from './dtos/create-podcast.dto';
import { PodcastInput, PodcastOutput } from './dtos/podcast.dto';
import { DeletePodcastOutput } from './dtos/delete-podcast.dto';
import {
  UpdatePodcastInput,
  UpdatePodcastOutput,
} from './dtos/update-podcast.dto';
import { AllEpisodeOutput } from './dtos/all-episode.dto';
import {
  CreateEpisodeInput,
  CreateEpisodeOutput,
} from './dtos/create-episode.dto';
import { Episode } from './entities/episode.entity';
import { EpisodeInput, EpisodeOutput } from './dtos/episode.dto';

@Resolver(() => Podcast)
export class PodcastResolver {
  constructor(private readonly podcastService: PodcastsService) {}

  @Query(() => AllPodcastOutput)
  podcasts(): AllPodcastOutput {
    return this.podcastService.getAllPodcasts();
  }

  @Query(() => PodcastOutput)
  podcast(@Args('data') { podcastId }: PodcastInput): PodcastOutput {
    return this.podcastService.getPodcast(podcastId.toString());
  }

  @Mutation(() => CreatePodcastOutput)
  createPodcast(@Args('data') data: CreatePodcastInput): CreatePodcastOutput {
    return this.podcastService.createPodcast(data);
  }

  @Mutation(() => DeletePodcastOutput)
  deletePodcast(
    @Args('data') { podcastId }: PodcastInput,
  ): DeletePodcastOutput {
    return this.podcastService.deletePodcast(podcastId.toString());
  }

  @Mutation(() => UpdatePodcastOutput)
  updatePodcast(
    @Args('id') podcastId: number,
    @Args('data') data: UpdatePodcastInput,
  ): UpdatePodcastOutput {
    return this.podcastService.updatePodcast(podcastId.toString(), data);
  }
}

@Resolver(() => Episode)
export class EpisodeResolver {
  constructor(private readonly podcastService: PodcastsService) {}

  @Query(() => AllEpisodeOutput)
  episodes(@Args('id') podcastId: number): AllEpisodeOutput {
    return this.podcastService.getEpisodes(podcastId.toString());
  }

  @Query(() => EpisodeOutput)
  episode(@Args('data') { episodeId, podcastId }: EpisodeInput): EpisodeOutput {
    return this.podcastService.findEpisode(
      episodeId.toString(),
      podcastId.toString(),
    );
  }

  @Mutation(() => CreateEpisodeOutput)
  createEpisode(
    @Args('id') podcastId: number,
    @Args('data') data: CreateEpisodeInput,
  ): CreateEpisodeOutput {
    return this.podcastService.createEpisode(podcastId.toString(), data);
  }
}
