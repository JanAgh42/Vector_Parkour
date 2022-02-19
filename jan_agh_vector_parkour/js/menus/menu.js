class Menu extends Node{

    constructor(ctx, settings){

        super();
        this.ctx = ctx;
        this.settings = settings;
        this.isActive = false;
        this.buttonClk = new Audio("../assets/audio/button.wav", 0.5, false);

        this.createNodes();
        this.loadMenu(StartMenu, true);
    }

    createNodes(){
        this.add(new StartMenu(this.ctx), 'listOfNodes');
        this.add(new GoalsMenu(this.ctx), 'listOfNodes');
        this.add(new CtrlsMenu(this.ctx), 'listOfNodes');
        this.add(new SettMenu(this.ctx, this.settings), 'listOfNodes');
        this.add(new ScoreMenu(this.ctx), 'listOfNodes');
    }

    click(parent){
        parent.genCtx = this;
        this.notify('click', parent, 'listOfNodes');
    }

    loadMenu(screen, clear){
        if(clear){
            this.ctx.fillStyle = "rgb(85, 3, 0)";
            this.ctx.fillRect(0, 0, 1000, 600);
        }
        if(screen == SettMenu){
            this.change(screen);
        }
        else{
            setTimeout(() => {
                this.change(screen);
            }, 10);
        }
    }

    change(screen){
        for(let scr of this.listOfNodes){
            scr.isActive = false;
            if(scr instanceof screen){
                scr.isActive = true;
                scr.draw();
            }
        }
    }
}