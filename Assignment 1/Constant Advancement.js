let animalArr = [
  {
    id: 1,
    title: " Tiger",
    note:"The tiger is the largest living cat species and a member of the genus Panthera. It is most recognisable for its dark vertical stripes on orange-brown fur with a lighter underside."
  },
  {
    id: 2,
    title: " Eagle",
    note:"Eagle is the common name for many large birds of prey of the family Accipitridae. Eagles belong to several groups of genera, some of which are closely related. "
  },
  {
    id: 3,
    title: " Ostrich",
    note:"The common ostrich or simply ostrich, is a species of large flightless bird native to certain large areas of Africa."
  },
  {
    id: 4,
    title: " Vulture",
    note:"A vulture is a bird of prey that scavenges on carrion. The Old World vultures include 15 living species native to Europe, Africa, and Asia; New World vultures are restricted to North and South America."
  },
  {
    id: 5,
    title: " Kangaroo",
    note:"The kangaroo is a marsupial from the family Macropodidae. In common use the term is used to describe the largest species from this family, the red kangaroo, as well as the antilopine kangaroo, eastern grey kangaroo, and western grey kangaroo."
  },
  {
    id: 6,
    title: " Monkey",
    note:"Monkey is a common name that may refer to certain groups or species of simian mammals of infraorder Simiiformes. "
  },
  {
    id: 7,
    title: " Snake",
    note:"Snakes are elongated, limbless, carnivorous reptiles of the suborder Serpentes. "
  },
  {
    id: 8,
    title: " Zebra",
    note:"Zebras are African equines with distinctive black-and-white striped coats. There are three extant species: the Grévy's zebra, plains zebra, and the mountain zebra. "
  },
  {
    id: 9,
    title: " Bear",
    note:"Bears are carnivoran mammals of the family Ursidae. They are classified as caniforms, or doglike carnivorans. Although only eight species of bears are extant, they are widespread, appearing in a wide variety of habitats throughout the Northern Hemisphere and partially in the Southern Hemisphere."
  },
  {
    id: 10,
    title: " Hippo",
    note:"The hippopotamus, also called the hippo, common hippopotamus or river hippopotamus, is a large, mostly herbivorous, semiaquatic mammal and ungulate native to sub-Saharan Africa."
  }
];

//call it like 
// setAttributes(elem, {["KEY"]:["VALUE"]})
let setAttributes = function(element, attributes) { 
    for (var key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//Generates the elements within the selector 
let generateSelectElem = function(animal) { 
    var newOption = document.createElement("option");
    newOption.innerHTML = animal['id'] + animal['title'];
    var value = animal['id'] + animal['title'];
    setAttributes(newOption, {"value":value, "id":animal['id']});
    return newOption;
}

//Generates the selector itself to hold the elements 
let createSelector = function() { 
    var newSelector = $("#animals").find("select");
    for (var i = 0; i < animalArr.length; i ++) { 
        var newSelectElem = generateSelectElem(animalArr[i]);
        newSelector.append(newSelectElem);
    }
    return newSelector;
}

//Creates the Div to hold all of the elements 
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

//Function to check for the select box value 
let changedSelectedValue = function() { 
    var selectBoxVal = $('#animals-select').find(":selected").val();
    var animalId = selectBoxVal.substring(0, 2) - 1;
    var animalNote = animalArr[animalId].note;
    return animalNote;
}

/**
* Main ready function. 
*/ 
$(document).ready(function() { 
    createDiv();
    console.log(animalArr);
    $('#animals-select').change(function()   {
        var textInput = document.createElement("input");
        setAttributes(textInput, {"value": changedSelectedValue(), "readonly":"", "size": changedSelectedValue().length});
        var div = $('#animals');
        var previousText = div.find("input");
        previousText.remove();
        div.append(textInput);
    })
})