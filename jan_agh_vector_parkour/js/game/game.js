class Game extends Node{

    constructor(ctx, settings){
        
        super();
        this.ctx = ctx;
        this.settings = settings;
        this.level = 0;
        this.totalScore = 0;
        this.k = undefined;
        this.sounds = {};
        this.keys = new Array();
        this.lvl = new Level();
        this.anim = new Anim(this);
        this.pause = new Button(950, 20, 20, 30, '#pause', this.ctx);
        this.music = new Button(20, 540, 40, 40, '#zvuk', this.ctx);
        this.sound = new Button(80, 540, 40, 40, '#hlas', this.ctx);
        this.isActive = false;
        
        this.setListeners();
        this.createScene(true);
        this.anim.initAnimations();
        this.loop = this.loop.bind(this);
    }

    createScene(reload){
        this.addNewArray('listOfObjs');
        this.bkg = new Background(0, 150);
        this.trapLength = this.loadLevel().traps.length;
        this.platLength = this.loadLevel().platforms.length;
        this.col = 0;
        this.over = false;

        for(let trap of this.loadLevel().traps){
            this.add(new Trap(trap[0], trap[1], this.ctx, this), 'listOfObjs');
        }
        for(let plat of this.loadLevel().platforms){
            this.add(new Platform(plat[0], plat[1], plat[2], this), 'listOfObjs');
        }
        if(reload){
            this.player = new Player(450, 200, ctx, this);
            this.time = Date.now();
        }
        for(let star of this.loadLevel().collectibles){
            this.add(new Collectible(star[0], star[1], this.player.collects[this.col], this.col++, this), 'listOfObjs');
        }

        this.loadScreens();
        this.loadSounds();
    }

    loadLevel(){
        switch(this.level){
            case 0:
                return this.lvl.loadLevel1();
            case 1:
                return this.lvl.loadLevel2();
            case 2:
                return this.lvl.loadLevel3();
        }
    }

    loadSounds(){
        this.sounds.jump = new Audio("../assets/audio/jump.wav", 0.4, false);
        this.sounds.run = new Audio("../assets/audio/run.wav", 0.5, false);
        this.sounds.collect = new Audio("../assets/audio/collect.wav", 0.5, false);
        this.sounds.levelcmpl = new Audio("../assets/audio/levelcmpl.wav", 0.9, false);
        this.sounds.gameover = new Audio("../assets/audio/gameover.wav", 0.5, false);
        this.sounds.death = new Audio("../assets/audio/death.wav", 0.1, false);
        this.sounds.vic = new Audio("../assets/audio/victorycry.wav", 0.5, false);
    }

    loadScreens(){
        this.add(new PauseMenu(this.ctx, this), 'listOfNodes');
        this.add(new GameOverMenu(this.ctx, this), 'listOfNodes');
        this.add(new LevelPassedMenu(this.ctx, this), 'listOfNodes');
        this.add(new LevelFailedMenu(this.ctx, this), 'listOfNodes');
        this.add(new Victory(this.ctx, this), 'listOfNodes');
    }

    delta(){
        let curr_time = Date.now();
        let delta = ((curr_time - this.time) / 100 > 0.15 ? 0.15 : (curr_time - this.time) / 100);
        this.time = curr_time;
        return delta;
    }

    loop(){
        this.k = undefined;
            let d = this.delta();
            this.move(d);
            this.draw();
        if(!this.k){
            this.k = requestAnimationFrame(this.loop);
        }
        this.gameOver();
    }

    stopGame(){
        cancelAnimationFrame(this.k);
        this.k = undefined;
        this.sounds.run.stopAudio();
    }

    draw(){
        this.ctx.fillStyle = "rgb(85, 3, 0)";
        this.ctx.fillRect(0, 0, 1000, 600);
        this.bkg.draw(ctx);
        for (let obj of this.listOfObjs) {
            obj.draw(ctx);
        }
        this.player.draw();
    }

    setListeners(){
        window.onkeydown = event => {
            this.keys[event.keyCode] = true;  
        }
        window.onkeyup = event => {
            this.keys[event.keyCode] = false;   
        }
        this.pause.onClick = () => {
            if(this.k){
                this.stopGame();
                this.listOfNodes[0].isActive = true;
                this.listOfNodes[0].draw();
            }
        }
        this.sound.onClick = () => {
            this.settings.changeSounds();
        } 
        this.music.onClick = coords => {
            this.settings.changeMusic(coords.appCtx.bkgSound);
        }
    }

    move(d){
            if(this.settings.arrows ? this.keys[39] : this.keys[68]){
                this.moveMap(d, 6, this.player.isJumping ? 2 : 0, -25, this.checkCollision());
            }
            else if(this.settings.arrows ? this.keys[37] : this.keys[65]){
                this.moveMap(d, 6,  this.player.isJumping ? 3 : 1, 25, this.checkCollision());
            }
            else{
                this.moveMap(d, 2, 4, 0, this.checkCollision());
            }
            this.anim.trapAnim();
    }

    gameOver(){

        let fall = (this.listOfObjs[0].pos_y < -1500 ? true : false);
        let end = (this.listOfObjs[this.trapLength + this.platLength - 1].pos_x < 200 ? true : false);

        if(this.over || fall || end){
            this.stopGame();
            if(this.player.lives >= 1){
                if(this.player.checkIfPassed() && !this.over && !fall && end){
                    this.totalScore += this.player.sc;
                    if(this.level == 2){
                        this.listOfNodes[4].isActive = true;
                        this.listOfNodes[4].draw();
                    }
                    else{
                        this.listOfNodes[2].isActive = true;
                        this.listOfNodes[2].draw();
                    }
                }
                else{
                    if(this.player.lives > 1){
                        this.listOfNodes[3].isActive = true;
                        this.listOfNodes[3].draw();
                    }
                    else{
                        this.listOfNodes[1].isActive = true;
                        this.listOfNodes[1].draw();
                    }
                }
            }
        }
    }

    uploadScore(){
        let entry = localStorage.getItem('highScores');
        let entry2 = localStorage.getItem('scoreDates');
        let time = new Date().toLocaleString().replace(', ', ' ');

        this.highScores = entry ? entry.split(',') : new Array();
        this.dates = entry2 ? entry2.split(',') : new Array();

        for(let x = 0; x < this.highScores.length; x++){
            this.highScores[x] = parseInt(this.highScores[x]);
        }

        this.highScores.push(this.totalScore);
        this.dates.push(time);
        this.bubbleSort();
        this.totalScore = 0;

        localStorage.setItem('highScores', this.highScores.toString());
        localStorage.setItem('scoreDates', this.dates.toString());
    }

    bubbleSort(){
        let length = this.highScores.length, helper;

        for(let x = 0; x < length; x++){
            for(let y = 0; y < length; y++){
                if(this.highScores[y] < this.highScores[y + 1]){
                    helper = this.highScores[y];
                    this.highScores[y] = this.highScores[y + 1];
                    this.highScores[y + 1] = helper;
                    helper = this.dates[y];
                    this.dates[y] = this.dates[y + 1];
                    this.dates[y + 1] = helper;
                }
            }
        }
    }

    click(coords){
        coords.genCtx = this;
        this.pause.click(coords);
        this.music.click(coords);
        this.sound.click(coords);
        this.notify('click', coords, 'listOfNodes');
    }

    moveMap(delta, num_x, num_y, dx, dy){
        
        this.anim.playerAnim(num_x, num_y);
        this.bkg.move(delta, dx);
        for (let obj of this.listOfObjs){
            obj.move(delta, dx, dy);
        }
        (dy == 0 && dx != 0 && this.settings.sounds ? this.sounds.run.playAudio() : this.sounds.run.stopAudio());
    }

    checkCollision(){
    let dy = 0;
        for(let obj of this.listOfObjs){
            dy += (obj.collision(this.player.pos_x, this.player.pos_y) ? 0 : 1);
        }
        dy = (dy ? 0 : -3);
        if(((this.settings.arrows ? this.keys[38] || this.keys[40] : this.keys[87] || this.keys[83]) || this.keys[32]) && !this.player.isJumping && !dy){
                dy = this.player.jump();
                if(this.settings.arrows ? this.keys[40] : this.keys[83]){
                    this.listOfObjs[this.trapLength].notify('collisionDetected', -50);
                    dy = -5;
                }
            }
        return dy;
    }
}