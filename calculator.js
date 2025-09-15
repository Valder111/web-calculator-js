const output = document.getElementById("Output");
const operOutput = document.getElementById("CurrentOperation");
const firstNumber = document.getElementById("LastNumber");

const numberContainer = document.getElementById("numButtons");
const operationContainer = document.getElementById("operButtons");
const numberButtons = numberContainer.children;
const operButtons = operationContainer.children;

var isThatFirstNumber = true;

let div1 = "0";
let div2 = "0";

for (let button of numberButtons){
    button.addEventListener('click', function() {
        number = button.textContent;

        if (output.textContent == "0"){
            output.textContent = "";
            if (isThatFirstNumber){
                div1 = "";
            }
            else {
                div2 = "";
            }
        }

        if (isThatFirstNumber){
            div1 += number;
            output.textContent = div1;
        }
        else{
            div2 += number;
            output.textContent = div2;
        }
    });
}

for (let button of operButtons){
    button.addEventListener('click', function() {
        switch (button.textContent){
            case "C":
                if (isThatFirstNumber){
                    div1 = 0;
                }
                else{
                    div2 = 0;
                }
                output.textContent = "0";
                break;
            case "CE":
                div1 = "0";
                div2 = "0";
                output.textContent = "0";
                operOutput.textContent = "";
                firstNumber.textContent = "";
                isThatFirstNumber = true;
                break
            case "<--":
                if (isThatFirstNumber){
                    if (div1.length>1){
                        div1 = div1.slice(0, -1); 
                    }
                    else {
                        div1 = "0";
                    }
                    output.textContent = div1;
                }
                else {
                    if (div2.length>1){
                        div2 = div2.slice(0, -1); 
                    }
                    else {
                        div2 = "0";
                    }
                    output.textContent = div2;
                }
                break;
            case "=":
                if (isThatFirstNumber){return;}
                operation(operOutput.textContent)
                break;
            default:
                if (isThatFirstNumber){
                    isThatFirstNumber = !isThatFirstNumber;
                    operOutput.textContent = button.textContent;
                    firstNumber.textContent = div1;
                    output.textContent = div2;
                    break;
                }
                break;
        }
    });
}

function operation(oper){
    console.log(oper);
    var result = 0;
    switch (oper){
        case "+":
            result = Number(div1) + Number(div2);    
            break;
        case "-":
            result = div1 - div2;      
            break;
        case "/":
            if (div2 == 0){
                output.textContent = "Ошибка: деление на ноль";
                return;
            }
            result = div1 / div2;      
            break;
        case "*":
            result = div1 * div2;   
            break; 
        }
    div1 = result.toString();
    console.log(div1);
    operOutput.textContent = "";
    firstNumber.textContent = "";
    output.textContent = result;
    div2 = "0";
    isThatFirstNumber = true;
}