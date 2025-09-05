import { Inject, Injectable } from '@nestjs/common';
import CSVHelper from '../helpers/csv.helper';
import { type MovieRepository } from 'src/ports/movie.repository';
import Movie from 'src/domain/entities/movie.entity';
import { EntityManager, MikroORM } from '@mikro-orm/sqlite';
import Producer from 'src/domain/entities/producer.entity';

@Injectable()
export class LoadMoviesService {
	constructor(
		private readonly em: EntityManager,
		
		@Inject("MovieRepository")
		private readonly movieRepository: MovieRepository
	) {

	}
	async execute() {
		type Cols = 'year' | 'title' | 'studios' | 'producers' | 'winner';
		const headers: Cols[] = ['year', 'title', 'studios', 'producers', 'winner'];

		const file = CSVHelper.readCsv<Cols>('./data/Movielist.csv', {
			delimiter: ';',
			headers: headers,
		});

		const movies = file.data.map(item => {
			const producers = item.producers
				.replaceAll(' and ', ',')
				.split(',')
				.reduce<Producer[]>((arr, name) => {
					if (name) {
						arr.push(new Producer({
							name: name.trim()
						}))
					}
					return arr
				}, []);
			
			const movie = new Movie({
				year: Number(item.year),
				title: item.title,
				producers,
				studios: item.studios,
				winner: item.winner === 'yes' ? true : false
			})

			return movie;
		})

		await this.em.getConnection().execute(`
			CREATE TABLE movies (id INTEGER PRIMARY KEY, title TEXT, year INTEGER, studios TEXT, producers TEXT, winner INTEGER);
			CREATE TABLE producers (id INTEGER PRIMARY KEY, name TEXT);
			CREATE TABLE movie_producer (movie_id INTEGER, producer_id INTEGER);	
		`)

		await this.em.getConnection().execute(`
			CREATE TABLE producers (id INTEGER PRIMARY KEY, name TEXT);
		`)

		await this.em.getConnection().execute(`
			CREATE TABLE movie_producer (movie_id INTEGER, producer_id INTEGER);	
		`)

		await this.movieRepository.createMany(movies)

	}
}