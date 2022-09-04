Application = {
    eraseDrawing: function () {
        drawingSketch.eraseDrawing();
    },

    trainModelWithDrawing: function (number) {
        tensorflow_mnistSketch.trainModelWithDrawing(drawingArray, number);
        tensorflow_mnistSketch.saveCurrentTrainingData();
    },

    predictNumberFromCurrentDrawing: function () {
        tensorflow_mnistSketch.predictNumberFromCurrentDrawing(drawingArray);
    },

    drawWeightOfNumber: function (number) {
        predictionWeightSketch.drawWeightOfNumber(number);
    },

    clearLocalstorage: function () {
        localStorage.clear();
        console.log("local storage cleared");
        location.reload();
    }
}