(function(){
  var list = document.getElementsByClassName('job-lists')[0];
  var tasks = document.getElementsByClassName('swipe-right');
  
  var mouseOrigin;
  var isSwiping = false;
  var mouseRelease;
  var currentTask;
  var swipeMargin=20;
  var originalClassList;
  
  Array.prototype.forEach.call(tasks, function addSwipe(element){
    element.addEventListener('mousedown', startSwipe); 
  });
  
  /* 
    Defined events on document so that a drag or release outside of target 
    could be handled easily 
  */
  document.addEventListener('mouseup', endSwipe);
  document.addEventListener('mousemove', detectMouse);
  
    
  //STARTSWIPE
  function startSwipe(evt){ 
    mouseOrigin = evt.screenX;
    currentTask = evt.target;
    isSwiping = true;
    originalClassList = evt.target.classList.value;
  }
  
  //ENDSWIPE
  function endSwipe(evt){
    var completedTask;    
    
    if( currentTask.classList.contains("completing") ){
      currentTask.classList.remove("completing");
      currentTask.classList.add("completed");
      list.appendChild(currentTask);
    }
    else if( currentTask.classList.contains("deleting") ){
      currentTask.remove();      
    }      
    
    mouseOrigin = null;
    isSwiping = false;     
    currentTask.style.margin = 0;
    currentTask = null;
  }

  //DETECTMOUSE
  function detectMouse(evt){
    var currentMousePosition = evt.screenX;
    var swipeDifference = Math.abs(mouseOrigin - currentMousePosition)
    
    if(isSwiping && currentTask && (swipeDifference > swipeMargin) ){ 
      if( (swipeDifference-swipeMargin) <= swipeMargin ){
        //no change, allows user to take no action
        currentTask.classList.remove("completing");
        currentTask.classList.remove("deleting");
        currentTask.style.margin = 0;
      }
      else if( mouseOrigin > currentMousePosition ){
        //swipe left        
        currentTask.classList.remove("completing");
        currentTask.classList.add("deleting");
        currentTask.style.marginLeft = -swipeDifference+"px";
      }
      else if( (mouseOrigin + 20 < currentMousePosition) &&
      !currentTask.classList.contains("completed")){
        //swip right");
        currentTask.classList.remove("deleting");
        currentTask.classList.add("completing");
        currentTask.style.marginLeft = swipeDifference+"px";

        const linkElement = currentTask.querySelector('a')
        const linkHref = linkElement.href
        
        window.location.href = linkHref
      }
    }
  }  
  
})();