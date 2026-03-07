import { Point } from "./modules/Point.js"
import { Circle } from "./modules/Circle.js"


const pt1 = new Point(100, 100)
const circle1 = new Circle(50, 50, 75)

console.log(`Circle x: ${circle1.centerX}, Circle y: ${circle1.centerY}, Circle radius: ${circle1.radius}`)


// console.log(circle1.perimeter)
// circle1.move(30, 40)
console.log(`Circle x: ${circle1.centerX}, Circle y: ${circle1.centerY}, Circle radius: ${circle1.radius}`)

circle1.isInsideCircle(pt1)
circle1.move(-100, -100)
circle1.isInsideCircle(pt1)