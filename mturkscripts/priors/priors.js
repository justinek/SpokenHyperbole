function showSlide(id) {
  $(".slide").hide();
  $("#"+id).show();
}

function random(a,b) {
  if (typeof b == "undefined") {
    a = a || 2;
    return Math.floor(Math.random()*a);
  } else {
    return Math.floor(Math.random()*(b-a+1)) + a;
  }
}

function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function repeatArray(array, numRepeat) {
  for (i=1; i < numRepeat; i++) {
    array = array.concat(array);
  }
  return array;
}

Array.prototype.random = function() {
  return this[random(this.length)];
}

function setQuestion(array) {
    var i = random(0, array.length - 1);
    var q = array[i];
    return q;
}

function shuffledArray(arrLength)
{
  var j, tmp;
  var arr = new Array(arrLength);
  for (i = 0; i < arrLength; i++)
  {
    arr[i] = i;
  }
  for (i = 0; i < arrLength-1; i++)
  {
    j = Math.floor((Math.random() * (arrLength - 1 - i)) + 0.99) + i;
    tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

function getRadioCheckedValue(formNum, radio_name)
{
   var oRadio = document.forms[formNum].elements[radio_name];
   for(var i = 0; i < oRadio.length; i++)
   {
      if(oRadio[i].checked)
      {
         return oRadio[i].value;
      }
   }
   return '';
}

function clearForm(oForm) {
    
  var elements = oForm.elements; 
    
  oForm.reset();

  for(i=0; i<elements.length; i++) {
      
	field_type = elements[i].type.toLowerCase();
	
	switch(field_type) {
	
		case "text": 
		case "password": 
		case "textarea":
	        case "hidden":	
			
			elements[i].value = ""; 
			break;
        
		case "radio":
		case "checkbox":
  			if (elements[i].checked) {
   				elements[i].checked = false; 
			}
			break;

		case "select-one":
		case "select-multi":
            		elements[i].selectedIndex = -1;
			break;

		default: 
			break;
	}
    }
}


var allConditions = 
[
[
{"itemID": "necklace", "item": "necklace", "itemType": "feminine", "buyerType": "feminine"},
{"itemID": "perfume", "item": "bottle of perfume", "itemType": "feminine", "buyerType": "feminine"},
{"itemID": "china_set", "item": "china set", "itemType": "feminine", "buyerType": "feminine"},
{"itemID": "chain_saw", "item": "chain saw", "itemType": "masculine", "buyerType": "feminine"},
{"itemID": "dumbbell_rack", "item": "dumbbell rack", "itemType": "masculine", "buyerType": "feminine"},
{"itemID": "lawn_mower", "item": "lawn mower", "itemType": "masculine", "buyerType": "feminine"},
{"itemID": "necklace", "item": "necklace", "itemType": "feminine", "buyerType": "masculine"},
{"itemID": "perfume", "item": "bottle of perfume", "itemType": "feminine", "buyerType": "masculine"},
{"itemID": "china_set", "item": "china set", "itemType": "feminine", "buyerType": "masculine"},
{"itemID": "chain_saw", "item": "chain saw", "itemType": "masculine", "buyerType": "masculine"},
{"itemID": "dumbbell_rack", "item": "dumbbell rack", "itemType": "masculine", "buyerType": "masculine"},
{"itemID": "lawn_mower", "item": "lawn mower", "itemType": "masculine", "buyerType": "masculine"},
{"itemID": "necklace", "item": "necklace", "itemType": "feminine", "buyerType": "neutral"},
{"itemID": "perfume", "item": "bottle of perfume", "itemType": "feminine", "buyerType": "neutral"},
{"itemID": "china_set", "item": "china set", "itemType": "feminine", "buyerType": "neutral"},
{"itemID": "chain_saw", "item": "chain saw", "itemType": "masculine", "buyerType": "neutral"},
{"itemID": "dumbbell_rack", "item": "dumbbell rack", "itemType": "masculine", "buyerType": "neutral"},
{"itemID": "lawn_mower", "item": "lawn mower", "itemType": "masculine", "buyerType": "neutral"},
]
];


var names_feminine = shuffle(["Amy", "Ann", "Cheryl", "Heather", "Rachel", "Nicole"]);
var names_masculine = shuffle(["Joseph", "Mark", "Matthew", "Paul", "Derek", "Jeffrey"]);
var names_neutral = shuffle(["Sklyer", "Justice", "Jessie", "Milan", "Casey", "Oakley"]);


var numConditions = allConditions.length;
var chooseCondition = random(0, numConditions-1);
var shuffledTrials = shuffle(allConditions[chooseCondition]);
var numTrials = shuffledTrials.length;

var currentTrialNum = 0;
var trial;
var numComplete = 0;
var buyer;

showSlide("instructions");
$("#trial-num").html(numComplete);
$("#total-num").html(numTrials);


var experiment = {
	
    prices: new Array(numTrials),
    orders: new Array(numTrials),
    items: new Array(numTrials),
    itemTypes: new Array(numTrials),
    buyers: new Array(numTrials),
    buyerTypes: new Array(numTrials),
    gender: "",
    age:"",
    income:"",
    nativeLanguage:"",
    comments:"",
    description: function() {
    	
    	showSlide("description");
    	$("#tot-num").html(numTrials);
    	
    },
    end: function() {
        var gen = getRadioCheckedValue(1, "genderButton");
        var ag = document.age.ageRange.value;
        var lan = document.language.nativeLanguage.value;
        var comm = document.comments.input.value;
        var incomeVal = document.income.incomeRange.value;
        experiment.gender = gen;
        experiment.age = ag;
        experiment.nativeLanguage = lan;
        experiment.comments = comm;
        experiment.income = incomeVal;
        clearForm(document.forms[1]);
        clearForm(document.forms[2]);
        clearForm(document.forms[3]);
        clearForm(document.forms[4]);
        clearForm(document.forms[5]);
        
        showSlide("finished");
        setTimeout(function() {turk.submit(experiment) }, 1500);
    },
    next: function() {
    	if (numComplete > 0) {
    		
    		  var price = parseFloat(document.price.score.value);
        	experiment.prices[currentTrialNum] = price;
        	experiment.orders[currentTrialNum] = numComplete;
        	
        	
        	experiment.items[currentTrialNum] = trial.itemID;
        	experiment.itemTypes[currentTrialNum] = trial.itemType;
        	
        	experiment.buyers[currentTrialNum] = buyer;
        	experiment.buyerTypes[currentTrialNum] = trial.buyerType;
        	
        	clearForm(document.forms[0]);
        
        }
    	if (numComplete >= numTrials) {
    		$('.bar').css('width', (200.0 * numComplete/numTrials) + 'px');
    		$("#trial-num").html(numComplete);
    		$("#total-num").html(numTrials);
    		showSlide("askInfo");
    	} else {
    		$('.bar').css('width', (200.0 * numComplete/numTrials) + 'px');
    		$("#trial-num").html(numComplete);
    		$("#total-num").html(numTrials);
    		currentTrialNum = numComplete;

    		trial = shuffledTrials[numComplete];
    		buyerType = trial.buyerType;
        if (buyerType == "feminine") {
          buyer = names_feminine.shift();
        } else if (buyerType == "masculine") {
          buyer = names_masculine.shift();
        } else {
          buyer = names_neutral.shift();
        }
    		
        	showSlide("stage");
        	$("#buyer").html(buyer);
        	$("#item1").html(trial.item);
        	$("#item2").html(trial.item);
        	numComplete++;
        }
    }
}


