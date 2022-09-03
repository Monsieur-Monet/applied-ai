
const weights = (sketch) => {

    let weightArray = [];

    sketch.setup = function () {
        sketch.createCanvas(280, 280);
        sketch.background(200);
        sketch.noStroke();
    }


    sketch.draw = function () {
        for (let i = 0; i < model.getWeights().length; i++) {
            tensor_w = model.getWeights()[i];
            //normalize by the global max value
            tensor_w = tensor_w.div(tensor_w.max());
            //get tensordata as linear array
            w = tensor_w.dataSync();
            for (let i = 0; i < 28; ++i) {
                for (let j = 0; j < 28; ++j) {
                    sketch.fill(200 * (1 - w[i * 28 + j]));
                    sketch.rect(j * 10, i * 10, 10, 10);
                }
            }

        }
    }

}

let weightSketch = new p5(weights, "weights_sketch");