class Block {
    constructor(startX, startY, width, height) {
        this.x = startX;
        this.y = startY;
        this.width = width;
        this.height = height;
        this.maxX = this.width + this.x;
        this.maxY = this.height + this.y;
    }

    draw(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.width, this.height);

    }

}

class Left_Ball {
    constructor(startX, stageWidth, stageHeight, color) {
        this.radius = 3+ Math.random()*3
        this.color = color;
        this.x = this.radius + startX + (stageWidth-this.radius - startX) * Math.random();
        this.y = stageHeight/2 - 100;

        

        this.vx = this.radius * 0.3;
        this.vy = this.radius * 0.3;

        this.loss_speed = 0.5 * (Math.random()+0.2)
       
    }

    draw(ctx, stageWidth, stageHeight, block, tracer) {
        
        
        this.bounceWindow(stageWidth, stageHeight);
        this.bounceBlock(block)
        this.bounceTracer(tracer);

        this.x += this.vx;
        this.y += this.vy;
        this.vy *= 0.99;
        this.vy += this.loss_speed;
        

        ctx.beginPath();
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    reverse() {
        this.vy = -this.vy;
        this.loss_speed = -this.loss_speed
    }

    bounceWindow(stageWidth, stageHeight) {
        const minX = this.radius;
        const maxX = (stageWidth/2) - this.radius;
        const minY = this.radius + 5;
        const maxY = stageHeight - this.radius - 5;

        if (this.x < minX || this.x > maxX) {
            this.vx *= -1;
            this.x += this.vx;
        } else if (this.y < minY || this.y > maxY) {
            this.vy *= -1;
            this.y += this.vy;
        }

    }

    bounceBlock(block) {
        const minX = block.x - this.radius;
        const maxX = block.maxX+this.radius;
        const minY = block.y - this.radius;
        const maxY = block.maxY + this.radius;
        
        if (this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
            const x1 = Math.abs(minX - this.x);
            const x2 = Math.abs(this.x - maxX);
            const y1 = Math.abs(minY - this.y);
            const y2 = Math.abs(this.y - maxY);
            const min1 = Math.min(x1, x2);
            const min2 = Math.min(y1, y2);
            const min = Math.min(min1, min2);

            if (min == min1) {
                this.vx *= -1;
                this.x += this.vx;
            } else if (min == min2) {
                this.vy *= -1;
                this.y += this.vy;
            }
        } 

    }

    bounceTracer(tracer) {
        const judgement = (this.x - tracer.x)**2 + (this.y - tracer.y)**2

        if (judgement < tracer.radius**2) {
            this.vx *= -1;
            this.vy *= -0.5;
        }
    }


}

class Right_Ball {
    constructor(startX, stageWidth, stageHeight, color) {
        this.radius = 3+ Math.random() *3
        this.color = color;
        this.x = this.radius + startX + (stageWidth-this.radius) * Math.random();
        this.y = stageHeight/2 + 100;

        this.vx = this.radius * 0.3;
        this.vy = this.radius * 0.3;

        this.loss_speed = -0.5 * (Math.random()+0.2)
       
    }

    draw(ctx, stageWidth, stageHeight, block, tracer) {
        
        
        this.bounceWindow(stageWidth, stageHeight);
        this.bounceBlock(block);
        this.bounceTracer(tracer);

        this.x += this.vx;
        this.y += this.vy;
        this.vy *= 0.99;
        this.vy += this.loss_speed;
        

        ctx.beginPath();
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    reverse() {
        this.vy = -this.vy;
        this.loss_speed = -this.loss_speed
    }

    bounceWindow(stageWidth, stageHeight) {
        const minX = (stageWidth/2)+this.radius;
        const maxX = stageWidth - this.radius;
        const minY = this.radius+5;
        const maxY = stageHeight - this.radius-5;

        if (this.x < minX || this.x > maxX) {
            this.vx *= -1;
            this.x += this.vx;
        } else if (this.y < minY || this.y > maxY) {
            this.vy *= -1;
            this.y += this.vy;
        }

    }

    bounceBlock(block) {
        const minX = block.x - this.radius*2;
        const maxX = block.maxX+this.radius*3;
        const minY = block.y - this.radius*4;
        const maxY = block.maxY + this.radius*4;
        
        if (this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
            const x1 = Math.abs(minX - this.x);
            const x2 = Math.abs(this.x - maxX);
            const y1 = Math.abs(minY - this.y);
            const y2 = Math.abs(this.y - maxY);
            const min1 = Math.min(x1, x2);
            const min2 = Math.min(y1, y2);
            const min = Math.min(min1, min2);

            if (min == min1) {
                this.vx *= -1;
                this.x += this.vx;
            } else if (min == min2) {
                this.vy *= -1;
                this.y += this.vy;
            }
        } 

    }

    bounceTracer(tracer) {
        const judgement = (this.x - tracer.x)**2 + (this.y - tracer.y)**2

        if (judgement < tracer.radius**2) {
            this.vx *= -1;
            this.vy *= -0.5;
        }
    }

}


class Tracer {
    constructor(startX, startY, Width, Height, color) {
        this.startX = startX;
        this.startY = startY; 
        this.Width = Width;
        this.Height = Height;
        this.color = color;


        //this is tracer
        this.radius = 60;
        this.x = 0;
        this.y = 0;
    }

    draw1(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.startX, this.startY, this.Width, this.Height);
    }

    draw2(ctx) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0)';
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fill();
    }
}



class App {
    constructor(num_of_L, num_of_R) {

        this.num_of_L = num_of_L;
        this.num_of_R = num_of_R;

        this.L_Colors = ['#cc3333', '#99cc99', '#ffff99', 'skyblue', 'orange', 'white'];
        this.R_Colors = ['#cc3333', '#99cc99', '#ffff99', 'skyblue', 'orange',];

        this.B_randNum = Math.floor(Math.random()*(this.R_Colors.length+1));

        this.L_back_Color = this.R_Colors[this.B_randNum];
        this.R_back_Color = this.L_Colors[this.B_randNum];

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        document.body.appendChild(this.canvas);

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();


        document.addEventListener("click", this.reverse.bind(this), false);
        document.addEventListener("mousemove", this.Mouse_move.bind(this), false);

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);

        //make background color
        this.L_back = new Tracer(0,0,this.stageWidth/2, this.stageHeight, this.L_back_Color);
        //this.R_back = new Back_color(this.stageWidth/2, 0, this.stageWidth/2, this.stageHeight, this.R_back_Color);

        //make block
        this.block = new Block(this.stageWidth/4, this.stageHeight/2-25, this.stageWidth/2, 50);


        let L_balls = [];
        let R_balls = [];
        this.L_balls = L_balls
        this.R_balls = R_balls

        //make left balls
        for(var i=0; i<this.num_of_L; i++) {
            this.randNum = Math.floor(Math.random()*(this.L_Colors.length+1));
            
            let obj = new Left_Ball(0, this.stageWidth/2, this.stageHeight, this.L_Colors[this.randNum])
            
            L_balls.push(obj);
        }

        //make right balls
        for(var i=0; i<this.num_of_R; i++) {
            this.randNum = Math.floor(Math.random()*(this.R_Colors.length+1));
            
            let obj = new Right_Ball(this.stageWidth/2, this.stageWidth/2, this.stageHeight, this.R_Colors[this.randNum])

            R_balls.push(obj);
        }

    }

    animate() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        this.L_back.draw1(this.ctx);
        
        
        
        for(var i=0; i< this.L_balls.length; i++ ) {
            
            this.L_balls[i].draw(this.ctx, this.stageWidth, this.stageHeight, this.block, this.L_back)

        }

        for(var i=0; i< this.R_balls.length; i++ ) {
        
            this.R_balls[i].draw(this.ctx, this.stageWidth, this.stageHeight, this.block, this.L_back)

        }
        

        this.L_back.draw2(this.ctx);

        this.block.draw(this.ctx)
        

        
        window.requestAnimationFrame(this.animate.bind(this));
    }

    reverse(e) {
        if (e.clientX < this.stageWidth / 2) {
            for(var i=0; i< this.L_balls.length; i++ ) {
        
                this.L_balls[i].reverse();
    
            }
        } else {
            for(var i=0; i< this.R_balls.length; i++ ) {
        
                this.R_balls[i].reverse();
    
            }
        }
    }

    Mouse_move(e) {
        this.L_back.x = e.clientX;
        this.L_back.y = e.clientY;
    }
}
    


window.onload = () => {
    new App(1000, 1000);
};


/*
clientX: 브라우저 페이지에서의 X좌표 위치를 반환하거나 스크롤은 무시하고 해당 페이지의 상단을 0으로 측정한다.
offsetX: 이벤트 대상 객체에서의 상대적 마우스 X좌표 위치를 반환한다.
pageX: 브라우저 페이지에서의 X좌표 위치를 반환한다.
screenX: 전체 모니터 스크린에서의 X좌표 위치를 변환한다.
*/