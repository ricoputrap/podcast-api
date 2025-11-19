import { Test, TestingModule, } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

describe('EpisodesController', () => {
  let controller: EpisodesController;

  const mockFindOne = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [EpisodesController],
      providers: [EpisodesService, ConfigService],
    }).compile();

    controller = module.get<EpisodesController>(EpisodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    describe('when episode is not found', () => {
      const id = '999';

      beforeEach(() => {
        mockFindOne.mockResolvedValue(null);
      });

      it('should throw an error', async () => {
        await expect(controller.findOne(id)).rejects.toThrow(
          'Episode not found',
        );
      });
    });
  });
});
