class Button extends PIXI.Graphics{
  constructor(radius, color, x, y){
    super();
    this.beginFill(color);
    this.drawCircle(0,0,radius);
    this.endFill();
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.fwd = getRandomUnitVector();
    this.isAlive = true;
  }

  move(dt=1/60){
    this.x += this.fwd.x * this.speed * dt;
    this.y += this.fwd.y * this.speed * dt;
  }
}
