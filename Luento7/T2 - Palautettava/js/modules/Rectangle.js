import { Point } from "./Point.js"

class Rectangle {
    constructor(left, top, width, height, color) {
        this.left = left
        this.top = top
        this.width = width
        this.height = height
        this.color = color
    }
    //Getters
    get area() {
        return this.width * this.height
    }

    move(x, y, canvas) {
        if (isNaN(x) || isNaN(y)) return ("Please enter a number to both fields")
        if (x < 0) return ("Cannot move outside the canvas, min x value is 0")
        else if (x + this.width > 800) return (`Cannot move outside the canvas, max x value is ${canvas.width - this.width}`)
        if (y < 0) return ("Cannot move outside the canvas, min y value is 0")
        else if (y + this.height > 600) return (`Cannot move outside the canvas, max y value is ${canvas.height - this.height}`)
        this.top = y
        this.left = x
    }

    keyboardMove(direction, speed) {
        if (direction === "ArrowUp" && this.top > 0) {
            this.top -= speed
        }
        else if (direction === "ArrowDown" && this.top < 600 - this.height) {
            this.top += speed
        }
        else if (direction === "ArrowLeft" && this.left > 0) {
            this.left -= speed
        }
        else if (direction === "ArrowRight" && this.left < 800 - this.width) {
            this.left += speed
        }
    }
    //Takes the form data as parameter data = {left:string, top:string, width:string, height:string}
    modify(formData, canvas) {
        const left = parseInt(formData.get("left") ?? this.left);
        const top = parseInt(formData.get("top") ?? this.top);
        const width = parseInt(formData.get("width") ?? this.width);
        const height = parseInt(formData.get("height") ?? this.height);

        // verify that the requested rectangle would fit on the requested position on the canvas
        if (left < 0) return ("Min left value is 0")
        if (left > canvas.width) return `Max left value is ${canvas.width}`
        if (top > canvas.height) return `Max top value is ${canvas.height}`
        else if (left + width > canvas.width) return (`Cannot move outside the canvas, max width value is ${canvas.width - left}`)
        if (top < 0) return ("Cannot move outside the canvas, min top value is 0")
        else if (top + height > canvas.height) return (`Cannot move outside the canvas, max height value is ${canvas.height - top}`)

        // execute the request
        this.width = width;
        this.height = height;
        this.move(left, top, canvas)


    }

    overlap(rect) {
        const L1 = new Point(this.left, this.top)
        const R1 = new Point(this.left + this.width, this.top + this.height)
        const L2 = new Point(rect.left, rect.top)
        const R2 = new Point(rect.left + rect.width, rect.top + rect.height)

        // If one rectangle is on left side of other
        if (L2.x > R1.x || L1.x > R2.x) {
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
        ctx.strokeRect(this.left, this.top, this.width, this.height);
    }
}

export { Rectangle } 