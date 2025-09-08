import Entity from './entity';
import Producer from './producer.entity';

interface Props {
  title: string;
  year: number;
  studios: string;
  winner: boolean;
  producers: Producer[];
}

export default class Movie extends Entity<Props> {
  constructor(props: Props, id?: number) {
    super(props, id);
  }

  get year() {
    return this.props.year;
  }

  get studios() {
    return this.props.studios;
  }

  get winner() {
    return this.props.winner;
  }

  get producers() {
    return this.props.producers;
  }

  get title() {
    return this.props.title;
  }
}
