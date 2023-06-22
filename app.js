const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');

canvas.width = 700;
canvas.height = 700;

ctx.lineWidth = 2.5;
ctx.strokeStyle = '#2c2c2c'

let painting = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    let x = event.offsetX;
    let y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(event) {
    startPainting();
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

function handleRangeChange(event) {
    const rangeWidth = event.target.value;
    ctx.lineWidth = rangeWidth;

}

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting)
}

Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));

if (range) {
    range.addEventListener('input', handleRangeChange);
}