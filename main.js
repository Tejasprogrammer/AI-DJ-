
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
    canvas=createCanvas(600,530);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video , modelLoaded);
    poseNet.on("pose" , gotPoses);
}

function modelLoaded()
{
    consoole.log("poseNet is Initilised");
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
}

}

function draw()
{
    image(video, 0 , 0, 600, 530);


}
