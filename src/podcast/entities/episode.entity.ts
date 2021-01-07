import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Podcast } from './podcast.entity';

@InputType('EpisodeInput', { isAbstract: true })
@ObjectType()
@Entity()
export class Episode {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  category: string;

  @Field(() => Podcast)
  @ManyToOne(() => Podcast, (podcast) => podcast.episodes, {
    onDelete: 'CASCADE',
  })
  podcast: Podcast;
}
