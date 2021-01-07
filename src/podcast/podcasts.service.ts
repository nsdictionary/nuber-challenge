import { Injectable } from '@nestjs/common';
import { CreateEpisodeDto } from './dtos/create-episode.dto';
import { CreatePodcastDto } from './dtos/create-podcast.dto';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';
import { UpdatePodcastDto } from './dtos/update-podcast.dto';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { CoreOutput } from './dtos/output.dto';
import {
  PodcastOutput,
  EpisodesOutput,
  EpisodesSearchInput,
  AllPodcastOutput,
} from './dtos/podcast.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { first } from 'rxjs/operators';

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [];

  constructor(
    @InjectRepository(Podcast)
    private readonly podcastRepository: Repository<Podcast>,
    @InjectRepository(Episode)
    private readonly episodeRepository: Repository<Episode>,
  ) {}

  async getAllPodcasts(): Promise<AllPodcastOutput> {
    try {
      const podcasts = await this.podcastRepository.find();
      return { ok: true, podcasts };
    } catch {
      return { ok: false, error: 'Could not load podcasts' };
    }
  }

  async createPodcast({
    title,
    category,
  }: CreatePodcastDto): Promise<CoreOutput> {
    try {
      const newPodcast = await this.podcastRepository.create({
        title,
        category,
      });
      await this.podcastRepository.save(newPodcast);
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async getPodcast(id: number): Promise<PodcastOutput> {
    try {
      const podcast = await this.podcastRepository.findOne(id);
      return { ok: true, podcast };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async deletePodcast(id: number): Promise<CoreOutput> {
    try {
      await this.podcastRepository.delete(id);
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async updatePodcast({ id, ...rest }: UpdatePodcastDto): Promise<CoreOutput> {
    try {
      const podcast = await this.podcastRepository.findOne(id);

      if (!podcast) {
        return { ok: false, error: 'Could not found category' };
      }

      await this.podcastRepository.save({ id, ...rest });
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  getEpisodes(podcastId: number): EpisodesOutput {
    // const { podcast, ok, error } = this.getPodcast(podcastId);
    // if (!ok) {
    //   return { ok, error };
    // }
    return { ok: true };
  }

  createEpisode({
    id: podcastId,
    title,
    category,
  }: CreateEpisodeDto): CoreOutput {
    // const { podcast, ok, error } = this.getPodcast(podcastId);
    // if (!ok) {
    //   return { ok, error };
    // }
    // const newEpisode: Episode = {
    //   id: podcast.episodes.length + 1,
    //   title,
    //   category,
    // };
    // this.updatePodcast({
    //   id: podcastId,
    //   episodes: [...podcast.episodes, newEpisode],
    // });

    return { ok: true };
  }

  deleteEpisode({ podcastId, episodeId }: EpisodesSearchInput): CoreOutput {
    // const { podcast, error, ok } = this.getPodcast(podcastId);
    // if (!ok) {
    //   return { ok, error };
    // }
    // this.updatePodcast({
    //   id: podcastId,
    //   episodes: podcast.episodes.filter((episode) => episode.id !== episodeId),
    // });

    return { ok: true };
  }

  updateEpisode({
    podcastId,
    episodeId,
    ...rest
  }: UpdateEpisodeDto): CoreOutput {
    // const { podcast, error, ok } = this.getPodcast(podcastId);
    // if (!ok) {
    //   return { ok, error };
    // }
    // const episodeIdx = podcast.episodes.findIndex(({ id }) => id === episodeId);
    // const newEpisode = { ...podcast.episodes[episodeIdx], ...rest };
    // this.deleteEpisode({ podcastId, episodeId });
    // const { podcast: changedPodcast } = this.getPodcast(podcastId);
    // this.updatePodcast({
    //   id: podcastId,
    //   episodes: [...changedPodcast.episodes, newEpisode],
    // });
    return { ok: true };
  }
}
