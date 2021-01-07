import { Episode } from './episode.entity';
import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@InputType('PodcastInput', { isAbstract: true })
@ObjectType()
@Entity()
export class Podcast {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Field(() => String)
  @Column()
  @IsString()
  title: string;

  @Field(() => String)
  @Column()
  @IsString()
  category: string;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  @IsNumber()
  rating?: number;

  @Field(() => [Episode])
  @OneToMany(() => Episode, (episode) => episode.podcast, { eager: true })
  episodes: Episode[];
}
