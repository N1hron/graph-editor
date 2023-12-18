import Point from './point.js';
import Segment from './segment.js';
import Graph from './graph.js';

const canvas = document.getElementById('canvas');

canvas.width = 600;
canvas.height = 600;

const ctx = canvas.getContext('2d');

const p1 = new Point(20, 20),
      p2 = new Point(580, 580),
      p3 = new Point(580, 20),
      p4 = new Point(20, 580);

const s1 = new Segment(p1, p2),
      s2 = new Segment(p2, p3),
      s3 = new Segment(p1, p4);

const graph = new Graph([ p1, p2, p3, p4 ], [ s1, s2, s3 ]);

graph.draw(ctx);