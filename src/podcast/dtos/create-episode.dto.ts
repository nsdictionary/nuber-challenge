import { CreatePodcastInput } from './create-podcast.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateEpisodeInput extends CreatePodcastInput {}

@ObjectType()
export class CreateEpisodeOutput {
  @Field(() => Number, { nullable: true })
  episodeId?: number;

  @Field(() => String, { nullable: true })
  err?: string;
}
