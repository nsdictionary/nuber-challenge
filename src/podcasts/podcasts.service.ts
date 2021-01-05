import {
  Delete,
  Get,
  Injectable,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Podcast } from './entities/podcast.entity';
import Episode from './entities/episode.entity';

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [];

  getAll(): Podcast[] {
    return this.podcasts;
  }

  getOne(id: number): Podcast {
    const podcast = this.podcasts.find((podcast) => podcast.id === id);
    if (!podcast) {
      throw new NotFoundException(`Podcast with ID ${id} not found.`);
    }
    return podcast;
  }

  deleteOne(id: number): void {
    this.getOne(id);
    this.podcasts = this.podcasts.filter((podcast) => podcast.id !== id);
  }

  create(data): void {
    this.podcasts.push({
      id: this.podcasts.length + 1,
      ...data,
    });
  }

  update(id: number, data): void {
    const podcast = this.getOne(id);
    this.deleteOne(id);
    this.podcasts.push({ ...podcast, ...data });
  }

  getEpisodes(podcastId: number): Episode[] {
    const podcast = this.getOne(podcastId);
    return podcast.episodes ? podcast.episodes : [];
  }

  createEpisode(podcastId: number, data): void {
    const podcast = this.getOne(podcastId);
    data.podcast_id = podcastId;

    const prevEpisodes = podcast.episodes ? podcast.episodes : [];

    this.update(podcastId, {
      episodes: [...prevEpisodes, data],
    });
  }

  // patchEpisode(
  //   @Param('id') podcastId: string,
  //   @Param('episodeId') episodeId: string,
  // ): string {
  //   return 'This will patch a episode';
  // }
  //
  // deleteEpisode(
  //   @Param('id') podcastId: string,
  //   @Param('episodeId') episodeId: string,
  // ): string {
  //   return 'This will delete a episode';
  // }
}
