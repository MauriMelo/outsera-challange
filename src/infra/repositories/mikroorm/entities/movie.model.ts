import { Collection, Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { ProducerModel } from "./producer.model";

@Entity({ tableName: 'movies' })
export class MovieModel {
	@PrimaryKey()
	@Property({ autoincrement: true })
	id: number;

	@Property()
	title: string

	@Property()
	year: number

	@Property()
	studios: string

	@Property()
	winner: boolean

	@ManyToMany(() => ProducerModel, undefined, { 
		pivotTable: 'movie_producer',
		joinColumn: 'movie_id',
		inverseJoinColumn: 'producer_id'
	})
	producers = new Collection<ProducerModel>(this);
}