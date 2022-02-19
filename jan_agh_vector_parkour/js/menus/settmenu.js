class SettMenu extends Node{

    constructor(ctx, settings){

        super();
        this.ctx = ctx;
        this.settings = settings;
        this.isActive = false;

        this.settext = document.querySelector('#settext');
        this.wasd = document.querySelector('#wasd');

        this.createNodes();
        this.createOnClicks();
    }

    createNodes(){
        this.add(new Button(30, 30, 70, 30, '#back', ctx), 'listOfNodes');
        this.add(new Button(560, 80, 200, 120, '#arrows', ctx), 'listOfNodes');
        this.add(new Button(590, 230, 100, 100, '#hlas', ctx), 'listOfNodes');
        this.add(new Button(590, 360, 100, 100, '#zvuk', ctx), 'listOfNodes');
    }

    createOnClicks(){
        this.listOfNodes[0].onClick = coords => {
            coords.genCtx.loadMenu(StartMenu, true);
        }
        this.listOfNodes[1].onClick = coords => {
            this.listOfNodes[1].image = (this.settings.arrows ? '#wasd' : '#arrows');
            this.settings.changeControls();
            coords.genCtx.loadMenu(SettMenu, true);
        }
        this.listOfNodes[2].onClick = coords => {
            this.listOfNodes[2].image = (this.settings.sounds ? '#nohlas' : '#hlas');
            this.settings.changeSounds();
            coords.genCtx.loadMenu(SettMenu, true);
        }
        this.listOfNodes[3].onClick = coords => {
            this.listOfNodes[3].image = (this.settings.music ? '#nozvuk' : '#zvuk');
            this.settings.changeMusic(coords.appCtx.bkgSound);
            coords.genCtx.loadMenu(SettMenu, true);
        }
    }

    updateIcons(){
        this.listOfNodes[1].image = this.settings.arrows ? '#arrows' : '#wasd';
        this.listOfNodes[2].image = this.settings.sounds ? '#hlas' : '#nohlas'
        this.listOfNodes[3].image = this.settings.music ? '#zvuk' : '#nozvuk'
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
        this.updateIcons();
        this.ctx.drawImage(this.settext, 200, 140, 240, 270);
        for(let x of this.listOfNodes){
            x.draw();
        }
    }
}