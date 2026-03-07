import { Point } from "./Point.js"

class Rectangle {
    constructor(left, top, width, height, color){
        this.left = left
        this.top = top
        this.width = width
        this.height = height
        this.color = color
    }
    //Getters
    get area(){
        return this.width * this.height
    }
    
    move(x, y){
        if(this.left += x < 0 ) showMessage("Cannot move outside the canvas, min x value is 0")    
        else if(this.left + this.width + x > 800) showMessage("Cannot move outside the canvas, max x value is 800 - rectangle width")
        else if(this.top + y < 0) showMessage("Cannot move outside the canvas, min y value is 0")    
        else if(this.top + this.height + y > 600) showMessage("Cannot move outside the canvas, max y value is 600 - rectangle height")   
            else {
        this.left += x
        this.top += y
            }
    }
    keyboardMove(direction){
        if(direction === "ArrowUp" && this.top > 0){    
            this.top -= 1
        }
        else if(direction === "ArrowDown" && this.top < 600 - this.height){
            this.top += 1
        }
        else if(direction === "ArrowLeft" && this.left > 0){
            this.left -= 1
        }
        else if(direction === "ArrowRight" && this.left < 800 - this.width){
            this.left += 1
        }
    }

    overlap(rect){
        const L1 = new Point(this.left, this.top)
        const R1 = new Point(this.left + this.width, this.top + this.height)
        const L2 = new Point(rect.left, rect.top)
        const R2 = new Point(rect.left + rect.width, rect.top + rect.height)

        // If one rectangle is on left side of other
        if (L2.x > R1.x || L1.x > R2.x  ) {
            return false
        }
        // If one rectangle is above other
        if (L2.y > R1.y || L1.y > R2.y) {
            return false
        }
        return true
    }


   drawRectangle(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.left, this.top, this.width, this.height);
    ctx.border = "4px solid black";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.left, this.top, this.width, this.height);
} 
}

export { Rectangle } 