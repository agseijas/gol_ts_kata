
it('world is created dead', () => {
  var world = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ];
  expect(world).toHaveLength(4);
  expect(world[0]).toHaveLength(8);
  world.map(line => {
    line.map(cell => {
      expect(cell).toBe(0);
    })
  })
});

it('world has some cell alive', () => {
  var world = [
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0]
  ];

  expect(world[0][2]).toBe(1)
});

it('we get expected neighbours', () => {
  var world = [
    [0, 0, 1, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0]
  ];

  let neighbours = getNeighboursForCell(world, 1, 5);
  expect(neighbours).toEqual([1, 1, 0, 0, 1, 0, 0, 1])


  neighbours = getNeighboursForCell(world, 0, 0);
  expect(neighbours).toEqual([0, 0, 0, 0, 0, 0, 0, 0])


  neighbours = getNeighboursForCell(world, 3, 7);
  expect(neighbours).toEqual([1, 0, 0, 0, 0, 0, 0, 0])

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
  if (posx < world.length - 1) {
    neighbours[7] = world[posx + 1][posy + 1];
  }
  return neighbours;
}