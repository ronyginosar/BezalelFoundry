function colorinvert(){
  if (document.body.style.getPropertyValue('--bg-color') != "black"){
    document.body.style.setProperty('--bg-color' , "black" );
    document.body.style.setProperty('--element-color' , "white" );
  } else {
    document.body.style.setProperty('--bg-color' , "white" );
    document.body.style.setProperty('--element-color' , "black" );
  }
}

function randomColors(){
  // 16777215 == ffffff in decimal
  // 16 -> hex val of number
  var randomElement = Math.floor(Math.random()*16777215).toString(16);
  if (randomElement.length != 6) randomElement = Math.floor(Math.random()*16777215).toString(16);
  document.body.style.setProperty('--element-color' , "#"+randomElement );
  var randomBackground = Math.floor(Math.random()*16777215).toString(16);
  if (randomBackground.length != 6) randomBackground = Math.floor(Math.random()*16777215).toString(16);
  document.body.style.setProperty('--bg-color' , "#"+randomBackground );
}

//  color selection functions

// set background colorPicker
var bgcolorPicker = new iro.ColorPicker("#color-bg-container", {
  width: 100,
  color: 'rgb(255, 64, 100)', //initial color
  wheelLightness: false,
  handleRadius:7,
  sliderHeight:7,
  sliderMargin:7
});
// set text colorPicker
var textcolorPicker = new iro.ColorPicker("#color-text-container", {
  width: 100,
  color: '#000000', //initial color
  wheelLightness: false,
  handleRadius:7,
  sliderHeight:7,
  sliderMargin:7
});

function bgColorSelector(){
  // toggle selector
  var selectorDiv = document.getElementById("color-bg-container");
  if (selectorDiv.style.display != "block") {
    selectorDiv.style.display = "block";
  } else {
    selectorDiv.style.display = "none";
  }
  // hide other selector
  document.getElementById("color-text-container").style.display = "none";

  // set initial color to current color (if not first time defining color)
  var currBgColor = document.body.style.getPropertyValue('--bg-color');
  if (currBgColor != "") bgcolorPicker.color.set(currBgColor);

  // change color on traverse
  bgcolorPicker.on(["color:init", "color:change"], function(color){
    var bgCurrColor = bgcolorPicker.color.hexString; // already string ready
    document.body.style.setProperty('--bg-color' , bgCurrColor );
  });
}

function textColorSelector(){
  // toggle selector
  var selectorDiv = document.getElementById("color-text-container");
  if (selectorDiv.style.display != "block") {
    selectorDiv.style.display = "block";
  } else {
    selectorDiv.style.display = "none";
  }
  // hide other selector
  document.getElementById("color-bg-container").style.display = "none";

  // set initial color to current color (if not first time defining color)
  var currElemColor = document.body.style.getPropertyValue('--element-color');
  if (currElemColor != "") textcolorPicker.color.set(currElemColor);

  // change color on traverse
  textcolorPicker.on(["color:init", "color:change"], function(color){
    var elemCurrColor = textcolorPicker.color.hexString; // already string ready
    document.body.style.setProperty('--element-color' , elemCurrColor );
  });
}

// note: In chrome apps, Content Security Policy does not allow inline javascript.
// https://stackoverflow.com/questions/36324333/refused-to-execute-inline-event-handler-because-it-violates-csp-sandbox/36349056
