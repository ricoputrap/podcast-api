import { Controller, Get, Post, Body } from '@nestjs/common';

interface IEpisode {
  id: number;
  title: string;
  featured: boolean;
}

const episodes: IEpisode[] = [
  { id: 1, title: 'First Episode', featured: false },
];

@Controller('episodes')
export class EpisodesController {
  @Get()
  findAll() {
    return JSON.stringify({ data: episodes });
  }

  @Get('featured')
  findFeatured() {
    const featuredEpisodes = episodes.filter((ep) => ep.featured);
    return JSON.stringify({ data: featuredEpisodes });
  }

  @Post()
  create(@Body() episodeData: Omit<IEpisode, 'id'>) {
    const newEpisode: IEpisode = {
      id: episodes.length + 1,
      ...episodeData,
    }
    episodes.push(newEpisode);
    return JSON.stringify({ message: 'Episode created', data: newEpisode });
  }
}
