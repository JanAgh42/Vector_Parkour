
class ScoreMenu extends Node{

    constructor(ctx){

        super();
        this.ctx = ctx;
        this.isActive = false;

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

    loadScores(){
        let scores = localStorage.getItem('highScores');
        let dates = localStorage.getItem('scoreDates');
        scores = scores ? scores.split(',') : scores;
        dates = dates ? dates.split(',') : dates;

        this.ctx.font = "700 40px Arial";
        this.ctx.fillStyle = "rgb(122, 218, 192)";

        if(scores){
            let length = scores.length;
            length = length && length > 0 && length < 6 ? length : 5;
            
            for(let x = 0; x < length; x++){
                this.ctx.fillText((x + 1) + '.', 100, 200 + x * 60, 100);
                this.ctx.fillText(scores[x], 260, 200 + x * 60, 240);
                this.ctx.fillText(dates[x], 500, 200 + x * 60, 400);
            }
        }
        else{
            this.ctx.font = "700 60px Arial";
            this.ctx.fillText('Žiadne skóre', 350, 300, 300);
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
        this.loadScores();
        for(let x of this.listOfNodes){
            x.draw();
        }
    }
} 