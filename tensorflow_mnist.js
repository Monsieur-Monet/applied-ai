let picture = [];
let indexOfMouse;
let painting;
let trainImage, label;

let model;
let single_layer;
let mnist_data;
let nTrain = 100;


function setup() {
    createCanvas(280,280);
    background(200);
    noStroke()
    erasePicture();

    loadTrainingData().then(r => model.compile({optimizer: tf.train.sgd(5.1), loss: 'meanSquaredError'}));

    //createModel();
}

function createModel() {
    model = tf.sequential();
    single_layer = tf.layers.dense({units: 10, inputShape: [784,], activation: 'sigmoid', useBias: false});
    model.add(single_layer);

    model.compile({optimizer: tf.train.sgd(5.1), loss: 'meanSquaredError'});

    mnist_data = new MnistData();
    mnist_data.load(nTrain, 10).then(training);
}

function draw() {
    if (painting && mouseX >= 0 && mouseX < 280 && mouseY >= 0 && mouseY < 280) {
        indexOfMouse = Math.trunc(mouseY/10) * 28 + Math.trunc(mouseX/10);
        picture[indexOfMouse] = 0;
    }

    for (let i = 0; i < 28; ++i){
        for (let j = 0; j < 28; ++j) {
            fill (picture[i*28 + j])
            rect(j*10, i*10, 10,10);
        }
    }
}

function erasePicture () {
    for (let i = 0; i < 784; ++i)
        picture[i] = 240;
}

function trainWithPicture (number) {
    buildTrainImage();
    buildLabel(number);
    const x = tf.tensor4d(
        trainImage,
        [1, 28, 28, 1]);
    const y = tf.tensor2d(
        label, [1, 10]);
    return [x, y];
}

function buildTrainImage() {
    let copy = [...picture];
    copy.forEach((element, index) => {
        element > 0 ? copy[index] = 0 : copy[index] = 1;
    });
    trainImage = new Float32Array(copy);
}

function buildLabel (number) {
    label = [0,0,0,0,0,0,0,0,0,0];
    label[number] = 1;
}

function mousePressed () {
    painting = true;
}

function mouseReleased () {
    painting = false;
}

function training() {
    [x, y] = mnist_data.getTrainData();
    x = x.reshape([nTrain, 784]);
    model.fit(x,y, {batchSize: 1, epochs: 5}).then(testing);

}

function testing() {
    console.log("Training finished.")
    let num_test_samples = 10;
    [xtest, ytest] = mnist_data.getTestData(num_test_samples);
    xtest = xtest.reshape([num_test_samples,784]);
    ypredict = model.predict(xtest);
    console.log("Testing finished.")
}

function newTraining() {
    [x, y] = trainWithPicture(9);
    x = x.reshape([1, 784]);
    model.fit(x,y, {batchSize: 1, epochs: 5});
}

function newTesting() {
    [xtest, ytest] = trainWithPicture(0)
    xtest = xtest.reshape([1,784]);
    ypredict = model.predict(xtest);

    ypredict.print(true);
    //ytest.print(true);
    let predictedNumber = ypredict.argMax(1).dataSync()[0];
    document.getElementById("predicted-number").innerHTML = predictedNumber.toString();
}

async function saveTrainingData() {
    const saveResults = await model.save('indexeddb://my-model');
    console.log("Model saved.")
}

async function loadTrainingData() {
    model = await tf.loadLayersModel('indexeddb://my-model');
}

