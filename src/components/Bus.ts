class Bus {
  private data: boolean[] = new Array(this.width).fill(false);

  constructor(public width: number) {}
  get = () => {
    return this.data;
  };
  update = (input: boolean[]) => {
    this.data = input;
  };
}

export default Bus;
