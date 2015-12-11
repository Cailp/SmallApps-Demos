(function(){
    /*
     *  执行初始化
     */
    var init = function(){
        for(var i = 0; i < 16; i++) {
            var left = ( i % 4 ) ;
            var top = Math.floor( i / 4 );
            var div = document.createElement("DIV");
            document.getElementsByClassName("gameBox")[0].appendChild(div);
            div.style.left = left * 90 + "px";
            div.style.top = top * 90 + "px";
            if (i < 15) {
                div.id = i + 1;
                div.className = "puzzle";
                var backgroundLeft = -1 * (left * 88) + "px";
                var backgroundTop = -1 * (top * 88) + "px";
                div.style.backgroundPosition = backgroundLeft + " " + backgroundTop;
            }else{
                div.id = i + 1;
                div.className = "blank";
            }
        }
    };
    init();

    /*
     *  交换方块与空白方块
     *  @param ele = element,
     *         time = move speed,
     *         trueBind = if bind with event;
     */
    var exchange = function(ele,time,trueBind) {
        var blank = document.getElementsByClassName('blank')[0];
        var x = parseInt(blank.style.left.slice(0,-2));
        var y = parseInt(blank.style.top.slice(0,-2));
        var eleLeft = parseInt(ele.style.left.slice(0,-2));
        var eleTop = parseInt(ele.style.top.slice(0,-2));
        var finalLeft = eleLeft;
        var finalTop = eleTop;
        function animate() {
            if (eleLeft > x) {
                eleLeft -= time;
                ele.style.left = eleLeft + "px";
            } else if (eleLeft < x) {
                eleLeft += time;
                ele.style.left = eleLeft + "px";
            } else {
                if (eleTop > y){
                    eleTop -= time;
                    ele.style.top = eleTop + "px";
                } else if (eleTop < y) {
                    eleTop += time;
                    ele.style.top = eleTop + "px";
                } else {
                    blank.style.left = finalLeft + "px";
                    blank.style.top = finalTop + "px";
                    clearInterval( ani );
                    findClick(trueBind);
                }
            }
        }
        var ani = setInterval(animate,1);

    };

    /*
     *  寻找可点击方块
     *  @param trueBind = if bind with event
     */
    var findClick = function (trueBind) {
        var blank = document.getElementsByClassName('blank')[0];
        var X = parseInt(blank.style.left.slice(0,-2));
        var Y = parseInt(blank.style.top.slice(0,-2));
        var a = [];
        var obj;

        var puzzles = document.getElementsByClassName('puzzle');
        for (var i = 0; i < puzzles.length; i++){
            var puzzleX = parseInt(puzzles[i].style.left.slice(0,-2));
            var puzzleY = parseInt(puzzles[i].style.top.slice(0,-2));
            if (puzzleX - X == 90 || puzzleX - X == -90){
                if (puzzleY - Y == 0){
                    var thisID =  puzzles[i].id;
                    obj = {};
                    obj.ele = puzzles[i];
                    obj.ID = thisID;
                    obj.event = event;
                    a.push(obj);
                }
            }else if (puzzleY - Y == 90 || puzzleY - Y == -90){
                if (puzzleX - X == 0 ){
                    thisID =  puzzles[i].id;
                    obj = {};
                    obj.ele = puzzles[i];
                    obj.ID = thisID;
                    obj.event = event;
                    a.push(obj);
                }
            }
        }
        if (trueBind == 1) {
            bindClick(a);
            finish();

        }
        return a;
    };

    function clear() {
        var box = document.getElementsByClassName('gameBox')[0];
        for (var i = 0; i < 16; i++) {
            box.removeChild(box.childNodes[0]);
        }
    }
    var finish = function (){
        for (var i = 0; i < 16; i++){
            var left = ( i % 4 ) ;
            var top = Math.floor( i / 4 );
            console.log(left,top);
            var ele = document.getElementById(i+1);
            if (ele.style.left != (left * 90 + "px")){
                break;
            }else if (ele.style.top != (top * 90 + "px")){
                break;
            }
            if (i == 15){
                if (ele.style.left != (left * 90 + "px")){
                    break;
                }else if (ele.style.top != (top * 90 + "px")){
                    break;
                }else{
                    alert('you win');
                    console.log(i);
                    getStart('add');
                    clear();
                    init();
                }
            }
        }
    };
    /*
     *   绑定点击事件
     */
    function bindClick(arr) {
        var _eventList = [];
        function pushEvent(ele,event) {
            _eventList.push({
                ele:ele,
                event:event
            });
        }
        for (var i = 0; i < arr.length; i++) {
            (function() {
                var j = i;
                var item = arr[j].ele;
                var event  = function(){
                    exchange(item,3,true);

                    for(var k =0; k<_eventList.length; k++){
                        (function() {
                            var l = k;
                            var rmItem = _eventList[l];
                            rmItem.ele.removeEventListener('click', rmItem.event);
                        })();
                    }
                    _eventList = [];
                };
                pushEvent(item ,event);
                item.addEventListener('click', event, false);
            })()

        }
        console.log(_eventList);
        return _eventList;

    }

    /*
     *  绑定开始按钮
     */
    var getStart = function(aORr) {
        var ran = function () {
            var i = 90;
            function rol() {
                i -= 1;
                if (i <= 0) {
                    clearInterval(start);

                    findClick(true);
                    document.getElementsByClassName('btn')[0].removeEventListener('click', ran);
                    return;
                }
                var arr = findClick(false);
                var rd = Math.floor(Math.random() * arr.length);
                exchange(arr[rd].ele, 90, false);
            }
            var start = setInterval(rol, 15);
        };
        if (aORr == 'add') {
            document.getElementsByClassName('btn')[0].addEventListener('click', ran);
            getStart();
        }
    };
    getStart('add');

})();

