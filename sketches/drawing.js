let drawingArray = [];

const drawing = (sketch) => {
    let indexOfMouse;
    let isPainting;



    sketch.setup = function () {
       sketch.createCanvas(280, 280);
        sketch.background(200);
        sketch.noStroke();
        sketch.eraseDrawing();
    }

    sketch.draw = function () {
        if (isPainting && sketch.mouseX >= 0 && sketch.mouseX < 280 && sketch.mouseY >= 0 && sketch.mouseY < 280) {
            indexOfMouse = Math.trunc(sketch.mouseY / 10) * 28 + Math.trunc(sketch.mouseX / 10);
            drawingArray[indexOfMouse] = 0;
        }
        for (let i = 0; i < 28; ++i) {
            for (let j = 0; j < 28; ++j) {
                sketch.fill(drawingArray[i * 28 + j])
                sketch.rect(j * 10, i * 10, 10, 10);
            }
        }
        if (isPainting) {
            tensorflow_mnistSketch.predictNumberFromCurrentDrawing(drawingArray);
        }
    }

    sketch.mousePressed = function () {
        isPainting = true;
    }

    sketch.mouseReleased = function () {
        isPainting = false;
    }

    sketch.eraseDrawing = function () {
        for (let i = 0; i < 784; ++i)
            drawingArray[i] = 240;
    }
}

let drawingSketch = new p5(drawing, "drawing_sketch");
