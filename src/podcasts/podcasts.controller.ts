import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('podcasts')
export class PodcastsController {
  @Get()
  getAll(): string {
    return 'This will return all podcasts';
  }

  @Post()
  create(): string {
    return 'This will create a podcast';
  }

  @Get('/:id')
  getOne(@Param('id') podcastId: string): string {
    return `This will return one podcast with the id: ${podcastId}`;
  }

  @Patch('/:id')
  patch(@Param('id') podcastId: string): string {
    return `This will patch a podcast with the id: ${podcastId}`;
  }

  @Delete('/:id')
  remove(@Param('id') podcastId: string): string {
    return `This will delete a podcast with the id: ${podcastId}`;
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
