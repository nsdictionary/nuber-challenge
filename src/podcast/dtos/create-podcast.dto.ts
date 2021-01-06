import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreatePodcastDto {
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
