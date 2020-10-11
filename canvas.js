var StarBackGround = {
    init : function () {
        this.init_tools();
        this.init_canvas();
    },
    options : {
        bg : "black",
        obj : {
            count : 5,
            max_radius : 10,
            color : ["red", "white","green"]
        }
    },

    resize : function () {
        window.cn.width = innerWidth;
        window.cn.height = innerHeight;
    },

    init_tools : function(){
        window.doc = document;
        window.getTag = function(sel){
            return doc.querySelector(sel);
        }
        window.randPos = function(key = 1000){
            return Math.floor(Math.random() * key);
        }
    },

    init_canvas : function(_class = "rex_canvas") {
        // Creates the Canvas
        window.cn = doc.createElement("canvas");
        window.ctx = cn.getContext("2d");

        // Adding Stylings
        cn.style.position = "fixed";
        cn.style.top = "0px";
        cn.style.left = "0px";
        cn.style.zIndex = "-3";
        cn.style.background = this.options.bg;
        cn.classList.add(_class); 

        // Watches Changes in size
        this.resize();
        window.onresize = this.resize;

        // Attaches the canvas
        doc.body.appendChild(cn);
    },

    init_objects : function(){
        Obj = [];
        for (var index = 0; index < this.options.obj.count; index++) {
            Obj.push(
                new Circle({
                    x : randPos(cn.width - 20),
                    y: randPos(cn.height - 20), 
                    r : randPos(this.options.obj.max_radius),
                    dx : randPos(10),
                    dy : randPos(10),
                    color :  this.options.obj.color[randPos(this.options.obj.color.length)]
                })
            ) 
    }

        window.Objects = Obj;
    },

    start : function() {
        this.init();
        this.init_objects();
        move();
    }
}

function Circle (opts = {x : 10, y :10, r: 10, dx :1, dy: 1, color :"white", stroke: false}){
    this.x = opts.x
    this.y = opts.y
    this.r = opts.r
    this.c = opts.color
    this.dx = opts.dx
    this.dy = opts.dy

    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.c;
        ctx.fill();
    }

    this.move = function(){
        
        if (this.x + this.r > cn.width || this.x + this.r < this.r){
            this.dx = -this.dx
        }

        if (this.y + this.r > cn.height || this.y + this.r < this.r){
            this.dy = -this.dy
        }
        
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;

        this.draw();
    }
}

// function createObjects (n, keys){
//     Obj = []
//     for (var index = 0; index < n; index++) {
//         Obj.push(
//             new Circle(keys)
//         ) 
//     }

//     return Obj;
// }

function move(){
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    Objects.forEach(e => {
        e.move()
    });
    setTimeout(move, 100)
}


// This is where you start and define properties for the background
StarBackGround.options.bg = "pink";
StarBackGround.options.obj.count = 100;
StarBackGround.options.obj.color.push("yellow");
StarBackGround.start();
