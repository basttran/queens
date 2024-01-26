import { describe, expect, it } from "vitest";


describe('', () => {
  it('Should find 2 solutions for two queens given ignoring diagonals', () => {

    //When
    const result = solveNQueens(1) //?
    //Then
    expect(result).toHaveLength(1)
  })
  it('Should find 2 solutions for two queens given ignoring diagonals', () => {

    //When
    const result = solveNQueens(2) //?
    //Then
    expect(result).toHaveLength(2)
  })
  it('Should find  solutions for three queens given ignoring diagonals', () => {

    //When
    const result = solveNQueens(3) //?
    //Then
    expect(result).toHaveLength(6)
  })
  //it('should detect that two queens are on the same diagonal', () => {})
})

const solveNQueens = (nbQueens: Col): Array<PositionsForQueens> => {
  const column: Col = nbQueens;
  


  const result = generateRow(nbQueens);

  return result;

};

const generateRow = (column: number, previous?: PositionsForQueens[]): PositionsForQueens[] => {
  const firstRow: Array<PositionsForQueens> = []
  for (let i = 0 ; i < column; i++ ) {
    firstRow.push([i])
  }
  if (firstRow.every((solution) => solution.length === column)) {
    return firstRow;
  }
  const next: Array<PositionsForQueens> = [];
  (previous ? previous : firstRow).forEach(solution => {
    for (let j = 0; j < column; j++) {
      if (solution.indexOf(j) > -1) {
        continue;
      }
      next.push(solution.concat([j]));
    }
  });
  console.log('next[0]: ', next[0]);
  if (next[0] && next[0].length < column) {
    return generateRow(column, next)
  } else {
    return next;
  }
}

type Col = number;
type PositionsForQueens = Array<Col>;


//////////////////////////
//[ [ 1, 3, 0, 2 ], [ 2, 0, 3, 1 ] ]
//
//Solution 1
//   X |  Q  | X  | X
//   X |  X  | X  | Q
//   Q |  X  | X  | X
//   X |  X  | Q  | X
// ==> [ 1, 3, 0, 2 ]
//////////////////////////
//Solution 2
//   X |  X  | Q  | X
//   Q |  X  | X  | X
//   X |  X  | X  | Q
//   X |  Q  | X  | X
//==> [ 2, 0, 3, 1 ]
