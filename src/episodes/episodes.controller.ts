import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Patch,
  Delete,
  NotFoundException,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { ConfigService } from '../config/config.service';
import { type CreateEpisodeDto } from './dto/create-episode.dto';

@Controller('episodes')
export class EpisodesController {
  constructor(
    private episodesService: EpisodesService,
    private configService: ConfigService,
  ) {}

  @Get()
  async findAll(
    @Query('sort') sort: 'asc' | 'desc' = 'asc',
    @Query('limit', new DefaultValuePipe(2), ParseIntPipe) limit: number,
  ) {
    const sortedEpisodes = await this.episodesService.findAll(sort, limit);
    return { data: sortedEpisodes };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log('Fetching episode with id:', id);
    const episode = await this.episodesService.findOne(id);
    if (!episode) throw new NotFoundException('Episode not found');

    return { data: episode };
  }

  @Get('featured')
  async findFeatured() {
    const featuredEpisodes = await this.episodesService.findFeatured();
    return { data: featuredEpisodes };
  }

  @Post()
  async create(@Body() episodeData: CreateEpisodeDto) {
    const newEpisode = await this.episodesService.create(episodeData);
    return { message: 'Episode created', data: newEpisode };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() episodeData: Partial<CreateEpisodeDto>,
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
