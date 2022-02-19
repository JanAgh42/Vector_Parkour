class Settings{

    constructor(){

        this.music = true;
        this.sounds = true;
        this.arrows = true;
    }

    changeMusic(source){
        this.music = !this.music;
        this.music ? source.playAudio() : source.stopAudio();
    }

    changeSounds(){
        this.sounds = !this.sounds;
    }

    changeControls(){
        this.arrows = !this.arrows;
    }
}