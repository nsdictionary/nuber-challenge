import { Field, ObjectType } from '@nestjs/graphql';
import { Episode } from '../entities/episode.entity';

@ObjectType()
export class AllEpisodeOutput {
  @Field(() => [Episode])
  episodes: Episode[];

  @Field(() => String, { nullable: true })
  err?: string;
}
