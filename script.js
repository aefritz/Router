let submitNoOfPts = document.querySelector("#submitNoOfPts");
let computeButton = document.querySelector("#computeButton");
let tableRows = "";
let xvalues = [];
let yvalues = [];
let initialArray = [];
let xidentifier;
let yidentifier;
let tempArray = [];
let shortestArray = [];
let distances = [];
let noOfPts;
let sumDistance;
let svgInnerHTML = "";
let svgLineText = "";
let iterations;
let countdown;
let BitString;
let arrayContainer = [];
let shortestdistance = 100;
let currentdistance = 0;
let emptyArray = [0,0,0,0];
let pointTable = document.querySelector('#pointTable');
let graph = document.querySelector('#graph');
submitNoOfPts.onclick = function () {
  noOfPts = document.querySelector("#noOfPts").value;
  for (let i = 0; i < noOfPts; i++) {
    let tableRows = "<tr><td><input id = 'y" + i +"'></td><td><input id='x" + i + "'></td></tr>";
    pointTable.innerHTML += tableRows;
  }
}
function makeArray(n) {
  returnArray = new Array();
  for (i=0;i<n;i++) {
    returnArray.push(i);
  }
  return returnArray;
}
function sum(a,b) {
  return a + b;
}
function makeBaseValueArray (m,n) {
  array = new Array();
  for (i=0; i < n; i++) {
    array.push(Math.pow(m,i));
  }
  array.reverse();
  return array;
}
function iterator (m,n) {
  let shortestArray = new Array(n);
  const indexArray = makeArray(n);
  let emptyArray = [];
  for (z = 0; z < n; z++) {
    emptyArray.push(0);
  }
  let array = makeBaseValueArray(m,n);
  let y = Math.pow(m,n);
  for (i = 0; i < y; i++) {
    let reducer = i;
    for (l=0; l < n; l++) {
      emptyArray[l] = parseInt(reducer/(array[l]));
      if (parseInt(reducer/array[l]) >= 1) {
        reducer = reducer - array[l]*emptyArray[l];
      }
    }
    arrayChecker = false;
    for (k=0;k<n;k++) {
      for (p=0;p<n;p++) {
        if ((emptyArray[k] === emptyArray[p]) && (k !== p)) {
          arrayChecker = true;
        }
      }
    }
    function distanceFunction (a) {
      return distances[emptyArray[a]][emptyArray[(a+1) % n]];
    }
    if (arrayChecker === false) {
      currentdistance = indexArray.map(distanceFunction).reduce(sum);
      if (currentdistance <= shortestdistance) {
        shortestdistance = currentdistance;
        for (b=0; b<n; b++) {
          shortestArray[b] = emptyArray[b];
        }
      }
    }
  }
  function makeSVGLineText (acc,a) {
    let lineString = `<line x1="${xvalues[a]}" y1="${-yvalues[a]}" x2="${xvalues[shortestArray[(shortestArray.indexOf(a)+1)%noOfPts]]}" y2="${-yvalues[shortestArray[(shortestArray.indexOf(a)+1)%noOfPts]]}"/></line>`;
    return acc + lineString;
  }
  document.querySelector('#graph').innerHTML += shortestArray.reduce(makeSVGLineText,"");
  console.log(document.querySelector('#graph').innerHTML);
}
function getBitString(dec){
  return (dec >>> 0).toString(2);
}
function distance (x1,y1,x2,y2) {
  return Math.sqrt(Math.pow((x2-x1),2) + Math.pow((y2-y1),2));
}
computeButton.onclick = function () {
  for (let i = 0; i < noOfPts; i++) {
    xidentifier = '#x'+i;
    yidentifier = '#y'+i;
    xvalues.push(document.querySelector(xidentifier).value);
    yvalues.push(document.querySelector(yidentifier).value);
 svgInnerHTML += `<circle cx="${xvalues[i]}" cy="${-yvalues[i]}" r="0.25" stroke="black" stroke-width="0.25" fill="red" />`;
document.querySelector('#graph').innerHTML = svgInnerHTML;
  }

  for (let i = 0; i < noOfPts; i++) {
      let newArray = [];
      initialArray.push(i);
      for (let j = 0; j < noOfPts; j++) {
        newArray.push(distance(xvalues[i],yvalues[i],xvalues[j],yvalues[j]));
      }
      distances.push(newArray);
  }
  iterator(noOfPts,noOfPts);
}
