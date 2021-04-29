import APIError from "../../src/helpers/APIError";
import { isDateValid } from "../../src/helpers/helpers";

describe("Testing helpers", () => {
  it("should return true", () => {
    expect(
      isDateValid(new Date("2020-01-01"), new Date("2020-01-02"))
    ).toBeTruthy();
  });

  it("should throw error", async () => {
    expect(
      isDateValid(new Date("2020-01-02"), new Date("2020-01-01"))
    ).toBeFalsy();
  });
});
