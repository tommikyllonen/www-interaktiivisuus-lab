import { Point } from "./Point.js"

class Circle {
    constructor(centerX, centerY, radius){
        this.centerX = centerX,
        this.centerY = centerY,
        this.radius = radius
    }
    //Getters
    get perimeter(){
        return this.radius * 2 * Math.PI
    }

    get area(){
        return Math.PI * Math.pow(this.radius, 2)
    }
    move(x, y){
        this.centerX += x
        this.centerY += y
    }
    // pythagorean theorem: a^2 + b^2 = c^2
    // distance = sqrt((x2 - x1)^2 + (y2 - y1)^2)
    // If distance is greater than radius, point is outside the circle
    isInsideCircle(point){
        const a = point.x - this.centerX
        const b = point.y - this.centerY
        const distance = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
        if(distance > this.radius) console.log("Point is OUTside the circle")
        else if(distance < this.radius) console.log("Point is INside the circle")
        else console.log("Point is on the circle")
    }
}

export { Circle } 