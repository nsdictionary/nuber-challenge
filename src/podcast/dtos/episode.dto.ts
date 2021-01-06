import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Podcast } from '../entities/podcast.entity';
import { Episode } from '../entities/episode.entity';

@InputType()
export class EpisodeInput {
  @Field(() => Number)
  episodeId: number;

  @Field(() => Number)
  podcastId: number;
}

@ObjectType()
export class EpisodeOutput {
  @Field(() => Episode, { nullable: true })
  episode?: Episode;

  @Field(() => String, { nullable: true })
  err?: string;
}
