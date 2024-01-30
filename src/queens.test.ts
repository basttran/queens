import { describe, expect, it } from "vitest";

describe('', () => {
  it('Should find 0 solutions for zero queens given ignoring diagonals', () => {

    //When
    const result = solveNQueens(0) //?
    //Then
    expect(result).toHaveLength(0)
  })
  it('Should find 1 solutions for one queens given ignoring diagonals', () => {

    //When
    const result = solveNQueens(1) //?
    //Then
    expect(result).toHaveLength(1)
  })
  it('Should find 0 solutions for two queens given ignoring diagonals', () => {
    //When
    const result = solveNQueens(2) //?
    //Then
    expect(result).toHaveLength(0)
  })
  it('Should find 0 solutions for three queens given ignoring diagonals', () => {
    //When
    const result = solveNQueens(3) //?
    //Then
    expect(result).toHaveLength(0)
  })
  it('Should find  solutions for 4 queens given ignoring diagonals', () => {
    //When
    const result = solveNQueens(4) //?
    console.log('result: ', result);
    //Then
    expect(result).toHaveLength(2)
  })
  //it('should detect that two queens are on the same diagonal', () => {})
})

const solveNQueens = (nbQueens: Col): Array<PositionsForQueens> => {
  const result = generateRow(nbQueens);
  return result;
};

const generateRow = (nbQueens: Col, previousSolutions: PositionsForQueens[] = [[]]): PositionsForQueens[] => {
  const nextRowColumnns: PositionsForQueens[] = generateNextRowPositionsToTry(nbQueens);
  const validSolutionsForCurrentIteration = buildValidSolutions(previousSolutions, nextRowColumnns);

  if (validSolutionsForCurrentIteration.length === 0) {
    return [];
  }
  if (validSolutionsForCurrentIteration.some((solution) => solution.length === nbQueens)) {
    return validSolutionsForCurrentIteration.filter((solution) => solution.length === nbQueens)
  }
  return generateRow(nbQueens, validSolutionsForCurrentIteration)
}

const buildValidSolutions = (previousSolutions: PositionsForQueens[], nextRowColumnns: PositionsForQueens[]) => {

  return previousSolutions
    .flatMap((solution) => nextRowColumnns
      .map((next) => !isOnSameColumnAsPreviousQueens(solution, next) && !isIntersectingOtherQueensDiagonal(solution, next[0]) ?
      solution.concat(next) :
      []))
    .filter((solution) => solution.length >= previousSolutions[0].length);
}

const isIntersectingOtherQueensDiagonal = (solution: PositionsForQueens, next: Col) => {
  return solution.some((position, index) => {
    return Math.abs(next - position) === (solution.length - index)
  })
}

const isOnSameColumnAsPreviousQueens = (solution: PositionsForQueens, next: PositionsForQueens) => {
  return solution.indexOf(next[0]) >= 0;
}

const generateNextRowPositionsToTry = (nbQueens: number) => {
  const nextRowColumnns: PositionsForQueens[] = [];
  for (let i = 0; i < nbQueens; i++) {
    nextRowColumnns.push([i]);
  }
  return nextRowColumnns;
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
