
class Background{

    constructor(pos_x, pos_y){
        this.bkg = document.querySelector('#bkg');

        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.width = 1000;
        this.distance = 0;
    }

    move(delta, dx){
        this.pos_x += (dx / 3) * delta;
    }

    draw(ctx){
        ctx.drawImage(this.bkg, this.pos_x, this.pos_y, this.width, 450);
        if(this.pos_x >= 0){
            for(let x = 1; x <= Math.ceil(Math.abs(this.pos_x) / this.width); x++){
                 ctx.drawImage(this.bkg, (this.pos_x - x * this.width), this.pos_y, this.width, 450);
            }
        }
        if(this.pos_x < 0){
            for(let x = 1; x <= Math.ceil(Math.abs(this.pos_x) / this.width); x++){
                 ctx.drawImage(this.bkg, (this.pos_x + x *  this.width), this.pos_y, this.width, 450);
            }
        }
    }
}