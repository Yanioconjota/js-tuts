var myImage = document.getElementById("mainImage");

var myArray = ["img/001.jpg","img/002.jpg","img/003.jpg","img/004.jpg","img/005.jpg","img/006.jpg","img/007.jpg","img/008.jpg",];

var refresh = true;

// seta o valor do index
var index = 0;

// funcao para trocar as imagens
function changeImage(){
  myImage.setAttribute("src", myArray[index]);
  index++;
  if (index >= myArray.length) {
    index = 0;
  };

  if (refresh) {
  	miIntervalo();
  }
}

// eventos de interação com a troca das imagens
myImage.onmouseover = function(){
  refresh = false;  
}

myImage.onmouseout = function(){
  refresh = true; 
}

myImage.onclick = changeImage;

function miIntervalo (){
	setTimeOut (function(){
		changeImage();
	},
	1000
	) 
}