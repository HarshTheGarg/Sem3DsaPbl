let height = 3;
let length = 3;

let sou;
let dest;

document.querySelector("#heightRange").addEventListener("change", () => {
  document.querySelector(".heightVal").innerHTML =
    document.querySelector("#heightRange").value;
  height = +document.querySelector("#heightRange").value;
  document.querySelector("#stopx").value = height - 1;
  document.querySelector("#startx").value = 0;
  // console.log({height});
  createGrid();
});

document.querySelector("#lengthRange").addEventListener("change", () => {
  document.querySelector(".lengthVal").innerHTML =
    document.querySelector("#lengthRange").value;
  length = +document.querySelector("#lengthRange").value;
  document.querySelector("#stopy").value = length - 1;
  document.querySelector("#starty").value = 0;
  // console.log({length});
  createGrid();
});

[...document.querySelectorAll("input[type='number'")].forEach((element) => {
  element.addEventListener("change", (e) => {
    if (e.target.value < 0) {
      e.target.value = 0;
    }

    createGrid();
  });
});

document.querySelector("#stopx").value = length - 1;
document.querySelector("#stopy").value = height - 1;

// y-height, x-length
document.querySelector("#startx").addEventListener("change", (e) => {
  if (e.target.value > length) {
    e.target.value = length;
  } else {
    displayStartEnd();
  }
});
document.querySelector("#starty").addEventListener("change", (e) => {
  if (e.target.value > height) {
    e.target.value = height;
  } else {
    displayStartEnd();
  }
});
document.querySelector("#stopx").addEventListener("change", (e) => {
  if (e.target.value > length) {
    e.target.value = length;
  } else {
    displayStartEnd();
  }
});
document.querySelector("#stopy").addEventListener("change", (e) => {
  if (e.target.value > height) {
    e.target.value = height;
  } else {
    displayStartEnd();
  }
});

function displayStartEnd() {
  // start
  let startx = document.querySelector("#startx").value;
  let starty = document.querySelector("#starty").value;

  // console.log({ startx, starty });

  document.querySelector(
    `[data-xpos="${+startx}"][data-ypos="${+starty}"]`
  ).innerHTML = "S";

  let stopx = document.querySelector("#stopx").value;
  let stopy = document.querySelector("#stopy").value;
  // console.log({stopy});

  document.querySelector(
    `[data-xpos="${+stopx}"][data-ypos="${+stopy}"]`
  ).innerHTML = "E";
  // document.querySelector(
  //   `[data-xpos="${stopx}"][data-ypos="${stopy}"]`
  // ).innerHTML = "E";

  // console.log({startx, starty, stopx, stopy})
  updateSourDest(startx, starty, stopx, stopy);
}

function updateSourDest(startx, starty, stopx, stopy) {
  sou = [+startx, +starty];
  dest = [+stopx, +stopy];
}

document.querySelector("#restart").addEventListener("click", createGrid);

let maze = [...Array(height)].map(() => Array(length));

for (i = 0; i < height; i++) {
  for (j = 0; j < length; j++) {
    maze[i][j] = 1;
  }
}

let visited = [...Array(height)].map(() => Array(length));

for (i = 0; i < height; i++) {
  for (j = 0; j < length; j++) {
    visited[i][j] = 0;
  }
}

function restartVisited() {
  for (i = 0; i < height; i++) {
    for (j = 0; j < length; j++) {
      visited[i][j] = 0;
    }
  }
}

function createGrid() {
  let gridContainer = document.querySelector(".grid");
  gridContainer.innerHTML = null;

  maze = [...Array(height)].map(() => Array(length));
  for (i = 0; i < height; i++) {
    for (j = 0; j < length; j++) {
      maze[i][j] = 1;
    }
  }

  visited = [...Array(height)].map(() => Array(length));
  restartVisited();

  for (i = 0; i < height; i++) {
    let row = document.createElement("div");
    row.classList.add("gridRow");

    for (j = 0; j < length; j++) {
      let node = document.createElement("div");
      node.classList.add(`gridElement`);
      node.dataset.xpos = i;
      node.dataset.ypos = j;

      // node.innerHTML = `${i} ${j}`;

      node.addEventListener("click", toggleElement);
      row.appendChild(node);
    }

    gridContainer.appendChild(row);
  }

  displayStartEnd();
}

createGrid();

function toggleElement(e) {
  let element = e.target;
  let x = element.dataset.xpos;
  let y = element.dataset.ypos;

  element.classList.toggle("selected");

  maze[x][y] = maze[x][y] ? 0 : 1;
  // console.table(maze);
}

function markPath(result) {
  // console.log({ result });
  result.forEach((element) => {
    let el = document.querySelector(
      `[data-xpos="${element.x}"][data-ypos="${element.y}"]`
    );
    el.classList.add("path");
  });

  [...document.querySelector(".grid").children].forEach((row) => {
    // console.log(row.children);
    [...row.children].forEach((element) => {
      // console.log(element);
      element.removeEventListener("click", toggleElement);
    });
  });
}

let result;
document.querySelector("#find").addEventListener("click", function () {
  // restartVisited();

  // sou = [0, 0];
  // dest = [2, 2];

  console.log({ sou, dest });

  let res = [
    {
      x: sou[0],
      y: sou[1],
    },
  ];
  result = {};
  // console.log(res);

  findPath(res, sou);
  markPath(result);
  restartVisited();
});

function isPos(nx, ny) {
  // console.table(visited);
  if (
    nx >= 0 &&
    nx < height &&
    ny >= 0 &&
    ny < length &&
    visited[nx][ny] != 1 &&
    maze[nx][ny] == 1
  ) {
    return true;
  } else {
    return false;
  }
}

function findPath(curPath, pos) {
  let x = pos[0],
    y = pos[1];

  if (maze[x][y] == 0) {
    return;
  }

  visited[x][y] = 1;
  // console.table(visited);

  if (pos[0] == dest[0] && pos[1] == dest[1]) {
    result = curPath;
    return;
  }

  if (isPos(x - 1, y)) {
    findPath([...curPath, { x: x - 1, y }], [x - 1, y]);
  }
  if (isPos(x, y + 1)) {
    findPath([...curPath, { x, y: y + 1 }], [x, y + 1]);
  }
  if (isPos(x + 1, y)) {
    findPath([...curPath, { x: x + 1, y }], [x + 1, y]);
  }
  if (isPos(x, y - 1)) {
    findPath([...curPath, { x, y: y - 1 }], [x, y - 1]);
  }
}
