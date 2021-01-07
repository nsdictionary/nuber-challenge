import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreatePodcastDto {
  @Field(() => String)
  @IsString()
  readonly title: string;

  @Field(() => String)
  @IsString()
  readonly category: string;
}
