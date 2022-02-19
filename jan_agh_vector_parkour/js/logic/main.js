
let canvas, ctx, app;

window.onload = () => {

    canvas = document.querySelector('canvas');
    ctx = canvas.getContext("2d");
    
    canvas.width = 1000;
    canvas.height = 600;

    app = new App(ctx, canvas);
}

function init(){
    document.querySelector('#init').style.display = 'none';
    canvas.style.display = 'block';
    app.switchApp();
    app.bkgSound.playAudio();
}