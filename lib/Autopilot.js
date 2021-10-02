import { OriginFinder } from "./OriginFinder";

export class Autopilot {
  constructor() {
    this.originFinder = new OriginFinder(this);
    this.origin = this.originFinder.origin;
  }

  update(state, control) {
    this.state = state;
    this.control = control;
    this.absoluteRadarAngle = Math.deg.normalize(
      this.state.radar.angle + this.state.angle
    );

    this.originFinder.update(state);
  }

  getPointAtDistanceAlongRadar(distance) {
    return {
      x:
        this.state.x +
        Math.cos((this.absoluteRadarAngle * Math.PI) / 180) * distance,
      y:
        this.state.y +
        Math.sin((this.absoluteRadarAngle * Math.PI) / 180) * distance,
    };
  }
}
