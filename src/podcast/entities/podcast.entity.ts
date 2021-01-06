import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Episode } from './episode.entity';

@InputType('PodcastInputType', { isAbstract: true })
@ObjectType()
export class Podcast {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  category: string;

  @Field(() => String)
  rating: number;

  @Field(() => [Episode])
  episodes: Episode[];
}
