import { Module } from '@nestjs/common';
import { LoadMoviesService } from './infra/services/load_movies.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import MovieMikroORMRepository from './infra/repositories/mikroorm/movie-mikroorm.repository';
import { MovieModel } from './infra/repositories/mikroorm/entities/movie.model';
import { ProducerModel } from './infra/repositories/mikroorm/entities/producer.model';
import ProducerAwardsUseCase from './domain/use-cases/producer-awards.use-case';
import ProducerAwardsService from './domain/services/producer-awards.service';

@Module({
  imports: [MikroOrmModule.forFeature([MovieModel, ProducerModel])],
  providers: [
    {
      provide: 'MovieRepository',
      useClass: MovieMikroORMRepository,
    },
    LoadMoviesService,
    ProducerAwardsUseCase,
    ProducerAwardsService,
  ],
  exports: [
    {
      provide: 'MovieRepository',
      useClass: MovieMikroORMRepository,
    },
    LoadMoviesService,
    ProducerAwardsUseCase,
  ],
})
export class MovieModule {}
