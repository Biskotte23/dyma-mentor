import { Test, TestingModule } from '@nestjs/testing';
import { LevelController } from './level.controller';
import { LevelService } from './level.service';

describe('LevelController', () => {
  let controller: LevelController;
  const service = {
    createLevel: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LevelController],
      providers: [LevelService],
    })
      .overrideProvider(LevelService)
      .useValue(service)
      .compile();

    controller = module.get<LevelController>(LevelController);
  });

  it('Should create a new level', async () => {
    const spy = jest.spyOn(service, 'createLevel').mockImplementation(() => ({
      id: 1,
      name: 'test-level',
    }));
    const result = await controller.createLevel({
      name: 'test-level',
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      name: 'test-level',
    });
    expect(result).toStrictEqual({
      id: 1,
      name: 'test-level',
    });
  });
});
