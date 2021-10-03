import * as Constants from "./Constants";
import './number'
import './patchedMath'

// Track when we see the same X or Y values repeat on subsequent wall detections,
// use that to say a wall exists at those X or Y values and then based on which
// way the radar is pointing, calculate the origin point from them.
//
export class OriginFinder {
  constructor() {
    this.origin = { x: undefined, y: undefined };
    this.lastX = undefined;
    this.lastY = undefined;
    this.lastOrientation = undefined;
  }

  update(advancedState) {
    if (this.origin.x && this.origin.y) { return }

    // If we don't see a wall, there's no info to work with
    let wallDistance = advancedState.state.radar.wallDistance;
    if (!wallDistance) { return }

    let orientationChanged =
      this.lastOrientation && this.lastOrientation != advancedState.orientationString();

    this.lastOrientation = advancedState.orientationString();

    let point = advancedState.getPointAtDistanceAlongRadar(wallDistance);

    if (!this.origin.x && point.x.isWhole()) {
      if (this.lastX && this.lastX == Math.round(point.x) && orientationChanged) {
        this.origin.x =
          this.lastX -
          (Math.abs(advancedState.absoluteRadarAngle) >= 90 ? 0 : Constants.BATTLEFIELD_WIDTH);
      }
      this.lastX = Math.round(point.x);
    }

    if (!this.origin.y && point.y.isWhole()) {
      if (this.lastY && this.lastY == Math.round(point.y) && orientationChanged) {
        this.origin.y =
          this.lastY -
          (advancedState.absoluteRadarAngle > 0 ? Constants.BATTLEFIELD_HEIGHT : 0);
      }
      this.lastY = Math.round(point.y);
    }
  }
}
