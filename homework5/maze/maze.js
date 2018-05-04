window.onload = function () {
  document.getElementById("st").onmouseover = function() {
    change("GO!");
    gamestart();
  }
  document.getElementById("ed").onmouseover = function() {
    change("Don't cheat, you should" + 
        'start from the "S" and move to the "E" inside the maze!');
  }
}
function gamestart() {
  var walls = document.getElementsByClassName("wall");
  flag = 0; 
  for(var i = 0; i < walls.length; i++){
    (function(arg) {
      walls[i].onmouseover = function() {
        this.classList.add("warning");
          setTimeout(function() {
            walls[arg].classList.remove("warning");
          }, 3000)
        change("Game over.");
        gameover();
      }})(i);
  }
  document.getElementById("check").onmouseover = function() {
    flag = 1;
  }
  document.getElementById("ed").onmouseover = function() {
    if(flag == 1) {
      change("You win!");
      gameover();
    }
    else {
      change("Don't cheat, you should" + 
        'start from the "S" and move to the "E" inside the maze!');
      gameover();
    }
  }
}
function gameover() {
  flag = 0;
  var walls = document.getElementsByClassName("wall");
  for(var i = 0; i < walls.length; i++){
    walls[i].onmouseover = null;
    
  }
  document.getElementById("check").onmouseover = null;
  document.getElementById("ed").onmouseover = function() {
    change("Don't cheat, you should" + 
        'start from the "S" and move to the "E" inside the maze!');
  }
}
function change(str) {
  var hp = document.getElementById("help");
  hp.classList.add("chg");
  setTimeout(function() {
    hp.innerHTML = str;
  }, 200);
  setTimeout(function() {
    hp.classList.remove("chg");
  }, 400);
}

