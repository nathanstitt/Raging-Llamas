import './number'

test("it returns true for whole numbers", () => {
  let number = 4;
  expect(number.isWhole()).toBe(true);
});

test("it returns false for non whole numbers", () => {
  let number = 4.1;
  expect(number.isWhole()).toBe(false);
});
