it('we get expected neighbours', () => {
  var world = [
    [0, 0, 1, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 1],
    [0, 1, 0, 1, 0, 0, 1, 0]
  ];

  let neighbours = getNeighboursForCell(world, 1, 5);
  expect(neighbours).toEqual([1, 1, 0, 0, 1, 0, 0, 1])

  neighbours = getNeighboursForCell(world, 0, 0);
  expect(neighbours).toEqual([0, 0, 0, 0, 0, 0, 0, 0])

  neighbours = getNeighboursForCell(world, 3, 7);
  expect(neighbours).toEqual([1, 1, 0, 1, 0, 0, 0, 0])

  neighbours = getNeighboursForCell(world, 3, 0);
  expect(neighbours).toEqual([0, 0, 1, 0, 1, 0, 0, 0])

  neighbours = getNeighboursForCell(world, 0, 7);
  expect(neighbours).toEqual([0, 0, 0, 0, 0, 1, 0, 0])
});

it('counts live neighbours', () => {
  var world = [
    [0, 1, 1, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0]
  ];
  expect(countAliveNeighboursForCell(world, 0, 2)).toBeLessThan(2);

  expect(countAliveNeighboursForCell(world, 1, 5)).toBe(4);
});

it('lone cell dies after one beat', () => {
  var world = [
    [0, 1]
  ];

  let newWorld = beat(world);

  expect(newWorld).toEqual([[0, 0]])
});

it('cell in overpopulation dies after one beat, and one is born', () => {
  var world = [
    [1, 1, 0],
    [1, 1, 1]
  ];

  let newWorld = beat(world);

  expect(newWorld).toEqual([[1, 0, 1], [1, 0, 1]])
});

it('world evolves as expected', () => {
  var world = [
    [1, 1, 0],
    [1, 1, 1]
  ];

  let newWorld = beat(world);
  expect(newWorld).toEqual([
    [1, 0, 1], 
    [1, 0, 1]])

  newWorld = beat(newWorld);
  expect(newWorld).toEqual([[0, 0, 0], [0, 0, 0]])
});

function beat(world: number[][]) {
  const newWorld = cloneArray(world)
  world.map((line, x) => {
    line.map((cell, y) => {
      let numAliveCells = countAliveNeighboursForCell(world, x, y)

      if (numAliveCells < 2 || numAliveCells > 3) {
        newWorld[x][y] = 0
      } else if (numAliveCells == 3) {
        newWorld[x][y] = 1
      }
    });
  });
  return newWorld
}

function cloneArray(world: number[][]) {
  var clone = [];
  for (let i = 0; i < world.length; i++) {
    clone.push(world[i].slice(0))
  }
  return clone
}


function countAliveNeighboursForCell(world: number[][], posx: number, posy: number) {
  return getNeighboursForCell(world, posx, posy).filter(cell => cell == 1).length
}

function getNeighboursForCell(world: number[][], posx: number, posy: number): number[] {
  let neighbours: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
  if (posx > 0 && posy > 0) {
    neighbours[0] = world[posx - 1][posy - 1];
  }
  if (posx > 0) {
    neighbours[1] = world[posx - 1][posy];
  }
  if (posx > 0 && posy < world[posx].length - 1) {
    neighbours[2] = world[posx - 1][posy + 1];
  }
  if (posy > 0) {
    neighbours[3] = world[posx][posy - 1];
  }
  if (posy < world[posx].length - 1) {
    neighbours[4] = world[posx][posy + 1];
  }
  if (posy > 0 && posx < world.length - 1) {
    neighbours[5] = world[posx + 1][posy - 1];
  }
  if (posx < world.length - 1) {
    neighbours[6] = world[posx + 1][posy];
  }
  if (posx < world.length - 1 && posy < world[posx].length - 1) {
    neighbours[7] = world[posx + 1][posy + 1];
  }
  return neighbours;
}