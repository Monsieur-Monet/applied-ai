let drawingArray = [];

const drawing = (sketch) => {
    let indexOfMouse;
    let isPainting;

    sketch.setup = function () {
       sketch.createCanvas(280, 280);
       sketch.noStroke();
       sketch.eraseDrawing();
       sketch.resetSelect();
    }

    sketch.draw = function () {
        if (isPainting && sketch.mouseX >= 0 && sketch.mouseX < 280 && sketch.mouseY >= 0 && sketch.mouseY < 280) {
            indexOfMouse = Math.trunc(sketch.mouseY / 10) * 28 + Math.trunc(sketch.mouseX / 10);
            sketch.paintOnCanvas();
            tensorflow_mnistSketch.predictNumberFromCurrentDrawing(drawingArray);
            sketch.resetSelect();
        }
        for (let i = 0; i < 28; ++i) {
            for (let j = 0; j < 28; ++j) {
                sketch.fill(drawingArray[i * 28 + j])
                sketch.rect(j * 10, i * 10, 10, 10);
            }
        }
    }

    sketch.paintOnCanvas = function () {
        drawingArray[indexOfMouse] -= 100;

        if (indexOfMouse < 784 && indexOfMouse % 28 !== 27)
            drawingArray[indexOfMouse + 1] -= 60;
        if (indexOfMouse > 0 && indexOfMouse % 28 !== 0)
            drawingArray[indexOfMouse - 1] -= 60;
        if (indexOfMouse <= 755)
            drawingArray[indexOfMouse + 28] -= 60;
        if (indexOfMouse >= 28)
            drawingArray[indexOfMouse - 28] -= 60;

        if (indexOfMouse < 755 && indexOfMouse % 28 !== 27)
            drawingArray[indexOfMouse + 1 + 28] -= 40;
        if (indexOfMouse > 28 && indexOfMouse % 28 !== 0)
            drawingArray[indexOfMouse - 1 - 28] -= 40;
        if (indexOfMouse < 757 && indexOfMouse % 28 !== 0)
            drawingArray[indexOfMouse + 28 - 1] -= 40;
        if (indexOfMouse > 26  && indexOfMouse % 28 !== 27)
            drawingArray[indexOfMouse - 28 + 1] -= 40;
    }

    sketch.resetSelect = function (){
        document.getElementById("select").selectedIndex = 0;
        console.log('reset index');
    }

    sketch.mousePressed = function () {
        isPainting = true;
    }

    sketch.mouseReleased = function () {
        isPainting = false;
    }

    sketch.eraseDrawing = function () {
        for (let i = 0; i < 784; ++i)
            drawingArray[i] = 255;
    }
}

let drawingSketch = new p5(drawing, "drawing_sketch");
