//



function myTank() {

class AdvancedState{constructor(t){this.state=t,this.absoluteRadarAngle=Math.deg.normalize(this.state.radar.angle+this.state.angle),this.position={x:t.x,y:t.y}}orientationString(){return`${this.state.x}${this.state.y}${this.state.angle}${this.state.radar.angle}`}getPointAtDistanceAlongRadar(t){return{x:this.state.x+Math.cos(this.absoluteRadarAngle*Math.PI/180)*t,y:this.state.y+Math.sin(this.absoluteRadarAngle*Math.PI/180)*t}}}const BATTLEFIELD_WIDTH=850,BATTLEFIELD_HEIGHT=550,SOUTH=90,NORTH=-90,WEST=-180,EAST=0,TANK_WIDTH=36;var Constants=Object.freeze({__proto__:null,BATTLEFIELD_WIDTH:BATTLEFIELD_WIDTH,BATTLEFIELD_HEIGHT:BATTLEFIELD_HEIGHT,SOUTH:SOUTH,NORTH:NORTH,WEST:WEST,EAST:EAST,TANK_WIDTH:TANK_WIDTH});Number.prototype.isWhole=function(t=1e-8){return Math.abs(Math.round(this)-this)<t};class OriginFinder{constructor(){this.origin={x:void 0,y:void 0},this.lastX=void 0,this.lastY=void 0,this.lastOrientation=void 0}update(i){if(!this.origin.x||!this.origin.y){var s=i.state.radar.wallDistance;if(s){var o=this.lastOrientation&&this.lastOrientation!=i.orientationString();this.lastOrientation=i.orientationString();let t=i.getPointAtDistanceAlongRadar(s);!this.origin.x&&t.x.isWhole()&&(this.lastX&&this.lastX==Math.round(t.x)&&o&&(this.origin.x=this.lastX-(90<=Math.abs(i.absoluteRadarAngle)?0:BATTLEFIELD_WIDTH)),this.lastX=Math.round(t.x)),!this.origin.y&&t.y.isWhole()&&(this.lastY&&this.lastY==Math.round(t.y)&&o&&(this.origin.y=this.lastY-(0<i.absoluteRadarAngle?BATTLEFIELD_HEIGHT:0)),this.lastY=Math.round(t.y))}}}}class Autopilot{constructor(){this.originFinder=new OriginFinder,this.origin=this.originFinder.origin,this.advancedState=void 0,this.path=[],this.nextPosition=void 0}update(t,i){this.state=t,this.advancedState=new AdvancedState(t),this.control=i,this.originFinder.update(this.advancedState)}isOriginKnown(){return this.origin.x&&this.origin.y}setOrigin(t,i){this.origin.x=t,this.origin.y=i}lookEverywhere(){this.control.RADAR_TURN=1}lookAtEnemy(t){t=Math.deg.atan2(t.y-this.state.y,t.x-this.state.x),t=Math.deg.normalize(t-this.state.angle),t=Math.deg.normalize(t-this.state.radar.angle);this.control.RADAR_TURN=t}isWallCollisionImminent(t=3){if(this.state.collisions.wall)return!0;if(this.isOriginKnown()){t=this.extrapolatedOuterPosition(t);return t.x<=this.origin.x||t.x>=this.origin.x+BATTLEFIELD_WIDTH||t.y<=this.origin.y||t.y>=this.origin.y+BATTLEFIELD_HEIGHT}}turnToAngle(t){if(t=Math.deg.normalize(t),this.state.angle==t)return this.control.TURN=0;t=Math.deg.normalize(t-this.state.angle);return this.control.TURN=t/2,t}turnToPoint(t,i,s=!1){if(!this.isOriginKnown()&&s)throw new"Cannot turn to point based on zero origin because the origin is not yet known";t+=s?this.origin.x:0,s=i+(s?this.origin.y:0),t=Math.deg.atan2(s-this.state.y,t-this.state.x);return this.turnToAngle(t)}moveToPoint(t,i,s=!1){this.control.THROTTLE=0;s=this.turnToPoint(t,i,s);s<60&&(this.control.THROTTLE=(60-s)/60)}moveAlongAngle(t){this.control.THROTTLE=0;t=Math.abs(this.turnToAngle(t));t<60&&(this.control.THROTTLE=(60-t)/60)}loopOnPath(t,i,s=50){if(0!=t.length){if(0==this.path.length&&(this.path=t,i)){if(!this.isOriginKnown())throw new"Cannot loop on positions based on zero origin because the origin is not yet known";this.path.forEach(t=>{t.x+=this.origin.x,t.y+=this.origin.y})}this.nextPosition||(this.nextPosition=this.path.shift(),this.path.push(this.nextPosition)),Math.distance(this.nextPosition.x,this.nextPosition.y,this.state.x,this.state.y)<=s&&(this.nextPosition=this.path.shift(),this.path.push(this.nextPosition)),this.moveToPoint(this.nextPosition.x,this.nextPosition.y)}}stopLoopOnPath(){this.path=[],this.nextPosition=void 0,this.stop()}stop(){this.control.TURN=0,this.control.THROTTLE=0,this.control.BOOST=0}shootEnemy(t,i=300){var s,o;t&&(o=(s=Math.distance(this.state.x,this.state.y,t.x,t.y))/4,o=Autopilot.extrapolatedPosition(t,t.angle,t.speed,o),o=Math.deg.atan2(o.y-this.state.y,o.x-this.state.x),o=Math.deg.normalize(o-this.state.angle),o=Math.deg.normalize(o-this.state.gun.angle),this.control.GUN_TURN=.3*o,Math.abs(o)<2&&(this.control.SHOOT=i<s?.1:1-s/i))}extrapolatedPosition(t){return Autopilot.extrapolatedPosition(this.advancedState.position,this.state.angle,this.speed(),t)}extrapolatedOuterPosition(t){t=this.extrapolatedPosition(t);return{x:t.x+Math.sqrt(2)*TANK_WIDTH/2*(90<=Math.abs(this.state.angle)?-1:1),y:t.y+Math.sqrt(2)*TANK_WIDTH/2*(this.state.angle<0?-1:1)}}speed(){return 2*this.control.THROTTLE*(1==this.control.BOOST?2:1)}static extrapolatedPosition(t,i,s,o){return{x:t.x+o*s*Math.cos(Math.deg2rad(i)),y:t.y+o*s*Math.sin(Math.deg2rad(i))}}}


// YOUR CODE GOES BELOW vvvvvvvv

  const STRATEGIES = {
    DODGE: 1,
    SEEK: 2,
  }

  const SKINS = {
    1: 'lava',
    2: 'forest',
    3: 'desert',
  }
  const DIRECTIONS = {
    1: 90,
    2: 180,
    3: 270,
    4: 0, // won't have 4th tank "for real", but demo controls let you pick it
  }

  // global vars to store state of tank
  let ap,
      id,
      turnDirection,
      turnTimer,
      direction,
      bulletMap,
      avoidDirection,
      targetedEnemy,
      collisionCoord = false,
      flop = 1,
      searchingTurnRadius = 0,
      boostTimer = 100,
      bodyAngleDelta

  tank.init(function(settings, info) {
    id = info.id
    settings.SKIN = SKINS[id]
    ap = new Autopilot();
    bulletMap = []
    changeAvoidDirection();
    turnDirection = DIRECTIONS[id] // Math.random() < 0.5 ? 1 : -1;
    turnTimer = 0
    direction = 1

  });

  function changeAvoidDirection() {
    avoidDirection = Math.random() > 0.5 ? -1 : 1;
  }

  function onNewEnemyDiscovered(enemy, control) {
    control.OUTBOX.push({
      enemyDiscovered: enemy
    })
  }

  function distanceTo(state, object) {
    return Math.distance(state.x, state.y, object.x, object.y)
  }

  function readInbox(state) {
    const msgs = state.radio.inbox
    if (!msgs || !msgs.length) {
      return
    }

    msgs.forEach(msg => {
      if (msg.origin) {
        ap.setOrigin(msg.origin.x, msg.origin.y)
      }
      if (msg.enemyDiscovered) {
        targetedEnemy = msg.enemyDiscovered
      }
    })
  }
  function searchTheBoard(state, control) {
    control.RADAR_TURN = 1

    if (searchingTurnRadius > 0) {
      control.TURN = -1.0
      searchingTurnRadius -= 1
      control.THROTTLE = 0.0
    } else {
      control.TURN = 0.0
      control.THROTTLE = 1.0
      if (state.collisions.wall || ap.isWallCollisionImminent(1)) {
        searchingTurnRadius = Math.randomRange(45, 90)
        boostTimer = 50
      }
    }
  }

  function avoidBullets(state, control) {

    // find bullets using radar
    for(let i in state.radar.bullets) {
      const bullet = state.radar.bullets[i];
      bullet.age = 0;
      bulletMap[bullet.id] = bullet;

      // calculate velocity components and distance between bullet and the tank
      bullet.vx = bullet.speed * Math.cos(bullet.angle*(Math.PI/180));
      bullet.vy = bullet.speed * Math.sin(bullet.angle*(Math.PI/180));
      bullet.tankDistance = Math.distance(state.x, state.y, bullet.x, bullet.y);
    }

    var bulletCount = 0;
    // predict position of all bullets scanned so far
    for(let i in bulletMap) {
      const bullet = bulletMap[i];
      if(!bullet) { continue; }
      // skip bullets that was not updated for long time
      // if they were not spotted by radar recently, they
      // probably are too far or hit something
      if(bullet.age > 50) {
        bulletMap[i] = null;
        continue;
      }
      // track age of the bullet so they can be removed if out-dated
      bullet.age++;
      // predict position of the bullet basing on its velocity
      bullet.x += bullet.vx;
      bullet.y += bullet.vy;
      // calculate distance between bullet and the tank. It will be used to
      // find how fast the distance is changing
      var newDistance = Math.distance(state.x, state.y, bullet.x, bullet.y);
      bullet.approachingSpeed = bullet.tankDistance - newDistance;
      bullet.tankDistance = newDistance;

      // If distance between tank and the bullet is negative, it means that it
      // is moving away from the tank and can be ignored (if will not hit it)
      //
      // In addition, if the speed of approaching the tank is too low, it means
      // that the trajectory of the bullet is away of the tank and it will
      // not hit it. Such bullets can be ignored too. The threshold value set
      // experimentally to 3.85
      if(bullet.approachingSpeed < 3.85) {
        bulletMap[i] = null;
        continue;
      }
      // count how many bullets are really dangerous and will probably hit the tank
      bulletCount++;
    }

    // avoid bullets when any of them is aiming at you and
    // you are rotated in a way that you can dodge it
    if(bulletCount && Math.abs(bodyAngleDelta) < 45) {
      boostTimer = 40

      control.THROTTLE = avoidDirection;
    } else {
      // change direction of bullets dodging
      changeAvoidDirection();
    }
  }

  function targetEnemy(enemy, state, control) {
    const eDistance = Math.distance(state.x, state.y, enemy.x, enemy.y)
    ap.lookAtEnemy(enemy)
		var enemyAngle = Math.deg.atan2(
      enemy.y - state.y,
      enemy.x - state.x
    )

    if (eDistance > 200) {
      ap.moveToPoint(enemy.x, enemy.y)
    } else {
      control.THROTTLE = 1 * flop;
      if (state.collisions.wall || state.collisions.enemy || state.collisions.ally) {
        flop = flop * -1;
      }

      bodyAngleDelta = Math.deg.normalize(enemyAngle - 90 - state.angle);
      if(Math.abs(bodyAngleDelta) > 90) { bodyAngleDelta += 180; }
      control.TURN = bodyAngleDelta * 0.2;
    }

    const aDistance = state.radar.ally ?
          Math.distance(state.x, state.y, state.radar.ally.x, state.radar.ally.y) : 0

    if ( (!aDistance) || eDistance < aDistance ) {
      ap.shootEnemy(enemy)
    }

  }

  tank.loop(function(state, control) {
    const wasOriginknown = ap.isOriginKnown()

    if (boostTimer) { boostTimer -= 1 }
    control.BOOST = boostTimer ? 1 : 0


    ap.update(state, control)
    readInbox(state)

    if (!wasOriginknown && ap.isOriginKnown()) {
      control.OUTBOX.push({
        origin: ap.origin,
      })
    }

    if (state.collisions.ally) {
      control.TURN = state.angle + ((Math.random() * 20) - 10)
      collisionCoord = { x: state.x, y: state.y }
    }
    if (collisionCoord) {
      control.THROTTLE = -1
      if (distanceTo(state, collisionCoord) > 50) {
        collisionCoord = false
      } else {
        return
      }
    }

    if(state.radar.enemy) {
      if (!targetedEnemy) {
        onNewEnemyDiscovered(state.radar.enemy, control)
      }
      targetEnemy(state.radar.enemy, state, control)
    } else if (targetedEnemy) {
      // we should have enemy on radar at this point and would be handled by above if stmt
      // give up if we haven't spotted it yet
      if (distanceTo(state, targetedEnemy) < 200) {
        targetedEnemy = false
        searchTheBoard(state, control)
      } else {
        targetEnemy(targetedEnemy, state, control)
      }
    } else {
      searchTheBoard(state, control)
    }

    avoidBullets(state, control)

  });

  // YOUR CODE GOES ABOVE ^^^^^^^^
}

window.myTank = myTank
