//variables
var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");

//Function and logic

//Apparently if it is just one parameter it just gets transferred
function inputLength()
{
    return input.value.length;
}

//If there is just one parameter it gets transferred
function createListElement()
{
    var li = document.createListElement("li");
    li.appendChild(document.createTextNode(input.value));
    ul.appendChild(li);
    input.value = "";
}

// Making sure that it does not add empty strings
function addListAfterClick()
{
    if(inputLength() > 0)
    {
        createListElement();
    }
}

//Making sure that it just adds after pressing enter
function addListAfterKeypress(event)
{
    if(inputLength() > 0 && event.keyCode === 13)
    {
        createListElement();
    }
}

//function calling on trigger
//bisa event listener bisa lainya

button.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);