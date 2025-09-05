import { Inject, Injectable } from "@nestjs/common";
import { type MovieRepository } from "src/ports/movie.repository";
import ProducerAwardsService from "../services/producer-awards.service";

@Injectable()
export default class ProducerAwardsUseCase {
  constructor(
    @Inject("MovieRepository")
    private readonly movieRepository: MovieRepository,
    private readonly producerAwardsService: ProducerAwardsService
  ) { }

  async execute () {
    const movies = await this.movieRepository.moviesOrderByYear({
			winner: true
		})

    return this.producerAwardsService.getMinAndMaxAwardInterval(movies);
  }
}