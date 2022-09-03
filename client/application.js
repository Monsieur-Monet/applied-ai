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
    }

    /*
    clearGrid: function () {
        inputSketch.clearGrid();

        let data = modelSketch.processData(inputSketch.exportInput());
        inputPrediction = modelSketch.predictInput(data);

        document.getElementById("correct_input").value = "";

        console.log("Grid is cleared! Waiting for Input.")
    },

    predictInput: async function () {
        inputPrediction = modelSketch.predictInput();

        console.log("Prediction complete. Result: " + modelSketch.topPrediction(inputPrediction));
        console.log("Awaiting manual validation of the top prediction...")
    },

    validatePrediction: function (bool) {
        if (bool) {
            modelSketch.manualTraining(biggestPredictionNumber);

            console.log("The Prediction " + biggestPredictionNumber + " is true. Reinforcing model...");
        } else {
            let correctInput = document.getElementById("correct_input").value;

            if (correctInput === "") {
                console.log("No correct input given. Please enter a correct input.");
            } else {
                console.log("The Prediction " + biggestPredictionNumber + " is false.");
                console.log("Training model with the expected number: " + correctInput);
                modelSketch.manualTraining(correctInput);

                console.log("Model fitted to the corrected value!");

                document.getElementById("correct_input").value = "";
            }
        }
    },

    saveModel: async function () {
        await modelSketch.saveModel("localstorage://noCaptcha/model").then(() => {
            console.log("Training Progress of model saved to localstorage")
        });
    },

    loadModel: async function () {
        await modelSketch.loadModel("localstorage://noCaptcha/model").then(() => {
            console.log("Loading training from localstorage...")
            console.log("Model loaded!")
        });
    }
    */
}
/*
window.onload = function () {
    document.getElementById("correct_input").value = "";
}
*/
