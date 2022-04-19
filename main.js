function get3randomNumbers() {
    let randomNumbers = [];
    for (let i = 0; i < 3; i++) {
        let randomNumber = Math.floor(Math.random() * 10);
        randomNumbers.push(randomNumber);
    }
    return randomNumbers;
}
console.log(get3randomNumbers());
