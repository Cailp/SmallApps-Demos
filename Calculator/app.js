var getscreen = document.getElementsByClassName("screen")[0];
function screen(input){
	var display = getscreen.innerHTML.toString().trim();
	getscreen.innerHTML = display + input;
}
function calculate(){
	var output=eval(getscreen.innerHTML).toLocaleString();
	getscreen.innerHTML = output;
}
(function (){
	var btns = document.getElementsByClassName("inputArea")[0];
	btns.addEventListener("click",function(event){
		if(event.target.className === "btn num"){
			var value=event.target.innerHTML.toString().trim();
			screen(value);
		}
		if(event.target.className === "btn run"){
			try{
				calculate();
			}catch(error){
				alert("Check Please");			
			}
		}
		if(event.target.className === "btn cle"){
			getscreen.innerHTML = "";
		}
		if(event.target.className === "btn del"){
			getscreen.innerHTML = getscreen.innerHTML.slice(0,getscreen.innerHTML.length-1);
		}
	},false)
	btns.addEventListener("mousedown",function(event){
		if(event.target.tagName==="DIV"){
			event.target.style.background="#750000";
		}
	},false)
	btns.addEventListener("mouseup",function(event){
		if(event.target.tagName==="DIV"){
			event.target.style.background="#af6f6f";
		}
	},false)
	btns.addEventListener("mouseover",function(event){
		if(event.target.tagName==="DIV"){
			event.target.style.background="#af6f6f";
		}
	},false)
	btns.addEventListener("mouseout",function(event){
		if(event.target.tagName==="DIV"){
			event.target.style.background="#e4cbcb";
		}
	},false)
})();
