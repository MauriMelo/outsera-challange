import Movie from '../entities/movie.entity';
import Producer from '../entities/producer.entity';
import ProducerAwardsService from './producer-awards.service';

const service = new ProducerAwardsService()

describe('ProducerAwardsService', () => {
  it("should return an empty array when don't have movies to process", () => {
    const producers = service.getMinAndMaxAwardInterval([])
    expect(producers.min).toHaveLength(0)
    expect(producers.max).toHaveLength(0)
  });

  it("should return an empty array when the producer don't have consecutive wins", () => {
    const movies = [
      new Movie(
        {
          title: 'Movie title',
          studios: 'Studio name',
          winner: true,
          year: 2020,
          producers: [
            new Producer({
              name: 'Producer One'
            })
          ]
        }
      )
    ]

    const { min, max } = service.getMinAndMaxAwardInterval(movies);
    expect(min).toHaveLength(0)
    expect(max).toHaveLength(0)
  })

  it("should return the producer with minimum of the year interval wins", () => {
    const movies = [
      new Movie(
        {
          title: 'Movie',
          studios: 'Studio name',
          winner: true,
          year: 2000,
          producers: [
            new Producer({
              name: 'Producer One'
            })
          ]
        }
      ),
      new Movie(
        {
          title: 'Movie',
          studios: 'Studio name',
          winner: true,
          year: 2001,
          producers: [
            new Producer({
              name: 'Producer Two'
            })
          ]
        }
      ),
      new Movie(
        {
          title: 'Movie',
          studios: 'Studio name',
          winner: true,
          year: 2005,
          producers: [
            new Producer({
              name: 'Producer Two'
            })
          ]
        }
      ),
      new Movie(
        {
          title: 'Movie',
          studios: 'Studio name',
          winner: true,
          year: 2005,
          producers: [
            new Producer({
              name: 'Producer One'
            })
          ]
        }
      ),
      new Movie(
        {
          title: 'Movie',
          studios: 'Studio name',
          winner: true,
          year: 2008,
          producers: [
            new Producer({
              name: 'Producer One'
            })
          ]
        }
      ),
      new Movie(
        {
          title: 'Movie',
          studios: 'Studio name',
          winner: true,
          year: 2010,
          producers: [
            new Producer({
              name: 'Producer Two'
            })
          ]
        }
      ),
    ]

    const { min } = service.getMinAndMaxAwardInterval(movies);
    expect(min).toHaveLength(1)
    expect(min[0].toJSON()).toStrictEqual(
      {
        producer: 'Producer One',
        previousWin: 2005,
        followingWin: 2008,
        interval: 3,
      }
    )
  })

  it("should return the producer with maximum of the year interval wins", () => {
    const movies = [
      new Movie(
        {
          title: 'Movie title',
          studios: 'Studio name',
          winner: true,
          year: 2000,
          producers: [
            new Producer({
              name: 'Producer One'
            })
          ]
        }
      ),
      new Movie(
        {
          title: 'Movie title',
          studios: 'Studio name',
          winner: true,
          year: 2002,
          producers: [
            new Producer({
              name: 'Producer One'
            })
          ]
        }
      ),
      new Movie(
        {
          title: 'Movie title',
          studios: 'Studio name',
          winner: true,
          year: 2003,
          producers: [
            new Producer({
              name: 'Producer Two'
            })
          ]
        }
      ),
      new Movie(
        {
          title: 'Movie title',
          studios: 'Studio name',
          winner: true,
          year: 2008,
          producers: [
            new Producer({
              name: 'Producer Two'
            })
          ]
        }
      ),
      new Movie(
        {
          title: 'Movie title',
          studios: 'Studio name',
          winner: true,
          year: 2010,
          producers: [
            new Producer({
              name: 'Producer One'
            })
          ]
        }
      ),
      new Movie(
        {
          title: 'Movie title',
          studios: 'Studio name',
          winner: true,
          year: 2011,
          producers: [
            new Producer({
              name: 'Producer Two'
            })
          ]
        }
      ),
    ]

    const { max } = service.getMinAndMaxAwardInterval(movies);
    expect(max).toHaveLength(1)
    expect(max[0].toJSON()).toStrictEqual(
      {
        producer: 'Producer One',
        previousWin: 2002,
        followingWin: 2010,
        interval: 8,
      }
    )
  })

  it("should return more than 1 minimum of the year interval wins when the minimum interval is equals ", () => {
    const movies = [
      new Movie(
        {
          title: 'Movie title',
          studios: 'Studio name',
          winner: true,
          year: 2000,
          producers: [
            new Producer({
              name: 'Producer One'
            })
          ]
        }
      ),
      new Movie(
        {
          title: 'Movie title',
          studios: 'Studio name',
          winner: true,
          year: 2002,
          producers: [
            new Producer({
              name: 'Producer One'
            })
          ]
        }
      ),
      new Movie(
        {
          title: 'Movie title',
          studios: 'Studio name',
          winner: true,
          year: 2010,
          producers: [
            new Producer({
              name: 'Producer Two'
            })
          ]
        }
      ),
      new Movie(
        {
          title: 'Movie title',
          studios: 'Studio name',
          winner: true,
          year: 2012,
          producers: [
            new Producer({
              name: 'Producer Two'
            })
          ]
        }
      )
    ]

    const { min } = service.getMinAndMaxAwardInterval(movies);
    expect(min).toHaveLength(2)
    expect(min.map((item) => item.toJSON())).toStrictEqual([
      {
        producer: 'Producer One',
        previousWin: 2000,
        followingWin: 2002,
        interval: 2,
      },
      {
        producer: 'Producer Two',
        previousWin: 2010,
        followingWin: 2012,
        interval: 2,
      }
    ]
    )
  })

  it("should return more than 1 maximum of the year interval wins when the maximum interval is equals ", () => {
    const movies = [
      new Movie(
        {
          title: 'Movie title',
          studios: 'Studio name',
          winner: true,
          year: 2000,
          producers: [
            new Producer({
              name: 'Producer One'
            })
          ]
        }
      ),
      new Movie(
        {
          title: 'Movie title',
          studios: 'Studio name',
          winner: true,
          year: 2002,
          producers: [
            new Producer({
              name: 'Producer One'
            })
          ]
        }
      ),
      new Movie(
        {
          title: 'Movie title',
          studios: 'Studio name',
          winner: true,
          year: 2010,
          producers: [
            new Producer({
              name: 'Producer Two'
            })
          ]
        }
      ),
      new Movie(
        {
          title: 'Movie title',
          studios: 'Studio name',
          winner: true,
          year: 2012,
          producers: [
            new Producer({
              name: 'Producer Two'
            })
          ]
        }
      )
    ]

    const { max } = service.getMinAndMaxAwardInterval(movies);
    expect(max).toHaveLength(2)
    expect(max.map((item) => item.toJSON())).toStrictEqual([
      {
        producer: 'Producer One',
        previousWin: 2000,
        followingWin: 2002,
        interval: 2,
      },
      {
        producer: 'Producer Two',
        previousWin: 2010,
        followingWin: 2012,
        interval: 2,
      }
    ]
    )
  })
});
