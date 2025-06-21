import { Word } from "src/word/entities/word.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
const verbTypeList: string[] = [
  'v1',     // nguyên mẫu (base)
  'v2',     // quá khứ đơn (past)
  'v3',     // quá khứ phân từ (past participle)
  'ving',   // hiện tại phân từ (present participle)
  'v-s',    // ngôi thứ 3 số ít (third person)
  'to-v',   // động từ nguyên thể có "to"
  'gerund'  // danh động từ (v-ing làm danh từ)
];

@Entity()
export class RelatedVerb {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'enum', enum: verbTypeList})
    verb_type: string;

    @Column()
    related_verb: string;

    @ManyToOne(()=>Word,(word)=>word.related_verbs)
    word: Word;
}
