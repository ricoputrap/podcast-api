import { Injectable, NotFoundException } from '@nestjs/common';
import { Episode } from './entity/episode.entity';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class EpisodesService {
  private episodes: Episode[] = [
    { id: '1', title: 'Episode 1', featured: true },
    { id: '2', title: 'Episode 2', featured: false },
    { id: '3', title: 'Episode 3', featured: true },
    { id: '4', title: 'Episode 4', featured: false },
  ];

  async findAll(sort: 'asc' | 'desc' = 'asc'): Promise<Episode[]> {
    // TODO remove this mock delay in real implementation
    await new Promise((resolve) => setTimeout(resolve, 10));

    const sortAsc = (a: Episode, b: Episode) => a.title.localeCompare(b.title);
    const sortDesc = (a: Episode, b: Episode) => b.title.localeCompare(a.title);

    return sort === 'asc'
      ? this.episodes.sort(sortAsc)
      : this.episodes.sort(sortDesc);
  }

  async findOne(id: string): Promise<Episode | undefined> {
    // TODO remove this mock delay in real implementation
    await new Promise((resolve) => setTimeout(resolve, 10));
    return this.episodes.find((ep) => ep.id === id);
  }

  async findFeatured(): Promise<Episode[]> {
    // TODO remove this mock delay in real implementation
    await new Promise((resolve) => setTimeout(resolve, 10));
    return this.episodes.filter((ep) => ep.featured);
  }

  async create(createEpisodeDto: CreateEpisodeDto): Promise<Episode> {
    // TODO remove this mock delay in real implementation
    await new Promise((resolve) => setTimeout(resolve, 10));

    const newEpisode: Episode = {
      id: randomUUID(),
      ...createEpisodeDto,
    };
    this.episodes.push(newEpisode);
    return newEpisode;
  }

  async update(
    id: string,
    updateData: Partial<CreateEpisodeDto>,
  ): Promise<Episode | undefined> {
    // TODO remove this mock delay in real implementation
    await new Promise((resolve) => setTimeout(resolve, 10));

    const episodeIndex = this.episodes.findIndex((ep) => ep.id === id);
    if (episodeIndex === -1) {
      throw new NotFoundException('Episode not found');
    }
    const updatedEpisode = {
      ...this.episodes[episodeIndex],
      ...updateData,
    };
    this.episodes[episodeIndex] = updatedEpisode;
    return updatedEpisode;
  }

  async delete(id: string): Promise<boolean> {
    // TODO remove this mock delay in real implementation
    await new Promise((resolve) => setTimeout(resolve, 10));

    const episodeIndex = this.episodes.findIndex((ep) => ep.id === id);
    if (episodeIndex === -1) {
      throw new NotFoundException('Episode not found');
    }
    this.episodes.splice(episodeIndex, 1);
    return true;
  }
}
