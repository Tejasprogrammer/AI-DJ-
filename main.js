
song=""

function preload()
{
    song=loadSound("music.mp3");
}

rightwristx=0;
rightwristy=0;

leftwristx=0;
leftwristy=0;

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
    consoole.log("poseNet is Initialized");
}

function gotPoses(results)
{
if(results.length > 0)
{
    console.log(results);
    score_rightwrist=results[0].pose.keypoints[10].score;

    score_leftwrist=results[0].pose.keypoints[9].score;

    console.log("score_rightwrist="+score_rightwrist+ "score_leftwrist="+score_leftwrist);

    rightwristx=results[0].pose.rightwrist.x;
    
    rightwristy=results[0].pose.rightwrist.y;

    console.log("right_wristx="+rightwristx + "right_wristy="+ rightwristy);

    leftwristx=results[0].pose.leftwrist.x;
    
    leftwristy=results[0].pose.leftwrist.y;

    console.log("left_wristx="+leftwristx + "left_wristy="+ lefttwristy);
}}

function draw()
{
    image(video, 0 , 0, 600, 600);
    fill("#fa0707");
    stroke("#0d0d0d");

    if(score_rightwrist > 0.2)
    {
        circle(rightwristx , rightwristy , 20)

        if(rightwristy > 0 && rightwristy <= 100)
        {
            document.getElementById("speed").innerHTML="Speed = 0.5x";
            song.rate(0.5);
        }

        else if(rightwristy>100 && rightwristy<=200)
        {
            document.getElementById("speed").innerHTML="Speed = 1x";
            song.rate(1);
        }

        else if(rightwristy > 200 && rightwristy <=300)
        {
            document.getElementById("speed").innerHTML="Speed = 1.5x";
            song.rate(1.5);
        }

        else if(rightwristy > 300 && rightwristy <= 400)
        {
            document.getElementById("speed").innerHTML="Speed = 2x";
            song.rate(2);
        }

        else if(rightwristy > 400)
        {
            document.getElementById("speed").innerHTML="Speed = 2.5x";
            song.rate(2.5);
        }
    }


}

