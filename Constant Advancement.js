let animalArr = [
  {
    id: 0,
    title: " Tiger",
    note:"Scary Tiger runs fast."
  },
  {
    id: 1,
    title: " Eagle",
    note:"Eagle is a big bird."
  },
  {
    id: 2,
    title: " Ostrich",
    note:"Ostrich has big eggs."
  },
  {
    id: 3,
    title: " Vulture",
    note:"Vultures eat dead things."
  },
  {
    id: 4,
    title: " Kangaroo",
    note:"Kangaroos jump everywhere."
  },
  {
    id: 5,
    title: " Monkey",
    note:"Monkey's like Bannanas."
  },
  {
    id: 6,
    title: " Snake",
    note:"Snake starts with an S."
  },
  {
    id: 7,
    title: " Zebra",
    note:"Zebras have strips."
  },
  {
    id: 8,
    title: " Bear",
    note:"Bears are pretty scary."
  },
  {
    id: 9,
    title: " Hippo",
    note:"Hippos are very heavy."
  }
];

//call it like 
// setAttributes(elem, {["KEY"]:["VALUE"]})
let setAttributes = function(element, attributes) { 
    for (var key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

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

let changedSelectedValue = function() { 
    var selectBoxVal = $('#animals-select').find(":selected").val();
    var animalId = selectBoxVal.substring(0, 1);
    var animalNote = animalArr[animalId].note;
    return animalNote;
}

/**
* Main ready function. 
*/ 
$(document).ready(function() { 
    createDiv();
    $('#animals-select').change(function()   {
        var textInput = document.createElement("input");
        setAttributes(textInput, {"value": changedSelectedValue(), "readonly":"", "size": changedSelectedValue().length});
        var div = $('#animals');
        var previousText = div.find("input");
        previousText.remove();
        div.append(textInput);
    })
})