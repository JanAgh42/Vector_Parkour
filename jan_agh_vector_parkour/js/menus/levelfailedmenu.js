class LevelFailedMenu extends Node{

    constructor(ctx, game){

        super();
        this.ctx = ctx;
        this.isActive = false;
        this.game = game;
        this.endbkg = document.querySelector('#endbkg');
        this.again = document.querySelector('#again');

        this.createNodes();
        this.createOnClicks();
    }

    createNodes(){
        this.add(new Button(400, 400, 180, 60, '#pres', this.ctx), 'listOfNodes');
    }

    createOnClicks(){
        this.listOfNodes[0].onClick = coords => {
            this.game.delete('listOfObjs');
            this.game.createScene(false);
            coords.genCtx.loop();
            this.isActive = false;
        }
    }

    click(parent){
        parent.screenCtx = this;
        this.notify('click', parent);
    }

    notify(event, argument){
        for (let x of this.listOfNodes) {
            x[event](argument);
        }
    }

    draw(){
        this.ctx.drawImage(this.endbkg, 200, 70, 600, 430);
        this.ctx.drawImage(this.again, 300, 100, 400, 60);
        this.ctx.font = "700 30px Arial";
        this.ctx.fillStyle = "rgb(122, 218, 192)";
        this.ctx.fillText('Počet životov: ' + --this.game.player.lives, 390, 280, 200);

        for(let x of this.listOfNodes){
            x.draw();
        }
        if(this.game.settings.sounds){
            this.game.sounds.death.playAudio();
        }
    }
}