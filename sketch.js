var ball;
var position, database, ballPos
var bg, balloon

function preload(){
    bg = loadImage("images/bg.png")
    balloon = loadImage("images/1.png")
}

function setup(){
    createCanvas(1500,700);

database = firebase.database()

    ball = createSprite(250,650,150,150);
    ball.addImage(balloon)
    ball.scale = 0.5
    ballPos = database.ref('ball/positions')
    ballPos.on("value", read)
}

function draw(){
    background(bg);
    if(keyDown(LEFT_ARROW)){
        writePosition(-10,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(10,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-10);
        ball.scale = ball.scale - 0.005
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+10);
        ball.scale = ball.scale + 0.005
    }
    drawSprites();
}

function writePosition(x,y){
    
database.ref('ball/positions').set({
    'x': position.x +x, 
    'y': position.y +y
})

}

function read(data){

position = data.val()
ball.x = position.x
ball.y = position.y
}
