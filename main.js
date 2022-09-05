
song=""

function preload()
{
    song=loadSound("music.mp3");
}

rightwristX=0;
rightwristY=0;

leftwristX=0;
leftwristY=0;

score_rightwrist=0;
score_leftwrist=0;

function setup()
{
    canvas=createCanvas(600,600);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video , modelLoaded);
    poseNet.on("pose" , gotPoses);
}

function modelLoaded()
{
    console.log("poseNet is Initialized");
}

function gotPoses(results)
{
if(results.length > 0)
{
    console.log(results);
    score_rightwrist=results[0].pose.keypoints[10].score;

    score_leftwrist=results[0].pose.keypoints[9].score;
    console.log("scoreleftwrist =" + score_leftwrist);

    console.log("score_rightwrist="+score_rightwrist+ "score_leftwrist="+score_leftwrist);

    rightwristX=results[0].pose.rightwrist.x;
    
    rightwristY=results[0].pose.rightwrist.y;

    console.log("right_wristX="+rightwristX + "right_wristY="+ rightwristY);

    leftwristX=results[0].pose.leftwrist.x;
    
    leftwristY=results[0].pose.leftwrist.y;

    console.log("left_wristX="+leftwristX + "left_wristY="+ lefttwristY);
}}

function draw()
{
    image(video, 0 , 0, 600, 600);
    fill("#fa0707");
    stroke("#0d0d0d");

    circle(leftwristX,leftwristY,20)

    if(score_rightwrist > 0.2)
    {
        if(rightwristY > 0 && rightwristY <= 100)
        {
            document.getElementById("speed").innerHTML="Speed = 0.5x";
            song.rate(0.5);
        }

        else if(rightwristY>100 && rightwristY<=200)
        {
            document.getElementById("speed").innerHTML="Speed = 1x";
            song.rate(1);
        }

        else if(rightwristY > 200 && rightwristY <=300)
        {
            document.getElementById("speed").innerHTML="Speed = 1.5x";
            song.rate(1.5);
        }

        else if(rightwristY > 300 && rightwristY <= 400)
        {
            document.getElementById("speed").innerHTML="Speed = 2x";
            song.rate(2);
        }

        else if(rightwristY > 400)
        {
            document.getElementById("speed").innerHTML="Speed = 2.5x";
            song.rate(2.5);
        }
    }

    if(score_leftwrist > 0.2)
    {
        circle(leftwristX,leftwristY,20);
        Innumber_leftwristy=Number(leftwristY);
        remove_decimals=floor(Innumber_leftwristy);
        volume=remove_decimals/500;
        document.getElementById("volume").innerHTML="volume ="+volume;
        song.setvolume(volume);

    }
}

function play()
{
song.play();
song.setvolume(1);
song.rate(1);
}