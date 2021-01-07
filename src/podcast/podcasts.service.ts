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

@Injectable()
export class PodcastsService {
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
        return { ok: false, error: 'Could not found podcast' };
      }

      await this.podcastRepository.save({ id, ...rest });
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async getEpisodes(podcastId: number): Promise<EpisodesOutput> {
    try {
      const podcast = await this.podcastRepository.findOne(podcastId);

      if (!podcast) {
        return { ok: false, error: 'Could not found podcast' };
      }

      return { ok: true, episodes: podcast.episodes };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async createEpisode({
    id: podcastId,
    title,
    category,
  }: CreateEpisodeDto): Promise<CoreOutput> {
    try {
      const podcast = await this.podcastRepository.findOne(podcastId);

      if (!podcast) {
        return { ok: false, error: 'Could not found podcast' };
      }

      const episode = await this.episodeRepository.create({
        podcast,
        title,
        category,
      });

      await this.episodeRepository.save(episode);

      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }

    return { ok: true };
  }

  async deleteEpisode({
    podcastId,
    episodeId,
  }: EpisodesSearchInput): Promise<CoreOutput> {
    try {
      const podcast = await this.podcastRepository.findOne(podcastId);

      if (!podcast) {
        return { ok: false, error: 'Could not found podcast' };
      }

      const [episode] = podcast.episodes.filter((v) => v.id === episodeId);

      if (!episode) {
        return { ok: false, error: 'Could not found episode' };
      }

      await this.episodeRepository.delete(episode.id);
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async updateEpisode({
    podcastId,
    episodeId,
    ...rest
  }: UpdateEpisodeDto): Promise<CoreOutput> {
    try {
      const podcast = await this.podcastRepository.findOne(podcastId);

      if (!podcast) {
        return { ok: false, error: 'Could not found podcast' };
      }

      const [episode] = podcast.episodes.filter((v) => v.id === episodeId);

      if (!episode) {
        return { ok: false, error: 'Could not found episode' };
      }

      await this.episodeRepository.save([
        {
          id: episode.id,
          ...rest,
        },
      ]);

      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
