let solution = get3randomNumbers();

function get3randomNumbers() {
    let randomNumbers = [];
    for (let i = 0; i < 3; i++) {
        let randomNumber = Math.floor(Math.random() * 10);
        randomNumbers.push(randomNumber);
    }
    return randomNumbers;
}

document.getElementById('output').innerHTML = solution;


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
