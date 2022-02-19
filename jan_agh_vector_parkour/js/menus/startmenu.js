class StartMenu extends Node{

    constructor(ctx){

        super();
        this.ctx = ctx;
        this.isActive = false;
        this.mbkg = document.querySelector('#mbkg');
        this.name = document.querySelector('#gamename');

        this.createNodes();
        this.createOnClicks();
    }

    createNodes(){
        this.add(new Button(400, 220, 200, 60, '#play', ctx), 'listOfNodes');
        this.add(new Button(430, 360, 140, 40, '#goals', ctx), 'listOfNodes');
        this.add(new Button(430, 300, 140, 40, '#controls', ctx), 'listOfNodes');
        this.add(new Button(900, 510, 70, 70, '#sett', ctx), 'listOfNodes');
        this.add(new Button(800, 530, 70, 50, '#leader', ctx), 'listOfNodes');
    }

    createOnClicks(){
        this.listOfNodes[0].onClick = coords => {
            coords.appCtx.game.delete('listOfObjs');
            coords.appCtx.game.createScene(true);
            coords.appCtx.switchApp();
        }
        this.listOfNodes[1].onClick = coords => {
            coords.genCtx.loadMenu(GoalsMenu, true);
        }
        this.listOfNodes[2].onClick = coords => {
            coords.genCtx.loadMenu(CtrlsMenu, true);
        }
        this.listOfNodes[3].onClick = coords => {
            coords.genCtx.loadMenu(SettMenu, true);
        }
        this.listOfNodes[4].onClick = coords => {
            coords.genCtx.loadMenu(ScoreMenu, true);
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
        this.ctx.drawImage(this.mbkg, 0, 0, 1000, 600);
        this.ctx.drawImage(this.name, 250, 30, 500, 100);
        for(let x of this.listOfNodes){
            x.draw();
        }    
    }
}