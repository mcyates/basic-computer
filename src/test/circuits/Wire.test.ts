import Wire from "../../circuit/Wire";

describe("Wire", () => {
  it("should be initialized with correct values", () => {
    const val = true;
    const wire = new Wire("o");
    expect(wire.name).toEqual("o");
    expect(wire.get()).toEqual(false);
  });
  it("should let you set the value", () => {
    const wire = new Wire("o");
    expect(wire.get()).toEqual(false);
    wire.set(true);
    expect(wire.get()).toEqual(true);
  });
});
