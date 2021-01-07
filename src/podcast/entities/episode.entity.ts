import { InputType, ObjectType, Field } from '@nestjs/graphql';

@InputType('EpisodeInput', { isAbstract: true })
@ObjectType()
export class Episode {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  title: string;
  @Field(() => String)
  category: string;
}
