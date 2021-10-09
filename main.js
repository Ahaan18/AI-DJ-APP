song = "";
rightwristx = 0;
rightwristy = 0;
leftwristx = 0;
leftwristy = 0;
scorerightwrist = 0;
scoreleftwrist = 0;
function preload(){
song = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
   x = ml5.poseNet(video, modelloaded);
   x.on('pose', gotposes);
}

function pplay(){
    song.play();
}
function modelloaded(){
console.log("poses loaded");
}
function gotposes(result){
if(result.length > 0){
    console.log(result);
    rightwristx = result[0].pose.rightWrist.x;
    rightwristy = result[0].pose.rightWrist.y;
    console.log("rightwrist ", rightwristx, rightwristy);
    leftwristy = result[0].pose.leftWrist.y;
    leftwristx = result[0].pose.leftWrist.x;
    console.log("leftwrist ", leftwristx, leftwristy);
    scorerightwrist = result[0].pose.keypoints[10].score;
    scoreleftwrist = result[0].pose.keypoints[9].score;
    console.log("score "+scoreleftwrist, scorerightwrist);
}
}
function draw(){
    image(video, 0, 0, 600, 500);
    stroke("#00FF00");
    fill("#FF0000");
    if(scoreleftwrist > 0.2){
    circle(leftwristx, leftwristy, 20);
    numberleftwristy = Number(leftwristy);
    leftynodecimal = floor(numberleftwristy);
    leftwristresult = leftynodecimal / 500;
    document.getElementById("volume").innerHTML = "Volume: "+leftwristresult;
    song.setVolume(leftwristresult);
    }
    if(scorerightwrist > 0.2){
        circle(rightwristx, rightwristy, 20);
        if(rightwristy > 0 && rightwristy <= 100){
            document.getElementById('speed').innerHTML = "Speed: 0.5x";
            song.rate(0.5);
        }
        else if(rightwristy > 100 && rightwristy <= 200){
            document.getElementById('speed').innerHTML = "Speed: 1x";
            song.rate(1);
        }
        else if(rightwristy > 200 && rightwristy <= 300){
            document.getElementById('speed').innerHTML = "Speed: 1.5x";
            song.rate(1.5);
        }
        else if(rightwristy > 300 && rightwristy <= 400){
            document.getElementById('speed').innerHTML = "Speed: 2x";
            song.rate(2);  
        }
        else if(rightwristy > 400){
            document.getElementById('speed').innerHTML = "Speed: 2.5x";
            song.rate(2.5); 
        }
    }
}