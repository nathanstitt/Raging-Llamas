Number.prototype.isWhole = function (tolerance = 0.00000001) {
  return Math.abs(Math.round(this) - this) < tolerance;
};
