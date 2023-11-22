let length = 4;
let height = 5;

let maze = [
  [0, 0, 0, 0],
  [1, 1, 0, 0],
  [0, 1, 0, 1],
  [0, 1, 1, 1],
  [1, 1, 0, 1],
];

let sou = [1, 0];
let dest = [4, 3];

let visited = [...Array(height)].map((e) => Array(length));


for (i = 0; i < height; i++) {
  for (j = 0; j < length; j++) {
    visited[i][j] = 0;
  }
}

function isPos(nx, ny) {
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

let res = "";

function findPath(curPath, pos) {
  let x = pos[0],
    y = pos[1];

  visited[x][y] = 1;

  if (pos[0] == dest[0] && pos[1] == dest[1]) {
    // console.log({ curPath });
    res = curPath;
    return;
  }

  // U, R, D, L
  if (isPos(x - 1, y)) {
    findPath(curPath + "U", [x - 1, y]);
  }
  if (isPos(x, y + 1)) {
    findPath(curPath + "R", [x, y + 1]);
  }
  if (isPos(x + 1, y)) {
    findPath(curPath + "D", [x + 1, y]);
  }
  if (isPos(x, y - 1)) {
    findPath(curPath + "L", [x, y - 1]);
  }
}


findPath("", sou);

console.log(res);

// console.table(maze );
// console.log({visited});
