import { Test, TestingModule } from '@nestjs/testing';
import { CateCourseMobileService } from './cate_course_mobile.service';

describe('CateCourseMobileService', () => {
  let service: CateCourseMobileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CateCourseMobileService],
    }).compile();

    service = module.get<CateCourseMobileService>(CateCourseMobileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
