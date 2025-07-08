import { Test, TestingModule } from '@nestjs/testing';
import { CateCourseMobileController } from './cate_course_mobile.controller';
import { CateCourseMobileService } from './cate_course_mobile.service';

describe('CateCourseMobileController', () => {
  let controller: CateCourseMobileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CateCourseMobileController],
      providers: [CateCourseMobileService],
    }).compile();

    controller = module.get<CateCourseMobileController>(CateCourseMobileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
