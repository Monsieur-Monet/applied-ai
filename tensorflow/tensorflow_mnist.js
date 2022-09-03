
let trainingImage, trainingLabel;
let model;
let single_layer;
let mnist_data;
let nTrain = 10000;

const tensorflowModel = (sketch) => {
    sketch.setup = function () {
        if (localStorage.getItem('tensorflowjs_models/my-model/model_metadata') !== null) {
            sketch._loadPreviousTrainingData().then(r => model.compile({
                optimizer: tf.train.sgd(5.1),
                loss: 'meanSquaredError'
            }));
            console.log(`Loading model from local storage`);
        } else {
            sketch._createModel();
            console.log(`Training new model`);
            sketch.saveCurrentTrainingData().then(r => console.log(`Saved model to local storage`));
        }
    }

    sketch._createModel = function () {
        single_layer = tf.layers.dense({units: 10, inputShape: [784,], activation: 'sigmoid', useBias: false});

        model = tf.sequential();
        model.add(single_layer);
        model.compile({optimizer: tf.train.sgd(5.1), loss: 'meanSquaredError'});

        mnist_data = new MnistData();
        mnist_data.load(nTrain, 10).then(sketch._training);
    }

    sketch._training = function () {
        [x, y] = mnist_data.getTrainData();
        x = x.reshape([nTrain, 784]);
        model.fit(x, y, {batchSize: 1, epochs: 5}).then(() => {
            console.log("Training finished.")
            sketch._testing();                          //TODO: how to print accuracy?
        });
    }

    sketch._testing = function () {
        let num_test_samples = 10;
        [xtest, ytest] = mnist_data.getTestData(num_test_samples);
        xtest = xtest.reshape([num_test_samples, 784]);
        ypredict = model.predict(xtest);
        console.log("Testing finished.")
    }


    sketch.draw = function () {

    }

    sketch._setTrainingImage = function (drawing) {
        let copy = [...drawing];
        copy.forEach((element, index) => {
            element > 0 ? copy[index] = 0 : copy[index] = 1;
        });
        trainingImage = new Float32Array(copy);
    }

    sketch._setTrainingLabel = function (number) {
        trainingLabel = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        trainingLabel[number] = 1;
    }

    sketch._extractTensorsFromDrawing = function (drawing, number) {
        sketch._setTrainingImage(drawing);
        sketch._setTrainingLabel(number);
        const x = tf.tensor4d(
            trainingImage,
            [1, 28, 28, 1]);
        const y = tf.tensor2d(
            trainingLabel, [1, 10]);
        return [x, y];
    }

    sketch.trainModelWithDrawing = function (drawing, number) {
        [x, y] = sketch._extractTensorsFromDrawing(drawing, number);
        x = x.reshape([1, 784]);
        model.fit(x, y, {batchSize: 1, epochs: 5});
    }

    sketch.predictNumberFromCurrentDrawing = function (drawing) {
        [xtest, ytest] = sketch._extractTensorsFromDrawing(drawing, 0); //number not relevant
        xtest = xtest.reshape([1, 784]);
        ypredict = model.predict(xtest);

        ypredict.print(true);
        let predictedNumber = ypredict.argMax(1).dataSync()[0];
        document.getElementById("predicted-number").innerHTML = predictedNumber.toString();
    }

    sketch._loadPreviousTrainingData = async function () {
        model = await tf.loadLayersModel('localstorage://my-model');
        console.log("Model loaded from locally found data.")
    }

    sketch.saveCurrentTrainingData = async function () {
        const saveResults = await model.save('localstorage://my-model');
        console.log("Current model saved locally.")
    }
}

let tensorflow_mnistSketch = new p5(tensorflowModel, 'model');


/*
//TODO:
    - Weights visualisieren
        - Stetig am Rand visualisierte Weights anzeigen. Interessant, wenn beispielsweise kein Vortraining,
          da User beobachten können, wie die Weights entstehen.
    - Slider für Trainingssample Anzahl (z.B. 0 für kein Vortraining), dann ok Button klicken
        - Wenn über bestimmtem Wert (= Dauer zu lange) vorgerechneten Datensatz einlesen, den wir mitliefern
    - Optional:
        - Realistischere Malfunktion schreiben
        - Druckstärke beim Malen beachten
        - Gemalte Zahlen vorm predicten zentrieren/croppen?
        - Extra: Buchstaben zeichnen; Programm mitteilen, welcher Buchstabe gemeint war; Weights sehen und
          so eigenes Buchstaben-Modell erstellen.
*/