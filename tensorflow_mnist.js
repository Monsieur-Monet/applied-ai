let drawing = [];
let indexOfMouse;
let painting;
let trainingImage, trainingLabel;

let model;
let single_layer;
let mnist_data;
let nTrain = 100;


function setup() {
    createCanvas(280, 280);
    background(200);
    noStroke()
    eraseDrawing();
    if (localStorage.getItem('tensorflowjs_models/my-model/model_metadata') !== null) {
        loadPreviousTrainingData().then(r => model.compile({optimizer: tf.train.sgd(5.1), loss: 'meanSquaredError'}));
        console.log(`Loading model from local storage`);
    } else {
        createModel();
        console.log(`Training new model`);
        saveCurrentTrainingData().then(r => console.log(`Saved model to local storage`));

    }

}

function createModel() {
    model = tf.sequential();
    single_layer = tf.layers.dense({units: 10, inputShape: [784,], activation: 'sigmoid', useBias: false});
    model.add(single_layer);

    model.compile({optimizer: tf.train.sgd(5.1), loss: 'meanSquaredError'});

    mnist_data = new MnistData();
    mnist_data.load(nTrain, 10).then(training);
}

function training() {
    [x, y] = mnist_data.getTrainData();
    x = x.reshape([nTrain, 784]);
    model.fit(x, y, {batchSize: 1, epochs: 5}).then( () => {
        console.log("Training finished.")
        testing();                          //TODO: testing necessary..? how to print accuracy?
    });
}

function testing() {
    let num_test_samples = 10;
    [xtest, ytest] = mnist_data.getTestData(num_test_samples);
    xtest = xtest.reshape([num_test_samples, 784]);
    ypredict = model.predict(xtest);
    console.log("Testing finished.")
}



function draw() {
    if (painting && mouseX >= 0 && mouseX < 280 && mouseY >= 0 && mouseY < 280) {
        indexOfMouse = Math.trunc(mouseY / 10) * 28 + Math.trunc(mouseX / 10);
        drawing[indexOfMouse] = 0;
    }

    for (let i = 0; i < 28; ++i) {
        for (let j = 0; j < 28; ++j) {
            fill(drawing[i * 28 + j])
            rect(j * 10, i * 10, 10, 10);
        }
    }
}



function trainModel() {
    [x, y] = trainWithCurrentDrawing(9);
    x = x.reshape([1, 784]);
    model.fit(x, y, {batchSize: 1, epochs: 5});
}

function trainWithCurrentDrawing(number) {
    setTrainingImage();
    setTrainingLabel(number);
    const x = tf.tensor4d(
        trainingImage,
        [1, 28, 28, 1]);
    const y = tf.tensor2d(
        trainingLabel, [1, 10]);
    return [x, y];
}

function setTrainingImage() {
    let copy = [...drawing];
    copy.forEach((element, index) => {
        element > 0 ? copy[index] = 0 : copy[index] = 1;
    });
    trainingImage = new Float32Array(copy);
}

function setTrainingLabel(number) {
    trainingLabel = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    trainingLabel[number] = 1;
}

function mousePressed() {
    painting = true;
}

function mouseReleased() {
    painting = false;
}




function predictFromCurrentDrawing() {
    [xtest, ytest] = trainWithCurrentDrawing(0)
    xtest = xtest.reshape([1, 784]);
    ypredict = model.predict(xtest);

    ypredict.print(true);
    //ytest.print(true);
    let predictedNumber = ypredict.argMax(1).dataSync()[0];
    document.getElementById("predicted-number").innerHTML = predictedNumber.toString();
}


function eraseDrawing() {
    for (let i = 0; i < 784; ++i)
        drawing[i] = 240;
}

async function saveCurrentTrainingData() {
    const saveResults = await model.save('localstorage://my-model');
    console.log("Model saved.")
}

async function loadPreviousTrainingData() {
    model = await tf.loadLayersModel('localstorage://my-model');
    console.log("Model loaded.")
}

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