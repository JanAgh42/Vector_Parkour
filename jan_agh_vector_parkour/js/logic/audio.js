class Audio{

    constructor(source, vol, loop){

        this.audio = document.createElement('audio');
        this.audio.setAttribute('preload', 'auto');
        this.audio.style.display = 'none';
        this.audio.controls = false;
        this.audio.src = source;
        this.audio.volume = vol;
        this.audio.loop = loop;

        document.body.appendChild(this.audio);
    }

    playAudio(){
        this.audio.play();
    }

    stopAudio(){
        this.audio.pause();
        this.audio.currentTime = 0;
    }
}