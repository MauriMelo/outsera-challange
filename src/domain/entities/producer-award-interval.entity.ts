import Entity from "./entity";

type Input = {
  producer: string,
  previousWin: number
  followingWin?: number
  interval?: number
}

export class ProducerAwardInterval extends Entity<Input> {
  constructor(props: Input) {
    super(props)
  }

  get producer() {
    return this.props.producer
  }

  get previousWin() {
    return this.props.previousWin
  }

  get followingWin() {
    return this.props.followingWin
  }

  get interval() {
    return this.props.interval
  }

  set followingWin(value: number | undefined) {
    this.props.followingWin = value
  }

  set interval(value: number | undefined) {
    this.props.interval = value
  }

  set previousWin(value: number) {
    this.props.previousWin = value
  }

  clone() {
    return new ProducerAwardInterval({ ...this.props })
  }
}