import { Episode } from './episode.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';

@ObjectType()
export class Podcast {
  @Field(() => Number)
  @IsNumber()
  id: number;
  @Field(() => String)
  @IsString()
  title: string;
  @Field(() => String)
  @IsString()
  category: string;
  @Field(() => Number)
  @IsNumber()
  rating: number;
  @Field(() => [Episode])
  episodes: Episode[];
}
