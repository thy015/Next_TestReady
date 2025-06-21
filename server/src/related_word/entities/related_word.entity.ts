import { Word } from "src/word/entities/word.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RelatedWord {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    related_word: string;

    @Column({ type: 'enum', enum: ['synonym', 'antonym', 'hypernym', 'hyponym', 'meronym', 'holonym'] })
    related_type: string;

    @ManyToOne(() => Word, (word) => word.related_words)
    word: Word;
}
