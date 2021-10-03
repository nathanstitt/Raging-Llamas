/* eslint-disable no-unused-vars */
import { AdvancedState } from "./AdvancedState";
import { OriginFinder } from "./OriginFinder";

// const autopilot = jest.createMockFromModule("./Autopilot").default;
// autopilot.getPointAtDistanceAlongRadar = jest.fn(() => {
//   40;
// });

let advancedState = new AdvancedState({
  x: 0,
  y: 0,
  radar: { angle: 0, wallDistance: 100 },
  angle: 0,
});

test("it starts with an undefined origin", () => {
  let instance = new OriginFinder();
  expect(instance.origin.x).toBeUndefined();
});

test("it can be updated", () => {
  let instance = new OriginFinder();
  instance.update(
    new AdvancedState({
      x: 0,
      y: 1,
      radar: { angle: 0, wallDistance: 100 },
      angle: 0,
    })
  );
  expect(instance.origin.x).toBeUndefined();
  instance.update(
    new AdvancedState({
      x: 0,
      y: 0,
      radar: { angle: 0, wallDistance: 100 },
      angle: 0,
    })
  );
  expect(instance.origin.x).toEqual(-800);

  instance.update(
    new AdvancedState({
      x: 0,
      y: 0,
      radar: { angle: 45, wallDistance: 50 },
      angle: 45,
    })
  );
  expect(instance.origin.y).toBeUndefined();
  instance.update(
    new AdvancedState({
      x: 1,
      y: 0,
      radar: { angle: 45, wallDistance: 50 },
      angle: 45,
    })
  );
  expect(instance.origin.y).toEqual(-550);
});
