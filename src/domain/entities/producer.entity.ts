import Entity from './entity';

interface Props {
  name: string;
}

export default class Producer extends Entity<Props> {
  constructor(props: Props, id?: number) {
    super(props, id);
  }

  get name() {
    return this.props.name;
  }
}
