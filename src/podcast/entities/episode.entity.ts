import { Field, Int, ObjectType } from '@nestjs/graphql';

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
