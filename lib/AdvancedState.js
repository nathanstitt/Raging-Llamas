// const extendedMath = require("./extendedMath.js");
// var Math = extendedMath();
import './patchedMath'

export class AdvancedState {
  constructor(state) {
    this.state = state;
    this.absoluteRadarAngle = Math.deg.normalize(
      this.state.radar.angle + this.state.angle
    );
  }

  orientationString() {
    return `${this.state.x}${this.state.y}${this.state.angle}${this.state.radar.angle}`;
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
