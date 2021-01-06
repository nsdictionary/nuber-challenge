import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PodcastsService } from './podcasts.service';
import { Podcast } from './entities/podcast.entity';
import { AllPodcastOutput } from './dtos/all-podcast.dto';
import {
  CreatePodcastDto,
  CreatePodcastOutput,
} from './dtos/create-podcast.dto';
import { PodcastInput, PodcastOutput } from './dtos/podcast.dto';
import { DeletePodcastOutput } from './dtos/delete-podcast.dto';

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
  createPodcast(@Args('data') data: CreatePodcastDto): CreatePodcastOutput {
    return this.podcastService.createPodcast(data);
  }

  @Mutation(() => DeletePodcastOutput)
  deletePodcast(
    @Args('data') { podcastId }: PodcastInput,
  ): DeletePodcastOutput {
    return this.podcastService.deletePodcast(podcastId.toString());
  }
}
