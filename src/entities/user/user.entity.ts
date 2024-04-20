import { Column, Entity, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';

// Entities
import { BaseEntity } from '../base/base.entity';
import { Collection } from '../collection/collection.entity';

@Entity('user', { orderBy: { id: 'DESC' } })
export class User extends BaseEntity {

  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ length: 100, nullable: false })
  @Unique(['email'])
  email: string;

  @Column({ length: 100, nullable: false, select: false })
  password: string;

  @Column({ length: 255, nullable: false })
  firstName: string;

  @Column({ length: 255, nullable: false })
  lastName: string;

  @Column({ default: false })
  isDeleted: boolean;

  @OneToMany(() => Collection, collection => collection.userId)
  collections: Collection[];

  toJSON() {
    delete this.isDeleted;
    return this;
  }

}
