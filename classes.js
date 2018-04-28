class Note extends PIXI.Graphics{
  constructor(radius=40, color, x, y){
    super();
    this.beginFill(color);
    this.drawCircle(0,0,radius);
    this.endFill();
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.fwd = {x:0, y:1};
    this.speed = 200;
    this.isAlive = true;
    Object.seal(this);
  }

  move(dt=1/60){
    this.x += this.fwd.x * this.speed * dt;
    this.y += this.fwd.y * this.speed * dt;
  }

  getX(){
    return this.x;
  }

  getY(){
    return this.y;
  }
}
