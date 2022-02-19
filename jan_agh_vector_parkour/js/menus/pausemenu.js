class PauseMenu extends Node{

    constructor(ctx, game){

        super();
        this.ctx = ctx;
        this.game = game;
        this.isActive = false;
        this.pbkg = document.querySelector('#pbkg');

        this.createNodes();
        this.createOnClicks();
    }

    createNodes(){
        this.add(new Button(400, 190, 200, 70, '#pres', this.ctx), 'listOfNodes');
        this.add(new Button(400, 280, 200, 70, '#psett', this.ctx), 'listOfNodes');
    }

    createOnClicks(){
        this.listOfNodes[0].onClick = coords => {
            coords.genCtx.loop();
            this.isActive = false;
        }
        this.listOfNodes[1].onClick = coords => {
            this.isActive = false;
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
        this.ctx.drawImage(this.pbkg, 350, 150, 300, 250);
        for(let x of this.listOfNodes){
            x.draw();
        } 
    }
}