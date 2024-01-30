import { describe, expect, it } from "vitest";

describe('', () => {
  // it('Should find 2 solutions for two queens given ignoring diagonals', () => {

  //   //When
  //   const result = solveNQueens(0) //?
  //   //Then
  //   expect(result).toHaveLength(0)
  // })
  // it('Should find 2 solutions for two queens given ignoring diagonals', () => {

  //   //When
  //   const result = solveNQueens(1) //?
  //   //Then
  //   expect(result).toHaveLength(1)
  // })
  // it('Should find 2 solutions for two queens given ignoring diagonals', () => {

  //   //When
  //   const result = solveNQueens(2) //?
  //   //Then
  //   expect(result).toHaveLength(2)
  //   expect(result[0]).toHaveLength(2)
  //   expect(result[1]).toHaveLength(2)
  // })
  // it.only('Should find solutions for three queens given ignoring diagonals', () => {
  //   //When
  //   const result = solveNQueens(3) //?
  //   //Then
  //   expect(result).toHaveLength(6)
  // })
  it('Should find  solutions for 4 queens given ignoring diagonals', () => {

    //When
    const result = solveNQueens(4) //?
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
  const nextRowColumnns : PositionsForQueens[] = [[]];
  for (let i = 0; i < nbQueens; i++) {
    nextRowColumnns.push([i])
  }
  const solutionsValidOrNot = buildSolutions(previousSolutions, nextRowColumnns)
  if (hasSolutionsWithAllQueensUsed(solutionsValidOrNot, nbQueens)) {
    return keepSolutionsWithAllQueens(solutionsValidOrNot,nbQueens)
  }
  return generateRow(nbQueens, solutionsValidOrNot);
}

const keepSolutionsWithAllQueens = (solutions: number[][], nbQueens: number): PositionsForQueens[] => {
  return solutions.filter((solution) => solution.length && solution.length === nbQueens);
}

const hasSolutionsWithAllQueensUsed = (solutions: number[][], nbQueens: number) => {
  return solutions.some((nextPosition) => nextPosition.length === nbQueens);
}

const buildSolutions = (previousSolutions: PositionsForQueens[], nextRowColumnns: PositionsForQueens[]) => {
  return previousSolutions
    .flatMap((solution) => nextRowColumnns
      .map((next) => solution.indexOf(next[0]) === -1 && !isIntersectingOtherQueensDiagonal(solution, next[0]) ? solution.concat(next) : []));
}

const isIntersectingOtherQueensDiagonal = (solution: PositionsForQueens, next: Col) => {
  const solutionLength = solution.length
  const plop = solution.some((position, index) => {
    return Math.abs(next - position) === (solutionLength - index)
  })
  return plop;
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
