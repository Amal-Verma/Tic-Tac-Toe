// board = {1:"hello",2:"bye"}
// console.log(board[2])
// console.log(board[1])
let Turn = true;
let board = [["","",""], 
            ["","",""], 
            ["","",""]]
let superboard = [[[["","",""], ["","",""], ["","",""]], 
                [["","",""], ["","",""], ["","",""]], 
                [["","",""], ["","",""], ["","",""]]],
                
                [[["","",""], ["","",""], ["","",""]], 
                [["","",""], ["","",""], ["","",""]], 
                [["","",""], ["","",""], ["","",""]]],
                
                [[["","",""], ["","",""], ["","",""]], 
                [["","",""], ["","",""], ["","",""]], 
                [["","",""], ["","",""], ["","",""]]]]
let Turnint = 1
let GameOn = false
let AiTurn = false
let BoardCoverReset = false
let playdelay = true
let ActiveCell = [[true,true,true], 
                [true,true,true], 
                [true,true,true]]
// console.log(board)
// console.log(superboard)

function RandomTurn()
{
    let Randint = getRandomArbitrary(1, 2);
    Turn = true; 
    // console.log(Randint)
    if (Randint == 1)
    {
        Turnint = 1; 
        AiTurn = false
        // normalInsert(getRandomArbitrary(0,8))
    }
    else
    {  
        Turnint = -1;
        AiTurn = true; 
        normalInsert(getRandomArbitrary(0,8))
    }
}

function normalInsert(Num)
{  
    // console.log("1")
    let obj = document.getElementsByClassName("normalcell")[Num]
    if (obj.textContent == "" && GameOn == true && playdelay == true){
        playdelay = false
        // console.log(board)
        if (Turn == true){
            obj.innerHTML = "X";
            obj.style.color = "Red";
            board[Math.floor(Num/3)][Num%3] = "X";
        }
        else{
            obj.innerHTML = "O";
            obj.style.color = "Blue";
            board[Math.floor(Num/3)][Num%3] = "O";
        }
        // console.log(board)
        normalGameEnd()
        Turn = !Turn
        AiTurn = !AiTurn
        // console.log(CheckNormal(board))
        // console.log(AiTurn)
        if (AiTurn == true){
            setTimeout(() => {let index = normalAiMove(board, Turn)
                                playdelay = true
                                normalInsert(index)  }, 700);
            return
        }
        playdelay = true
    }
    
}

function CheckNormal(BoardArray){
    let n = 0
    // console.log(BoardArray)
    for (let i = 0; i < 3; i++){
        if ((BoardArray[i][0] == BoardArray[i][1]) && (BoardArray[i][0] == BoardArray[i][2])){
            // console.log(1, i)
            // if (BoardArray[i][0] != ""){
                // console.log(11)
            if (BoardArray[i][0] == "X"){
                return "X";
            }
            else if (BoardArray[i][0] == "O"){return "O";}
            // }
        }
        if ((BoardArray[0][i] == BoardArray[1][i]) && (BoardArray[0][i] == BoardArray[2][i])){
            // console.log(2, i)
            // if (BoardArray[0][i] != ""){
                // console.log(22)
            if (BoardArray[0][i] == "X"){
                return "X";
            }
            else if (BoardArray[0][i] == "O"){return "O";}
            // }
        }
        if (BoardArray[i].includes("") == false){n++}
    }
    if ((BoardArray[1][1] == BoardArray[0][0]) && (BoardArray[1][1] == BoardArray[2][2])){
        // console.log(3)
        // if (BoardArray[1][1] != ""){
            // console.log(33)
        if (BoardArray[1][1] == "X"){
            return "X";
        }
        else if (BoardArray[1][1] == "O"){return "O";}
        // }
    }
    if ((BoardArray[1][1] == BoardArray[2][0]) && (BoardArray[1][1] == BoardArray[0][2])){
        // console.log(4)
        // if (BoardArray[1][1] != ""){
            // console.log(44)
        if (BoardArray[1][1] == "X"){
            return "X";
        }
        else if (BoardArray[1][1] == "O"){return "O";}
        // }
    }
    // console.log(BoardArray[1][1])
    if (n == 3){return "Draw"}
    return "running"
}

function normalAiMiniMax(BoardArray, isMaximizing, Turn, alpha, beta){
    let Winner = CheckNormal(BoardArray)
    // console.log(Winner)
    if (Winner == "X"){return (-50*Turnint)}
    else if (Winner == "O"){return (50*Turnint)}
    else if(Winner == "Draw"){return 0}
    
    let score = 0;
    let bestscore = 0;

    if (isMaximizing == true)
    {
        bestscore = -100
        for (let i = 0; i< 3; i++){
        for (let j = 0; j< 3; j++){
            if (BoardArray[i][j] == ""){
                if (Turn == true){BoardArray[i][j] = "X"}
                else{BoardArray[i][j] = "O"}
        
                score = normalAiMiniMax(BoardArray, !isMaximizing, !Turn, alpha, beta)
                // console.log(score, bestscore)
                BoardArray[i][j] = ""

                bestscore = Math.max(bestscore, score)
                alpha = bestscore
                if (beta <= alpha){break;}
            }
        }
    }
    }
    else 
    {   
        bestscore = 100
        for (let i = 0; i< 3; i++){
            for (let j = 0; j< 3; j++){
                if (BoardArray[i][j] == ""){
                    if (Turn == true){BoardArray[i][j] = "X"}
                    else{BoardArray[i][j] = "O"}
    
                    score = normalAiMiniMax(BoardArray, !isMaximizing, !Turn, alpha, beta)
                    // console.log(score, bestscore)
                    BoardArray[i][j] = ""

                    bestscore = Math.min(bestscore, score)
                    beta = bestscore
                    if (beta <= alpha){break;}
                }
            }
        }
    }
    return bestscore
}
    
function normalAiMove(BoardArray, Turn){
    let score, bestscore;
    bestscore = -100
    bestmove = 0
    for (let i = 0; i< 3; i++){
        for (let j = 0; j< 3; j++){
            if (BoardArray[i][j] == ""){
                if (Turn == true){BoardArray[i][j] = "X"}
                else{BoardArray[i][j] = "O"}

                score = normalAiMiniMax(BoardArray, false, !Turn, -100, 100)
                // console.log(score, bestscore)
                BoardArray[i][j] = ""

                
                if (bestscore < score)
                {
                    bestscore = score
                    bestmove = i*3 + j
                }

            }
        }
    }
    return bestmove
}


function normalGameEnd(){
    let Text = ""

    let winner = CheckNormal(board)
    if (winner == "X"){if(Turnint == 1){ Text = "You Win"} else{ Text = "You Lose"}}
    else if (winner == "O"){if(Turnint == -1){ Text = "You Win"} else{ Text ="You Lose"}}
    else if(winner == "Draw"){ Text = "Draw"}
    else{Text = "Running"}
    // console.log(Text)
    if (Text == "Running"){}
    else{
        GameOn = false
        document.getElementsByClassName("boardcover")[0].style.display = "flex";
        setTimeout(() => {document.getElementsByClassName("boardcover")[0].style.opacity = "0.8";
                            document.getElementsByClassName("boardcover")[0].innerHTML = Text;
                            BoardCoverReset = true;}, 200);
    }
}

function NormalBoardReset(){
    if (BoardCoverReset == true){
        GameOn = true
        BoardCoverReset = false;   

        // console.log("y")

        setTimeout(() => {RandomTurn();}, 500);
        setTimeout(() => {document.getElementsByClassName("boardcover")[0].style.display = "none";}, 600);
        document.getElementsByClassName("boardcover")[0].style.opacity = "0";
        document.getElementsByClassName("boardcover")[0].innerHTML = "";
        clearNormalBoard();
        } 
                
}

function clearNormalBoard(){
    // TempArray = document.getElementsByClassName("normalcell");
    // for(let i = 0; i <=TempArray.length; i++){
    //     console.log(TempArray)
        
    //     element = TempArray[i]
    //     console.log(element)
    //     element.innerHTML = "";
    // }

    let divs = document.getElementsByClassName( 'normalcell' );

    [].slice.call( divs ).forEach(function ( div ) {
        div.innerHTML = "";
        div.style.color = "black"
    });
    board = [["","",""], ["","",""], ["","",""]]
}

function RandomTurnSuper()
{
    let Randint = getRandomArbitrary(1, 2);
    Turn = true; 
    // console.log(Randint)
    if (Randint == 1)
    {
        Turnint = 1; 
        AiTurn = false
        // normalInsert(getRandomArbitrary(0,8))
    }
    else
    {  
        Turnint = -1;
        AiTurn = true; 
        superInsert(getRandomArbitrary(0,80))
    }
}
function superInsert1(Num, superNum, boardNum){
    let obj = document.getElementsByClassName("supercell")[Num]
    if (Turn == true){
        setTimeout(() => {
            obj.innerHTML = "X";
            obj.style.color = "Red";
            superboard[Math.floor(superNum/3)][superNum%3][Math.floor(boardNum/3)][boardNum%3] = "X";
        }, 1);
    }
    else{
        setTimeout(() => {
            obj.innerHTML = "O";
            obj.style.color = "Blue";
            superboard[Math.floor(superNum/3)][superNum%3][Math.floor(boardNum/3)][boardNum%3] = "O";
        }, 1);
    }
    setTimeout(() => {obj.style.backgroundColor = "yellow"}, 1);
    setTimeout(() => {obj.style.backgroundColor = "black"}, 60); 
}

function SuperAiMovePause(){
    let index = SuperAiMove(superboard, board,ActiveCell, Turn, 11);
    console.log(index);
    playdelay = true;
    superInsert(index);
}

function superInsert2(Num, superNum, boardNum, activeNum){

    // console.log(Num)
    // console.log(superNum)
    // console.log(boardNum)
        // console.log(board)
        // console.log(Math.floor(superNum/3))
        // console.log(superNum%3)
        // console.log(Math.floor(boardNum/3))
        // console.log(boardNum%3)

        // if (Turn == true){
        //     obj.innerHTML = "X";
        //     obj.style.color = "Red";
        //     superboard[Math.floor(superNum/3)][superNum%3][Math.floor(boardNum/3)][boardNum%3] = "X";
        // }
        // else{
        //     obj.innerHTML = "O";
        //     obj.style.color = "Blue";
        //     superboard[Math.floor(superNum/3)][superNum%3][Math.floor(boardNum/3)][boardNum%3] = "O";
        // }
        let superinsert2delay = 20

        let winner = CheckNormal(superboard[Math.floor(superNum/3)][superNum%3])
        if (winner == "X"){
            board[Math.floor(superNum/3)][superNum%3] = "X"
            setTimeout(() =>{document.getElementsByClassName("boardcoversmall")[superNum].style.display = "flex";
                            document.getElementsByClassName("boardcoversmall")[superNum].innerHTML = "X"; 
                            document.getElementsByClassName("boardcoversmall")[superNum].style.color = "Red"; },superinsert2delay)
            
            setTimeout(() => {document.getElementsByClassName("boardcoversmall")[superNum].style.opacity = "1";}, 50 + superinsert2delay); 
        }
        else if (winner == "O"){
            board[Math.floor(superNum/3)][superNum%3] = "O"
            setTimeout(() =>{document.getElementsByClassName("boardcoversmall")[superNum].style.display = "flex";
                            document.getElementsByClassName("boardcoversmall")[superNum].style.color = "Blue"; 
                            document.getElementsByClassName("boardcoversmall")[superNum].innerHTML = "O"; },superinsert2delay)
            
            setTimeout(() => {document.getElementsByClassName("boardcoversmall")[superNum].style.opacity = "1";}, 50 + superinsert2delay); 
        }
        else if(winner == "Draw"){
            board[Math.floor(superNum/3)][superNum%3] = "-"
            setTimeout(() =>{document.getElementsByClassName("boardcoversmall")[superNum].style.display = "flex";
                            document.getElementsByClassName("boardcoversmall")[superNum].style.color = "Yellow"; 
                            document.getElementsByClassName("boardcoversmall")[superNum].innerHTML = "-"; },superinsert2delay)
            
            setTimeout(() => {document.getElementsByClassName("boardcoversmall")[superNum].style.opacity = "1";}, 50 + superinsert2delay); 
        }
        
        if (winner != "running"){
            ActiveCell[Math.floor(superNum/3)][superNum%3] = false
            SuperGameEnd()
        }

        if (board[Math.floor(activeNum/3)][activeNum%3] == ""){
            // console.log("y")
            for (let i = 0; i <=8; i++){
                if (board[Math.floor(i/3)][i%3] == ""){
                    if (i == activeNum){
                        // console.log("Activecell 1")
                        ActiveCell[Math.floor(i/3)][i%3] = true;
                        setTimeout(() => {document.getElementsByClassName("boardcoversmall")[i].style.opacity = "0";}, 50 + superinsert2delay); 
                        setTimeout(() => {document.getElementsByClassName("boardcoversmall")[i].style.display = "none";}, 200 + superinsert2delay); 
                    }
                    else{
                        // console.log("Activecell 0")
                        ActiveCell[Math.floor(i/3)][i%3] = false;
                        setTimeout(() => {document.getElementsByClassName("boardcoversmall")[i].style.display = "flex";},superinsert2delay);
                        setTimeout(() => {document.getElementsByClassName("boardcoversmall")[i].style.opacity = "0.65";}, 50 + superinsert2delay); 
                    }
                }
            }
        }
        else{
            
            for (let i = 0; i <=8; i++){
                // console.log("y")
                if (board[Math.floor(i/3)][i%3] == ""){
                    // console.log("yy")
                    ActiveCell[Math.floor(i/3)][i%3] = true;
                    setTimeout(() => {document.getElementsByClassName("boardcoversmall")[i].style.opacity = "0";}, 150 + superinsert2delay); 
                    setTimeout(() => {document.getElementsByClassName("boardcoversmall")[i].style.display = "none";}, 300 + superinsert2delay); 
                }
            }
        }
        Turn = !Turn;
        AiTurn = !AiTurn;  
        // window.requestAnimationFrame(superInsert2)
        // console.log(ActiveCell[0][0], ActiveCell[0][1], ActiveCell[0][2])              
        // console.log(ActiveCell[1][0], ActiveCell[1][1], ActiveCell[1][2])              
        // console.log(ActiveCell[2][0], ActiveCell[2][1], ActiveCell[2][2])     
        // console.log(board[0][0], board[0][1], board[0][2])              
        // console.log(board[1][0], board[1][1], board[1][2])              
        // console.log(board[2][0], board[2][1], board[2][2])           
        // if (AiTurn == true)
        // {
        //     SuperAiMovePause();
        //     // let index = SuperAiMove(superboard, board,ActiveCell, Turn, 10);
        //     // console.log(index);
        //     // playdelay = true;
        //     // superInsert(index);
        // }
}

function superInsert(Num){
    let activeNum = Num%9
    let superNum = Math.floor(Num/9)
    let boardNum = Num - 9*superNum
    if (document.getElementsByClassName("supercell")[Num].textContent == "" && GameOn == true && playdelay == true){
        playdelay = false
        
        superInsert1(Num, superNum, boardNum)
        superInsert2(Num, superNum, boardNum, activeNum)
        if (AiTurn == true)
        {
            setTimeout(() => {
                SuperAiMovePause();
            }, 100);
            // let index = SuperAiMove(superboard, board,ActiveCell, Turn, 10);
            // console.log(index);
            // playdelay = true;
            // superInsert(index);
        }
        setTimeout(() => {playdelay = true;}, 500)

        // console.log(ActiveCell)
        // console.log(superboard)
        
    }
    // setTimeout(() => {superInsert(getRandomArbitrary(0,80));}, 250)
    
}

function CheckSuper(BoardArray){
    let n = 0
    // console.log(BoardArray)
    for (let i = 0; i < 3; i++){
        if ((BoardArray[i][0] == BoardArray[i][1]) && (BoardArray[i][0] == BoardArray[i][2])){
            // console.log(1, i)
            if (BoardArray[i][0] == "" || BoardArray[i][0] == "-"){}else{
                // console.log(11)
                if (BoardArray[i][0] == "X"){
                    return "X";
                }
                else{return "O";}}
        }
        if ((BoardArray[0][i] == BoardArray[1][i]) && (BoardArray[0][i] == BoardArray[2][i])){
            // console.log(2, i)
            if (BoardArray[0][i] == "" || BoardArray[0][i] == "-"){}else{
                // console.log(22)
                if (BoardArray[0][i] == "X"){
                    return "X";
                }
                else{return "O";}}
        }
        if (BoardArray[i].includes("") == false){n++}
    }
    if ((BoardArray[1][1] == BoardArray[0][0]) && (BoardArray[1][1] == BoardArray[2][2])){
        // console.log(3)
        if (BoardArray[1][1] == "" || BoardArray[1][1] == "-"){}else{
            // console.log(33)
            if (BoardArray[1][1] == "X"){
                return "X";
            }
            else{return "O";}}
    }
    if ((BoardArray[1][1] == BoardArray[2][0]) && (BoardArray[1][1] == BoardArray[0][2])){
        // console.log(4)
        if (BoardArray[1][1] == "" || BoardArray[1][1] == "-"){}else{
            // console.log(44)
            if (BoardArray[1][1] == "X"){
                return "X";
            }
            else{return "O";}}
    }
    // console.log(BoardArray[1][1])
    if (n == 3){return "Draw"}
    return "running"
}

function SuperAiMiniMax(SuperBoardArray, BoardArray,ActiveBoard, isMaximizing, Turn, alpha, beta, depth){

    if (depth <= 0){
        let sum = 0;
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (BoardArray[i][j] == "X"){
                    sum -= 50*Turnint
                }
                else if (BoardArray[i][j] == "O"){
                    sum += 50*Turnint
                }

            }
        } 
        return sum
    }

    let Winner = CheckNormal(BoardArray)
    // console.log(Winner)
    if (Winner == "X"){return (-500*Turnint)}
    else if (Winner == "O"){return (500*Turnint)}
    else if(Winner == "Draw"){return 0}


    let score = 0;
    let bestscore = 0;
    let subtractdepth = 1;
    let ActiveBoardnext = [[false,false,false], 
                            [false,false,false], 
                            [false,false,false]]

    if (isMaximizing == true){
        bestscore = -1000
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (ActiveBoard[i][j] == true){
                    for (let k = 0; k < 3; k++){
                        for (let l = 0; l < 3; l++){
                            if (SuperBoardArray[i][j][k][l] == ""){
                                if (Turn == true){SuperBoardArray[i][j][k][l] = "X"}
                                else{SuperBoardArray[i][j][k][l] = "O"}
                                // check normal
                                Winner = CheckNormal(SuperBoardArray[i][j])
                                if (Winner == "X"){BoardArray[i][j] = "X"}
                                else if (Winner == "O"){BoardArray[i][j] = "O"}
                                else if(Winner == "Draw"){BoardArray[i][j] = "-"}
                                // code for active cell
                                if (BoardArray[k][l] == ""){
                                    ActiveBoardnext[k][l] = true
                                }
                                else{
                                    subtractdepth += 1;
                                    for (let m = 0; m < 3; m++){
                                        for (let n = 0;n<3;n++){
                                            if (BoardArray[m][n] == ""){
                                                ActiveBoardnext[m][n] = true
                                            } 
                                        }
                                    }
                                }

                                score = SuperAiMiniMax(SuperBoardArray, BoardArray,ActiveBoardnext, !isMaximizing, !Turn, alpha, beta, depth - subtractdepth)
                                SuperBoardArray[i][j][k][l] = ""
                                if (Winner == "running"){}
                                else {BoardArray[i][j] = ""}
                                ActiveBoardnext = [[false,false,false], 
                                                    [false,false,false], 
                                                    [false,false,false]]
                                subtractdepth = 1
                                bestscore = Math.max(bestscore, score)
                                alpha = bestscore
                                if (beta <= alpha){break;}
                            }
                        }
                    }
                }
            }
        }
    }
    else{
        bestscore = 1000
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (ActiveBoard[i][j] == true){
                    for (let k = 0; k < 3; k++){
                        for (let l = 0; l < 3; l++){
                            if (SuperBoardArray[i][j][k][l] == ""){
                                if (Turn == true){SuperBoardArray[i][j][k][l] = "X"}
                                else{SuperBoardArray[i][j][k][l] = "O"}
                                // check normal
                                Winner = CheckNormal(SuperBoardArray[i][j])
                                if (Winner == "X"){BoardArray[i][j] = "X"}
                                else if (Winner == "O"){BoardArray[i][j] = "O"}
                                else if(Winner == "Draw"){BoardArray[i][j] = "-"}
                                // code for active cell
                                if (BoardArray[k][l] == ""){
                                    ActiveBoardnext[k][l] = true
                                }
                                else{
                                    subtractdepth += 1;
                                    for (let m = 0; m < 3; m++){
                                        for (let n = 0;n<3;n++){
                                            if (BoardArray[m][n] == ""){
                                                ActiveBoardnext[m][n] = true
                                            } 
                                        }
                                    }
                                }

                                score = SuperAiMiniMax(SuperBoardArray, BoardArray,ActiveBoardnext, !isMaximizing, !Turn, alpha, beta, depth - subtractdepth)
                                SuperBoardArray[i][j][k][l] = ""
                                if (Winner == "running"){}
                                else {BoardArray[i][j] = ""}
                                subtractdepth = 1
                                ActiveBoardnext = [[false,false,false], 
                                                    [false,false,false], 
                                                    [false,false,false]]

                                bestscore = Math.min(bestscore, score)
                                beta = bestscore
                                if (beta <= alpha){break;}
                            }
                        }
                    }
                }
            }
        }
    }
    return bestscore
}

function SuperAiMove(SuperBoardArray, BoardArray,ActiveBoard, Turn, depth)
{
    let score, bestscore;
    bestscore = -100
    bestmove = 0
    let subtractdepth = 1;
    let ActiveBoardnext = [[false,false,false], 
                            [false,false,false], 
                            [false,false,false]]

    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            if (ActiveBoard[i][j] == true){
                console.log("in")
                for (let k = 0; k < 3; k++){
                    for (let l = 0; l < 3; l++){
                        if (SuperBoardArray[i][j][k][l] == ""){
                            if (Turn == true){SuperBoardArray[i][j][k][l] = "X"}
                            else{SuperBoardArray[i][j][k][l] = "O"}
                            // check normal
                            Winner = CheckNormal(SuperBoardArray[i][j])
                            if (Winner == "X"){BoardArray[i][j] = "X"}
                            else if (Winner == "O"){BoardArray[i][j] = "O"}
                            else if(Winner == "Draw"){BoardArray[i][j] = "-"}
                            // code for active cell
                            if (BoardArray[k][l] == ""){
                                ActiveBoardnext[k][l] = true
                            }
                            else{
                                for (let m = 0; m < 3; m++){
                                    for (let n = 0;n<3;n++){
                                        if (BoardArray[m][n] == ""){
                                            ActiveBoardnext[m][n] = true
                                        } 
                                    }
                                }
                            }

                            score = SuperAiMiniMax(SuperBoardArray, BoardArray,ActiveBoardnext, false, !Turn, -1000, 1000, depth - subtractdepth)
                            SuperBoardArray[i][j][k][l] = ""
                            if (Winner == "running"){}
                            else {BoardArray[i][j] = ""}
                            ActiveBoardnext = [[false,false,false], 
                                                [false,false,false], 
                                                [false,false,false]]

                            if (bestscore < score)
                            {
                                bestscore = score
                                bestmove = i*27 + j*9 + k *3 + l
                            }
                        }
                    }
                }
            }
        }
    }
    return bestmove
}
function SuperGameEnd(){
    let Text = ""

    let winner = CheckNormal(board)
    if (winner == "X"){if(Turnint == 1){ Text = "You Win"} else{ Text = "You Lose"}}
    else if (winner == "O"){if(Turnint == -1){ Text = "You Win"} else{ Text ="You Lose"}}
    else if(winner == "Draw"){ Text = "Draw"}
    else{Text = "Running"}
    // console.log(Text)
    if (Text == "Running"){}
    else{
        GameOn = false
        document.getElementsByClassName("boardcover")[1].style.display = "flex";
        setTimeout(() => {document.getElementsByClassName("boardcover")[1].style.opacity = "0.8";
                            document.getElementsByClassName("boardcover")[1].innerHTML = Text;
                            BoardCoverReset = true;}, 200);
    }
}

function clearSuperBoard(){
    // TempArray = document.getElementsByClassName("normalcell");
    // for(let i = 0; i <=TempArray.length; i++){
    //     console.log(TempArray)
        
    //     element = TempArray[i]
    //     console.log(element)
    //     element.innerHTML = "";
    // }

    let divs = document.getElementsByClassName( 'supercell' );

    [].slice.call( divs ).forEach(function ( div ) {
        div.innerHTML = "";
        div.style.color = "black"
    });

    divs = document.getElementsByClassName( 'boardcoversmall' );

    [].slice.call( divs ).forEach(function ( div ) {
        div.innerHTML = "";
        div.style.color = "black"
    });

    for (let i = 0; i <=8; i++){
        ActiveCell[Math.floor(i/3)][i%3] = true;
        setTimeout(() => {document.getElementsByClassName("boardcoversmall")[i].style.opacity = "0";}, 150); 
        setTimeout(() => {document.getElementsByClassName("boardcoversmall")[i].style.display = "none";}, 300); 
    }

    board = [["","",""], ["","",""], ["","",""]]
    superboard = [[[["","",""], ["","",""], ["","",""]], 
                [["","",""], ["","",""], ["","",""]], 
                [["","",""], ["","",""], ["","",""]]],
                
                [[["","",""], ["","",""], ["","",""]], 
                [["","",""], ["","",""], ["","",""]], 
                [["","",""], ["","",""], ["","",""]]],
                
                [[["","",""], ["","",""], ["","",""]], 
                [["","",""], ["","",""], ["","",""]], 
                [["","",""], ["","",""], ["","",""]]]]

    ActiveCell = [[true,true,true], 
                [true,true,true], 
                [true,true,true]]
}

function superBoardReset(){
    if (BoardCoverReset == true){
        GameOn = true
        BoardCoverReset = false;   

        // console.log("y")

        setTimeout(() => {RandomTurnSuper();}, 500);
        setTimeout(() => {document.getElementsByClassName("boardcover")[1].style.display = "none";}, 600);
        document.getElementsByClassName("boardcover")[1].style.opacity = "0";
        document.getElementsByClassName("boardcover")[1].innerHTML = "";
        clearSuperBoard();
        } 
                
}

function Page2()
{   
    document.getElementById("Frame1").style.display = "none";
    document.getElementById("Frame2").style.display = "block";
    document.getElementsByClassName("Title2")[0].innerHTML = "Tic Tac Toe";
    BoardCoverReset = false

    setTimeout(() => {document.getElementsByClassName("Title2")[0].style.margin = "var(--minmargintitleY) 0px";
                        document.getElementsByClassName("Title2")[0].style.marginBottom = "var(--maxmargintitleY)";
                        document.getElementsByClassName("Title1")[0].style.margin = "var(--minmargintitleY) var(--minmargintitleX)";
                        document.getElementsByClassName("boardcover")[0].style.opacity = "0";}, 200);
    setTimeout(() => { document.getElementsByClassName("cover")[0].style.display = "block";}, 600);
    setTimeout(() => { document.getElementsByClassName("Title2")[0].innerHTML = "Tic Tac Toe - normal"; 
                        document.getElementsByClassName("cover")[0].style.left = "var(--TitleCoverNormal)";}, 700);
    setTimeout(() => {GameOn = true;
                        RandomTurn();}, 1650)                 
    setTimeout(() => { document.getElementsByClassName("cover")[0].style.display = "none";
                        document.getElementsByClassName("cover")[0].style.left = "var(--TitleCoverInitail)";}, 1710);

    setTimeout(() => {document.getElementsByClassName("boardcover")[0].style.display = "none";}, 1750)


    // setTimeout(() => {document.getElementsByClassName("boardcover")[0].style.display = "none";}, 2750)

    

    // AppendText(" - normal")
    
}

function Page1_2()
{   
    GameOn = false;
    document.getElementById("Frame2").style.display = "none";
    document.getElementById("Frame1").style.display = "block";
    // document.getElementById("normal").style.overflow = "hidden";
    // setTimeout(() => {document.getElementsByClassName("Title2")[0].style.margin = "53px 65px";
    //                     document.getElementsByClassName("Title1")[0].style.margin = "53px 65px";}, 200);
    document.getElementsByClassName("Title1")[0].style.margin = "var(--maxmargintitleY) var(--maxmargintitleX)";
    document.getElementsByClassName("Title2")[0].style.margin = "var(--maxmargintitleY) 0px";
    document.getElementsByClassName("boardcover")[0].style.display = "flex";
    document.getElementsByClassName("boardcover")[0].style.opacity = "1";
    document.getElementsByClassName("boardcover")[0].innerHTML = "";
    
    BoardCoverReset = false
    clearNormalBoard();
 
}

function Page3(){
    document.getElementById("Frame1").style.display = "none";
    document.getElementById("Frame3").style.display = "block";
    document.getElementsByClassName("Title2")[0].innerHTML = "Tic Tac Toe";
    BoardCoverReset = false

    setTimeout(() => {document.getElementsByClassName("Title2")[1].style.margin = "var(--minmargintitleY) 0px";
                        document.getElementsByClassName("Title2")[1].style.marginBottom = "var(--maxmargintitleY)";
                        document.getElementsByClassName("Title1")[0].style.margin = "var(--minmargintitleY) var(--minmargintitleX)";
                        document.getElementsByClassName("boardcover")[1].style.opacity = "0";}, 200);
    setTimeout(() => { 
                        for(i = 0; i < 9; i++){
                            document.getElementsByClassName("boardcoversmall")[i].style.opacity = "0";
                        }}, 600);
    setTimeout(() => { document.getElementsByClassName("cover")[1].style.display = "block";}, 600);
    setTimeout(() => { document.getElementsByClassName("Title2")[1].innerHTML = "Tic Tac Toe - super"; 
                        document.getElementsByClassName("cover")[1].style.left = "var(--TitleCoverSuper)";}, 700);
    setTimeout(() => {GameOn = true;
                     RandomTurnSuper();
                    }, 1750)                 
    setTimeout(() => { document.getElementsByClassName("cover")[1].style.display = "none";
                        document.getElementsByClassName("cover")[1].style.left = "var(--TitleCoverInitail)";}, 1710);

    setTimeout(() => {document.getElementsByClassName("boardcover")[1].style.display = "none";
                        for(i = 0; i < 9; i++){
                            document.getElementsByClassName("boardcoversmall")[i].style.display = "none";
                        }}, 1750)
}

function Page1_3()
{   
    GameOn = false;
    document.getElementById("Frame3").style.display = "none";
    document.getElementById("Frame1").style.display = "block";
    // document.getElementById("normal").style.overflow = "hidden";
    // setTimeout(() => {document.getElementsByClassName("Title2")[0].style.margin = "53px 65px";
    //                     document.getElementsByClassName("Title1")[0].style.margin = "53px 65px";}, 200);
    document.getElementsByClassName("Title1")[0].style.margin = "var(--maxmargintitleY) var(--maxmargintitleX)";
    document.getElementsByClassName("Title2")[1].style.margin = "var(--maxmargintitleY) 0px";
    document.getElementsByClassName("boardcover")[1].style.display = "flex";
    document.getElementsByClassName("boardcover")[1].style.opacity = "1";
    document.getElementsByClassName("boardcover")[1].innerHTML = "";
    
    BoardCoverReset = false
    // clearNormalBoard(); add clearsuper
 
}

function getRandomArbitrary(min, max) {
    return Math.ceil(Math.random() * (max - min + 1) + min - 1);
}

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay){};
}

async function AppendText(Text)
{   
    // var test = "Tic Tac Toe"
    var timedelay = 300;

    // async function UpdateTitle2(Char)
    // {
    //     // console.log(document.getElementsByClassName("Title2").textContent)
    //     setTimeout(() => { document.getElementById("Title2").innerHTML += Char ;return 1; }, 500);

    // }

    for (let i = 0; i < Text.length; i++) {
        // test = test.concat("",Text.slice(i,i+1))
        // console.log(obj.textContent) 
        // document.getElementById("Title2").innerHTML = test;
        // setTimeout(() => {console.log("hello")},5000)

        setTimeout(() => { document.getElementsByClassName("Title2")[0].innerHTML += Text.slice(i,i+1) ;return 1; }, timedelay + i*timedelay);

        // x = await UpdateTitle2(Text.slice(i,i+1))
      }
}
