import { PartialType } from '@nestjs/swagger';
import { CreateTopicUserDto } from './create-topic_user.dto';

export class UpdateTopicUserDto extends PartialType(CreateTopicUserDto) {}
