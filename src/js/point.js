export default class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        
        // console.log(`Created point (${this.x}; ${this.y})`);
    }

    equals(point) {
        return point.x == this.x && this.y == point.y;
    }

    draw(ctx, radius = 8, color = '#959595') {
        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();
    }
}