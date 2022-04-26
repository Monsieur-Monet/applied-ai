let solution = get3randomNumbers();

function get3randomNumbers() {
    let randomNumbers = [];
    for (let i = 0; i < 3; i++) {
        let randomNumber = Math.floor(Math.random() * 10);
        randomNumbers.push(randomNumber);
    }
    return randomNumbers;
}

//document.getElementById('output').innerHTML = solution;


function getInput() {
    let input0 = parseInt(document.getElementById("input_0").value);
    let input1 = parseInt(document.getElementById("input_1").value);
    let input2 = parseInt(document.getElementById("input_2").value);
    let input = [input0, input1, input2];

    for (let i = 0; i < solution.length; ++i) {
        if (input[i] === solution[i]) {
            document.getElementById("input_container_" + i).style.backgroundColor = "#149414";
            document.getElementById("input_container_" + i).style.borderColor = "#149414";
        } else {
            document.getElementById("input_container_" + i).style.backgroundColor = "red";
            document.getElementById("input_container_" + i).style.borderColor = "red";
        }
    }
    if (input[0] === solution[0] && input[1] === solution[1] && input[2] === solution[2]) {
        document.getElementById("output").innerHTML = "You win!";
    }

    return input;
}

(function () {
    // Creates a new canvas element and appends it as a child
    // to the parent element, and returns the reference to
    // the newly created canvas element
    let model;

    async function loadModel() {
        model = await tf.loadModel('model.json');
        console.log('Model loaded');
    }

    function createCanvas(parent, width, height) {
        let canvas = {};
        canvas.node = document.createElement('canvas');
        canvas.node.setAttribute('id', 'canvas');
        canvas.context = canvas.node.getContext('2d');
        canvas.node.width = width || 500 ;
        canvas.node.height = height || 500;
        parent.appendChild(canvas.node);
        return canvas;
    }

    async function init(container, width, height, fillColor) {
        let canvas = createCanvas(container, width, height);
        let ctx = canvas.context;
        //define a custom fillCircle method
        ctx.fillCircle = function (x, y, radius, fillColor) {
            this.fillStyle = fillColor;
            this.beginPath();
            this.moveTo(x, y);
            this.arc(x, y, radius, 0, Math.PI * 2, false);
            this.fill();
        };
        ctx.clearTo = function (fillColor) {
            ctx.fillStyle = fillColor;
            ctx.fillRect(0, 0, width, height);
        };
        ctx.clearTo(fillColor || "#ffffff");

        // bind mouse events
        canvas.node.onmousemove = function (e) {
            if (!canvas.isDrawing) {
                return;
            }
            let x = e.pageX - this.offsetLeft;
            let y = e.pageY - this.offsetTop;
            let radius = 3; // or whatever
            let fillColor = '#000000';
            ctx.fillCircle(x, y, radius, fillColor);
        };
        canvas.node.onmousedown = function (e) {
            canvas.isDrawing = true;
        };
        canvas.node.onmouseup = function (e) {
            canvas.isDrawing = false;
        };
        loadModel();
    }

    function predict(tfImage) {
        let output = model.predict(tfImage);
        let result = Array.from(output.dataSync());
        console.log('Output is : ', Array.from(output.dataSync()));
        let maxPossibility = result.reduce(function (a, b) {
            return Math.max(a, b)
        });
        console.log(maxPossibility);
        document.getElementById('prediction').innerHTML = '<p>'
            + result.indexOf(maxPossibility) + '</p>';
    }

    function clear() {
        console.log('clear canvas');
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        ctx.clearTo('#ffffff');
        document.getElementById('prediction').innerHTML = '';
    }

    function recogniseNumber() {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');

        // console.log(ctx.getImageData(0,0, 100, 100));
        let imageData = ctx.getImageData(0, 0, 100, 100);
        let tfImage = tf.fromPixels(imageData, 1);

        //Resize to 28X28
        let tfResizedImage = tf.image.resizeBilinear(tfImage, [28, 28]);
        //Since white is 255 black is 0 so need to revert the values
        //so that white is 0 and black is 255
        tfResizedImage = tf.cast(tfResizedImage, 'float32');
        tfResizedImage = tf.abs(tfResizedImage.sub(tf.scalar(255)))
            .div(tf.scalar(255)).flatten();
        tfResizedImage = tfResizedImage.reshape([1, 784]);

        //Make another dimention as the model expects
        console.log(tfResizedImage.dataSync());
        console.log(tfResizedImage.toString());
        predict(tfResizedImage);
    }

    let container = document.getElementById('canvas-container');
    init(container, 100, 100, '#ffffff').then(r => {
        console.log('init done');
    });
    document.getElementById('clear').addEventListener('click', clear);
    document.getElementById('predict').addEventListener('click', recogniseNumber);


})();
