import { RelatedVerb } from "src/related_verb/entities/related_verb.entity";
import { Topic } from "src/topic/entities/topic.entity";
import { WordUser } from "src/word_user/entities/word_user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Word {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    word: string

    @Column({ type: 'json' })
    def: any;

    @Column()
    vie_def: string;

    @Column({ type: 'enum', enum: ['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'interjection'], default: 'noun' })
    part_of_speech: string;

    @Column()
    phonetic: string;

    @Column({ type: 'json' })
    examples: any;

    @Column({ type: 'json' })
    audios: any;

    @Column({ type: 'json' })
    imgs: any;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Topic, (topic) => topic.words)
    topic: Topic;

    @OneToMany(() => RelatedVerb, (relatedVerb) => relatedVerb.word)
    related_verbs: RelatedVerb[];

    @OneToMany(() => RelatedVerb, (relatedVerb) => relatedVerb.word)
    related_words: RelatedVerb[];

    @OneToMany(() => WordUser, (word_user) => word_user.word)
    users: WordUser[]
}
