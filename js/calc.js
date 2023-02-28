let toCalc = document.getElementById('to-calc');
let result = document.getElementById('result');

let firstNumber = '';
let secondNumber = '';
let currentOperator = '';
let isNewOperator = false;
let isCalculated = false;

function insertNumber(number){
  console.log(isNewOperator);
  if (currentOperator==''){
    console.log(typeof(firstNumber), typeof(number));
    firstNumber += number;
    toCalc.value = firstNumber;
  }else if (isCalculated==true){
    console.log(`isCalcluated ${typeof(secondNumber)}, ${typeof(number)}`);
    secondNumber = ''
    secondNumber += number;
    console.log(secondNumber);
    toCalc.value = secondNumber;
    isCalculated=false;
  // }else if (isNewOperator == true){
  //   console.log(`isnewoperator ${typeof(secondNumber)}, ${typeof(number)}`);
  //   secondNumber = String(number);
  //   toCalc.value = secondNumber;
  //   isNewOperator = false;
  }else{
    console.log(`last ${typeof(secondNumber)}, ${typeof(number)}`);
    secondNumber += number;
    console.log(secondNumber);
    toCalc.value = secondNumber;

  }
}

function insertOperator(operator){
  isNewOperator = true;
  currentOperator = operator;
}

function calculate(){
  let resultValue;
  switch (currentOperator){
    case '+':
      console.log(parseInt(firstNumber) ,parseInt(secondNumber))
      resultValue = parseInt(firstNumber) + parseInt(secondNumber);
      break
    case '-':
      resultValue = parseInt(firstNumber) - parseInt(secondNumber);
      break
    case '*':
      resultValue = parseInt(firstNumber) * parseInt(secondNumber);
      break
    case '/':
      resultValue = parseInt(firstNumber) / parseInt(secondNumber);
      break
  }
  console.log(firstNumber, secondNumber, resultValue, currentOperator)
  if (Number.isInteger(resultValue)==false){
    resultValue = Math.round(resultValue);
  }
  toCalc.value = resultValue;
  firstNumber = resultValue;
  result.value = resultValue;
  isCalculated = true;
  // secondNumber = '';

  
  // currentOperator= '';
}

function clearResult(){
  toCalc.value = '';
  firstNumber = '';
  secondNumber = '';
  currentOperator = '';
  result.value='';
}
