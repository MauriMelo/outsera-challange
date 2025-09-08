export default class Entity<T> {
  constructor(
    protected readonly props: T,
    protected readonly id?: number,
  ) {}

  toJSON() {
    const props = { ...this.props } as { [key: string]: unknown };
    if (this.id) {
      props.id = this.id;
    }
    return props;
  }
}
