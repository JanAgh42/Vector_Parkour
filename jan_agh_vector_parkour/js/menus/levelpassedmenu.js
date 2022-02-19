
class LevelPassedMenu extends Node{

    constructor(ctx, game){

        super();
        this.ctx = ctx;
        this.isActive = false;
        this.game = game;
        this.endbkg = document.querySelector('#endbkg');
        this.lvl1 = document.querySelector('#lvl1');
        this.lvl2 = document.querySelector('#lvl2');
        this.score = document.querySelector('#score');

        this.createNodes();
        this.createOnClicks();
    }

    createNodes(){
        this.add(new Button(400, 400, 180, 60, '#pres', this.ctx), 'listOfNodes');
    }

    createOnClicks(){
        this.listOfNodes[0].onClick = coords => {
            this.game.level++;
            this.game.delete('listOfObjs');
            this.game.createScene(true);
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
        this.ctx.drawImage(this.score, 335, 250, 100, 30);
        this.ctx.drawImage(!this.game.level ? this.lvl1 : this.lvl2, 300, 100, 400, 60);
        this.ctx.font = "700 30px Arial";
        this.ctx.fillStyle = "rgb(122, 218, 192)";
        this.ctx.fillText(this.game.player.sc + ' / 10000', 480, 280, 200);

        for(let x of this.listOfNodes){
            x.draw();
        }
        if(this.game.settings.sounds){
            this.game.sounds.levelcmpl.playAudio();
        }
    }
}