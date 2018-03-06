/**
 * Created by lwx on 2018/3/2.
 */




function getPosTop(i,j){
    return 20+i*120;
}
function getPosLeft(i,j){
    return 20+j*120;
}
function getNumberBackgroundColor(number){
    switch (number){
        case 2:return "#CCFFFF";break;
        case 4:return "#CCFF66";break;
        case 8:return "#CCFF00";break;
        case 16:return "#99FF00";break;
        case 32:return "#99CC00";break;
        case 64:return "#999933";break;
        case 128:return "#996633";break;
        case 256:return "#993333";break;
        case 512:return "#CC0000";break;
        case 1024:return "#003399";break;
        case 2048:return "#663300";break;
        case 4096:return "#000096";break;
        case 520:return "#FFC0CB";break;
        return "#000000"
    }
}
function getNumberColor(number){
    if(number<=8){
        return "#333300"
    }else{
        return "#FFFFCC"
    }
}
//判断是否还有空位
function nospace(){
    for(var i=0 ; i<4 ; i++){
        for(var j=0 ;j<4 ; j++){
            if(board[i][j]==0)
            return false;
        }
    }
    return true;
}
//判断能否像左移动
function canMoveLeft(board){
    for(var i=0 ; i<4 ; i++){
        for(var j=1 ; j<4; j++){
            if(board[i][j]!=0){
                if(board[i][j-1]==0||board[i][j-1]==board[i][j])
                return true
            }
        }
    }
    return false;
}
//判断能否右移
function canMoveRight(board){
    for(var i=0 ; i<4 ; i++){
        for(var j=2 ; j>=0; j--){
            if(board[i][j]!=0){
                if(board[i][j+1]==0||board[i][j+1]==board[i][j])
                    return true
            }
        }
    }
    return false;
}
//判断能否上移
function canMoveUp(board){
    for(var i=1 ; i<4 ; i++){
        for(var j=0 ; j<4; j++){
            if(board[i][j]!=0){
                if(board[i-1][j]==0||board[i-1][j]==board[i][j])
                    return true
            }
        }
    }
    return false;
}
//判断能否下移
function canMoveDown(board){
    for(var i=2 ; i>=0 ; i--){
        for(var j=0 ; j<4; j++){
            if(board[i][j]!=0){
                if(board[i+1][j]==0||board[i+1][j]==board[i][j])
                    return true
            }
        }
    }
    return false;
}
//判断是否还能移动
function nomove(board){
    if(canMoveDown(board)||canMoveLeft(board)||canMoveRight(board)||canMoveUp(board))
        return false;
    return true;
}


function showNumberWithAnimation(i,j,number){
    var numberCell = $('#number-cell'+i+'-'+j);
    numberCell.css("background-color",getNumberBackgroundColor(number));
    numberCell.css("color",getNumberColor(number));
    numberCell.text(number);
    numberCell.animate({
        width:"100px",
        height:"100px",
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    },50);
}
function showMoveAnimation(x1,y1,x2,y2){
    var numberCell = $('#number-cell-'+x1+'-'+y1);
    numberCell.animate({
        top:getPosTop(x2,y2),
        left:getPosLeft(x2,y2)
    },200);
}
