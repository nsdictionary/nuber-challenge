import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PodcastsService } from './podcasts.service';
import { Podcast } from './entities/podcast.entity';
import Episode from './entities/episode.entity';

@Controller('podcasts')
export class PodcastsController {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Get()
  getAll(): Podcast[] {
    return this.podcastsService.getAll();
  }

  @Post()
  create(@Body() data): void {
    return this.podcastsService.create(data);
  }

  @Get('/:id')
  getOne(@Param('id') podcastId: string): Podcast {
    return this.podcastsService.getOne(+podcastId);
  }

  @Patch('/:id')
  patch(@Param('id') podcastId: string, @Body() data): void {
    return this.podcastsService.update(+podcastId, data);
  }

  @Delete('/:id')
  remove(@Param('id') podcastId: string): void {
    return this.podcastsService.deleteOne(+podcastId);
  }

  @Get('/:id/episodes')
  getEpisodes(@Param('id') podcastId: string): Episode[] {
    return this.podcastsService.getEpisodes(+podcastId);
  }

  @Post('/:id/episodes')
  createEpisode(@Param('id') podcastId: string, @Body() data): void {
    return this.podcastsService.createEpisode(+podcastId, data);
  }

  @Patch('/:id/episodes/:episodeId')
  patchEpisode(
    @Param('id') podcastId: string,
    @Param('episodeId') episodeId: string,
    @Body() data,
  ): void {
    return this.podcastsService.patchEpisode(+podcastId, +episodeId, data);
  }

  @Delete('/:id/episodes/:episodeId')
  deleteEpisode(
    @Param('id') podcastId: string,
    @Param('episodeId') episodeId: string,
  ): void {
    return this.podcastsService.deleteEpisode(+podcastId, +episodeId);
  }
}
