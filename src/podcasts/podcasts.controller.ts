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
  getEpisode(@Param('id') podcastId: string): string {
    return 'This will return episodes';
  }

  @Post('/:id/episodes')
  createEpisode(@Param('id') podcastId: string): string {
    return 'This will create a episode';
  }

  @Patch('/:id/episodes/:episodeId')
  patchEpisode(
    @Param('id') podcastId: string,
    @Param('episodeId') episodeId: string,
  ): string {
    return 'This will patch a episode';
  }

  @Delete('/:id/episodes/:episodeId')
  deleteEpisode(
    @Param('id') podcastId: string,
    @Param('episodeId') episodeId: string,
  ): string {
    return 'This will delete a episode';
  }
}
