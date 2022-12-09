function main() {
//container
var b3dConsole = document.createElement("div");
b3dConsole.id = "b3dConsoleContainer"
b3dConsole.innerHTML = b3dConsoleInner;
//view
var b3dArray = document.createElement('div');
b3dArray.id = "b3dArray";
//debug
var b3dDebug = document.createElement('div');
b3dDebug.id = "b3dDebug";
//scripts
var b3dScripts = document.createElement("script");
b3dScripts.innerHTML = b3dScriptsInner;
//styles
var b3dStyles = document.createElement('style');
b3dStyles.innerHTML = b3dStylesInner;
//loading
document.body.appendChild(b3dConsole);
document.body.appendChild(b3dArray);
document.body.appendChild(b3dDebug);
document.body.appendChild(b3dStyles);
document.body.appendChild(b3dScripts);
};
const b3dScriptsInner = `
var b3dShown = true;
var b3dArrayInner = "";
var b3dArrayContents = [];
function mainLoop() {
//inf Jump
if (document.getElementById('c_infJump').checked == true) {
app.player.allowJump = true;
};
//force grapple
if (document.getElementById('c_forceGrapple').checked == true) {
app.player.mode = "grapple";
};
//custom scale
if (document.getElementById('c_scale').checked == true) {
document.getElementById('c_scale_box').style.display = "block";
} else {
document.getElementById('c_scale_box').style.display = "none";
};
//Custom gravity
if (document.getElementById('c_customGrav').checked == true) {
document.getElementById('c_customGrav_box').style.display = "block";
let i_customGrav = {x:document.getElementById('c_customGrav_x').value, y:document.getElementById('c_customGrav_y').value};
document.getElementById('c_customGrav_p').innerHTML = "x: " + i_customGrav.x + ", y: " + i_customGrav.y;
app.engine.world.gravity.x = i_customGrav.x; app.engine.world.gravity.y = i_customGrav.y;
}else{
document.getElementById('c_customGrav_box').style.display = "none";
}
//Debug Menu
if (document.getElementById('c_debug').checked == true){
document.getElementById('b3dDebug').style.display = "block";
document.getElementById('b3dDebug').innerHTML = "X: " + roundInt(app.player.position.x, 3) + "<br>Y: " + roundInt(app.player.position.y, 3) + "<br>XV: " + roundInt(app.player.getVelocity().x, 3) + "<br>YV: " + roundInt(app.player.getVelocity().y, 3) + "<br>FPS: " + app.fps.fps;
}else{
document.getElementById('b3dDebug').style.display = "none";
};
//invincibility
if(document.getElementById('c_noKill').checked == true){
app.player.kill=function(){console.log("YOU DIED... JK");};
}else{
app.player.kill=function(){if(!1==this.isFrozen()){this.freeze(!0),this.visible=!1,this.killTimeout=setTimeout(function(){app.player.restart()},1e3);for(var i={x:this.scale.x/4,y:this.scale.y/4,z:this.scale.z/4},t=-2;t<2;t++)for(var e=-2;e<2;e++){var o=randomNumber(0,360*(Math.PI/180)),s={color:this.color,position:{x:this.position.x+e*i.x+i.x/2,y:this.position.y+t*i.y+i.y/2,z:0},rotation:{x:0,y:0,z:o},scale:{x:i.x,y:i.y,z:i.z},isStatic:!1,friction:0},l=app.level.createObject("cube");app.level.setObjectProperties(l,s),app.level.addObject(l,app),l.isParticle=!0,l.setColors(this.color),Matter.Body.setVelocity(l.body,this.body.velocity)}}};
};
//custom cam scale
if(document.getElementById('c_camScale').checked == true){
document.getElementById('c_camScale_box').style.display = "block";
let camScaleValue = document.getElementById('c_camScale_range').value;
app.camera.scale.x = camScaleValue; app.camera.scale.y = camScaleValue;
}else{
document.getElementById('c_camScale_box').style.display = "none";
app.camera.scale.x = 1; app.camera.scale.y = 1;
};
b3dArrayContentsFill();
};
function b3dArrayContentsFill() {
b3dArrayContents = [];
if (document.getElementById('c_scale').checked) { b3dArrayContents.push("Custom Player Scale")};
if (document.getElementById('c_infJump').checked) { b3dArrayContents.push("Infinite Jump")};
if (document.getElementById('c_forceGrapple').checked) { b3dArrayContents.push("Force Grapple Hook")};
if (document.getElementById('c_customGrav').checked) { b3dArrayContents.push("Custom World Gravity")};
if (document.getElementById('c_debug').checked) { b3dArrayContents.push("Debug Menu")};
if (document.getElementById('c_camScale').checked) { b3dArrayContents.push("Custom Camera Scale")};
if (document.getElementById('c_noKill').checked) { b3dArrayContents.push("Invincibility")};
if (document.getElementById('c_jumpHeight').checked) { b3dArrayContents.push("Custom Jump Height")};
//sort lol
b3dArrayContents.sort((b, a) => a.length - b.length)
b3dArrayInner = ""
for (let aryI = 0; aryI < b3dArrayContents.length; aryI++) {
b3dArrayInner += "<p>" + b3dArrayContents[aryI] + "</p>";
};
if (document.getElementById('c_array').checked) {
document.getElementById('b3dArray').innerHTML = b3dArrayInner;
} else {
document.getElementById('b3dArray').innerHTML = "";
};
};
function roundInt(n, d){
return Math.round((10**d)*n)/(10**d)
};
function setJumpFunc(n){
app.player.jump=function(){if("jump"==this.mode&&!0==this.allowJump){this.allowJump=!1;var o=app.engine.world.gravity,t=Math.PI/2-Matter.Vector.angle({x:0,y:0},o),i=this.body.velocity,y=1,e=Math.PI/20,s=n,d={x:-(o.x*s*this.body.mass),y:-(o.y*s*this.body.mass)};(i=Matter.Vector.rotate(i,t)).y=0,e*=y=i.x>=0?1:-1,i=Matter.Vector.rotate(i,-t),this.body.speed<.25*this.maxSpeed&&(e=0),Matter.Body.setVelocity(this.body,i),Matter.Body.setAngularVelocity(this.body,e),Matter.Body.applyForce(this.body,this.body.position,d)}};
}
document.addEventListener("keydown", function (event) {
if (event.key == "0") {
b3dShown = !b3dShown;
if (b3dShown) {
document.querySelector('#b3dConsoleContainer').style.display = "none";
} else {
document.querySelector('#b3dConsoleContainer').style.display = "block";
};
};
});
document.getElementById('c_scale').addEventListener('change', function() {
if (this.checked == false) {
app.player.setScale({x:16, y:16, z:16}, false);
};
});
document.getElementById('c_customGrav').addEventListener('change', function() {
if (this.checked == false) {
app.engine.world.gravity.x = 0; app.engine.world.gravity.y = 1;
};
});
document.getElementById('c_forceGrapple').addEventListener('change', function() {
if (this.checked == false) {
app.player.mode = "jump"
};
});
document.getElementById('c_jumpHeight').addEventListener('change', function() {
if(this.checked == true){
document.getElementById('c_jumpHeight_box').style.display = "block";
setJumpFunc(document.getElementById('c_jumpHeight_range').value);
document.getElementById('c_jumpHeight_p').innerHTML = document.getElementById('c_jumpHeight_range').value;
}else{
setJumpFunc(0.025);
document.getElementById('c_jumpHeight_box').style.display = "none";
};
});
document.getElementById('c_jumpHeight_range').addEventListener('change', function() {
setJumpFunc(document.getElementById('c_jumpHeight_range').value);
document.getElementById('c_jumpHeight_p').innerHTML = document.getElementById('c_jumpHeight_range').value;
});
setInterval(mainLoop, 10);
`
const b3dConsoleInner = `
<h1>Gameplay</h1>
<h2>Infinite Jump</h2>
<label class="switch">
<input id="c_infJump" type="checkbox">
<span class="slider round"></span>
</label>
<h2>Force Grapple</h2>
<label class="switch">
<input id="c_forceGrapple" type="checkbox">
<span class="slider round"></span>
</label>
<h2>Custom Gravity</h2>
<label class="switch">
<input id="c_customGrav" type="checkbox">
<span class="slider round"></span>
</label>
<div id="c_customGrav_box">
<input type="range" value="0" min="-10" max="10" id="c_customGrav_x">
<input type="range" value="1" min="-10" max="10" id="c_customGrav_y">
<p id="c_customGrav_p"></p>
</div>
<h2>Invincibility</h2>
<label class="switch">
<input id="c_noKill" type="checkbox">
<span class="slider round"></span>
</label>
<h2>Custom Jump Height</h2>
<label class="switch">
<input id="c_jumpHeight" type="checkbox">
<span class="slider round"></span>
</label>
<div style="display:none;" id="c_jumpHeight_box">
<input type="range" value="0.025" min="0.005" step="0.005" max="1" id="c_jumpHeight_range">
<p id="c_jumpHeight_p"></p>
</div>
<hr>
<h1>Scale</h1>
<label class="switch">
<input value="true" id="c_scale" type="checkbox">
<span class="slider round"></span>
</label>
<div id="c_scale_box">
<h2>Grow Player</h2>
<a onclick="app.player.setScale({ x: app.player.scale.x * 1.2, y: app.player.scale.y * 1.2, z: app.player.scale.z * 1.2 }, false);" class="c_button">+</a>
<h2>Shrink Player</h2>
<a onclick="app.player.setScale({ x: app.player.scale.x * 0.8, y: app.player.scale.y * 0.8, z: app.player.scale.z * 0.8 }, false);" class="c_button">+</a>
</div>
<h2>Scale Camera</h2>
<label class="switch">
<input value="true" id="c_camScale" type="checkbox">
<span class="slider round"></span>
</label>
<div id="c_camScale_box">
<input type="range" value="1" min="0.1" step="0.1" max="20" id="c_camScale_range">
</div>
<hr>
<h1>HUD</h1>
<h2>Cheat Array</h2>
<label class="switch">
<input id="c_array" type="checkbox">
<span class="slider round"></span>
</label>
<h2>Show Debug Menu</h2>
<label class="switch">
<input id="c_debug" type="checkbox">
<span class="slider round"></span>
</label>
`
const b3dStylesInner = `
@import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap');
#b3dConsoleContainer {
position:fixed;
bottom:-40vh;
left:0px;
height:45vh;
width:100vw;
background-color:rgba(0, 0, 0, .25);
border-top:solid 3px black;
transition:500ms;
padding:15px;
backdrop-filter:blur(5px);
color:white;
text-align:center;
overflow-y:scroll;
}
#b3dConsoleContainer:hover{
bottom:0vh;
}
.c_button{
border:none;
border-radius:8px;
padding:10px;
transition:300ms;
background-color:white;
color:black;
content-align:center;
}
.c_button:hover{
filter:brightness(80%);
cursor:pointer;
transform:scale(1.2);
}
#b3dArray{
top:0px;
right:0px;
position:fixed;
pointer-events: none;
text-align:right;
z-index:274672;
}
#b3dArray>p{
background-color:rgba(0, 0, 0, 0.55);
text-shadow: 0px 0px 7px rgba(255, 255, 255, 1);
color:white;
margin:-1px;
font-family: 'Courier Prime', monospace;
}
#b3dDebug{
position:fixed;
background-color:rgba(0, 0, 0, 0.85);
text-shadow: 0px 0px 7px rgba(255, 255, 255, 1);
color:white;
bottom:0px;
left:0px;
z-index:274671;
pointer-events:none;
}
/*Switch styles*/
.switch{position:relative;display:inline-block;width:60px;height:34px;}.switch input {opacity: 0;width: 0;height: 0;}.slider {position: absolute;cursor: pointer;top: 0;left: 0;right: 0;bottom: 0;background-color: #ccc;-webkit-transition: .4s;transition: .4s;}.slider:before {position: absolute;content: "";height: 26px;width: 26px;left: 4px;bottom: 4px;background-color: white;-webkit-transition: .4s;transition: .4s;}input:checked + .slider {background-color: green;}input:focus + .slider {box-shadow: 0 0 1px #2196F3;}input:checked + .slider:before {-webkit-transform: translateX(26px);-ms-transform: translateX(26px);transform: translateX(26px);}.slider.round {border-radius: 34px;}.slider.round:before {border-radius: 50%;}
`;
main();
