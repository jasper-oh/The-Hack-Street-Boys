function loadSkeleton(){
    $('#navbarPlaceholder').load('/navbar');
    $("#footerDiv").load("/footer");
}

loadSkeleton();

var bhavLink = document.getElementById('bavLink');
var jasLink = document.getElementById('jasLink');
var yousLink = document.getElementById('yousLink');
var jaspLink = document.getElementById('jasperLink');
var abiLink = document.getElementById('abiLink');

if (location.pathname == "/aboutus"){
    bhavLink.addEventListener('click', ()=> {
        window.open("https://www.linkedin.com/in/bhavnoor-saroya/");
    });
    
    jasLink.addEventListener("click", ()=>{
        window.open("https://www.linkedin.com/in/jaskirat-singh-46b506159/")
    });
    
    yousLink.addEventListener("click", ()=> {
        window.open("https://www.linkedin.com/in/m-yousuf-rabani-9a509364/");
    })
    
    jaspLink.addEventListener("click", ()=> {
        window.open("https://www.linkedin.com/in/jasper-oh-595586124/");
       
    });
    
    abiLink.addEventListener("click", ()=> {
        window.open("https://www.linkedin.com/in/abhishekchouhannk/")
    })
}


var resumeRoasterBtn = document.getElementById('roasterBtn');
var scraperBtn = document.getElementById('scraperBtn');
var aboutBtn = document.getElementById('aboutBtn');


if (location.pathname == '/') {
    resumeRoasterBtn.addEventListener('click', ()=> {
        window.location.href = "/resumeroaster";
    })
    
    scraperBtn.addEventListener("click", ()=> {
        window.location.href = "/checkjob";
    })
    
    aboutBtn.addEventListener("click", ()=> {
        window.location.href = "/aboutus";
    })
}
