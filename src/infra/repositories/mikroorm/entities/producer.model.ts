import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { MovieModel } from './movie.model';

@Entity({ tableName: 'producers' })
export class ProducerModel {
  @PrimaryKey()
  @Property({ autoincrement: true })
  id: number;

  @Property()
  name: string;

  @ManyToMany(() => MovieModel, undefined, {
    pivotTable: 'movie_producer',
    joinColumn: 'producer_id',
    inverseJoinColumn: 'movie_id',
  })
  movies = new Collection<MovieModel>(this);
}
