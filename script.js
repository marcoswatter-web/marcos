const display = document.getElementById("display");

function append(value){
    display.value += value;
}

function clearDisplay(){
    display.value = "";
}

function backspace(){
    display.value = display.value.slice(0,-1);
}

function factorial(n){
    n = Number(n);

    if(n < 0) return NaN;
    if(n === 0) return 1;

    let result = 1;

    for(let i = 2; i <= n; i++){
        result *= i;
    }

    return result;
}

function calculate(){

    try{

        let expression = display.value;

        expression = expression.replaceAll("pi", Math.PI);
        expression = expression.replaceAll(/(?<![a-z])e(?![a-z])/g, Math.E);

        expression = expression.replaceAll("^","**");

        expression = expression.replace(/sin\((.*?)\)/g,
        (_,x)=>Math.sin(Number(eval(x))*Math.PI/180));

        expression = expression.replace(/cos\((.*?)\)/g,
        (_,x)=>Math.cos(Number(eval(x))*Math.PI/180));

        expression = expression.replace(/tan\((.*?)\)/g,
        (_,x)=>Math.tan(Number(eval(x))*Math.PI/180));

        expression = expression.replace(/log\((.*?)\)/g,
        (_,x)=>Math.log10(Number(eval(x))));

        expression = expression.replace(/ln\((.*?)\)/g,
        (_,x)=>Math.log(Number(eval(x))));

        expression = expression.replace(/sqrt\((.*?)\)/g,
        (_,x)=>Math.sqrt(Number(eval(x))));

        expression = expression.replace(/factorial\((.*?)\)/g,
        (_,x)=>factorial(eval(x)));

        let result = Function(
            `"use strict"; return (${expression})`
        )();

        display.value = result;

    }catch{
        display.value = "Erro";
    }
}