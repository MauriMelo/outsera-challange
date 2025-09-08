import { Injectable } from '@nestjs/common';
import Movie from '../entities/movie.entity';
import { ProducerAwardInterval } from '../entities/producer-award-interval.entity';

@Injectable()
export default class ProducerAwardsService {
  public getMinAndMaxAwardInterval(movies: Movie[]) {
    const producers = new Map<string, ProducerAwardInterval>();
    let min: ProducerAwardInterval[] = [],
      max: ProducerAwardInterval[] = [];

    for (const movie of movies) {
      for (const producer of movie.producers) {
        const producerMap = producers.get(producer.name);
        if (!producerMap) {
          producers.set(
            producer.name,
            new ProducerAwardInterval({
              producer: producer.name,
              previousWin: movie.year,
            }),
          );

          continue;
        }

        if (!producerMap.followingWin) {
          producerMap.followingWin = movie.year;
        } else {
          producerMap.previousWin = producerMap.followingWin;
          producerMap.followingWin = movie.year;
        }

        producerMap.interval =
          producerMap.followingWin - producerMap.previousWin;

        min = this.setMinInterval(min, producerMap);
        max = this.setMaxInterval(max, producerMap);
      }
    }

    return { min, max };
  }

  private setMinInterval(
    min: ProducerAwardInterval[],
    producerInterval: ProducerAwardInterval,
  ) {
    if (!min.length) {
      min.push(producerInterval.clone());
      return min;
    }

    const interval = min[0].interval || 0;
    const producer = min[0].producer;

    if (producerInterval.interval && producerInterval.interval < interval) {
      min = [producerInterval.clone()];
    } else if (
      producer !== producerInterval.producer &&
      producerInterval.interval === interval
    ) {
      min.push(producerInterval.clone());
    }

    return min;
  }

  private setMaxInterval(
    max: ProducerAwardInterval[],
    producerInterval: ProducerAwardInterval,
  ) {
    if (!max.length) {
      max.push(producerInterval.clone());
      return max;
    }

    const interval = max[0].interval || 0;
    const producer = max[0].producer;
    if (producerInterval.interval && producerInterval.interval > interval) {
      max = [producerInterval.clone()];
    } else if (
      producer !== producerInterval.producer &&
      producerInterval.interval === interval
    ) {
      max.push(producerInterval.clone());
    }

    return max;
  }
}
