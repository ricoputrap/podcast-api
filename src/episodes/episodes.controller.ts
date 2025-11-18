import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Patch,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';

interface IEpisode {
  id: number;
  title: string;
  featured: boolean;
}

const episodes: IEpisode[] = [
  { id: 1, title: 'Learning Nest JS', featured: false },
  { id: 2, title: 'Advanced Nest JS', featured: true },
  { id: 3, title: 'Nest JS in Production', featured: true },
  { id: 4, title: 'Testing Nest JS Applications', featured: false },
];

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
    const episode = episodes.find((ep) => ep.id == Number(id));
    return { data: episode };
  }

  @Get('featured')
  findFeatured() {
    const featuredEpisodes = episodes.filter((ep) => ep.featured);
    return { data: featuredEpisodes };
  }

  @Post()
  create(@Body() episodeData: Omit<IEpisode, 'id'>) {
    const newEpisode: IEpisode = {
      id: episodes.length + 1,
      ...episodeData,
    };
    episodes.push(newEpisode);
    return { message: 'Episode created', data: newEpisode };
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() episodeData: Partial<Omit<IEpisode, 'id'>>,
  ) {
    const episodeIndex = episodes.findIndex((ep) => ep.id == Number(id));
    if (episodeIndex === -1) {
      throw new NotFoundException('Episode not found');
    }
    const updatedEpisode = {
      ...episodes[episodeIndex],
      ...episodeData,
    };
    episodes[episodeIndex] = updatedEpisode;
    return { message: 'Episode updated', data: updatedEpisode };
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    const episodeIndex = episodes.findIndex((ep) => ep.id == Number(id));
    if (episodeIndex === -1) {
      throw new NotFoundException('Episode not found');
    }
    episodes.splice(episodeIndex, 1);
    return { message: 'Episode deleted' };
  }
}
