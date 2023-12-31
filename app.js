const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const initial_color = '#2c2c2c';
const canvasSize = 700;

canvas.width = canvasSize;
canvas.height = canvasSize;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvasSize, canvasSize);

ctx.lineWidth = 2.5;
ctx.strokeStyle = initial_color;
ctx.fillStyle = initial_color;

let painting = false;
let filling = false;

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
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const rangeWidth = event.target.value;
    ctx.lineWidth = rangeWidth;
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = 'Заливка';
    } else {
        filling = true;
        mode.innerText = 'Рисование';
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvasSize, canvasSize);
    }
}

function handleCM (event) {
    event.preventDefault();
}

function handleSaveBtnClick() {
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = 'paintJS [Export]';
    link.click();
}

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleCM);
}

Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));

if (range) {
    range.addEventListener('input', handleRangeChange);
}

if (mode) {
    mode.addEventListener('click', handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener('click', handleSaveBtnClick);
}