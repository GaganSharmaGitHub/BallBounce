//functions

     //circle
     function pokemon(x,y,rad,fill){
        c.translate(x, y);
        c.drawImage(fill, -rad, -rad,2*rad,2*rad)
        c.setTransform(1, 0, 0, 1, 0, 0)
        }
    
    function drawBall(x){
       pokemon(x.x,x.y,x.radius,x.fill)
        }
    //classes
    function Ball(x,y,radius,fill,dx,dy){
        this.x=x
        this.y=y
        this.dx=dx
        this.dy=dy
        this.fill=fill
        this.radius=radius
    }
    function character(height,width,x,y,dx,dy,fill){
        this.height=height
        this.width=width
        this.x=x
        this.y=y
        this.dx=dx||0
        this.dy=dy||0
        this.fill=fill
    }
    //defining canvas
    const canvasHeight=Math.round(0.8*screen.availHeight)
    const canvasWidth= Math.round(0.7*screen.availWidth-7)
    const canvas= document.getElementById("area")
    canvas.height=canvasHeight;
    canvas.width=canvasWidth;
    const c= canvas.getContext('2d')
    //resources
    var score= 0;
    var u=new character(50,50,100,100,0,0,"blue");
    var gravity=0
    var gravityDir=5//0=down,1=up,2=left,3=right,5=float
    var pause=true
    var d = new Date();
    var time=0;
    const t0 = d.getTime();
    var previousLevel=0
    var pokeBall = document.getElementById("pokeBall");
    
    //objects
    var ball1=new Ball(Math.round(Math.random()*(canvasWidth-100)+60),Math.round(Math.random()*(canvasHeight-30)),30,pokeBall,4,4)
    //execution
    function animate(){
        if(pause){
            window.addEventListener("keydown", function(event){if(event.keyCode==32){pause=false;return}} ,true)
            c.font = "50px Georgia"
            c.fillText("Paused!",canvasWidth/2,100)
            }
        else{
        c.clearRect(0, 0, canvasWidth, canvasHeight);
        physics()
        ballBounce()
        createChar()
       if(Math.abs(u.x-ball1.x)<ball1.radius&&Math.abs(u.y-ball1.y)<ball1.radius){
            score=score+3}
            
            level()
            if(previousLevel!=Math.round(level())){
             var ch= levelUp(Math.round(level()))
             levelUp(ch)}
             levelRise(level()-Math.floor(level()))
            updateScore()
        d = new Date()
        time=d.getTime()-t0
        document.getElementById("Time").innerHTML=Math.floor((time/1000/60) << 0)+":"+Math.floor((time/1000) % 60)
        window.addEventListener("keydown", function(event){control(event.keyCode)} ,true)
        previousLevel=Math.round(level())    
    }requestAnimationFrame(animate)
    }
    
    //animation
    function ballBounce(){
        drawBall(ball1)
        if(ball1.x+ball1.radius>canvasWidth||ball1.x-ball1.radius<0){ball1.dx=-ball1.dx    
        }
        if(ball1.y+ball1.radius>canvasHeight||ball1.y-ball1.radius<0){ball1.dy=-ball1.dy    
        }
        ball1.x+=ball1.dx
        ball1.y+=ball1.dy
        
    }
    function createChar(p){
        characterDraw(u)
        if(u.x<=0){
        u.dx=10    
        }
        if(u.x+u.width>canvasWidth){
            u.dx=-10
        }
        if(u.y<0){
        u.dy=10}
        if(u.y+u.height>canvasHeight){
            u.dy=-10}
        u.x+=u.dx
        u.y+=u.dy
    }
    function physics(){
        //gravity
        
            u.dy+=gravity
        //friction
        u.dx=Math.round(0.7*u.dx)
        u.dy=Math.round(0.7*u.dy)
    }
    //rectangle
    function characterDraw(p){
    c.fillStyle = p.color;
      c.beginPath();
      c.rect(p.x, p.y, p.width, p.height);
      c.fill();
      c.strokeStyle = "#202830";}
    //move
    function control(p){
        
        switch(p) {
            case 32://space
            pause=true 
            case 37:// left key
              if(gravityDir!=2){u.dx=-12;}
            break;
            case 38:// up key
            if(gravityDir!=0){u.dy=-12;}
            break;
            case 39:// right key
            if(gravityDir!=3){u.dx=12}
            break;  
            case 40:// right key
            if(gravityDir!=1){u.dy=12}
            break;
          }   
        }
               
    //user
    function updateScore(){
        document.getElementById("score").innerHTML=score
    }        
    function level(){
     var level = Math.floor(5 + Math.sqrt(25 +  8*score)) / 10
     document.getElementById("Level").innerHTML=level
     return level
    }
 function   levelUp(x){
     console.log(x)
     switch(x){
     case 3:
       document.getElementById("body").style.backgroundImage = "url(./city.jpg)";
    case 5:
        ball1.fill="red"

    }
    if(x==9){
        document.getElementById("body").style.backgroundImage = "url(./retro.jpg)"; }
    }
animate()
 function   levelUp(x){
     document.getElementById("levelUpAudio").play()
     console.log(x)
     if(x==3){
       document.getElementById("area").style.backgroundImage = "url(./city.jpg)"
   } 
   if(x==5){
        ball1.fill="red"}
    if(x==9){
        document.getElementById("area").style.backgroundImage = "url(./retro.jpg)" }
    if(x==12){
           ball1.radius=Math.round(0.6*ball1.radius) }
    
    if(x==16){
        document.getElementById("area").style.backgroundImage = "url(./bg.jpg)"}}


animate()
function levelRise(x)  
    {var risepercent=-Math.round((1-x)*100)
        document.getElementById("gameData").style.backgroundPositionY=risepercent+"%"
        console.log("rise"+risepercent)
    }
    function test()
    {score++}
    
    
    //demo
    
    
    
    