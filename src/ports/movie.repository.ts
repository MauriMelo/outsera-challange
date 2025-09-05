import Movie from "src/domain/entities/movie.entity";

export interface SearchParams {
	producer?: string
	title?: string
	year?: number
	studios?: string
	winner?: boolean
}

export interface MovieRepository {
  createMany(movies: Movie[]): Promise<Movie[]>
  moviesOrderByYear(params?: SearchParams): Promise<Movie[]>
} 