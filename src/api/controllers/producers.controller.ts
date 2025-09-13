import {
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import ProducerAwardsUseCase from 'src/domain/use-cases/producer-awards.use-case';

@Controller('producers')
export class ProducersController {
  private readonly logger = new Logger(ProducersController.name);
  constructor(private readonly producerAwardsUseCase: ProducerAwardsUseCase) {}

  @Get('awards-interval')
  async index() {
    try {
      return await this.producerAwardsUseCase.execute();
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error('Erro ao buscar prêmios consecutivos', error.stack);
        throw new InternalServerErrorException(
          'Erro ao buscar prêmios consecutivos',
        );
      }

      throw error;
    }
  }
}
