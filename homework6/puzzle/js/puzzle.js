$("document").ready(function() {
  $("#but").click(function() {
    puz.recover();
  });
  $("#set").click(function() {
    $("#rag").toggleClass("app");
  });
  $("#ref").click(function() {
    $("#img").toggleClass("imgapp");
  });
  $("#bar").change(function() {
    document.getElementById("lv").innerHTML = document.getElementById("bar").value;
  });
  puz.init();
})
var puz = {
  x: 4,
  y: 4,
  spR: 3,
  spC: 3,
  imgUrl: "url('image/panda.jpg')",
  init: function() {
    this.setupTab();
    this.clipImg();
    this.randomSort();
    this.active();
  },
  setupTab: function() {
    var tab = document.getElementById("tab");
    var tobe = document.getElementById("bar").value; 
    var len = 400 / tobe - 2;     
    if(tobe > this.x) {
      var cloTr = document.getElementsByTagName("tr")[0].innerHTML;
      var cloTd = document.getElementsByTagName("td")[0].innerHTML;
      for(var i = 0; i < tobe - this.x; i++) 
        tab.insertRow(0).innerHTML = cloTr;
      for(var i = 0; i < tobe; i++)
        for(var j = 0; j < tobe - this.x; j++) 
          document.getElementsByTagName("tr")[i].insertCell(0).innerHTML = cloTd;
    }
    if(tobe < this.x) {
      for(var i = 0; i < this.x - tobe; i++) 
        tab.deleteRow(0);
      for(var i = 0; i < tobe; i++)
        for(var j = 0; j < this.x - tobe; j++) 
          document.getElementsByTagName("tr")[i].deleteCell(0);
    }
    $("label").css("width", len + "px");
    $("label").css("height", len + "px");
    this.x = parseInt(tobe);
    this.y = parseInt(tobe);
    this.spC = parseInt(tobe - 1);
    this.spR = parseInt(tobe - 1);
  },
  clipImg: function() {
    var lbs = $("label");
    var inputs = $("input");
    for(var i = 0; i < lbs.length - 1; i++) {
        var currRow = Math.floor(i / this.x);
        var currCol = i % this.x;
        inputs[i].value = i + 1;
        lbs[i].style.background = this.imgUrl;
        lbs[i].style.backgroundPositionX = -400 / this.x * currCol + "px";
        lbs[i].style.backgroundPositionY = -400 / this.x * currRow + "px"; 
    }  
    inputs[lbs.length - 1].value = 0;  
  },
  randomSort: function() {
    var tds = $("td");
    var cloneTds = [];
    for(var i = 0; i < tds.length; i++) 
      cloneTds.push(tds[i].cloneNode(true));
    var inx = [];
    for(var i = 0; i < tds.length - 1; i++) 
      inx.push(i);
    for(var j = 0; j < tds.length - 2; j++) {
      var ran = Math.floor(Math.random() * (tds.length - 1 -j)) + j;
      var n = inx[j];
      inx[j] = inx[ran];
      inx[ran] = n;
    }
    var rNum = 0;
    for(var i = 1; i < tds.length - 1; i++) 
      for(var j = 0; j < i; j++) 
        if(inx[j] > inx[i]) rNum++;
    if(rNum % 2 != 0) {
      var n = inx[0];
      inx[0] = inx[1];
      inx[1] = n;
    } 
    for(var i = 0; i < tds.length - 1; i++) 
      tds[i].innerHTML = cloneTds[inx[i]].innerHTML;
  },
  active: function() {
    var lbs = document.getElementsByTagName('label');
    var actInx = [-1, -1, -1, -1];
    var spInx = this.spC + this.spR * this.x;
    if(this.spC + 1 < this.x) actInx[0] = spInx + 1;
    if(this.spR + 1 < this.y) actInx[1] = spInx + this.x;
    if(this.spC - 1 >= 0) actInx[2] = spInx - 1;
    if(this.spR - 1 >= 0) actInx[3] = spInx - this.x;
    for(var i = 0; i < actInx.length; i++) {
      if(actInx[i] == -1) continue;
      (function(i) {lbs[actInx[i]].onclick = function() {
        if(i % 2 == 0) puz.spC += (i == 0) ? 1 : -1;
        else puz.spR += (i == 1) ? 1 : -1;
        if(i % 2 == 0) this.classList.add(i == 0 ? "lm" : "rm");
        else this.classList.add(i == 1 ? "um" : "dm");
        var ti = this;
        setTimeout(function() {
          ti.classList.remove("lm", "rm", "um", "dm");
          var cloneTd = document.getElementById("space").parentNode.cloneNode(true);
          document.getElementById("space").parentNode.innerHTML = ti.parentNode.innerHTML;
          ti.parentNode.innerHTML = cloneTd.innerHTML;
        }, 180);
        //分开好像就不卡了
        setTimeout(function() {
          if(!puz.success()) puz.active();
          else alert("You Win!");
        }, 200);
        for(var j = 0; j < actInx.length; j++) {
          if(actInx[j] == -1) continue;
          lbs[actInx[j]].onclick = null;
        }
      }})(i);
    }
  }, 
  success: function() {
    var tds = $("td");
    for(var i = 0; i < tds.length - 1; i++) {
      if(document.getElementsByTagName("input")[i].value != i + 1) return false;
    }
    return true;
  },
  recover: function() {
    var lbs = document.getElementsByTagName('label');
    for(var i = 0; i < lbs.length; i++) {
      lbs[i].onclick = null;
    }
    var cloneTd = document.getElementById("space").parentNode.cloneNode(true);
    document.getElementById("space").parentNode.innerHTML = lbs[this.x*this.y-1].parentNode.innerHTML;
    lbs[this.x*this.y-1].parentNode.innerHTML = cloneTd.innerHTML;
    this.spR = this.x - 1;
    this.spC = this.x - 1;
    this.init();
  }
}