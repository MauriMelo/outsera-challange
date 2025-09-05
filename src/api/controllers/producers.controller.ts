import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import ProducerAwardsUseCase from 'src/domain/use-cases/producer-awards.use-case';

@Controller('producers')
export class ProducersController {
  constructor(
    private readonly producerAwardsUseCase: ProducerAwardsUseCase
  ) {}

  @Get('awards-interval')
  async index() {
    try {
      return await this.producerAwardsUseCase.execute()
    } catch(err) {
      console.log(err);
      throw new InternalServerErrorException('Não foi buscar prêmios consecutivos')
    }
  }
}
