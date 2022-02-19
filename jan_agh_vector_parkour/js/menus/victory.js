class Victory extends Node{

    constructor(ctx, game){
        
        super();
        this.ctx = ctx;
        this.isActive = false;
        this.game = game;
        this.endbkg = document.querySelector('#endbkg');
        this.score = document.querySelector('#score');
        this.victory = document.querySelector('#victory');

        this.createNodes();
        this.createOnClicks();
    }

    createNodes(){
        this.add(new Button(400, 400, 180, 60, '#vback', this.ctx), 'listOfNodes');
    }

    createOnClicks(){
        this.listOfNodes[0].onClick = coords => {
            this.isActive = false;
            this.game.uploadScore();
            this.game.level = 0;
            setTimeout(() => {
                coords.appCtx.switchApp();
                coords.appCtx.menu.loadMenu(StartMenu, true);
            }, 10);
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
        this.ctx.drawImage(this.victory, 300, 100, 400, 80);
        this.ctx.drawImage(this.score, 335, 250, 100, 30);
        this.ctx.font = "700 30px Arial";
        this.ctx.fillStyle = "rgb(122, 218, 192)";
        this.ctx.fillText(this.game.totalScore + ' / 30000', 480, 280, 200);

        for(let x of this.listOfNodes){
            x.draw();
        }
        if(this.game.settings.sounds){
            this.game.sounds.vic.playAudio();
        }
    }
}