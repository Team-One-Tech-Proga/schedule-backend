import { Test, TestingModule } from '@nestjs/testing';
import { SubjectsService } from './subjects.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('SubjectsService', () => {
  let service: SubjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubjectsService],
      imports: [PrismaModule],
    }).compile();

    service = module.get<SubjectsService>(SubjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
