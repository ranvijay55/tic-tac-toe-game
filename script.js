let divs = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;
let count = 0;


const winpatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetgame = () => {
  turn0 = true;
  enabledivs();
  count = 0;
  msgContainer.classList.add("hide");
};
// Using forEach to iterate over each div and attach the event listener
divs.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = "o";
      turn0 = false;
    } else {
      box.innerText = "x";
      turn0 = true;
    }
    box.disabled = true;
    count++

   let isWinner = checkWinner();
   if(count == 9 && !isWinner){
    gameDraw()
   }

  });
});

const showWinner = (winner) => {
  msg.innerText = `congratulations winner is ${winner}`;
  msgContainer.classList.remove("hide");
};
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disabledivs();
};

const disabledivs = () => {
  for (box of divs) {
    box.disabled = true;
  }
};

const enabledivs = () => {
  for (box of divs) {
    box.disabled = false;
    box.innerText = "";
  }
};

const checkWinner = () => {
  for (let i of winpatterns) {
    let pos1val = divs[i[0]].innerText;
    let pos2val = divs[i[1]].innerText;
    let pos3val = divs[i[2]].innerText;

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        disabledivs();
        showWinner(pos1val);
      }
    }
  }
};

newGameBtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);
