import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Preference {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  constructor(partial: Partial<Preference>) {
    Object.assign(this, partial);
  }
}
