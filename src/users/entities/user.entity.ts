import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  dob: string;

  @Column()
  preferences: Array<string>;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
