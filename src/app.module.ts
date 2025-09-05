import { Module, OnModuleInit } from '@nestjs/common';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MovieModule } from './movie.module';
import { ProducersController } from './api/controllers/producers.controller';
import { LoadMoviesService } from './infra/services/load_movies.service';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: ['./dist/infra/repositories/mikroorm/entities'],
      entitiesTs: ['./src/infra/repositories/mikroorm/entities'],
      dbName: ':memory:',
      driver: SqliteDriver,
      allowGlobalContext: true
    }),
    MovieModule
  ],
  controllers: [ProducersController],
})
export class AppModule implements OnModuleInit{
  constructor(
    private readonly loadMoviesService: LoadMoviesService
  ) {

  }
  async onModuleInit() {
    await this.loadMoviesService.execute()
  }
}
