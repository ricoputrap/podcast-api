import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';

interface IEpisode {
  id: number;
  title: string;
  featured: boolean;
}

@Controller('episodes')
export class EpisodesController {
  constructor(private episodesService: EpisodesService) {}

  @Get()
  async findAll(@Query('sort') sort: 'asc' | 'desc' = 'asc') {
    const sortedEpisodes = await this.episodesService.findAll(sort);
    return { data: sortedEpisodes };
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log('Fetching episode with id:', id);
    const episode = this.episodesService.findOne(id.toString());
    return { data: episode };
  }

  @Get('featured')
  async findFeatured() {
    const featuredEpisodes = await this.episodesService.findFeatured();
    return { data: featuredEpisodes };
  }

  @Post()
  async create(@Body() episodeData: Omit<IEpisode, 'id'>) {
    const newEpisode = await this.episodesService.create(episodeData);
    return { message: 'Episode created', data: newEpisode };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() episodeData: Partial<Omit<IEpisode, 'id'>>,
  ) {
    const updatedEpisode = await this.episodesService.update(id, episodeData);
    return { message: 'Episode updated', data: updatedEpisode };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.episodesService.delete(id);
    return { message: 'Episode deleted' };
  }
}
