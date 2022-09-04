let number;
const predictionWeight = (sketch) => {

    sketch.setup = function () {
        sketch.createCanvas(280, 280);
        sketch.background(200);
        sketch.noStroke();
    }

    sketch.draw = function () {
        for (let i = 0; i < 28; ++i) {
            for (let j = number; j < weightsArray.length; j+=10) {
                sketch.fill(200 * (1 - weightsArray[i * 280 + j] / allWeightArrayMaximums[number]));
                sketch.rect(j/10 * 10, i * 10, 10, 10);
            }
        }
    }
}

let predictionWeightSketch = new p5(predictionWeight, "predictionWeight_sketch");