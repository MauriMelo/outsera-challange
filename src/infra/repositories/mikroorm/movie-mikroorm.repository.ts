import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager, EntityRepository, FilterQuery } from "@mikro-orm/sqlite";
import Movie from "src/domain/entities/movie.entity";
import { MovieModel } from './entities/movie.model';
import { MovieRepository, SearchParams } from "src/ports/movie.repository";
import { ProducerModel } from "./entities/producer.model";
import { Injectable } from "@nestjs/common";
import Producer from "src/domain/entities/producer.entity";

@Injectable()
export default class MovieMikroORMRepository implements MovieRepository {
	constructor(
		private readonly em: EntityManager,

		@InjectRepository(MovieModel)
		private readonly movieRepository: EntityRepository<MovieModel>,

		@InjectRepository(ProducerModel)
		private readonly producerRepository: EntityRepository<ProducerModel>
	) {

	}

	async moviesOrderByYear(params: SearchParams = {}): Promise<Movie[]> {
		const where = this.makeWhereFilterParams(params)

		const movies = await this.movieRepository.find(where, {
			populate: ['producers'],
			orderBy: {
				year: 'ASC'
			}
		})

		return movies.map(movie => new Movie({
			title: movie.title,
			studios: movie.studios,
			winner: movie.winner,
			year: movie.year,
			producers: movie.producers.map(producer => new Producer(
				{
					name: producer.name
				}, producer.id
			))
		}, movie.id))
	}

	async createMany(movies: Movie[]) {
		for (const movie of movies) {
			const movieModel = this.movieRepository.create({
				year: movie.year,
				title: movie.title,
				studios: movie.studios,
				winner: movie.winner
			})

			for (const producer of movie.producers) {
				let producerModel = await this.producerRepository.findOne({
					name: producer.name
				})

				if (!producerModel) {
					producerModel = this.producerRepository.create({
						name: producer.name
					})
				}

				movieModel.producers.add(producerModel)
			}

			await this.em.persistAndFlush(movieModel);
		}

		return movies
	}

	private makeWhereFilterParams(params: SearchParams = {}) {
		const where: FilterQuery<MovieModel> = {}

		if (params.title) {
			where.title = {
				$like: `%${params.title}%`
			}
		}

		if (params.year) {
			where.year = params.year
		}

		if (params.winner !== undefined) {
			where.winner = params.winner
		}

		if (params.studios) {
			where.studios = {
				$like: `%${params.studios}%`
			}
		}

		if (params.producer) {
			where.producers =  {
				name: params.producer
			}
		}

		return where;
	}
}