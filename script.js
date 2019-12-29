var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
var x = 0;

function Snowflake(x, y, r, c, t, v){
    this.x = x;
    this.startX = x;
    this.y = y;
    this.c = c;
    this.r = r;
    this.yv = this.r / 3;
    this.xv = this.r / 6;
    this.t = t;
    this.tc = 0;
    this.v = v;

    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
        ctx.fillStyle = this.c;
        ctx.fill();
    }
    this.update = function(){
        this.draw();
        this.x += this.xv;
        this.x += this.v;
        this.y += this.yv;
        if(this.y > canvas.height) {this.y = 0; if(this.v != 0) this.x = this.startX;};
        this.tc++;
        if(this.tc >= this.t) {this.xv = -this.xv; this.tc = 0}
    }
}

var layer1 = [];
var snowflakes1 = 150;

for(var i = 0; i <= snowflakes1; i++){
    layer1.push(new Snowflake((Math.random()*canvas.width), (-Math.random()*canvas.height*2 + canvas.height), (Math.random()*1+2), "white", (Math.random()*100 + 100), 0));
}

var layer2 = [];
var snowflakes2 = 550;

for(var i = 0; i <= snowflakes2; i++){
    layer2.push(new Snowflake(((Math.random()*canvas.width*1.5) - canvas.width/2), (-Math.random()*canvas.height*2 + canvas.height), (Math.random()*1+1), "white", -1, .3));
}

var layer3 = [];
var snowflakes3 = 1050;

for(var i = 0; i <= snowflakes3; i++){
    layer3.push(new Snowflake(((Math.random()*canvas.width*2)), (-Math.random()*canvas.height*2 + canvas.height), (Math.random()*1+.5), "white", -1, -.3));
}


function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i <= snowflakes1;i++){
        layer1[i].update();
    }
    for(var i = 0; i <= snowflakes2; i++){
        layer2[i].update();
    }
    for(var i = 0; i <= snowflakes3; i++){
        layer3[i].update();
    }

    requestAnimationFrame(animate);
}
animate();