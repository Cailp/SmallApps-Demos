//getElements
var box = document.getElementsByClassName('route')[0];
var route = document.getElementsByClassName('rect');
var body = document.getElementsByTagName('body')[0];
var wall = document.getElementsByTagName('section')[0];
var startArea = document.getElementsByClassName('start')[0];
var textscreen = document.getElementsByTagName('h2')[0];

function FadeIn(ele,opacity,times){
	if(times == 0){
		ele.style.backgroundColor = ele.inherentColor;
		return;
	}
	ele.style.background = 'rgba(255,0,0,'+ opacity +')';
	
	function In(){
		opacity += 0.1;
		ele.style.background = 'rgba(255,0,0,'+ opacity +')';
		
		if(Math.floor(opacity) == 1){
			clearInterval(a);
			FadeOut(ele,1,times);
		}
	};
	var a = setInterval(In, 20);
}

function FadeOut(ele,opacity,times){

	ele.style.background = 'rgba(255,0,0,'+ opacity +')';
	
	function Out(){
		opacity -= 0.1;
		ele.style.background = 'rgba(255,0,0,'+ opacity +')';
		
		if(Math.ceil(opacity) == 0){
			clearInterval(a);
			times -= 1;
			FadeIn(ele,0,times);
		}
	};
	var a = setInterval(Out, 20);

}

function blink(ele,times){
	ele.inherentColor = window.getComputedStyle(ele).getPropertyValue("background-color");
	FadeIn(ele,0,times);
}

function textdelete(ele, toOutput){
	var i = 0
	var input = ele.innerHTML ;
	console.log( input ) ;
	function output() {
		var len = input.length;
		var output = input;
		output = input.slice(0, -(i + 1));
		ele.innerHTML = output;
		console.log(output);
		console.log(ele);
		i += 1;
		if (i >= len){
			clearInterval(o);
			textinput(ele, toOutput);
		}
	}
	var o = setInterval(output, 50);
}

function textinput(ele, toOutput){
	var i = 0 ;
	var input = toOutput ;
	ele.innerHTML = "";
	console.log( input );
	function output() {
		var len = input.length;
		var output = '';
		output = ele.innerHTML +input[i];
		ele.innerHTML = output;
		console.log(output);
		console.log(ele);
		i += 1;
		if (i >= len){
			clearInterval(o);
		}
	}
	var o = setInterval(output, 50);
}

function typeWriter(ele,toOutput) {
	textdelete(ele, toOutput);
}

function gameOver(event) {
	var getDefault = function(){
		for(var i = 0; i < route.length ; i++){
			route[i].style.background = '#fff';
			route[i].style.cursor = 'default';
		}
		body.removeEventListener('mouseover', gameOver);
	}
	//Meet wall
	if(event.target.tagName === "SECTION"){
		console.log("Over");
		getDefault();
		typeWriter(textscreen, "You Lose!")
		blink(box,3);
	}
	//Find cheat
	if(event.target.tagName === "BODY"){
		console.log("Cheat");
		getDefault();
		typeWriter(textscreen, "Don't Cheat!")
	}
	//You win
	if(event.target.className === "end"){
		console.log("End");
		getDefault();
		typeWriter(textscreen, "Congratulations!")
	}
};

function gameStart() {
	console.log("start");
	for(var i = 0; i < route.length ; i++){
		route[i].style.background = 'yellow';
		route[i].style.cursor = 'crosshair';
	}
	body.addEventListener('mouseover', gameOver);
}

startArea.addEventListener('mouseover', gameStart);