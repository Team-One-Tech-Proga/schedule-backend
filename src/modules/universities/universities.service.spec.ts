import { Test, TestingModule } from '@nestjs/testing';
import { UniversitiesService } from './universities.service';
import { PrismaModule } from '../../providers/prisma/prisma.module';

describe('UniversitiesService', () => {
  let service: UniversitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniversitiesService],
      imports: [PrismaModule],
    }).compile();

    service = module.get<UniversitiesService>(UniversitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
