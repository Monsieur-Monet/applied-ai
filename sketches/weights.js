let weightsArray = [];
let allWeightArrayMaximums = [0,0,0,0,0,0,0,0,0,0];

const weights = (sketch) => {

    sketch.calculateMaxima = function () {
        for (let i = 0; i < weightsArray.length; ++i) {
            let currentNumber = i % 10;
            if (allWeightArrayMaximums[currentNumber] > weightsArray[i]) {
                allWeightArrayMaximums[currentNumber] = weightsArray[i];
            }
        }
    }

    sketch.drawAllWeights = function () {
        for (let i = 0; i < 28; ++i) {
            for (let j = 0; j < 280; ++j) {
                sketch.fill(200 * (1 - weightsArray[i * 280 + j] / allWeightArrayMaximums[j % 10]));
                sketch.rect(j/10 * 5  + ((j % 10) * 150), i * 5, 5, 5);
            }
        }
    }

    sketch.setup = function () {
        sketch.createCanvas(140 * 10 + 90, 140);
        sketch.background(21);
        sketch.noStroke();
    }

    sketch.draw = function () {
        let tensor_w = model.getWeights()[0];
        tensor_w = tensor_w.div(tensor_w.max());
        weightsArray = tensor_w.dataSync();

        sketch.calculateMaxima();
        sketch.drawAllWeights();
    }

}

let weightsSketch = new p5(weights, "weights_sketch");