const calculatorDisplay=document.querySelector('h1');
const inputBtns=document.querySelectorAll('button');
const clearBtn= document.getElementById('clear-btn');

// Calculate first and second values depending on operator
const calculate={
    '/':(firstNumber,secondNumber)=> firstNumber/secondNumber,

    '*':(firstNumber,secondNumber)=> firstNumber*secondNumber,

    '+':(firstNumber,secondNumber)=> firstNumber+secondNumber,

    '-':(firstNumber,secondNumber)=> firstNumber-secondNumber,

    '=':(firstNumber,secondNumber)=> secondNumber,
};

let firstValue=0;
let operatorValue='';
let awaitNextValue=false;

function sendNumberValue(number){
    // Replace current Display value if first value is entered
    if(awaitNextValue===true){
        calculatorDisplay.textContent=number
        awaitNextValue=false
    }else{
        //  If current display value is 0 replace it, if notadd number
        const displayValue=calculatorDisplay.textContent;
        calculatorDisplay.textContent=displayValue === '0' ? number :displayValue+number;
    }
    
}
function addDecimal(){
    // If operator pressed don't add decimal
    if(awaitNextValue) return ;
    // IF no decimal , add one
    if(!calculatorDisplay.textContent.includes('.')){
       calculatorDisplay.textContent=`${calculatorDisplay.textContent}.`;
    }

}

function useOperator(operator){
    const currentValue=Number(calculatorDisplay.textContent);
    // Prevent multiple operators
    if(operator&& awaitNextValue){
        operatorValue=operator; 
        return;
    }    
    // Assign first Value if no value
    if(!firstValue){
        firstValue=currentValue;
    }else{
        
        const calculation=calculate[operatorValue](firstValue,currentValue);
        calculatorDisplay.textContent=calculation;
        firstValue=calculation;
    }
    // Ready for next value, store operator
    awaitNextValue=true;
    operatorValue=operator;
    
}
  
// Reset All values,display
function resetAll(){
    calculatorDisplay.textContent='0';
    firstValue=0;
    operatorValue='';
    awaitNextValue=false;
}
// Add event listeners for numbers,operators,decimal buttons
inputBtns.forEach((inputBtn)=>{
    if(inputBtn.classList.length===0){
        inputBtn.addEventListener('click',()=>sendNumberValue(inputBtn.value))
    }else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click',()=>useOperator(inputBtn.value))
    }else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click',()=>addDecimal())

    }
});  
//   event Listener
clearBtn.addEventListener('click',resetAll);