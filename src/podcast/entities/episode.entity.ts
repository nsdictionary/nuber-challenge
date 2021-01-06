import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType('EpisodeInputType', { isAbstract: true })
@ObjectType()
export class Episode {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  category: string;

  @Field(() => Number)
  rating: number;
}
