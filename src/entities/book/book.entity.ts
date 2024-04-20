
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
//Entities
import { Collection } from '../collection/collection.entity'

enum ReadStatus {
  NOT_READ = 'not_read',
  READING = 'reading',
  READ = 'read'
}

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('json', { nullable: true })
  authors: string[];

  @Column({ nullable: true })
  publishedYear: number;

  @Column({ length: 1000, nullable: true })
  description: string;

  @Column({ nullable: true })
  edition: string;

  @Column({ nullable: true })
  isbn: string;

  @Column({ nullable: true })
  pageCount: number;

  @Column('json', { nullable: true })
  categories: string[];

  @Column({
    type: 'enum',
    enum: ['not_read', 'reading', 'read'],
    default: 'not_read'
  })
  read: ReadStatus;

  @ManyToOne(() => Collection, collection => collection.books)
  collection: Collection;
}