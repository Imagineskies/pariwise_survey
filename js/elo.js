/*
____________________________________________________________________________________
Global Variables
____________________________________________________________________________________
*/

var sampleAmmount;
var currentPlaceHolder = 0;
var imageIDs = [];
var imageNames = [];
var imageScores = [];
var imageClicked = [];
var pairs = [];
var imageCssString;
var globalStyleString;
var globalImageData;
var resultStyleString;
var resultImageData;

/*
____________________________________________________________________________________
Global Constants
____________________________________________________________________________________
*/

const imageClickHolder = ["imageOneClicked", "imageTwoClicked", "imageThreeClicked", "imageFourClicked", "imageFiveClicked", "imageSixClicked"];
const ones = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
const groups = ["", "", "", "hundred", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion"];
const photoA = document.getElementById('photoA');
const photoB = document.getElementById('photoB');
const photoAWrapper = document.getElementById('photoAWrapper');
const photoBWrapper = document.getElementById('photoBWrapper');
const abStyle = document.getElementById('abStyle');
const scorePage = document.getElementById('scorePage');

/*
____________________________________________________________________________________
Generic Functions: Used globaly for either Elo system or site functionality.
____________________________________________________________________________________
*/

// Function for swaping the classes asiginged to x.
function swapClass(x, y, z) {
  x = document.getElementById(x);
  x.classList.replace(y, z);
}

// Function for converting digits into their written form.
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

// Function for generating A:B testing pairs.
function createTestingPairs(data) {
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      pairs.push([data[i], data[j]]);
    }
  }
  return pairs;
}


// Function for generating data arrays for image classes, names, scores, and whether or not it was clicked.
function createTestingData(quantity) {
  console.log(quantity);
  let pwa = (quantity*(quantity-1)/2);
  console.log(pwa);
  for (var i = 0; i <= quantity; i++) {
    console.log("Looped Correctly");
    let iid =  ".ph" + numberToWord(i);
    let inm = "ph" + numberToWord(i);
    let isc = 1400;
    let icp = false;
    imageIDs.push(iid);
    imageNames.push(inm);
    imageScores.push(isc);
    imageClicked.push(icp);
  };
}

// Function for setting the style for each image.
function setImageData(data){
  for (let i = 0; i < data.length; i++) {
    if (globalImageData == null) {
      window.globalImageData = `
          ${data[i]} {
            background-image: url('img/dataset/\(${i}\).jpg');
            background-size: cover;
            background-position: center;
          }
          @media (max-width:769px) {
            ${data[i]} {
              background-size: contain;
              background-position: center;
              background-repeat: no-repeat;
            }
          }
      `;
    } else {
      window.globalImageData = globalImageData +  `
          ${data[i]} {
            background-image: url('img/dataset/\(${i}\).jpg');
            background-size: cover;
            background-position: center;
          }

          @media (max-width:769px) {
            ${data[i]} {
              background-size: contain;
              background-position: center;
              background-repeat: no-repeat;
            }
          }
      `;
    };
  };
}

// Function for generating event listners for each pair.
function createEventListners(){
  photoAWrapper.onclick = (event) => {
    imageClicked[imageNames.indexOf(pairs[currentPlaceHolder][0])] = true;
    console.log(pairs[currentPlaceHolder][0] + " was clicked")
  };
  photoBWrapper.onclick = (event) => {
    imageClicked[imageNames.indexOf(pairs[currentPlaceHolder][1])] = true;
    console.log(pairs[currentPlaceHolder][1] + " was clicked")
  };
}

// Function for appending elements to HTML
function addBlock(insideHTML, parentElement) {
  $(parentElement).append(insideHTML);
}

/*
____________________________________________________________________________________
Elo/Pariwise Focused: Functions that specificly pertain to the creation of the
pairwise survey.
____________________________________________________________________________________
*/

// Start the creation process
function startCompair(){
  createTestingData(sampleAmmount);
  createTestingPairs(imageNames);
  setImageData(imageIDs);
  addBlock(globalStyleString, abStyle);
  addBlock(globalImageData, abStyle);
  photoA.setAttribute('class', pairs[currentPlaceHolder][0]);
  photoB.setAttribute('class', pairs[currentPlaceHolder][1]);
}
 
/*
Function eloCheck() was generated by ChatGPT, however, due to several errors,
I've had to make multiple changes to the code.
*/
function eloCheck() {
  let currentWinner;
  // Find which image was clicked
  for (let i = 0; i < imageClicked.length; i++) {
    if ([imageClicked[i]]) { // Dynamically check which image was clicked based on the global flags
         currentWinner = imageNames[i];
      break;
    }
  }
    
  // Exit the function if no winner is found
  if (!currentWinner) {
    console.log("No winner identified, check click handling.");
    return;
  }
  
  // Retrieve the current pair of images being tested
  const currentPair = pairs[currentPlaceHolder];
  if (!currentPair) {
    console.log("No current pair, check pair handling.");
    return; // Exit if no pair is found
  }
    
  // Determine the winner and loser based on the current pair and the winner
  let winnerScoreVar, loserScoreVar;
  if (currentPair[0] === currentWinner) {
    winnerScoreVar = currentPair[1];
    loserScoreVar = currentPair[0];
  } else {
    winnerScoreVar = currentPair[0];
    loserScoreVar = currentPair[1];
  }
  
  // Simplified Elo rating calculation
  const K = 32;
  const winnerPlace = imageNames.indexOf(winnerScoreVar);
  const winnerScore = imageScores[winnerPlace];
  const looserPlace = imageNames.indexOf(loserScoreVar);
  const loserScore = imageScores[looserPlace];
  const expectedWinner = 1 / (1 + Math.pow(10, (loserScore - winnerScore) / 400));
  const expectedLoser = 1 - expectedWinner;
  
  //Saving results to the imageScores array
  imageScores[winnerPlace] = winnerScore + K * (1 - expectedWinner);
  imageScores[looserPlace] = loserScore + K * (0 - expectedLoser);
  
  // Reset clicked status for all images after handling
  imageClicked.forEach(function(part, index, theArray) {
    theArray[index] = false;
  });

  // Update the placeholder varable to keep track of where we are.
  currentPlaceHolder = (currentPlaceHolder + 1) % pairs.length; // Ensure cycling through pairs

  // Sent the current winners to the console
  console.log(`Updated Scores: ${winnerScoreVar} = ${imageScores[winnerPlace]}, ${loserScoreVar} = ${imageScores[looserPlace]}`);
  
  // Set the next round of photos.
  photoA.setAttribute('class', pairs[currentPlaceHolder][0]);
  photoB.setAttribute('class', pairs[currentPlaceHolder][1]);
}


//Function reorderData() was created by ChatGPT and used unedited.
function reorderData(imageScores, imageNames, imageIDs) {
  // Create an array of objects with score, name, and ID
  const imageData = imageScores.map((score, index) => ({
      score,
      name: imageNames[index],
      id: imageIDs[index]
  }));

  // Sort the array based on scores in descending order
  imageData.sort((a, b) => a.score - b.score);

  // Extract sorted names and IDs into separate arrays
  const resultScores = imageData.map(data => data.score);
  const resultNames = imageData.map(data => data.name);
  const resultIDs = imageData.map(data => data.id);

  return { resultScores, resultNames, resultIDs };
}

// Function to switch to the next slide.
function nextSlided() {
  console.log(currentPlaceHolder);
  if (currentPlaceHolder >= (pairs.length-1)) { // Added an if statement to detect if the survey has been completed. If so, passes you on to the Results page.
    console.log("Survery has ended");
    const { resultScores, resultNames, resultIDs } = reorderData(imageScores, imageNames, imageIDs);
    console.log("Results: " + resultNames,resultIDs);
    console.log("Start of Loop");
    for (let i = 0; i < imageIDs.length; i++) {
      console.log("inside of Loop");
      if (resultImageData == null) {
        window.resultImageData = `
          <div class="resultPhotoWrapper">
            <div class="${resultNames[i]}"></div>
          </div>
        `;
      } else {
        window.resultImageData = resultImageData +  `
          <div class="resultPhotoWrapper">
            <div class="${resultNames[i]}"></div>
          </div>
        `;
      };
    };
    console.log("End of Loop");
    addBlock(resultImageData, scorePage);
    swapClass("abPage", "active", "unactive");
    swapClass("resultsPage", "unactive", "active");
  } else { // If we haven't reached the end, we move on to the next image in the survey.
      photoAWrapper.onclick = (event) => {
      imageClicked[imageNames.indexOf(pairs[currentPlaceHolder][0])] = true;
      console.log(pairs[currentPlaceHolder][0] + " was clicked")
      eloCheck();
    };
      photoBWrapper.onclick = (event) => {
      imageClicked[imageNames.indexOf(pairs[currentPlaceHolder][1])] = true;
      console.log(pairs[currentPlaceHolder][1] + " was clicked")
      eloCheck();
    };
  }
}