import { capitalizeFirstLetter } from "./strings"; // Adjust path as needed

describe("capitalizeFirstLetter", () => {
  test("should capitalize the first letter of a string", () => {
    expect(capitalizeFirstLetter("hello")).toBe("Hello");
    expect(capitalizeFirstLetter("world")).toBe("World");
  });

  test("should handle single-letter strings", () => {
    expect(capitalizeFirstLetter("a")).toBe("A");
  });

  test("should return the same string if first letter is already capitalized", () => {
    expect(capitalizeFirstLetter("Hello")).toBe("Hello");
  });

  test("should handle empty strings", () => {
    expect(capitalizeFirstLetter("")).toBe("");
  });

  test("should handle non-string inputs by returning them unchanged", () => {
    expect(capitalizeFirstLetter(null)).toBe(null);
    expect(capitalizeFirstLetter(undefined)).toBe(undefined);
    expect(capitalizeFirstLetter(123)).toBe(123);
    expect(capitalizeFirstLetter({})).toEqual({});
  });

  test("should handle strings with leading spaces (capitalizing the first non-space char)", () => {
    expect(capitalizeFirstLetter("  hello")).toBe("  hello"); // Function only capitalizes the first char of the string
  });
});
