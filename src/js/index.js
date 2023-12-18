import Point from './point.js';

const canvas = document.getElementById('canvas');

canvas.width = 600;
canvas.height = 600;

const ctx = canvas.getContext('2d');

new Point(300, 300).draw(ctx);
