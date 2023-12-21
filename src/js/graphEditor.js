import Point from './point.js';
import Segment from './segment.js';
import getNearestPoint from './utils/getNearestPoint.js';

export default class GraphEditor {
    constructor(canvas, graph) {
        this.canvas = canvas;
        this.graph = graph;

        this.ctx = canvas.getContext('2d');

        this.selectedPoint = null;
        this.hoveredPoint = null;

        this.dragging = false;
    }

    #boundAnimate = this.#animate.bind(this);

    init() {
        this.#addEventListeners();
        this.#animate();
    }

    #addEventListeners() {
        this.canvas.addEventListener('mousedown', event => this.#handleMouseDown(event));
        this.canvas.addEventListener('mousemove', event => this.#handleMouseMove(event));
        this.canvas.addEventListener('mouseup', () => this.dragging = false);
        this.canvas.addEventListener('mouseleave', () => this.hoveredPoint = null);
        this.canvas.addEventListener('contextmenu', event => event.preventDefault());
    }

    #animate() {
        this.graph.redraw(this.ctx);
        
        this.#drawPointSelection();
        this.#drawPointHover();

        requestAnimationFrame(this.#boundAnimate);
    }

    #drawPointSelection() {
        if (this.selectedPoint) {
            this.selectedPoint.draw(this.ctx, { selected: true });
        }
    }

    #drawPointHover() {
        if (this.hoveredPoint && this.hoveredPoint !== this.selectedPoint) {
            this.hoveredPoint.draw(this.ctx, { hovered: true });
        }
    }

    #handleMouseDown(event) {
        const button = event.button;

        switch (button) {
            case 0: // Left click
                this.#selectOrCreatePoint(event);
                break;
            case 2: // Right click
                this.#removeHoveredPoint();
                break;
        }
    }

    #handleMouseMove(event) {
        const [x, y] = [event.offsetX, event.offsetY];

        this.hoveredPoint = getNearestPoint({x, y}, this.graph.points, 10);

        if (this.dragging) {
            this.selectedPoint.x = event.offsetX;
            this.selectedPoint.y = event.offsetY;
        }
    }

    #removeHoveredPoint() {
        if (this.hoveredPoint) {
            this.graph.removePoint(this.hoveredPoint);
            if (this.hoveredPoint === this.selectedPoint) this.selectedPoint = null;
            this.hoveredPoint = null;
        }
        
    }

    #selectOrCreatePoint(event) {
        let previouslySelectedPoint = this.selectedPoint;

        if (this.hoveredPoint) {
            this.selectedPoint = this.hoveredPoint;
            this.dragging = true;
        } else {
            const newPoint = new Point(event.offsetX, event.offsetY);

            this.selectedPoint = newPoint;
            this.hoveredPoint = this.selectedPoint;

            this.graph.addPoint(newPoint);
        }

        if (previouslySelectedPoint) {
            this.graph.addSegment(new Segment(
                previouslySelectedPoint, 
                this.selectedPoint
            ));
        }
    }
}