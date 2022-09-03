
const weights = (sketch) => {

    let weightArray = [];

    sketch.setup = function () {
        sketch.createCanvas(280, 280);
        sketch.background(200);
        sketch.noStroke();
    }

    sketch.drawWeightOfNumber = function (number) {
        let weightsOfNumber = [];
        let max = 0;
        let tensor_w = model.getWeights()[0];
        //normalize by the global max value
        tensor_w = tensor_w.div(tensor_w.max());
        //get tensordata as linear array
        let weightsArray = tensor_w.dataSync();

        for (let i = number; i < weightsArray.length; i += 10) {
            weightsOfNumber.push(weightsArray[i]);
            if (max > weightsArray[i]){
                max = weightsArray[i];
            }
        }

        for (let i = 0; i < 28; ++i) {
            for (let j = 0; j < 28; ++j) {
                sketch.fill(200 * (1-weightsOfNumber[i * 28 + j] / max));
                sketch.rect(j * 10, i * 10, 10, 10);
            }
        }
    }

    sketch.draw = function () {



        /*
        let tensor_w = model.getWeights()[0];
        //normalize by the global max value
        tensor_w = tensor_w.div(tensor_w.max());
        //get tensordata as linear array
        let w = tensor_w.dataSync();

        let column_ctr = 0;
        let image_ctr = 0;
        let line_ctr_per_image = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        column_ctr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        max = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        let line_ctr;
        for (let k = 0; k < w.length; k++) {
            //in the weightvector the data is ordered along the number of labels
            // image_ctr tells us to which image we are actually looking
            image_ctr = k % 10;
            if (max[image_ctr] > w[k]) {
                max[image_ctr] = w[k];
            }
            //draw image image_ctr
            line_ctr = line_ctr_per_image[image_ctr] % 28;
            line_ctr_per_image[image_ctr]++;
            sketch.stroke(0);
            if (line_ctr === 0) {
                column_ctr[image_ctr]++;
            }
            sketch.noStroke();
            sketch.fill(255 * (1 - w[k] / max[image_ctr]));
            sketch.rect(image_ctr * 3 * 29 + 6 + line_ctr * 3, column_ctr[image_ctr] * 3, 3, 3);
        }

        /*
        for (let i = 0; i < 28; ++i) {
            for (let j = 0; j < 28; ++j) {
                sketch.fill(200 * (1 - w[i * 28 + j]));
                sketch.rect(j * 10, i * 10, 10, 10);
            }
        }
         */

    }

}

let weightSketch = new p5(weights, "weights_sketch");