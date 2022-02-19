
class Player{

    constructor(pos_x, pos_y, ctx, game){
        
        this.game = game;
        this.ctx = ctx;
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.num_x = 0;
        this.num_y = 4;
        this.lives = 5;
        this.collects = [false, false, false, false, false];
        this.img = document.querySelector('#panak');
        this.score = document.querySelector('#score');
        this.pause = document.querySelector('#pause');
        this.zvuk = document.querySelector('#zvuk');
        this.hlas = document.querySelector('#hlas');
        this.star = document.querySelector('#star');
        this.nohlas = document.querySelector('#nohlas');
        this.nozvuk = document.querySelector('#nozvuk');
        this.nostar = document.querySelector('#nostar');
        this.heart = document.querySelector('#heart');
        this.noheart = document.querySelector('#noheart');

        this.isJumping = false;
        this.sc = 10000;

        this.subtractScore();
    }

    subtractScore(){
        setInterval(() => {
            if(this.sc > 0 && this.game.k){
                this.sc -= 10;
            }
        }, 500);
    }

    checkIfPassed(){
        for(let x of this.collects){
            if(!x){
                return false;
            }
        }
        return true;
    }

    jump(){
        this.isJumping = true;
        this.num_x = 0;
        this.pos_y = 200;
        if(this.game.settings.sounds){
            this.game.sounds.jump.playAudio();
        }
        return 110;
    }

    draw(){
        this.ctx.drawImage(this.img, this.num_x * 280, this.num_y * 550, 280, 550, this.pos_x, this.pos_y, 100, 200);
        this.ctx.drawImage(this.score, 20, 10, 100, 30);
        this.ctx.drawImage(this.pause, 950, 20, 20, 30);
        this.ctx.drawImage(this.game.settings.music ? this.zvuk : this.nozvuk, 20, 540, 40, 40);
        this.ctx.drawImage(this.game.settings.sounds ? this.hlas : this.nohlas, 80, 540, 40, 40);
        this.ctx.font = "700 30px Arial";
        this.ctx.fillStyle = "rgb(122, 218, 192)";
        this.ctx.fillText(this.sc, 140, 40);

        for(let x = 0; x < 5; x++){
            this.ctx.drawImage(this.collects[x] ? this.star : this.nostar, 20 + x * 35, 50, 25, 25);
            this.ctx.drawImage(x < this.lives ? this.heart : this.noheart, 413 + x * 35, 20, 25, 20);
        }
    }
}