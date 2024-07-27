let gameSeq=[];
let userSeq=[];

let btns=['yellow','red','purple','green'];
let started=false;
let level=0;

let h2=document.querySelector('h2');
let highScore=0;

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("Game Started");
        started=true;
    }
    levelUp();
});

function gameFlash(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove('flash');
    },200);
}

function userFlash(btn){
    btn.classList.add('userFlash');
    setTimeout(function(){
        btn.classList.remove('userFlash');
    },200);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerHTML=`Level ${level}`;
    
    let randIdx=Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        highScore=Math.max(highScore,level);
        h2.innerHTML=`Game Over! Your Score was <b>${level}</b> <br> Highest Score <b>${highScore}</b> <br>Press any key to start again. `;
        document.querySelector('body').style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor="white";
        },150);
        reset();
    }
}

function btnPress(){
    let btn=this;
    userFlash(this);

    userColor=this.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);
    // console.log(userSeq);

    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll('.btn');
for(btn of allBtns){
    btn.addEventListener('click',btnPress);
}

function reset(){
    level=0;
    started=false;
    userSeq=[];
    gameSeq=[];
}