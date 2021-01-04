import { Controller, Get } from "@nestjs/common";

@Controller('podcasts')
export class PodcastsController {

  @Get()
  getHello(): string {
    return 'Hello';
  }
}
