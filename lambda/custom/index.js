'use strict';
// for Alexa SDK V 1
// Idea and texts: Gary Atkinson
// Original template code: Careerfoundry
// Code modifications: Gary Atkinson, Alexey Vidanov

const Alexa = require('alexa-sdk'); const APP_ID = undefined;
/*********** Data ***********/
const SKILL_NAME = "Lunch Box";
const GET_LUNCH_MESSAGE = "Here's a packed lunch idea: ";
const HELP_MESSAGE = "Get a random idea for tasty and simple vegetarian packed lunch. Just say, ask lunch box for an idea.";
const HELP_REPROMPT = "I have some really tasty and simple recipes. Do you want to here an idea?";
const STOP_MESSAGE = "See you later";
// Each recipe is written within two single backticks and all recipes are seperated by commas. 
const data = [

		`You could assemble a salad with fruit. salad leaves. and cheese. <break strength="x-strong"/> The fruit could be apple or peach. <break strength="x-strong"/>
		The leaves could be spinach or rocket. <break strength="x-strong"/>
		The cheese could be cheddar or feta. <break strength="x-strong"/>
		You could also add avocado or cucumber.`,

		`You could make a soup with carrots. red lentils. and coconut milk. <break strength="strong"/> Remember to add vegetable stock. <break strength="strong"/> You could also add spices. like chilli or curry powder.`,

		`You could make an open sandwich with cheese and apple. <break strength="strong"/> Use any cheese. And any apples <break strength="strong"/>
		You could toast it too.`,

		`You could assemble a ramen soup to microwave later. <break strength="strong"/>
		Put the following in a microwavable container: fine dried noodles. kale. and miso paste.
		To make. Just pour over hot water and microwave for two minutes. <break strength="strong"/> You could also add spices, like chilli and ginger. <break strength="strong"/> Or use other sliced vegetables, like broccoli. carrot, and mushrooms.`,

		`You could assemble cooked pwee lentils. pickled beetroot. roasted carrots. and feta cheese. Drizzle with olive oil.`,

		`You could mix together cooked noodles. and cooked broccoli. <break strength="strong"/> Add peanuts. chilli. and soy sauce.`,

		`You could have a dip like hummus. with raw vegetable sticks. and bread. <break strength="x-strong"/>
		The vegetables could be carrots. or bell peppers. <break strength="x-strong"/> The bread could be peeta bread. or wraps.`,

		`You could make a coleslaw with sliced red cabbage. red peppers. and mango. Serve with walnuts. and a boiled egg.`,

		`You could have a Spanish torteee-aa with bread.
		It’s an omelette with fried potatoes. <break strength="strong"/>
		You can also add peas. chilli. and cheese. <break strength="x-strong"/> Have it cold or reheat in a microwave.`,

		`You could make a sandwich with cheddar. pickled beetroot. and salted crisps.` ];
/*********** Execution Code ***********/
const handlers = { 'NewSession': function(){
this.emit('GetLunchRecipeIntent'); },
	'GetLunchRecipeIntent': function(){
	const randomLunchIndex = Math.floor(Math.random() * data.length);
	const randomLunch = data[randomLunchIndex];
	const speechOutput = GET_LUNCH_MESSAGE + randomLunch;
	this.attributes.lastSpeech = randomLunch;
	this.response.cardRenderer(SKILL_NAME, randomLunch); 
	this.response.speak(speechOutput + "Would you like another lunch idea?").listen("Would you like another lunch idea?");
	this.emit(':responseReady');
	this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomLunch);
},
'AMAZON.RepeatIntent': function() {
	this.response.speak(this.attributes.lastSpeech + "Would you like another lunch idea?").listen("Would you like another fact?");
	this.emit(':responseReady');

 },
'AMAZON.YesIntent': function () {
	this.emit("GetLunchRecipeIntent"); },
	'AMAZON.NoIntent': function () { this.response.speak(STOP_MESSAGE); this.emit(':responseReady');
},
'AMAZON.HelpIntent': function(){
	this.emit(':ask', HELP_MESSAGE, HELP_REPROMPT); },
'AMAZON.CancelIntent': function(){ 
	this.emit(':tell', STOP_MESSAGE);
},
'AMAZON.StopIntent': function(){
	this.emit(':tell', STOP_MESSAGE); },
'Unhandled': function(){
	 this.emit(':tell', HELP_MESSAGE);
} };

exports.handler = (event, context, callback) => { const alexa = Alexa.handler(event, context); alexa.APP_ID = APP_ID; alexa.registerHandlers(handlers); alexa.execute();
};
