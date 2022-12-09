var version = 1.75
/* alert('so this is kinda buggy, but what you want to do is use WASD to move, movement is global, so the camera might not reflect where you move');
alert('also, if you get stuck in a death loop, use ctrl to toggle it off, wait till you respawn, then use ctrl again to turn it on again');
alert('you can use plus and minus to adjust speed too');
alert('on the bottom right, you can see a list of hacks. use the up and down arrows to scroll through them');
alert('for ones like fly, they are togled seperatly, and when you hover over them you can use + and - to adjust the fly speed');
alert('when you hover over another one, such as instant win, press the right arrow, then you will activate it.');
alert('like fly, you can go on to scale, then press + and - to adjust your persons scale.');
alert('pause is toggleable with the right arrow.');
alert('you can press 0 to toggle the visibility of the hack menu.');
*/
alert('NOTE: The Instant finish Hack only works offline! it will softlock you in ice party.');
/**
* TODO:
* - Add TP Function
* - Clean up code
* - Make headers look noticibally different from hacks
* - Make it so shift changes the speed at which variales change
*/
/**
* FINISHED:
* - Add Comments
* - Finish Hack multiline Support
* - Test Ice Party Support
*
*
*/
//defining Variables
var cusX = 0, cusY = 0, cusZ = 0, active = true, activeTime = 0, speed = 0.5, scale = 1;
//base position when entering fly mode
var base = { x: player.position.x, y: player.position.y, z: player.position.z };
var dev = document.createElement('div');
//wether the dev menu is shown
var devShow = false;
var cusStyle = document.createElement('style');
var hackMenu = document.createElement('div');
//wether the hack menu is shown
var hackMenuShow;
//hack list
var hacks = [{ name: "--Player--", value: "header" }, { name: "Scale", value: 1 }, { name: "Fly", value: 0.5 }, { name: "Turn Speed", value: steer }, { name: "--Game--", value: "header" }, { name: "Instant Win", value: undefined }, { name: "Pause", value: false }, { name: "TP To Ending", value: undefined }, { name: "--Other--", value: "header" }, { name: "Dev Menu", value: false }, { name: "Hack Count", value: 1 }, { name: "Log Debug", value: undefined }];
//selected hack
var hackId = 2;
//for handeling keys
const keyDown = {};
//setting up fonts
cusStyle.innerHTML = "@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');";
//setting up dev menu
dev.setAttribute('style', 'position:fixed; bottom:0; left:0; background-color:rgba(0, 0, 0, 0.65 ); font-family: "Press Start 2P", cursive; color:white; backdrop-filter:blur(4px);');
dev.id = "dev";
//setting up hack menu
hackMenu.setAttribute('style', 'position:fixed; bottom:0; right:0; background-color:rgba(0, 0, 0, 0.65 ); color:white; backdrop-filter:blur(4px); font-family: "Press Start 2P", cursive; font-size: xx-large; width:15%;');
hackMenu.id = "hackMenu";
//appending all to body
document.body.appendChild(dev);
document.body.appendChild(hackMenu);
document.body.appendChild(cusStyle);
function drawHud() {
document.getElementById('dev').innerHTML = `X: ${round(player.position.x, 2)}<br>Y: ${round(player.position.y, 2)}<br>Z: ${round(player.position.z, 2)}<br>Flight Speed: ${round(speed, 2)}<br>Scale: ${round(scale, 2)}<br>Turn Speed: ${round(steer, 2)}<br>Hack Length: ${hacks[10].value}`
if (hacks[10].value === 1) {
document.getElementById('hackMenu').innerHTML = `<span style="filter:brightness(50%); color:${getHackById(hackId - 1, "style")};">${getHackById(hackId - 1, "name")}</span><br><span style="color:${getHackById(hackId, "style")};">${getHackById(hackId, "name")}</span><br><span style="filter:brightness(50%); color:${getHackById(hackId + 1, "style")};">${getHackById(hackId + 1, "name")}</span>`;
}
if (hacks[10].value === 2) {
document.getElementById('hackMenu').innerHTML = `<span style="filter:brightness(50%); color:${getHackById(hackId - 2, "style")};">${getHackById(hackId - 2, "name")}</span><br><span style="filter:brightness(50%); color:${getHackById(hackId - 1, "style")};">${getHackById(hackId - 1, "name")}</span><br><span style="color:${getHackById(hackId, "style")};">${getHackById(hackId, "name")}</span><br><span style="filter:brightness(50%); color:${getHackById(hackId + 1, "style")};">${getHackById(hackId + 1, "name")}</span><br><span style="filter:brightness(50%); color:${getHackById(hackId + 2, "style")};">${getHackById(hackId + 2, "name")}</span>`;
}
if (hacks[10].value === 3) {
document.getElementById('hackMenu').innerHTML = `<span style="filter:brightness(50%); color:${getHackById(hackId - 3, "style")};">${getHackById(hackId - 3, "name")}</span><br><span style="filter:brightness(50%); color:${getHackById(hackId - 2, "style")};">${getHackById(hackId - 2, "name")}</span><br><span style="filter:brightness(50%); color:${getHackById(hackId - 1, "style")};">${getHackById(hackId - 1, "name")}</span><br><span style="color:${getHackById(hackId, "style")};">${getHackById(hackId, "name")}</span><br><span style="filter:brightness(50%); color:${getHackById(hackId + 1, "style")};">${getHackById(hackId + 1, "name")}</span><br><span style="filter:brightness(50%); color:${getHackById(hackId + 2, "style")};">${getHackById(hackId + 2, "name")}</span><br><span style="filter:brightness(50%); color:${getHackById(hackId + 3, "style")};">${getHackById(hackId + 3, "name")}</span>`;
}
if (hacks[10].value === 4) {
document.getElementById('hackMenu').innerHTML = `<span style="filter:brightness(50%); color:${getHackById(hackId - 4, "style")};">${getHackById(hackId - 4, "name")}</span><br><span style="filter:brightness(50%); color:${getHackById(hackId - 3, "style")};">${getHackById(hackId - 3, "name")}</span><br><span style="filter:brightness(50%); color:${getHackById(hackId - 2, "style")};">${getHackById(hackId - 2, "name")}</span><br><span style="filter:brightness(50%); color:${getHackById(hackId - 1, "style")};">${getHackById(hackId - 1, "name")}</span><br><span style="color:${getHackById(hackId, "style")};">${getHackById(hackId, "name")}</span><br><span style="filter:brightness(50%); color:${getHackById(hackId + 1, "style")};">${getHackById(hackId + 1, "name")}</span><br><span style="filter:brightness(50%); color:${getHackById(hackId + 2, "style")};">${getHackById(hackId + 2, "name")}</span><br><span style="filter:brightness(50%); color:${getHackById(hackId + 3, "style")};">${getHackById(hackId + 3, "name")}</span><br><span style="filter:brightness(50%); color:${getHackById(hackId + 4, "style")};">${getHackById(hackId + 4, "name")}</span>`;
}
if (devShow) {
document.getElementById('dev').style.display = "block";
} else {
document.getElementById('dev').style.display = "none";
};
};
function getHackById(id, type) {
if (type == "name") {
if (id < hacks.length && id > -1) {
//check if the id is within the range
return hacks[id].name
} else {
//it is not, so return a empty character
return "&nbsp"
};
} else {
if (id < hacks.length && id > -1) {
if (hacks[id].value === true) {
//the hack is "activated"
return "darkgreen"
} else {
if (hacks[id].value == "header") {
//makes headers bold
return "white; font-weight:900"
} else {
return "white"
}
};
}
}
};
function activateHack() {
let hack = hacks[hackId]
if (hack.name == "Instant Win") {
change_state.win();
};
if (hack.name == "Pause") {
hack.value = !hack.value;
alive = !hack.value;
};
if (hack.name == "Dev Menu") {
hack.value = !hack.value;
devShow = hack.value;
};
if (hack.name == "TP To Ending") {
player.position.x = endings[0].position.x
player.position.y = endings[0].position.y
player.position.z = endings[0].position.z
};
if (hack.name == "Log Debug") {
change_state.win();
if (world.stage == "game") {
socket.emit("win", {});
}
console.log('');
}
};
function hackAdd(add, mult) {
let hack = hacks[hackId]
if (add) {
if (hack.name == "Fly") {
speed += 0.1 * mult;
};
if (hack.name == "Scale") {
scale += 0.1 * mult;
};
if (hack.name == "Turn Speed") {
steer += 0.005 * mult;
};
if (hack.name == "Hack Count") {
if (hack.value < 4) {
hack.value += 1;
};
};
} else {
if (hack.name == "Fly") {
speed -= 0.1 * mult;
};
if (hack.name == "Scale") {
scale -= 0.1 * mult;;
};
if (hack.name == "Turn Speed") {
steer -= 0.005 * mult;
};
if (hack.name == "Hack Count") {
if (hack.value > 1) {
hack.value -= 1;
};
};
}
};
function onKeypress(event) {
keyDown[event.key] = true;
};
function onKeyUp(event) {
keyDown[event.key] = false;
};
function round(n, d) {
//round numbers
return (Math.round(n * (10 ** d)) / 10 ** d);
}
window.addEventListener('keydown', onKeypress);
window.addEventListener('keyup', onKeyUp);
function main() {
if (keyDown["Shift"]) {
cusY -= speed;
};
if (keyDown[" "]) {
cusY += speed;
hacks[6].value = false
};
if (keyDown["a"]) {
cusX += speed;
};
if (keyDown["d"]) {
cusX -= speed;
};
if (keyDown["w"]) {
cusZ -= speed;
hacks[6].value = false
};
if (keyDown["s"]) {
cusZ += speed;
};
if (keyDown["c"]) {
if (world.stage == "game") {
socket.emit("win", {});
};
};
if (keyDown[";"]) {
hackAdd(false, 2)
};
if (keyDown["'"]){
hackAdd(true, 2);
};
if (active) {
if (activeTime > 0) {
activeTime -= speed;
} else {
//set player position to the base position set, when fly mode was entered, plus the offset.
player.position.x = base.x + cusX;
player.position.y = base.y + cusY;
player.position.z = base.z + cusZ;/*
camera.rotation.z = camBase.x;
camera.rotation.x = camBase.y;
camera.rotation.y = camBase.z; */
//minimize camera movemnt
controls.right = false;
controls.left = false;
action = 0;
}
}
drawHud();
if (scale != 1) {
player.scaling.x = 1 * scale;
player.scaling.y = 0.16 * scale;
player.scaling.z = 1 * scale;
}
};
document.addEventListener("keydown", function (event) {
if (event.key == "Control") {
active = !active;
if (active) {
base = { x: player.position.x, y: player.position.y, z: player.position.z };
// camBase = { x: camera.rotation.x, y: camera.rotation.y, z: camera.rotation.z }
cusX = 0;
cusY = 0;
cusZ = 0;
steer = 0;
camera.rotation.y = 3.14;
camera.rotation.x = cam_depression;
} else {
steer = 0.022;
}
activeTime = 10;
};
if (event.key == "=") {
hackAdd(true, 1);
};
if (event.key == "-") {
hackAdd(false, 1)
};
if (event.key == "]"){
hackAdd(true, 2);
};
if (event.key == "["){
hackAdd(false, 2);
};
if (event.key == "0") {
//on key 0 pressed, toggle visibilty of the hack menu
hackMenuShow = !hackMenuShow;
if (hackMenuShow) {
document.getElementById('hackMenu').style.display = "block";
} else {
document.getElementById('hackMenu').style.display = "none";
};
};
if (event.key == "ArrowUp") {
if (hackId - 1 > -1) {
hackId -= 1;
};
//for some reason, when alive=false, pressing up will resume the session when on normal ice dodo, but not ice party.
hacks[6].value = false
};
if (event.key == "ArrowDown") {
if (hackId + 1 < hacks.length) {
hackId += 1;
}
};
if (event.key == "ArrowRight") {
activateHack();
};
});
setInterval(main, 10);
