export default class Segment {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;

        // console.log(`Created segment with points (${this.p1.x}; ${this.p1.y}), (${this.p2.x}; ${this.p2.y})`);
    }

    draw(ctx, width = 2, color = '#959595') {
        const { x: x1, y: y1 } = this.p1,
              { x: x2, y: y2 } = this.p2;

        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    equals(segment) {
        return this.hasPoint(segment.p1) && this.hasPoint(segment.p2);
    }

    hasPoint(point) {
        return this.p1.equals(point) || this.p2.equals(point);
    }

    hasIdenticalPoints() {
        return this.p1.equals(this.p2);
    }
}