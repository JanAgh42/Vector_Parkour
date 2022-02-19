class Trap{

    constructor(pos_x, pos_y, ctx, game){

        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.width = 500;
        this.height = 300;
        this.f_width = 130;
        this.f_height = 60;
        this.num_x = 0;
        this.num_y = 0;
        this.ctx = ctx;
        this.dy = 0;
        this.img = document.querySelector('#trap');
        this.game = game;
    }

    move(delta, dx, dy){
        this.dy += dy;
        this.pos_x += dx * delta;
        this.pos_y += this.dy * delta;
    }

    collision(player_x, player_y){
        if(player_x < this.pos_x + 100 && player_x + 100 > this.pos_x + 30 && player_y < this.pos_y + 60 && player_y + 200 >= this.pos_y){
            this.game.over = true;
        }
        return -1;
    }

    collisionDetected(dy){
        this.dy = dy;
    }

    draw(ctx){
        ctx.drawImage(this.img, this.num_x * this.width, this.num_y * this.height, this.width, this.height, this.pos_x, this.pos_y, this.f_width, this.f_height);
    }
}