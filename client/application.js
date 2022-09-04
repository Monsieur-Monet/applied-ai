Application = {
    eraseDrawing: function () {
        drawingSketch.eraseDrawing();
    },

    trainModelWithDrawing: function (number) {
        tensorflow_mnistSketch.trainModelWithDrawing(drawingArray, number);
    },

    predictNumberFromCurrentDrawing: function () {
        tensorflow_mnistSketch.predictNumberFromCurrentDrawing(drawingArray);
    },

    saveCurrentTrainingData: function () {
        tensorflow_mnistSketch.saveCurrentTrainingData();
    },

    drawWeightOfNumber: function (number) {
        predictionWeightSketch.drawWeightOfNumber(number);
    }
}