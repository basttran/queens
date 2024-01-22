import * as NEA from 'fp-ts/NonEmptyArray';
import * as A from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { describe, expect, expectTypeOf, it } from "vitest";

const solveNQueens = (nbQueens: number): Array<PositionsForQueens> => {
  const column: Col = nbQueens;
  
  const firstRow: Array<PositionsForQueens> = []

  for (let i = 0 ; i < column; i++ ) {
    firstRow.push([i])
  }

  const secondRow: Array<PositionsForQueens> = [];

  firstRow.forEach(solution => {
    for(let j= 0; j < column; j++ ) {
      if(solution[0] === j) {
        continue
      }
      secondRow.push([solution[0], j])
    }
  })
  return secondRow
  


  // First Queen déplacer sur toutes les colonnes 
  // ==> 
  // [[0], [1]]
  // [[0, 1], [1, 0]]
  // If Second Queen quelles solutions possibles
  // Sol 1 Queen 1 
  // Queen 2 col 0 => False 
  // Queen 2 col 1 => Vrai  ==> Solitions possibles 
  // [[0, 0], [0, 1]]
  //  Sol 2 Queen 1 
  // Queen 2 col 0 => Vrai  ==> Solitions possibles  
  // Queen 2 col 1 => False
  //[[0, 1 ], [1, 0]]


  // [[0], [1], [2]]
  // [[[0, 1], [0, 2]], [[1, 0], [1,2], [[2, 0], [2, 1]]]]
  // [[0, 1], [0, 2], [1, 0], [1,2]]


  
};

type Col = number;
type PositionsForQueens = Array<Col>;

describe('N queens problem', () => {

  it('should', () => {
    solveNQueens(4); //?
    
  });
});


describe('', () => {
  it('Should find 2 solutions for two queens given ingoring diagonals', () => {

    //When
    const result = solveNQueens(2) //?
    //Then
    expect(result).toHaveLength(2)
  })
  //it('should detect that two queens are on the same diagonal', () => {})
})

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
