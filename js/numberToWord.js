const ones = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
const groups = ["", "", "", "hundred", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion"];

function numberToWord(data) {
    let dataLength = data.toString().length;
    let dataWordForm;
    let dataSet = Array.from(data.toString()).map(Number);

    switch (dataLength){
        case 1:
            dataWordForm = ones[data];
            return dataWordForm;
        case 2:
            if (dataSet[0] == 1) {
                dataWordForm = teens[dataSet[1]];
            } else {
                dataWordForm = tens[dataSet[0]] + ones[dataSet[1]];
            };
            break;
        case 3:
            dataWordForm = ones[dataSet[0]] + groups[dataLength] + tens[dataSet[1]] + ones[dataSet[2]];
            break;
    };
    return dataWordForm;
}