import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreatePodcastInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  category: string;
}

@ObjectType()
export class CreatePodcastOutput {
  @Field(() => Number)
  id: number;

  @Field(() => String, { nullable: true })
  err?: string;
}
