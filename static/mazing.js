// Original JavaScript code by Chirp Internet: chirpinternet.eu
//  Code From https://www.the-art-of-web.com/javascript/maze-generator/


function Position(x, y) {
  this.x = x;
  this.y = y;
}

Position.prototype.toString = function () {
  return this.x + ":" + this.y;
};

function Mazing(id, level, username) {
  //Code by Me
  isWaiting = false;
  isRunning = false;
  this.level = level;
  this.username = username;
  seconds = 10 + 10 * level;
  id1 = id;
  this.maxScore =
    localStorage.getItem("high_score") == null
      ? 0
      : parseInt(localStorage.getItem("high_score"));

  document.getElementById("previous_high_score").innerHTML = this.maxScore;
  // bind to HTML element
  this.mazeContainer = document.getElementById(id);
  this.mazeScore = document.getElementById("maze_score");

  this.heroScore =
    localStorage.getItem("current_score") == null
      ? 0
      : parseInt(localStorage.getItem("current_score"));

  this.maze = [];
  this.heroPos = {};
  this.heroHasKey = false;

  this.utter = null;

  for (i = 0; i < this.mazeContainer.children.length; i++) {
    for (j = 0; j < this.mazeContainer.children[i].children.length; j++) {
      var el = this.mazeContainer.children[i].children[j];
      this.maze[new Position(i, j)] = el;
      if (el.classList.contains("entrance")) {
        // place hero at entrance
        this.heroPos = new Position(i, j);
        this.maze[this.heroPos].classList.add("hero");
      }
    }
  }

  this.mazeMessage = document.createElement("div");
  this.mazeMessage.id = "maze_message";

  var mazeOutputDiv = document.createElement("div");
  mazeOutputDiv.id = "maze_output";

  var maze_chat = document.getElementById("maze_chat");
  maze_chat.innerHTML = "";
  this.mazeMessage.classList.add("text-left");
  this.mazeMessage.classList.add("p-2");
  maze_chat.appendChild(this.mazeMessage);
  mazeOutputDiv.style.width = this.mazeContainer.scrollWidth + "px";
  this.setMessage("Step 1: Find the Key");

  this.mazeContainer.insertAdjacentElement("afterend", mazeOutputDiv);

  // activate control keys
  this.keyPressHandler = this.mazeKeyPressHandler.bind(this);
  document.addEventListener("keydown", this.keyPressHandler, false);
  time_interval = setInterval(this.gameTimer, 1000);
}

Mazing.prototype.setMessage = function (text) {
  var message1 = document.createElement("div");
  message1.innerHTML = text;
  this.mazeMessage.appendChild(message1);

  this.mazeScore.innerHTML = this.heroScore;
};

Mazing.prototype.heroTakeTreasure = function () {
  this.maze[this.heroPos].classList.remove("nubbin");
  this.heroScore += 10;
  seconds += 10;
  this.setMessage("Yas, You have now increased your time by 10 seconds!");
};

Mazing.prototype.heroTakeKey = function () {
  this.maze[this.heroPos].classList.remove("key");
  this.heroHasKey = true;
  this.heroScore += 20;
  this.mazeScore.classList.add("has-key");
  seconds += 10;
  this.setMessage("Step 1 Completed : You now have the key!");
  this.setMessage(
    "Step 2  : Find the Door! Don't forget to collect the treasures in the middle"
  );
};

// Code by Me
Mazing.prototype.gameOver = function (text) {
  // de-activate control keys
  document.removeEventListener("keydown", this.keyPressHandler, false);
  this.setMessage(text);
  this.mazeContainer.classList.add("finished");

  let next_level = document.getElementById("next_level");
  next_level.innerHTML = "";
  let div = document.createElement("div");
  let button = document.createElement("button");
  button.id = "click";
  button.innerHTML = "Click here to play this level again!";
  button.classList.add("btn");
  button.classList.add("btn-info");
  button.onclick = function () {
    window.location.reload(false);
  };

  let button2 = document.createElement("button");
  button2.id = "click2";
  button2.innerHTML = "Click here to restart";
  button2.classList.add("btn");
  button2.classList.add("btn-info");
  button2.classList.add("ml-4");

  button2.onclick = function () {
    usernames[this.username] = 1;
    localStorage.setItem("current_score", 0);
    localStorage.setItem("usernames", JSON.stringify(usernames));
    window.location.reload(false);
  };

  div.appendChild(button);
  div.appendChild(button2);
  next_level.appendChild(div);
};

// Code by Me
Mazing.prototype.gameTimer = function () {
  var minutes = Math.round((this.seconds - 30) / 60);
  var remainingSeconds = this.seconds % 60;
  if (remainingSeconds < 10) {
    remainingSeconds = "0" + remainingSeconds;
  }
  document.getElementById("waiting_time").innerHTML =
    minutes + ":" + remainingSeconds;
  if (this.seconds == 0) {
    clearInterval(time_interval);
    var mazeMessage = document.createElement("div");
    document.removeEventListener("keydown", this.keyPressHandler, false);
    var maze_chat = document.getElementById("maze_message");

    mazeMessage.innerHTML = "Sorry!You Lost! ";
    maze_chat.appendChild(mazeMessage);
    document.getElementById(id1).classList.add("finished");
    let next_level = document.getElementById("next_level");
    next_level.innerHTML = "";
    let div = document.createElement("div");
    let button = document.createElement("button");
    button.id = "click";
    button.innerHTML = "Click here to play this level again!";
    button.classList.add("btn");
    button.classList.add("btn-info");
    button.onclick = function () {
      window.location.reload(false);
    };

    const usernames =
      localStorage.getItem("usernames") != null
        ? JSON.parse(localStorage.getItem("usernames"))
        : {};
    const username = localStorage.getItem("username");
    let button2 = document.createElement("button");
    console.log("yes");
    button2.id = "click2";
    button2.innerHTML = "Click here to restart";
    button2.classList.add("btn");
    button2.classList.add("btn-info");
    button2.classList.add("ml-4");
    button2.onclick = function () {
      usernames[username] = 1;
      console.log(usernames[username]);
      localStorage.setItem("current_score", 0);
      localStorage.setItem("usernames", JSON.stringify(usernames));
      window.location.reload(false);
    };

    div.appendChild(button);
    div.appendChild(button2);
    next_level.appendChild(div);
  } else {
    this.isWaiting = true;
    this.seconds--;
  }
};

// Code by Me
Mazing.prototype.heroWins = function () {
  this.mazeScore.classList.remove("has-key");
  this.maze[this.heroPos].classList.remove("door");
  this.heroScore += 50;
  this.gameOver("Yayy! You finished the Game !!");

  const usernames =
    localStorage.getItem("usernames") != null
      ? JSON.parse(localStorage.getItem("usernames"))
      : {};

  localStorage.setItem("current_score", this.heroScore + seconds);
  let next_level = document.getElementById("next_level");
  next_level.innerHTML = "";
  let div = document.createElement("div");
  // div.innetHTML = "Congrats Click here to proceed to the next Level "
  let button = document.createElement("button");
  button.id = "click";
  button.innerHTML = "Click here to go to the next level";
  button.classList.add("btn");
  button.classList.add("btn-success");
  button.onclick = function () {
    usernames[this.username] = level + 1;
    localStorage.setItem("usernames", JSON.stringify(usernames));
    window.location.reload(false);
  };

  let button2 = document.createElement("button");
  button2.id = "click2";
  button2.innerHTML = "Click here to restart";
  button2.classList.add("btn");
  button2.classList.add("btn-info");
  button2.classList.add("ml-4");
  button2.onclick = function () {
    usernames[this.username] = 1;
    console.log(usernames);
    localStorage.setItem("current_score", 0);
    localStorage.setItem("usernames", JSON.stringify(usernames));
    window.location.reload(false);
  };

  div.appendChild(button);
  div.appendChild(button2);

  next_level.appendChild(div);
  if (this.maxScore < this.heroScore) {
    localStorage.setItem("high_score", this.heroScore);
  }
};

Mazing.prototype.tryMoveHero = function (pos) {
  if ("object" !== typeof this.maze[pos]) {
    return;
  }

  var nextStep = this.maze[pos].className;

  // before moving

  if (seconds == 0) {
    this.gameOver("Sorry! You Lost");
    return;
  }

  if (nextStep.match(/sentinel/)) {
    this.heroScore = Math.max(this.heroScore - 5, 0);
    if (seconds <= 0) {
      this.heroWins();
    } else {
      this.setMessage("Ow!!, that hurt!");
      seconds -= 10;
    }
    return;
  }
  if (nextStep.match(/wall/)) {
    return;
  }
  if (nextStep.match(/exit/)) {
    if (this.heroHasKey) {
      this.heroWins();
    } else {
      this.setMessage("You need a key to unlock the door! Please find the key");
      return;
    }
  }

  // move hero one step
  this.maze[this.heroPos].classList.remove("hero");
  this.maze[pos].classList.add("hero");
  this.heroPos = pos;
  this.heroScore += 1;

  // after moving
  if (nextStep.match(/nubbin/)) {
    this.heroTakeTreasure();
    return;
  }
  if (nextStep.match(/key/)) {
    this.heroTakeKey();
    return;
  }
  if (nextStep.match(/exit/)) {
    return;
  }
  if (seconds <= 0) {
    this.gameOver("Sorry! You Lost");
  }
};

Mazing.prototype.mazeKeyPressHandler = function (e) {
  var tryPos = new Position(this.heroPos.x, this.heroPos.y);
  switch (e.keyCode) {
    case 37: // left
      this.mazeContainer.classList.remove("face-right");
      tryPos.y--;
      break;

    case 38: // up
      tryPos.x--;
      break;

    case 39: // right
      this.mazeContainer.classList.add("face-right");
      tryPos.y++;
      break;

    case 40: // down
      tryPos.x++;
      break;

    default:
      return;
  }
  this.tryMoveHero(tryPos);
  e.preventDefault();
};
