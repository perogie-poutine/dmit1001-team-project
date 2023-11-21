console.clear();

const icon = document.querySelector("svg");
let iconHeight = icon.clientHeight;
let iconWidth = icon.clientWidth + 2;
let bodyHeight = document.body.clientHeight;
let bodyWidth = document.body.clientWidth;  
let leftLimit = bodyWidth - iconWidth;
let topLimit = bodyHeight - iconHeight;
let move = 0;
let moveY = 0;



setInterval(()=>{

  bodyHeight = document.body.clientHeight;
  bodyWidth = document.body.clientWidth;
  let leftPosition = parseInt(icon.style.left.replace("px", ""));
  let topPosition = parseInt(icon.style.top.replace("px", ""));
  
  if (leftPosition >= leftLimit){
    leftLimit = 2;
    move -= 20;
    icon.style.left = move+"px";
  }else{
    leftLimit = bodyWidth - iconWidth;
    move += 20;
    icon.style.left = move+"px";
  }
  
  if(topPosition >= topLimit){
    topLimit=2;
    moveY -= 20;
    icon.style.top = moveY+"px";
  }else{
    
    topLimit=bodyHeight - iconHeight;
    moveY += 20;
    icon.style.top = moveY+"px";
    
  }
  
 // console.log("Left: " + leftPosition + " " + "Top: " + topPosition);
    
   
    
}, 100);


