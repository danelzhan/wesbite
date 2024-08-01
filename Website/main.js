//import './style.css';

import * as THREE from 'three';

import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// scene setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 500, 100000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: true,
});

renderer.setClearColor( 0x000000, 0 );
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(-6000);
camera.position.setX(-12000);
camera.position.setY(2000);

// loading assets

const loader = new GLTFLoader();

var record_player = null;
var japanese_room = null;
var table = null;
var cake = null;
var record = null;
var candle = null;
var fire = null;

loader.load(
  'Record player.glb',
  function (glb) {
    console.log(glb);
    record_player = glb.scene;
    record_player.position.y = 0;
    record_player.position.x = -1700;
    record_player.position.z = 750;
    record_player.rotation.y = 5.2;
    scene.add(record_player);
  }
);

loader.load(
  'record.glb',
  function (glb) {
    record = glb.scene;
    record.position.x = -825;
    record.position.z = 2600;
    record.position.y = 260;
    record.scale.multiplyScalar(0.001);
  }
);

loader.load(
  'JapaneseRoom.glb',
  function (glb) {
    japanese_room = glb.scene;
    japanese_room.scale.multiplyScalar(12000);
    japanese_room.position.x = 0;
    japanese_room.position.z = 0;
    japanese_room.position.y = 600;
    scene.add(japanese_room);
  }
);

loader.load(
  'Table.glb',
  function (glb) {
    table = glb.scene;
    table.scale.multiplyScalar(1200);
    table.position.x = -3500;
    table.position.z = -2500;
    table.position.y = -1650;
    table.rotation.y = 5.075;
    scene.add(table);
  }
);

loader.load(
  'Cake.glb',
  function (glb) {
    console.log('table');
    cake = glb.scene;
    cake.scale.multiplyScalar(1200);
    cake.position.x = -3500;
    cake.position.z = -2500;
    cake.position.y = -700;
    scene.add(cake);
  }
);

loader.load(
  'Candle.glb',
  function (glb) {
    console.log('table');
    candle = glb.scene;
    candle.scale.multiplyScalar(1200);
    candle.position.x = -3500;
    candle.position.z = -2500;
    candle.position.y = -350;
    scene.add(candle);
  }
);

loader.load(
  'Fire.glb',
  function (glb) {
    fire = glb.scene;
    fire.scale.multiplyScalar(80);
    fire.position.x = -3500;
    fire.position.z = -2500;
    fire.position.y = -250;
    scene.add(fire);
  }
);

/*scene.add(new THREE.GridHelper(5000, 100));*/
 
const light = new THREE.HemisphereLight( 0xffeaf6, 0x080808, 2);
scene.add(light);

const controls = new OrbitControls(camera, renderer.domElement);
controls.dispose();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
 // controls.update();
}

animate();

// scroll animations
var prevT = 1000;
var tempT = 0;

var tempX = 0;
var tempY = 0;
var tempZ = 0;

function moveCamera() {

  var t = document.body.getBoundingClientRect().top;

  if (camera.position.z <= -4475 || (t > prevT && t > tempT)) {
    camera.position.x = -12000 + t * -5.1;
    camera.position.y = 2000 + t * 1.08;
    camera.position.z = -6000 + t * -1;
  
    camera.rotation.y = -1.0857465 + t * -0.0005;
    camera.rotation.z = -2.8548361 + t * 0.00011;

    tempT = t;
    tempX = camera.position.x;
    tempY = camera.position.y;
    tempZ = camera.position.z;
  } else if (camera.position.y > -4003 || (t > prevT)) {
    
    // camera.position.x = tempX + (t - tempT) * - 5.1;
    camera.position.y = tempY + (t - tempT) * -0.4;
    camera.position.z = tempZ + (t - tempT) * -1.5;
  }

  console.log(camera.position.x);
  console.log(camera.position.y);
  console.log("z:" + camera.position.z);
  prevT = t;
}

console.log("camera rotation z: " + camera.rotation.z);

document.body.onscroll = moveCamera;

// interactive stuff

//play songs
const songButton = document.getElementById('songButton');
const songChoice = document.getElementById('song_selection');

const paperRingsSong = new Audio('songs/paperRings.mp3');
const ivySong = new Audio('songs/ivy.mp3');
const loveStorySong = new Audio('songs/love.mp3');
const cruelSummerSong = new Audio('songs/cruel.mp3');
const belongSong = new Audio('songs/belong.mp3');
const allWellSong = new Audio('songs/tooWell.mp3');
const fortnightSong = new Audio('songs/fortnight.mp3');
const toysSong = new Audio('songs/toys.mp3');

songButton.addEventListener("click", function () {

  const value = songChoice.value;

  stopMusic();

  if (value == "paper_rings") {
    paperRingsSong.play();
  } else if (value == "ivy") {
    ivySong.play();
  } else if (value == "cruel_summer") {
    cruelSummerSong.play();
  } else if (value == "belong_me") {
    belongSong.play();
  } else if (value == "love_story") {
    loveStorySong.play();
  } else if (value == "all_well") {
    allWellSong.play();
  } else if (value == "fortnight") {
    fortnightSong.play();
  } else if (value == "toys") {
    toysSong.play();
  }

  scene.add(record);
});

//stop record player 
const stopButton = document.getElementById('stopButton');
stopButton.addEventListener('click', function(){
  stopMusic();
  scene.remove(record);

});

function stopMusic() {
  paperRingsSong.pause();
  paperRingsSong.currentTime = 0;
  ivySong.pause();
  ivySong.currentTime = 0;
  loveStorySong.pause();
  loveStorySong.currentTime = 0;
  cruelSummerSong.pause();
  cruelSummerSong.currentTime = 0;
  belongSong.pause();
  belongSong.currentTime = 0;
  allWellSong.pause();
  allWellSong.currentTime = 0;
  fortnightSong.pause();
  fortnightSong.currentTime = 0;
  toysSong.pause();
  toysSong.currentTime = 0;
}

//blow candle
const candleBlow = document.getElementById('blowButton');
const blowAudio = new Audio('blow.mp3');
candleBlow.addEventListener("click", function () {
  if (candleBlow.innerHTML == "blow") {
    blowAudio.play();
    scene.remove(fire);
    candleBlow.innerHTML = "ignite";
  } else {
    scene.add(fire);
    candleBlow.innerHTML = "blow";
  }

});

