var Objects = [];
var video = "";
var status = "";

function setup(){
  canvas = createCanvas(500, 480)
  canvas.center()
}

function preload(){
  video = createVideo("video.mp4")
  video.hide()
}

function draw(){
  image(video, 0, 0, 500, 480)

  if(status != ""){
    objectDetector.detect(video,gotResult)
    for(var i=0; i<Objects.length; i++){
      document.getElementById("status").innerHTML = "status: objetos detectados"
      document.getElementById("numeroDeOjs").innerHTML = "quantidade de objetos detectados - "+Objects.length;

      fill("#ff0000")
      percent = floor(Objects[i].confidence*100)
      textSize(25)
      text(Objects[i].label+" "+percent+"%",Objects[i].x+15,Objects[i].y+15)
      noFill()
      stroke("#ff0000")
      rect(Objects[i].x,Objects[i].y,Objects[i].width,Objects[i].height)
    }
  }
}

function gotResult(error, results){
  if(error){
    console.error(error)
}else{
  console.log(results)
  Objects = results
}
}

function start(){
  objectDetector = ml5.objectDetector("cocossd", modelLoaded)
  document.getElementById("status").innerHTML = "status: detectando objetos"
}

function modelLoaded(){
  console.log("modelo foi carregado")
  status = true;
  video.loop();
  video.speed(1);
  video.volume(1);
}