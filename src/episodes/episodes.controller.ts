import { Controller, Get, Post, Body, Query } from '@nestjs/common';

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
  @Get()
  findAll(@Query('sort') sort: 'asc' | 'desc' = 'asc') {
    let sortedEpisodes = [...episodes];
    if (sort === 'desc') {
      sortedEpisodes = sortedEpisodes.sort((a, b) =>
        b.title.localeCompare(a.title),
      );
    } else {
      sortedEpisodes = sortedEpisodes.sort((a, b) =>
        a.title.localeCompare(b.title),
      );
    }

    return { data: sortedEpisodes };
  }

  @Get(':id')
  findOne(@Query('id') id: number) {
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
    }
    episodes.push(newEpisode);
    return { message: 'Episode created', data: newEpisode };
  }
}
