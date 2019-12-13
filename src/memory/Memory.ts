import Bus from "../components/Bus";
import Register from "../components/Register";
import Cell from "./Cell";
import { Decoder4x16, Decoder8x256 } from "../components/Decoders";
import { And } from "../circuit/Gates";
import { binToBool } from "../utils/binUtils";

class Memory256B {
  private addressRegister = new Register(this.inputBus, this.outputBus, "MAR");
  private address = [0, 0];
  private decoderCol = new Decoder4x16();
  private decoderRow = new Decoder4x16();
  private memory: Cell[][] = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
  ];

  // flags
  private enable: boolean = false;
  private set: boolean = false;

  constructor(private inputBus: Bus, private outputBus: Bus) {
    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 16; j++) {
        this.memory[i][j] = new Cell(this.inputBus, this.outputBus);
      }
    }
    this.addressRegister.enable();
  }
  public updateEnable = (enable: boolean) => {
    this.enable = enable;
  };

  public updateSet = (set: boolean) => {
    this.set = set;
  };

  updateAddress = () => {
    this.addressRegister.set();
    this.addressRegister.update();
    this.addressRegister.unSet();
  };
  update = (set?: boolean, enable?: boolean) => {
    if (enable !== undefined) {
      this.enable = enable;
    }
    if (set !== undefined) {
      this.set = set;
    }

    const address = this.addressRegister.output;
    this.decoderRow.update(address[0], address[1], address[2], address[3]);

    this.decoderCol.update(address[4], address[5], address[6], address[7]);
    // this.decoderCol.update(false, false, true, false);

    this.address[0] = this.decoderRow.index;
    this.address[1] = this.decoderCol.index;
    this.memory[this.address[0]][this.address[1]].update(this.set, this.enable);
  };

  readMem = (row: number, col: number) => {
    return this.memory[row][col].read();
  };

  setMem = (row: number, col: number, byte: number | string) => {
    this.memory[row][col].setCell(byte);
  };
  setBus = () => {
    const address = this.addressRegister.output;
    this.decoderRow.update(address[0], address[1], address[2], address[3]);
    this.decoderCol.update(address[4], address[5], address[6], address[7]);

    this.address[0] = this.decoderRow.index;
    this.address[1] = this.decoderCol.index;

    this.outputBus.data = [
      ...this.memory[this.address[0]][this.address[1]].read()
    ];
  };
  getAddress = () => {
    return this.addressRegister.readByte();
  };
}
export default Memory256B;
