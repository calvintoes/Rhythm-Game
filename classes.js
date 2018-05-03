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
    this.speed = 2;
    this.isAlive = true;
    Object.seal(this);
  }

  move(){
    this.x += this.fwd.x * this.speed ;
    this.y += this.fwd.y * this.speed ;
  }

  getX(){
    return this.x;
  }

  getY(){
    return this.y;
  }

  getBounds(){
    return this.getBounds(true);
  }
}
