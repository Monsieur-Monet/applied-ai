function get3randomNumbers() {
    let randomNumbers = [];
    for (let i = 0; i < 3; i++) {
        let randomNumber = Math.floor(Math.random() * 10);
        randomNumbers.push(randomNumber);
    }
    return randomNumbers;
}

document.getElementById('output').innerHTML = get3randomNumbers();


function getInput() {
    let input = document.getElementById("input").value;
    console.log(input);
    return input;
}

function matchInput() {
    let input = getInput();
    let matchingPositions = [];
    solution.forEach((element, index) => {
        if (input === element) {
            matchingPositions.push(index);
        }
        console.log(matchingPositions);
    });
    return matchingPositions;
}

console.log(matchInput());
