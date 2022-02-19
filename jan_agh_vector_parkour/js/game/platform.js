
class Platform extends Node{

    constructor(pos_x, pos_y, length, game){

        super();
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.dy = 0;
        this.length = (length >= 0 ? length : 0);
        this.width = 60;
        this.height = 50;
        this.full_width = (this.length + 2) * 60;
        this.game = game;

        this.img1 = document.querySelector('#first');
        this.img2 = document.querySelector('#second');
        this.img3 = document.querySelector('#third');
    }

    move(delta, dx, dy){
        this.dy += dy;
        this.pos_x += dx * delta;
        this.pos_y += this.dy * delta;
    }

    collision(player_x, player_y){

        if(player_x < this.pos_x + this.full_width && player_x + 100 > this.pos_x && player_y < this.pos_y + this.height && player_y + 200 >= this.pos_y && player_y + 200 <= this.pos_y + (this.height / 2)){
            this.notify('collisionDetected', 0, 'listOfObjs');
            this.game.player.pos_y = this.pos_y -200;
            this.game.player.isJumping = false;
            return 0;
        }
        return -2;
    }

    collisionDetected(dy){
        this.dy = dy;
    }

    notify(event, argument){
        for (let x of this.game.listOfObjs){ 
            x[event](argument);
        }
    }

    draw(ctx){
        ctx.drawImage(this.img1, this.pos_x, this.pos_y, this.width, this.height);

        for(let x = 1; x <= this.length; x++){
            ctx.drawImage(this.img2, this.pos_x + (x * this.width), this.pos_y, this.width, this.height);
        }

        ctx.drawImage(this.img3, this.pos_x + (this.length + 1) * this.width, this.pos_y, this.width, this.height);
    }
}