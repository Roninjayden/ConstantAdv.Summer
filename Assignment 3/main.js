let animalArr = [
];

const server = "http://localhost:3000/";

//call it like 
// setAttributes(elem, {["KEY"]:["VALUE"]})
let setAttributes = function(element, attributes) { 
    for (var key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//Generates the options for the selector 
let generateSelectElem = function(animal) { 
    var newOption = document.createElement("option");
    newOption.innerHTML = animal['id'] + animal['title'];
    var value = animal['id'] + animal['title'];
    setAttributes(newOption, {"value":value, "id":animal['id']});
    return newOption;
}

/**
* Main creation function  
*/
let createSelector = function() { 
    var newSelector = $("#animals").find("select");
    for (var i = 0; i < animalArr.length; i ++) { 
        var newSelectElem = generateSelectElem(animalArr[i]);
        newSelector.append(newSelectElem);
    }
    return newSelector;
}
//Creates the div 
let createDiv = function() { 
    var newDiv = document.createElement("div");
    var label = $("label[for='animals-select']");
    var selectBox = createSelector();
    var text = changedSelectedValue();
    setAttributes(newDiv, {"id":"animals", "class":"select-box"});
    newDiv.append(label);
    newDiv.append(selectBox);
    newDiv.append(text);
}
//Function to get the note associated with the select box value IE 1 Tiger - > 1 looks into array for ID 1 and gets the note 
let changedSelectedValue = function() { 
    var selectBoxVal = $('#animals-select').find(":selected").val();
    var animalNote = "";
    if (selectBoxVal != null) { 
      var animalId = selectBoxVal.substring(0, 2) - 1;
      animalNote = animalArr[animalId].note;
    }
    return animalNote;
}

//Parse through the running web server to get the json elements and populate the arr. 
//calls crete div to then properly construct the remaining page
let fillArray = async function() { 
  for (var i = 1; i <= 10; i ++) {
    var response = await fetch(server + i); //http://localhost:3000/[i]
    var data = await response.json();
    createAnimal(data.id, data.title, data.note);
  }
  createDiv();
}

/**
* Logic to create the task with proper formatting 
*/ 
let createAnimal = function(id, title, note) { 
    var elem =
    {
        id : parseInt(id),
        title: title,
        note : note
    };
    animalArr.push(elem);
    return elem;
}

/**
* Main ready function. 
*/ 
$(document).ready(function() { 
  fillArray();
  $('#animals-select').change(function()   {
      var textInput = document.createElement("input");
      setAttributes(textInput, {"value": changedSelectedValue(), "readonly":"", "size": changedSelectedValue().length});
      var div = $('#animals');
      var previousText = div.find("input");
      previousText.remove();
      div.append(textInput);
  })
})