var box = document.getElementById("imgSliderB");
var ul = box.children[0].children[0];
var ol = box.children[0].children[1];
var ulLiArr = ul.children;
var olLiArr = ol.children;
var timer = null;
var key = 0;
var square = 0;
var btnArr = box.children[0].children[2].children;

var newLi = ulLiArr[0].cloneNode(true);
ul.appendChild(newLi);

for(var i=0;i<ulLiArr.length-1;i++){
		var newOlLi = document.createElement("li");
		newOlLi.innerHTML = i+1;
		ol.appendChild(newOlLi);
}

ol.children[0].className = "current";

function animate(obj,target) {
	clearInterval(obj.timer);
	var speed = obj.offsetLeft < target ? 10 : -10;
	obj.timer = setInterval(function() {
		var result = target - obj.offsetLeft;
		obj.style.left = obj.offsetLeft + speed  + "px";
		if(Math.abs(result) <= 10) {
			obj.style.left = target + "px";
			clearInterval(obj.timer);
		}
	},10);
}

for(var i=0;i<olLiArr.length;i++){
	olLiArr[i].index = i;
	olLiArr[i].onmouseover = function () {
		for(var j=0;j<olLiArr.length;j++){
			olLiArr[j].className = "";
		}
		olLiArr[this.index].className = "current";
		animate(ul,-this.index*ul.children[0].offsetWidth);
		key = square = this.index;
	}
}

function autoPlay(){
	key++;
	square++;
	if(key>olLiArr.length){
		key=1;
		ul.style.left = 0;
	}
	animate(ul,-key*ul.children[0].offsetWidth);
	square = square>olLiArr.length-1?0:square;
        for(var j=0;j<olLiArr.length;j++){
            olLiArr[j].className = "";
        }
        olLiArr[square].className = "current";
    }

timer = setInterval(autoPlay,3000);

box.onmouseover = function () {
	clearInterval(timer);
}
box.onmouseout = function () {
	timer = setInterval(autoPlay,3000);
}

btnArr[0].onclick = function () {
	key--;
	square--;
	if(key<0){
		key=4;
		ul.style.left = -5*ul.children[0].offsetWidth + "px";
	}
	animate(ul,-key*ul.children[0].offsetWidth);
 
	square = square<0?olLiArr.length-1:square;
	for(var j=0;j<olLiArr.length;j++){
		olLiArr[j].className = "";
	}
	olLiArr[square].className = "current";
}
btnArr[1].onclick = function () {
	autoPlay();
}