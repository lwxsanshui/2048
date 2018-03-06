/**
 * Created by lwx on 2018/3/2.
 */

var board = new Array();
var score = 0;
$(document).ready(function(e){
    newgame();
});
//初始化
function newgame(){
    init();
    generateNumber();
    generateNumber();
    updateBoardView();
}
function init(){
    for(var i=0 ; i<4 ; i++){
        for(var j=0 ; j<4 ; j++){
            var gridCell = $("#grid-"+i+"-"+j);
            gridCell.css("top",getPosTop(i,j));
            gridCell.css("left",getPosLeft(i,j))
        }
    }
    for(var i=0 ; i<4 ; i++){
        board[i] = new Array();
        for(var j=0 ; j<4 ; j++){
            board[i][j] = 0 ;
        }
    }
    updateBoardView();
}
function updateBoardView(){
    $(".number-cell").remove();
    for(var i=0 ; i<4 ;i++){
        for(var j=0 ; j<4 ;j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $('#number-cell-'+i+'-'+j);
            if(board[i][j]==0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
            }else{
                //score+=board[i][j];
                theNumberCell.css('width','100px');
                theNumberCell.css('height','100px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                //设定背景色和数字颜色
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
                if(board[i][j]>100){
                    theNumberCell.css('fontSize','43px');
                }
                if(board[i][j]>1000){
                    theNumberCell.css('fontSize','37px');
                }
            }
        }
    }
    $("#score-2").text(score);

}
function generateNumber(){
    if (nospace(board))return false;
    //随机取一个位置
    var randx = parseInt(Math.floor(Math.random()*4));
    var randy = parseInt(Math.floor(Math.random()*4));
    while(board[randx][randy]!=0){
        //优化
        var randx = parseInt(Math.floor(Math.random()*4));
        var randy = parseInt(Math.floor(Math.random()*4));
    }
    //随机取一个数字
    var randNumber = Math.random()<0.8?2:4;
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx,randy,randNumber);
    return true;
}
$("#newGameButton").click(newgame);
$(document).keydown(function(event){
   switch (event.keyCode){
       case 37://left
           if(moveLeft()){
               generateNumber();
               isGameOver();
           }
           break;
       case 38://up
           if(moveUp()){
               generateNumber();
               isGameOver();
           }
           break;
       case 39://right
           if(moveRight()){
               generateNumber();
               isGameOver();
           }
           break;
       case 40://down
           if(moveDown()){
               generateNumber();
               isGameOver();
           }
           break;
   }
});
//移动端触摸滑动事件
var touchflag_x;
var touchflag_y;
$(document).touchAction(function(event){

});
$(document).addEventListener('touchStart',function(event){
    if (event.targetTouches.length == 1) {
        event.preventDefault();
        var touch = event.targetTouches[0];
        // 把元素放在手指所在的位置
        touchflag_x = touch.pageX;
        touchflag_y = touch.pageY;
    }
},false);
$(document).addEventListener('touchEnd',function(event){
    if (event.targetTouches.length == 1) {
        event.preventDefault();
        var touch = event.targetTouches[0];
        // 把元素放在手指所在的位置
        var _x = touch.pageX-touchflag_x;
        var _y = touch.pageY-touchflag_y;
        if(_x<0){
            var tempx = 0-_x;
        }
        if(_y<0){
            var tempy = 0-_y;
        }
        if(tempx>tempy&&tempx>10){
            if(_x<0){
                if(moveLeft()){
                    generateNumber();
                    isGameOver();
                }
            }else{
                if(moveRight()){
                    generateNumber();
                    isGameOver();
                }
            }
        }else if(tempy>10){
            if(_y<0){
                if(moveUp()){
                    generateNumber();
                    isGameOver();
                }
            }else{
                if(moveRight()){
                    generateNumber();
                    isGameOver();
                }
            }
        }




    }
},false);

//$('body').on('swipe',function(){
//    if(moveLeft()){
//        generateNumber();
//        isGameOver();
//    }
//});
//$('body').on('swiperight',function(){
//    if(moveRight()){
//        generateNumber();
//        isGameOver();
//    }
//});
//$('body').on('swipeup',function(){
//    if(moveUp()){
//        generateNumber();
//        isGameOver();
//    }
//});$('body').on('swipedown',function(){
//    if(moveDown()){
//        generateNumber();
//        isGameOver();
//    }
//});




function isGameOver(){
    if(nospace(board)&&nomove(board))
        alert("gameover");
}
function moveLeft(){
    if(!canMoveLeft(board))return false;
    console.log("可以移动，那就开始了");
    //移动过程
    var hasMove = false;//标记当前行是否移动过；
    for(var i=0 ; i<4 ; i++){
        for(var j=1 ; j<4 ; j++){
            if(board[i][j]!=0){
                //判断它左侧的元素,
                // 这里的逻辑是只需要获取其左侧最近的不等于0的值，
                // 相等则合并，不相等则移动至该位置+1
                //根据hasMove可以避免多次合并
                for(var k=j-1 ; k>=0 ; k--){
                    console.log(i,j,k);
                    if(board[i][k]!=0){
                        if(board[i][k]!=board[i][j]||hasMove ==true){

                            if(k+1<j){
                                showMoveAnimation(i,j,i,k+1);
                                board[i][k+1] =board[i][j];
                                board[i][j] = 0 ;

                            }
                            k=-1;
                            hasMove = false;
                        }else{
                            showMoveAnimation(i,j,i,k);
                            board[i][k] += board[i][j];
                            score += board[i][k];
                            board[i][j] = 0;
                            k=-1;
                            hasMove = true;
                        }
                    }else if(k == 0 ){
                        showMoveAnimation(i,j,i,k);
                        board[i][k] =board[i][j];
                        board[i][j] = 0 ;
                    }
                }
            }
        }
        hasMove = false;

    }
    setTimeout("updateBoardView()",200);
    return true;
}
function moveRight(){
    if(!canMoveRight(board))return false;
    console.log("可以移动，那就开始了");
    //移动过程
    var hasMove = false;//标记当前行是否移动过；
    for(var i=0 ; i<4 ; i++){
        for(var j=2 ; j>=0 ; j--){
            if(board[i][j]!=0){
                //判断它左侧的元素,
                // 这里的逻辑是只需要获取其左侧最近的不等于0的值，
                // 相等则合并，不相等则移动至该位置+1
                //根据hasMove可以避免多次合并
                for(var k=j+1 ; k<4 ; k++){
                    console.log(i,j,k);
                    if(board[i][k]!=0){
                        if(board[i][k]!=board[i][j]||hasMove ==true){

                            if(k-1>j){
                                showMoveAnimation(i,j,i,k-1);
                                board[i][k-1] =board[i][j];
                                board[i][j] = 0 ;

                            }
                            k=4;
                            hasMove = false;
                        }else{
                            showMoveAnimation(i,j,i,k);
                            board[i][k] += board[i][j];
                            score += board[i][k];
                            board[i][j] = 0;
                            k=4;
                            hasMove = true;
                        }
                    }else if(k == 3 ){
                        showMoveAnimation(i,j,i,k);
                        board[i][k] =board[i][j];
                        board[i][j] = 0 ;
                    }
                }
            }
        }
        hasMove = false;

    }
    setTimeout("updateBoardView()",200);
    return true;
}
function moveUp(){
    if(!canMoveUp(board))return false;
    console.log("可以移动，那就开始了");
    //移动过程
    var hasMove = false;//标记当前行是否移动过；
    for(var j=0 ; j<4 ; j++){
        for(var i=1 ; i<4 ; i++){
            if(board[i][j]!=0){
                //判断它左侧的元素,
                // 这里的逻辑是只需要获取其左侧最近的不等于0的值，
                // 相等则合并，不相等则移动至该位置+1
                //根据hasMove可以避免多次合并
                for(var k=i-1 ; k>=0 ; k--){
                    console.log(i,j,k);
                    if(board[k][j]!=0){
                        if(board[k][j]!=board[i][j]||hasMove ==true){

                            if(k+1<i){
                                showMoveAnimation(i,j,k+1,j);
                                board[k+1][j] =board[i][j];
                                board[i][j] = 0 ;

                            }
                            k=-1;
                            hasMove = false;
                        }else{
                            showMoveAnimation(i,j,k,j);
                            board[k][j] += board[i][j];
                            score += board[k][j];
                            board[i][j] = 0;
                            k=-1;
                            hasMove = true;
                        }
                    }else if(k == 0 ){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] =board[i][j];
                        board[i][j] = 0 ;
                    }
                }
            }
        }
        hasMove = false;

    }
    setTimeout("updateBoardView()",200);
    return true;
}
function moveDown(){
    if(!canMoveDown(board))return false;
    console.log("可以移动，那就开始了");
    //移动过程
    var hasMove = false;//标记当前行是否移动过；
    for(var j=0 ; j<4 ; j++){
        for(var i=2 ; i>=0 ; i--){
            if(board[i][j]!=0){
                //判断它左侧的元素,
                // 这里的逻辑是只需要获取其左侧最近的不等于0的值，
                // 相等则合并，不相等则移动至该位置+1
                //根据hasMove可以避免多次合并
                for(var k=i+1 ; k<4 ; k++){
                    console.log(i,j,k);
                    if(board[k][j]!=0){
                        if(board[k][j]!=board[i][j]||hasMove ==true){

                            if(k-1>i){
                                showMoveAnimation(i,j,k-1,j);
                                board[k-1][j] =board[i][j];
                                board[i][j] = 0 ;

                            }
                            k=4;
                            hasMove = false;
                        }else{
                            showMoveAnimation(i,j,k,j);
                            board[k][j] += board[i][j];
                            score += board[k][j];
                            board[i][j] = 0;
                            k=4;
                            hasMove = true;
                        }
                    }else if(k == 3 ){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] =board[i][j];
                        board[i][j] = 0 ;
                    }
                }
            }
        }
        hasMove = false;

    }
    setTimeout("updateBoardView()",200);
    return true;
}

