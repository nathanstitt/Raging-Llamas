import { AdvancedState } from "./AdvancedState";
import { OriginFinder } from "./OriginFinder";

export class Autopilot {
  constructor() {
    this.originFinder = new OriginFinder();
    this.origin = this.originFinder.origin;
    this.advancedState = undefined;
  }

  update(state, control) {
    this.state = state;
    this.advancedState = new AdvancedState(state);
    this.control = control;

    this.originFinder.update(this.advancedState);
  }
}
