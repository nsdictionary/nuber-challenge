import { Injectable } from '@nestjs/common';
import {
  CreateEpisodeInput,
  CreateEpisodeOutput,
} from './dtos/create-episode.dto';
import {
  CreatePodcastInput,
  CreatePodcastOutput,
} from './dtos/create-podcast.dto';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';
import {
  UpdatePodcastInput,
  UpdatePodcastOutput,
} from './dtos/update-podcast.dto';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { AllPodcastOutput } from './dtos/all-podcast.dto';
import { PodcastOutput } from './dtos/podcast.dto';
import { DeletePodcastOutput } from './dtos/delete-podcast.dto';
import { AllEpisodeOutput } from './dtos/all-episode.dto';

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [];

  getAllPodcasts(): AllPodcastOutput {
    return { podcasts: this.podcasts, err: null };
  }

  createPodcast({ title, category }: CreatePodcastInput): CreatePodcastOutput {
    const id = Date.now();
    this.podcasts.push({ id, title, category, rating: 0, episodes: [] });
    return { id, err: null };
  }

  getPodcast(id: string): PodcastOutput {
    const foundPodcasts = this.podcasts.filter((podcast) => podcast.id === +id);
    if (foundPodcasts.length === 0) {
      return { podcast: null, err: 'Podcast not found.' };
    }
    if (foundPodcasts.length === 1) {
      return { podcast: foundPodcasts[0], err: null };
    }
    if (foundPodcasts.length > 2) {
      return { podcast: null, err: 'More than one items with same id.' };
    }
  }

  deletePodcast(id: string): DeletePodcastOutput {
    this.podcasts = this.podcasts.filter((p) => p.id !== +id);
    return { err: null };
  }

  updatePodcast(
    id: string,
    updatePodcastDto: UpdatePodcastInput,
  ): UpdatePodcastOutput {
    const { podcast, err: findErr } = this.getPodcast(id);
    if (findErr) {
      return { err: findErr };
    }
    const { err: deleteErr } = this.deletePodcast(id);
    if (deleteErr) {
      return { err: deleteErr };
    }
    this.podcasts.push({ ...podcast, ...updatePodcastDto });
    return { err: null };
  }

  getEpisodes(podcastId: string): AllEpisodeOutput {
    const { podcast, err } = this.getPodcast(podcastId);
    if (err) {
      return { episodes: null, err };
    }
    return { episodes: podcast.episodes, err: null };
  }

  createEpisode(
    podcastId: string,
    { title, category }: CreateEpisodeInput,
  ): CreateEpisodeOutput {
    const { podcast, err: findErr } = this.getPodcast(podcastId);
    if (findErr) {
      return { episodeId: null, err: findErr };
    }
    const episodeId = Date.now();
    const newEpisode: Episode = { id: episodeId, title, category, rating: 0 };
    const { err } = this.updatePodcast(podcastId, {
      ...podcast,
      episodes: [...podcast.episodes, newEpisode],
    });
    if (err) {
      return { episodeId: null, err };
    }
    return { episodeId, err: null };
  }

  deleteEpisode(podcastId: string, episodeId: string): { err: string | null } {
    const { podcast, err: findErr } = this.getPodcast(podcastId);
    if (findErr) {
      return { err: findErr };
    }
    const { err } = this.updatePodcast(podcastId, {
      episodes: podcast.episodes.filter((episode) => episode.id !== +episodeId),
    });
    if (err) {
      return { err };
    }
    return { err: null };
  }

  findEpisode(
    podcastId: string,
    episodeId: string,
  ): { episode: Episode | null; err: string | null } {
    const { episodes, err: findErr } = this.getEpisodes(podcastId);
    if (findErr) {
      return { episode: null, err: findErr };
    }
    const episode = episodes.find((episode) => episode.id === +episodeId);
    if (!episode) {
      return { episode: null, err: 'Episode not found' };
    }
    return { episode, err: null };
  }

  updateEpisode(
    podcastId: string,
    episodeId: string,
    updateEpisodeDto: UpdateEpisodeDto,
  ): { err: string | null } {
    const { episode, err: findEpisodeErr } = this.findEpisode(
      podcastId,
      episodeId,
    );
    if (findEpisodeErr) {
      return { err: findEpisodeErr };
    }
    const { err: deleteErr } = this.deleteEpisode(podcastId, episodeId);
    if (deleteErr) {
      return { err: deleteErr };
    }
    const { podcast, err: fundPodcastErr } = this.getPodcast(podcastId);
    if (fundPodcastErr) {
      return { err: fundPodcastErr };
    }
    this.updatePodcast(podcastId, {
      ...podcast,
      episodes: [...podcast.episodes, { ...episode, ...updateEpisodeDto }],
    });
    return { err: null };
  }
}
