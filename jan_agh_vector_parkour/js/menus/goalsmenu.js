class GoalsMenu extends Node{

    constructor(ctx){

        super();
        this.ctx = ctx;
        this.isActive = false;
        this.gtext = document.querySelector('#gtext');

        this.createNodes();
        this.createOnClicks();
    }

    createNodes(){
        this.add(new Button(30, 30, 70, 30, '#back', ctx), 'listOfNodes');
    }

    createOnClicks(){
        this.listOfNodes[0].onClick = coords => {
            coords.genCtx.loadMenu(StartMenu, true);
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
        this.ctx.drawImage(this.gtext, 70, 80,  880, 470);
        for(let x of this.listOfNodes){
            x.draw();
        } 
    }
}