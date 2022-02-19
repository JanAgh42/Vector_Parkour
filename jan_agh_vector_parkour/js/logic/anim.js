class Anim{

    constructor(game){

        this.game = game;
    }

    initAnimations(){
        setInterval(() => {
            this.game.player.num_x++;
            for(let x = 0; x < this.game.trapLength; x++){
                this.game.listOfObjs[x].num_x++;
            }
        }, (this.game.player.isJumping ? 900 : 150));
    }

    playerAnim(num_x, num_y){
        this.game.player.num_y = num_y;
        if(this.game.player.num_x >= (this.game.player.isJumping ? num_x - 1 : num_x)){
            this.game.player.num_x = (this.game.player.isJumping ? num_x - 2 : 0);
        }
    }

    trapAnim(){
        for(let x = 0; x < this.game.trapLength; x++){
            if(this.game.listOfObjs[x].num_x >= 3){
                this.game.listOfObjs[x].num_x = 0;
            }
        }
    }
}