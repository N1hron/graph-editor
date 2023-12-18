export default class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        
        console.log(`Created point (${this.x}, ${this.y})`);
    }

    draw(ctx, radius = 9, color = '#000000de') {
        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();
    }
}