function update() {
  var but = document.getElementsByTagName('button');
  for(var i = 0; i < but.length; i++) {
    but[i].onclick = function() {
      append(this);
      var div = document.getElementById("outstr");
      div.scrollLeft = div.scrollWidth;
    }
  }
}

function append(button) {
  var con = button;
  var res = document.getElementById("outstr");
  var last = "";
  if(res.innerHTML != "0") last = res.innerHTML.charAt(res.innerHTML.length-1);
  if(con.innerHTML == "del"){ 
    res.innerHTML = res.innerHTML.substring(0, res.innerHTML.length-1);
    document.getElementById("error").innerHTML = "";
  }
  else if(con.innerHTML == "CE") {
    res.innerHTML = "0";
    document.getElementById("error").innerHTML = "";
  }
  else if(con.innerHTML == "=") {
    if(!ifValid(res.innerHTML)) document.getElementById("error").innerHTML = '"' + res.innerHTML + '" is not valid!';  
    else {
      var pre = document.getElementById("selc").value;
      res.innerHTML = parse(res.innerHTML).toFixed(pre);
      document.getElementById("error").innerHTML = "";
    }
  }else if((con.innerHTML == "+" || con.innerHTML == "*" || con.innerHTML == "/" ) && 
          (last == "" || (isNaN(last) && last != ")")))
    document.getElementById("error").innerHTML = "You can't do that!";
  else if(con.innerHTML == "−" && (isNaN(last) && last != ")" && last != "("))
    document.getElementById("error").innerHTML = "You can't do that!";
  else if(con.innerHTML == "." && isNaN(last))
    document.getElementById("error").innerHTML = "You can't do that!";
  else if(con.innerHTML == "(" && (last != "" && (!isNaN(last) 
          || last == "." || last == ")")))
    document.getElementById("error").innerHTML = "You can't do that!";    
  else if(con.innerHTML == ")" && (last == "" || (isNaN(last) && last != ")")))
    document.getElementById("error").innerHTML = "You can't do that!";
  else if(res.innerHTML != "0" && con.innerHTML != "−") {
    var html1 = String(res.innerHTML);
    var html2 = String(button.innerHTML);
    res.innerHTML = html1 + html2;
    document.getElementById("error").innerHTML = "";
  }else if(res.innerHTML != "0" && con.innerHTML == "−") {
    var html1 = String(res.innerHTML);
    res.innerHTML = html1 + "−";
    document.getElementById("error").innerHTML = "";
  }else if(res.innerHTML == "0" && con.innerHTML == "."){
    res.innerHTML += button.innerHTML;
    document.getElementById("error").innerHTML = "";
  }else{
    res.innerHTML = button.innerHTML;
    document.getElementById("error").innerHTML = "";
  }
}

function parse(fmu) {
  var i = fmu.lastIndexOf("("), j = fmu.indexOf(")", i);
  if(i > -1 && j > -1) 
    return parse(fmu.substring(0, i) + 
      parse(fmu.substring(i + 1, j)) + fmu.substring(j + 1, fmu.length)); 
  i = fmu.indexOf("+");
  if(i > -1) return parse(fmu.substring(0, i)) + parse(fmu.substring(i + 1, fmu.length));
  i = fmu.lastIndexOf("−");
  while(i > 0 && isNaN(fmu.charAt(i - 1)))
    {i = fmu.lastIndexOf("−", i - 1);alert("a");}
  if(i > -1) return parse(fmu.substring(0, i)) - parse(fmu.substring(i + 1, fmu.length));
  i = fmu.indexOf("*");
  if(i > -1) return parse(fmu.substring(0, i)) * parse(fmu.substring(i + 1, fmu.length));
  i = fmu.lastIndexOf("/");
  if(i > -1) return parse(fmu.substring(0, i)) / parse(fmu.substring(i + 1, fmu.length));
  if(fmu == "") return 0.0;
  return parseFloat(fmu);
}
function ifValid(fmu) {
  var n1 = fmu.split('(').length-1, n2 = fmu.split(')').length-1; 
  if(n1 != n2) return false;
  if(isNaN(fmu.charAt(fmu.length-1)) && fmu.charAt(fmu.length-1) != ")") return false;
  return true;
}


