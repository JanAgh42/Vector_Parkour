
class Collectible extends Node{

    constructor(pos_x, pos_y, collect, id, game){

        super();
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.game = game;
        this.dy = 0;
        this.isCollected = collect;
        this.id = id;

        this.star = document.querySelector('#star');
    }

    move(delta, dx, dy){
        if(!this.isCollected){
            this.dy += dy;
            this.pos_x += dx * delta;
            this.pos_y += this.dy * delta;
        }
    }

    collision(player_x, player_y){
        if(player_x < this.pos_x + 60 && player_x + 100 > this.pos_x - 10 && player_y < this.pos_y + 70 && player_y + 200 >= this.pos_y && !this.isCollected){
            this.isCollected = true;
            this.game.player.collects[this.id] = true;
        
            if(this.game.settings.sounds){
                this.game.sounds.collect.playAudio();
            }
        }
        return -1;
    }

    collisionDetected(dy){
        this.dy = dy;
    }

    draw(ctx){
        if(!this.isCollected){
            ctx.drawImage(this.star, this.pos_x, this.pos_y, 70, 70);
        }
    }
}