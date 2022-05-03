let model;
let single_layer;
let mnist_data;

function setup() {
    model = tf.sequential();
    single_layer = tf.layers.dense({units: 10, inputShape: [784,], activation: 'sigmoid', useBias: false}); //TODO: inputShape komma
    model.add(single_layer);

    model.summary();
    model.compile({optimizer: tf.train.sgd(5.1), loss: 'meanSquaredError'});

    //train our model
    mnist_data = new MnistData();
    mnist_data.load(1000, 10).then(training);
}

function training() {
    [x, y] = mnist_data.getTrainData();
    x = x.reshape([1000, 784]);
    model.fit(x,y, {batchSize: 1, epochs: 5}).then(testing);    //TODO: batchsize besser verstehen. fit? -> recherche
}

function testing() {
    let num_test_samples = 10;
    [xtest, ytest] = mnist_data.getTestData(num_test_samples);
    xtest = xtest.reshape([num_test_samples,784]);
    ypredict = model.predict(xtest);                                    //TODO: predict?
    ypredict.print(true);
    ytest.print(true);
}

