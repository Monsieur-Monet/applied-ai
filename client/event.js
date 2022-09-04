function onChange() {
   if (document.getElementById('select').value !== "") {
      number =  parseInt(document.getElementById('select').value);
      document.getElementById("predicted-number").innerHTML = number.toString();
   }
   return number;
}
