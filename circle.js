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
