class Button extends Node{

    constructor(pos_x, pos_y, width, height, image, ctx){

        super();
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.width = width;
        this.height = height;
        this.image = image;
        this.ctx = ctx;
        this.isActive = false;
    }

    draw(){
        ctx.drawImage(document.querySelector(this.image), this.pos_x, this.pos_y, this.width, this.height);
    }

    /*hover(){
        ctx.drawImage(this.btnImage, this.pos_x - 10, this.pos_y -5, this.width + 20, this.height + 10);
    }*/

    click(coords){
        if(coords.x > this.pos_x && coords.x < this.pos_x + this.width && coords.y > this.pos_y && coords.y < this.pos_y + this.height){
            this.onClick(coords);
            if(coords.appCtx.settings.sounds){
                coords.appCtx.menu.buttonClk.playAudio();
            }
        }
    }

    onClick(){}
}