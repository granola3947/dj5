song="";
stump="";
edgie="";
leftWristX=0;
rightWristX=0;
leftWristY=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
results="";
songStatusStump="";
songStatusEdgie="";

function play(){
    song.play;
    //song.setVolume(1);
    //song.rate(1);
}

function preload(){
stump = loadSound("stump.mp3");
edgie = loadSound("edgie.mp3");  
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video,0,0,600,500);

    songStatusStump = stump.isPlaying();
    songStatusEdgie = edgie.isPlaying();

    fill("#FF0000");
    stroke("FF0000");
    if(scoreLeftWrist > 0.2){

        circle(leftWristX, leftWristY, 20);
        /*inNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(inNumberleftWristY);
        leftWristY_divide_1000 = remove_decimals/1000;
        volume = leftWristY/1000 *2;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume); */ 

        edgie.stop;

            if(songStatusStump==false){
                stump.play();
                document.getElementById("header2").innerHTML=stump;
            }
        }

        if(scoreRightWrist > 0.2){

            circle(rightWristX, rightWristY, 20);
           /* inNumberleftWristY = Number(leftWristY);
            remove_decimals = floor(inNumberleftWristY);
            leftWristY_divide_1000 = remove_decimals/1000;
            volume = leftWristY/1000 *2;
            document.getElementById("volume").innerHTML = "Volume = " + volume;
            song.setVolume(volume); */ 
    
            stump.stop;
    
                if(songStatusEdgie==false){
                    edgie.play();
                    document.getElementById("header2").innerHTML=edgie;
                }
            }
}

function modelLoaded(){
    console.log('Posenet Is Initialized');
}

function gotPoses(results){
    console.log(results);
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist" + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

        /*console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist);

        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);*/
    }
}