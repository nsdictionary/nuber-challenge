import { Field, ObjectType } from '@nestjs/graphql';
import { Podcast } from '../entities/podcast.entity';

@ObjectType()
export class AllPodcastOutput {
  @Field(() => [Podcast])
  podcasts: Podcast[];

  @Field(() => String, { nullable: true })
  err?: string;
}
