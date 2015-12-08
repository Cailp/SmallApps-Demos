var box = document.getElementsByClassName("gameBox")[0];
var time = document.getElementsByTagName("span")[0];
var score = document.getElementsByTagName("span")[1];
var btn = document.getElementsByTagName("button")[0];
var state = document.getElementsByClassName("state")[0];

(function(){
	for( var i = 0; i < 60; i++){
		var hole = document.createElement("DIV");
		hole.setAttribute("class", "hole");
		hole.setAttribute("id", i);
		box.appendChild(hole);
	}
})();

function random(){
	var num = Math.floor(Math.random()*60);
    return document.getElementById(num);
}

function susliksAppear(){
    var thisSuslike = random();
    thisSuslike.style.backgroundColor = "rgba(110,188,255,0.5)";
    function hit() {
        if (event.target.id === thisSuslike.id) {
            score.innerHTML = 1 + parseInt(score.innerHTML);
            console.log(score.innerHTML);
            thisSuslike.style.backgroundColor = "#fff";
            box.removeEventListener("click",hit);
            if (time.innerHTML != 0) {
                susliksAppear();
            }else {
                alert("Game over! \nYour score is : " + score.innerHTML);
                state.innerHTML = "Game Over";
                score.innerHTML = 0;
                btn.removeEventListener('click',stop);
                btn.addEventListener('click',start);
            }
        }
        if (event.target.id != thisSuslike.id && event.target.className == "hole") {
            score.innerHTML = parseInt(score.innerHTML) - 1;
        }
    }
    box.addEventListener("click", hit);
    return thisSuslike.id ;
}

function start(){
    time.innerHTML = 30;
    state.innerHTML = "Start";
    function runTime() {

        time.innerHTML = parseInt(time.innerHTML) - 1;
        if (time.innerHTML == 0) {
            clearInterval(run);
        }
    }
    function stop() {
        clearInterval(run);
        time.innerHTML = 0;
    }
    var run = setInterval(runTime, 1000);
    susliksAppear();
    if (time.innerHTML != "0"){
        btn.removeEventListener('click',start);
        btn.addEventListener('click',stop);
    }

}

btn.addEventListener('click',start);