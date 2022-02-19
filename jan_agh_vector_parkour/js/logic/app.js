class App extends Node{

    constructor(ctx, cvs){

        super();
        this.ctx = ctx;
        this.cvs = cvs;

        this.settings = new Settings();
        this.bkgSound = new Audio("../assets/audio/music.mp3", 0.05, true);
        this.game = new Game(ctx, this.settings);
        this.menu = new Menu(ctx, this.settings);

        this.add(this.game, 'listOfNodes');
        this.add(this.menu, 'listOfNodes');

        window.onmousedown = event => {
            let coordinates = {
                x: event.clientX - this.cvs.offsetLeft - 10, 
                y: event.clientY - this.cvs.offsetTop - 10,
                appCtx: this
            }
            this.notify('click', coordinates, 'listOfNodes');
        };
    }

    switchApp(){
        this.game.isActive = this.menu.isActive;
        this.menu.isActive = !this.game.isActive;
        if(this.game.isActive){
            this.game.loop();
        }
    }
}