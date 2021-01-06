import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class DeletePodcastInput {
  @Field(() => Number)
  podcastId: number;
}

@ObjectType()
export class DeletePodcastOutput {
  @Field(() => String, { nullable: true })
  err?: string;
}
