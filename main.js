Peter_pan_song="";
Harry_potter_theme_song="";
song_Peter_pan="";

leftWristX=0;
leftWristY=0;

rightWristX=0;
rightWristY=0;

scoreleftWrist=0;

function preload()
{
    Harry_potter_theme_song=loadSound("music.mp3");
    Peter_pan_song=loadSound("music2.mp3");
}

function setup()
{
    canvas=createCanvas(600,530);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);

}

function draw()
{
    image(video,0,0,600,530);
    
    fill("#ffff05");
    stroke("#ff0505");

    song_Peter_pan=Peter_pan_song.isPlaying();
    console.log(song_Peter_pan);

    if(scoreleftWrist>0.2)
    {

     circle(leftWristX,leftWristY,20);
     Harry_potter_theme_song.stop();
     if(song_Peter_pan==false)
     {
        Peter_pan_song.play();
     }
     else
     {
        document.getElementById("song_id").innerHTML="Song Name: Peter Pan Song"
     }

    }
}


function modelLoaded()
{
    console.log("Model is Loaded");
}


function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreleftWrist=results[0].pose.keypoints[9].score;
        console.log("scoreleftWrist"+scoreleftWrist);
        
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX="+leftWristX+" leftWristY="+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX="+rightWristX+" rightWristY="+rightWristY);
    }
}
