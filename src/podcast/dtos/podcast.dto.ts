import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Podcast } from '../entities/podcast.entity';

@InputType()
export class PodcastInput {
  @Field(() => Number)
  podcastId: number;
}

@ObjectType()
export class PodcastOutput {
  @Field(() => Podcast, { nullable: true })
  podcast?: Podcast;

  @Field(() => String, { nullable: true })
  err?: string;
}
