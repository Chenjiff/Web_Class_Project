window.onload = function() {
  start = 0;
  document.getElementById("start").onclick = function(){
    if(start == 0) {
      start = 1;
      document.getElementById("over").innerHTML = "PLAYING..";
      gamestart();
    }
    else {
      gameover();
    }
  }
}
function gamestart() {
  time = setInterval(minus, 1000);
  var moles = document.getElementsByName("mole");
  randomApp(moles);
  for(var i = 0; i < moles.length; i++) {
      (function(arg) {
        moles[arg].onclick = function() {
          var m = parseInt(document.getElementById("cou2").innerHTML);
          var num = document.getElementsByTagName("input")[arg].value;
          if(num == 1) {
            m++;
            document.getElementsByTagName("input")[arg].value = 0;
            this.classList.remove("sele");
            this.classList.add("bgs");
            setTimeout(function() {
                document.getElementsByName("mole")[arg].classList.remove("bgs");
                }, 500);
            randomApp(moles);
          }
          else {
            m--;
            this.classList.add("eros");
            setTimeout(function() {
                document.getElementsByName("mole")[arg].classList.remove("eros");
                }, 500);
          }
          document.getElementById("cou2").innerHTML = m.toString();
      }})(i);
  }
}
function minus() {
  var t = parseInt(document.getElementById("cou1").innerHTML);
  t--;
  document.getElementById("cou1").innerHTML = t.toString();
  if(t == -1) gameover();
}
function randomApp(ary) {
  var moles = document.getElementsByName("mole");
  for(var i = 0; i < moles.length; i++) {
    if(document.getElementsByTagName("input")[i].value == 1) {
      document.getElementsByTagName("input")[i].value = 0;
      moles[i].classList.remove("sele");
      break;
    }
  }
  var len = ary.length;
  var rinx = Math.floor(Math.random() * len);
  document.getElementsByTagName("input")[rinx].value = 1;
  moles[rinx].classList.add("sele");

}
function gameover() {
  document.getElementById("over").innerHTML = "Game over!";
  alert("Game Over!\nYour score: " + document.getElementById("cou2").innerHTML);
  var moles = document.getElementsByName("mole");
  for(var i = 0; i < moles.length; i++) {
    if(document.getElementsByTagName("input")[i].value == 1) {
      document.getElementsByTagName("input")[i].value = 0;
      moles[i].classList.remove("sele");
      break;
    }
  }
  start = 0;
  clearInterval(time);
  document.getElementById("cou1").innerHTML = "30";
  document.getElementById("cou2").innerHTML = "0";
}