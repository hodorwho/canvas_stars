const canvasSketch = require('canvas-sketch');
//m3 - objects
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const tweakpane = require('tweakpane');

const settings = {
  dimensions: [ 1920, 1080 ],
  animate: true
};


/* this is what canvas sketch is doing:
const animate = () => {
  console.log('domestika'); //for testing
  requestAnimationFrame(animate);
};
animate();
*/

const sketch = ({ context, width, height }) => {
  context.fillStyle = 'black';
  const agents = [];
  const starsInFrame = width/9;

  for (let i = 0; i < starsInFrame; i++){
    const x = random.range(0, width);
    const y = random.range(0, height);

    agents.push(new Agent(x,y));
  }

  return ({ context, width, height }) => {
    //context.fillStyle = params.color;
    context.fillRect(0, 0, width, height);
    context.fillStyle = 'white';

/*
    // drawing lines
    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];

      for (let j = i+1; j < agents.length; j++) {
        const other = agents[j];

        const dist = agent.pos.getDistance(other.pos);

        if (dist < 100) {

          // mapRange(value, inputMin, inputMax, outputMin, outputMax)
          context.lineWidth = math.mapRange(dist, 0,200,10,1);
          context.beginPath();
          context.moveTo(agent.pos.x, agent.pos.y);
          context.lineTo(other.pos.x, other.pos.y);
          context.stroke();
        }
      }
    }
*/



    agents.forEach(agent => {
      agent.update();
      agent.draw(context);
     // agent.bounce(width, height);
      agent.wrap(width, height);
    });

  };
};

canvasSketch(sketch, settings);


class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    // pythagoras theorem formula for calculating distance between two points
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x,y);
    this.vel = new Vector(random.range(0.11,0.15), random.range(0.07,0.09));
    this.radius = random.range(1,3.7);
  }

  
  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
  }

  wrap(width, height) {
    if (this.pos.x <= 0) this.pos.x = width;
    if (this.pos.x >= width) this.pos.x = 0;
    if (this.pos.y <= 0) this.pos.y = height;
    if (this.pos.y >= height) this.pos.y = 0;
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  /*opacity(agent) {
            
      var alpha = i * 0.1;
      ctx.globalAlpha = alpha;       
      
      ctx.fillRect(50*i, 20, 40, 40);
}*/

  draw(context) {
   // context.fillStyle = 'black';
    context.save();
//    context.translate(this.pos.x, this.pos.y);

    context.lineWidth = 4;

    context.beginPath();

    /*var gradient = context.createLinearGradient(0,0,0,170);
    gradient.addColorStop( 0, "black" );   
    gradient.addColorStop( 0.5, "grey" );   
    gradient.addColorStop( 1, "white" );   
    context.fillStyle = gradient;
*/
   // context.globalAlpha=0.70;
   

    context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore();
  }


}

