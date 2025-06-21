import { IsEnum, IsNumber, IsString } from "class-validator";
const verbTypeList: string[] = [
  'v1',     // nguyên mẫu (base)
  'v2',     // quá khứ đơn (past)
  'v3',     // quá khứ phân từ (past participle)
  'ving',   // hiện tại phân từ (present participle)
  'v-s',    // ngôi thứ 3 số ít (third person)
  'to-v',   // động từ nguyên thể có "to"
  'gerund'  // danh động từ (v-ing làm danh từ)
];
export class CreateRelatedVerbDto {

    @IsNumber()
    word_id: number;

    @IsEnum(verbTypeList)
    verb_type: string;

    @IsString()
    related_verb: string;

}
