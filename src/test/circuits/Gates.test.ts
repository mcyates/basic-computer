import Nand, { And, Not, Or, Xor } from "../../circuit/Gates";

describe("Nand Gate", () => {
  it("should give correct output", () => {
    const nand = new Nand();
    nand.update(false, false);
    expect(nand.get()).toEqual(true);
    nand.update(false, true);
    expect(nand.get()).toEqual(true);
    nand.update(true, false);
    expect(nand.get()).toEqual(true);
    nand.update(true, true);
    expect(nand.get()).toEqual(false);
  });
});

describe("Not Gate", () => {
  it("should give correct output", () => {
    const not = new Not();
    not.update(false);
    expect(not.get()).toEqual(true);
    not.update(true);
    expect(not.get()).toEqual(false);
  });
});
describe("And Gate", () => {
  it("should give correct output", () => {
    const and = new And();
    and.update(false, false);
    expect(and.get()).toEqual(false);
    and.update(false, true);
    expect(and.get()).toEqual(false);
    and.update(true, false);
    expect(and.get()).toEqual(false);
    and.update(true, true);
    expect(and.get()).toEqual(true);
  });
});

describe("Or Gate", () => {
  const or = new Or();
  it("should give correct output", () => {
    or.update(false, false);
    expect(or.get()).toEqual(false);

    or.update(false, true);
    expect(or.get()).toEqual(true);

    or.update(true, false);
    expect(or.get()).toEqual(true);

    or.update(true, true);
    expect(or.get()).toEqual(true);
  });
});

describe("Xor Gate", () => {
  const xor = new Xor();
  it("it should give correct output", () => {
    xor.update(false, false);
    expect(xor.get()).toEqual(false);

    xor.update(false, true);
    expect(xor.get()).toEqual(true);

    xor.update(true, false);
    expect(xor.get()).toEqual(true);

    xor.update(true, true);
    expect(xor.get()).toEqual(false);
  });
});
