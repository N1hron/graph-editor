import Point from './point.js';

export default class GraphEditor {
    constructor(canvas, graph) {
        this.canvas = canvas;
        this.graph = graph;
        this.ctx = canvas.getContext('2d');

        this.selectedPoint = null;
        this.hoveredPoint = null;
    }

    #boundAnimate = this.#animate.bind(this);

    init() {
        this.#addEventListeners();
        this.#animate();
    }

    #addEventListeners() {
        this.canvas.addEventListener('mousedown', event => {
            if (this.hoveredPoint) this.selectedPoint = this.hoveredPoint;
            else {
                const newPoint = new Point(event.offsetX, event.offsetY);

                this.selectedPoint = newPoint;
                this.graph.addPoint(newPoint);
            }
        });

        this.canvas.addEventListener('mousemove', event => {
            this.hoveredPoint = this.getHoveredPoint(event);
        });
    }

    #animate() {
        this.graph.redraw(this.ctx);
        this.drawPointSelection();
        this.drawPointHover();

        requestAnimationFrame(this.#boundAnimate);
    }

    drawPointSelection() {
        if (this.selectedPoint) this.selectedPoint.draw(this.ctx, { selected: true });
    }

    drawPointHover() {
        if (this.hoveredPoint && this.hoveredPoint !== this.selectedPoint) {
            this.hoveredPoint.draw(this.ctx, { hovered: true });
        }
    }

    getHoveredPoint(event) {
        const { offsetX: x, offsetY: y } = event,
              threshhold = 10;

        let minDistance = Number.MAX_SAFE_INTEGER,
            hoveredPoint = null;
        
        for (const p of this.graph.points) {
            const distance = Math.hypot((x - p.x), (y - p.y));
            
            if (distance <= threshhold && distance <= minDistance) {
                minDistance = distance;
                hoveredPoint = p;
            }
        }

        return hoveredPoint;
    }
}