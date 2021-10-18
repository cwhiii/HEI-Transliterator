// C.W.Holeman III

//console.trace();

// TODO: Handle numbers.
// TODO: PH is not always the diagraph. remove handling, unless, maybe with a " ` "?
// TODO: MAKE THIS WORK AS FUNCTION, where a string is passed in, and a series of images is passed back out.  AEA in, HIEA out.
// FIXME: Capital C (and other removed caps?) broken.
// FIXME: Capital vowels don't work.


var hieOutput = "";
var hieOutput2 = "";
var thisChar = "";
var nextChar = "";
var eliminated = "";
var hazard = "";

function toggleHelp(){
	console.log("toggleHelp::v2");
	console.log(document.getElementById("help").style.display );
	
	if(document.getElementById("help").style.display == "block"){
		document.getElementById("help").style.display = "none";
		document.getElementById("helpButton").innerText = "⇱ Show Help";
		}
	else{
		document.getElementById("help").style.display = "block";
		document.getElementById("helpButton").innerText = "⇲ Hide Help";
		}
	}

function hazards(type){
	if(document.getElementById("hazards").checked == true){
		console.log("Show hazards.")
		return " style=\"border-bottom: 3px solid; border-color: "+ type + ";\"";
		}
	else {
		console.log("Hide hazards.")
		
		}
	}

function transliterateA2H(){
	clearAll();
	//appendCharacter("");

	console.log("Submitting AEA content to transliterator:");
	var aeaInput = document.getElementById('aeaInput').value;
	console.log(aeaInput);

	//document.getElementById('hieOutput').innerHTML = aeaInput;
	console.log("Clearing output zone.");
	document.getElementById('aeaOutput').innerHTML = "<legend>AEA Conversion Notes</legend>";
	document.getElementById('hieOutput').innerHTML = "<legend>HIE Final Output</legend>";


	for(var i = 0; i < aeaInput.length; i++) {
		hazard = ""; 
		thisChar = aeaInput.charAt(i);
		console.log("thisChar: " + thisChar);
		nextChar = aeaInput.charAt((i+1));
		console.log("nextChar: " + nextChar);

		// Handle character.
		if(isLetter(thisChar)) {
			//console.log("isLetter: '" + thisChar + "'.");
			// Handle Vowels
			if(isConsonant(thisChar)){
				//console.log("Is Consonant.");
				if(isDiagraph(thisChar + nextChar)) {
					//console.log("Is diagraph: " + thisChar + nextChar);
					whichDiagraph((thisChar + nextChar))
					i++; // Skip the next letter as it's part of the diagraph.
					}
				else{
					i += whichConsonant(thisChar, nextChar)
					}
				}
			else{
				console.log("Is a vowel.");
				// Logs & executes in a single call:
				i += whichVowel(thisChar + nextChar);
				console.log("Vowel returns: ???");
				}
			}
		else{
			console.log("Is NOT letter.");
			if(thisChar == " ") {        /// Should match \s? Or other for other types of whitespace.
				console.log("Is space.");
				appendCharacter("_", 2);
				}
			else if(isPunctuation(thisChar)) {
				console.log("Is punctuation.");
				appendCharacter(thisChar, 1);
				}
			else if(isNumber(thisChar)) {
				console.log("Is number.");
				appendCharacter(thisChar, "number");
				}
			else if(thisChar == "\n") {
				console.log("Is newine.");
				appendCharacter("<br>", 3);
				}
			else{
				console.log("UNKNOWN CHARACTER.");
				}
			}
		}
	//hieOutput += "<br><br>" + hieOutput2;
	//document.getElementById('hieOutput').innerHTML = hieOutput;

	}

////////////////////////////////////////////////////////////////////
	// FUNCTIONS //
////////////////////////////////////////////////////////////////////


function isCap(str){
	str = str.substring(0, 1)
	console.log("---> CASE TEST? : : "+str);
	if (str == str.toUpperCase()){
		console.log("---> IS CAP.");
		return "_";
		}
	else{
		console.log("---> NO CAP.");
		return "";
		}
	}



// Types:
//  - Blank: Letter.
//  - 1: Punctuation.
//  - 2: space.
//  - 3: newline.
//  - 4: Diagraph.
function appendCharacter(str, type){
	console.log("Appender Sees: " + str + "\n\n");
	var imageURL = "<img src=\"letters/" + str.toLowerCase() + isCap(str) + ".webp\" class=\"letter\"" + hazard + ">";
	console.log(imageURL);

	if(type == 1){
		console.log("Type 1 character: Punctuation.");
		document.getElementById('aeaOutput').innerHTML += str;
		document.getElementById('hieOutput').innerHTML += str;
		console.log("\n----------------------------------------------------\n\n");
		return 1;
		}
	if(type == 2){
		console.log("Type 2 character: Space.");
		document.getElementById('aeaOutput').innerHTML += "_";
		document.getElementById('hieOutput').innerHTML += "\xa0\xa0\xa0\xa0\xa0";
		console.log("\n----------------------------------------------------\n\n");
		return 2;
		}
	if(type == 3){
		console.log("Type 3 character: newline.");
		document.getElementById('aeaOutput').innerHTML += "<br>";
		document.getElementById('hieOutput').innerHTML += "<br>";
		console.log("\n----------------------------------------------------\n\n");
		return 3;
		}
	if(type == "diagraph"){
		console.log("Type 4 character: diagraph.");
		document.getElementById('aeaOutput').innerHTML += "[" + (str +  isCap(str)) + "]";
		document.getElementById('hieOutput').innerHTML += imageURL;
		console.log("\n----------------------------------------------------\n\n");
		return 3;
		}
	if(type == "number"){
		console.log("Type 5 character: number.");
		document.getElementById('aeaOutput').innerHTML += "[" + str + "]";
		document.getElementById('hieOutput').innerHTML += str;
		console.log("\n----------------------------------------------------\n\n");
		return 3;
		}
	else{
		console.log("Type 0 character: Letter.");
		document.getElementById('aeaOutput').innerHTML += "[" + (str +  isCap(str)) + "]";
		document.getElementById('hieOutput').innerHTML += imageURL;
		console.log("\n----------------------------------------------------\n\n");
		return 0;
		}
	}

function whichDiagraph(){
	// TODO: This assumes that ALL ph is the diagraph of F, and not a non-diagraph, wuch as in "uphold."
	if(thisChar.toLowerCase() == "p" && nextChar.toLowerCase() == "h"){
		appendCharacter("f", "diagraph");
		console.log("FOR DIAGRAPH: 'f'.");
		}
	else {
		appendCharacter((thisChar + nextChar), "diagraph");
		}
	}


function whichConsonant(thisChar, nextChar){
	// TODO: handle soft C (s).
	switch(thisChar){
		case "c":
			if(nextChar == "`"){
				console.log("REGISTERING soft c-->s switch." + "s");
				hazard = hazards("red");
				appendCharacter("s");
				return 1;
				}
			else {
				console.log("REGISTERING c-->k switch.");
				hazard = hazards("red");
				appendCharacter("k");
				return 1;
				}
			break;
		case "q":
			console.log("REGISTERING c-->k switch.");
			hazard = hazards("red");
			appendCharacter("k");
			return 1;
			break;
		case "x":
			console.log("REGISTERING x-->ks switch.");
			// FIXME: Doesn't handle Caps correctly.
			hazard = hazards("red");
			appendCharacter("k");
			appendCharacter("s");
			return 1;
			break;
		default:
			console.log("No switch.");
			hazard = hazards("ivory"); // TODO: Change to transparent.
			appendCharacter(thisChar);
			return 0;
		}
	}

function whichPunctuation(str) {
	appendCharacter(str);
	// TODO: Handle punctuation, which does not need to be images.
	}

function whichVowel(str) {
	console.log("Processing vowel::::::::::::::::::::::::::::::: " + str);
	//// Fallback to  SOUND-AS-LETTER-NAME if unspecified.
	// ` for 2nd.
	// ~ for 3rd.`
	hazard = hazards("blue");
	
	// Naked Vowels
	if(str.charAt(1) != "`" && str.charAt(1) != "~"){
		console.log("Naked vowel (type 0)--> " + str.charAt(0));
		appendCharacter(str.charAt(0));
		return 0;
		}
	// Dressed Vowels
	else if(str.toLowerCase() == "a`"  || str.toLowerCase() == "e`"  || str.toLowerCase() == "i`" || str.toLowerCase() == "o`" || str.toLowerCase() == "u`"){
		console.log("Is type 1 Vowel: " + str);
		appendCharacter(str);
		return 1;
		}
	// Dressed Vowels - More.
	else if(str.toLowerCase() == "a~") {
		console.log("Is type 2 Vowel: " + str);
		appendCharacter(str);
		return 1;
		}
	//else return 0;
	}

function isLetter(str) {
	return str.length === 1 && str.match(/[a-z]/i); // Currently only matches a-z & A-Z.
	}


function isNumber(str) {
	return str.length === 1 && str.match(/\d/); // Currently only matches a-z & A-Z.
	}

function isPunctuation(str) {
	return str.length === 1 && str.match(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g); // Currently only matches a-z & A-Z.
	}


//function isNewline(str){
//     if (str == '/\n\r?/g')
//          console.log("\n\n\n\n MATTCHED NEWLINE");
//     }

function isDiagraph(str) {
	if(str.toLowerCase() == "ch" || str.toLowerCase() == "sh" || str.toLowerCase() == "th" || str.toLowerCase() == "ph" || str.toLowerCase() == "ng"){
		console.log("Is Diagraph.");
		hazard = hazards("green");
		return true;
		}
	else {
		console.log("Not Diagraph.");
		hazard ="";
		return false;}
		}

function isConsonant(str){
	if(str.toLowerCase() == "a" || str.toLowerCase() == "e" || str.toLowerCase() == "i" || str.toLowerCase() == "o" || str.toLowerCase() == "u" ){
		console.log("Not Consonant.");
		return false;
		}
	else {
		console.log("Is Consonant.");
		return true;
		}
	}



function clearAll(){
	console.log("Clearing 'all locations' input.");
	document.getElementById('aeaOutput').innerHTML = "";
	document.getElementById('hieOutput').innerHTML = "";
	// TODO: Use only initially.
	//document.getElementById("aeaInput").value = "";
	//document.getElementById("aeaInput").style.color = 'black';
	}




function rescaleInput(){
	console.log("SCALLING");
	document.getElementById("aeaInput").style.height = "";
	document.getElementById("aeaInput").style.height = this.scrollHeight + "px";
	}
