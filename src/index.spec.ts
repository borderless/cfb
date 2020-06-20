import { build } from "./index";

describe("cfb", () => {
  it("should export a build function", () => {
    expect(build).toBeInstanceOf(Function);
  });
});
