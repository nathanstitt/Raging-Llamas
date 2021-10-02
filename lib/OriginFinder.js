import * as Constants from "./Constants";

export class OriginFinder {
  constructor(autopilot) {
    this.autopilot = autopilot;
    this.origin = { x: undefined, y: undefined };
    this.lastX = undefined;
    this.lastY = undefined;
    this.lastMeasurementState = undefined;
  }

  update() {
    if (this.origin.x && this.origin.y) {
      return;
    }

    let state = this.autopilot.state;

    // If things have changed since the last update, no point in continuing
    let measurementState = `${state.x}${state.y}${state.angle}${state.radar.angle}`;
    if (
      this.lastMeasurementState &&
      this.lastMeasurementState == measurementState
    ) {
      return;
    }

    let wallDistance = state.radar.wallDistance;
    if (wallDistance) {
      let point = this.autopilot.getPointAtDistanceAlongRadar(wallDistance);

      if (!this.origin.x && point.x.isWhole()) {
        if (this.lastX && this.lastX == Math.round(point.x)) {
          this.origin.x =
            Math.lastX -
            (Math.abs(this.autopilot.absoluteRadarAngle) >= 90
              ? 0
              : Constants.BATTLEFIELD_WIDTH);
        }
        this.lastX = Math.round(point.x);
      }

      if (!this.origin.y && point.y.isWhole()) {
        if (this.lastY && this.lastY == Math.round(point.y)) {
          this.origin.y =
            Math.lastY -
            (this.autopilot.absoluteRadarAngle > 0
              ? Constants.BATTLEFIELD_HEIGHT
              : 0);
        }
        this.lastY = Math.round(point.y);
      }
    }

    if (this.origin.x && this.origin.y) {
      console.log(`origin: ${this.origin.x}, ${this.origin.y}`);
    }
  }
}
