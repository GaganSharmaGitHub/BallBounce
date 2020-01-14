


//functions

     //circle
     function circle(x,y,rad,fill,color,lineWidth){
        c.translate(x, y);
        c.beginPath()
        c.lineWidth=lineWidth
        c.arc(0,0,rad,0,Math.PI*2,false)
        c.fillStyle=fill
        c.fill()
        c.strokeStyle=color
        c.stroke()
        c.setTransform(1, 0, 0, 1, 0, 0)
        }
    
    function drawBall(x){
       circle(x.x,x.y,x.radius,x.fill,x.color,x.lineWidth)
        }
    //classes
    function Ball(x,y,radius,color,fill,dx,dy,lineWidth){
        this.x=x
        this.y=y
        this.dx=dx
        this.dy=dy
        this.color=color||"black"
        this.fill=fill
        this.radius=radius
        this.lineWidth=lineWidth
    }
    function character(height,width,x,y,dx,dy,color){
        this.height=height
        this.width=width
        this.x=x
        this.y=y||canvasHeight
        this.dx=dx||0
        this.dy=dy||0
        this.color=color||"red"
    }
    //defining canvas
    const canvasHeight=Math.round(0.8*screen.availHeight)
    const canvasWidth= Math.round(0.7*screen.availWidth-7)
    const canvas= document.getElementById("area")
    canvas.height=canvasHeight;
    canvas.width=canvasWidth;
    const c= canvas.getContext('2d')
    //resources
    
    //objects
    var ball1=new Ball(Math.round(Math.random()*(canvasWidth-100)+60),Math.round(Math.random()*(canvasHeight-30)),30,"black","gray",10,4,5)
    var score= 0;
    var u=new character(50,50,100,100,0,0,"blue");
    var gravity=0
    var gravityDir=0//0=down,1=up,2=left,3=right,5=float
    var pause=false
    var d = new Date();
    var time=0;
    const t0 = d.getTime();
    var previousLevel=0
    //execution
    function animate(){
        if(pause){
            window.addEventListener("keydown", function(event){if(event.keyCode=32){pause=false;return}} ,true)
            }
        else{
        c.clearRect(0, 0, canvasWidth, canvasHeight);
        physics()
        score++
        ballBounce()
        createChar()
       if(Math.abs(u.x-ball1.x)<ball1.radius&&Math.abs(u.y-ball1.y)<ball1.radius){
            score=score+3}
            
            level()
            if(previousLevel!=Math.round(level())){
             var ch= levelUp(Math.round(level()))
             levelUp(ch)}
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
        if(u.x+u.width>canvasWidth||u.x<=0){
        u.dx=-u.dx    
        }
        if(u.y+u.height>canvasHeight||u.y<0){
        u.dy=-u.dy}
        
        u.x+=u.dx
        u.y+=u.dy
    }
    function physics(){
        //gravity
        
            u.dy+=gravity
        //friction
        u.dx=Math.round(0.9*u.dx)
        u.dy=Math.round(0.9*u.dy)
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
              if(gravityDir!=2){u.dx=-6;}
            break;
            case 38:// up key
            if(gravityDir!=0){u.dy=-5;}
            break;
            case 39:// right key
            if(gravityDir!=3){u.dx=6}
            break;  
            case 40:// right key
            if(gravityDir!=1){u.dy=6}
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
    
    
    
    
    
    //demo
    
    
    
    