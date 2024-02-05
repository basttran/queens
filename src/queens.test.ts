import { describe, expect, it } from "vitest";
import * as NEA from "fp-ts/NonEmptyArray";
import * as A from "fp-ts/Array";
import * as O from "fp-ts/Option";
import { pipe } from "fp-ts/lib/function";
import { values } from "fp-ts/lib/Map";
import { val } from "cheerio/lib/api/attributes";

describe("", () => {
  it("Should find 1 solutions for zero queens", () => {
    //When
    const result = solveNQueens(0);
    //Then
    expect(result).toHaveLength(1);
  });
  it("Should find 1 solutions for one queens", () => {
    //When
    const result = solveNQueens(1);
    //Then
    expect(result).toHaveLength(1);
  });
  it("Should find 0 solutions for two queens", () => {
    //When
    const result = solveNQueens(2);
    //Then
    expect(result).toHaveLength(0);
  });
  it("Should find 0 solutions for three queens", () => {
    //When
    const result = solveNQueens(3);
    //Then
    expect(result).toHaveLength(0);
  });
  it("Should find 2 solutions for four queens", () => {
    //When
    const result2 = solveNQueens(4);
    //Then
    expect(result2).toHaveLength(2);
  });
  it("Should find 10  solutions for five queens", () => {
    //When
    const result2 = solveNQueens(5);
    //Then
    expect(result2).toHaveLength(10);
  });
  //it('should detect that two queens are on the same diagonal', () => {})
});

const solveNQueensOrigins = (nbQueens: Col): Array<PositionsForQueens> => {
  const result = generateRowOrigins(nbQueens);
  return result;
};

const solveNQueens = (nbQueens: Col): Array<PositionsForQueens> => {
  const result = generateRow2(nbQueens, nbQueens);
  return result;
};

const generateRow = (
  nbQueens: number,
  currentLine: number
): PositionsForQueens[] => {
  if (currentLine === 0) {
    return [[]];
  } else {
    return generateRow(nbQueens, currentLine - 1).flatMap((solution) =>
      NEA.range(0, nbQueens - 1)
        .filter((next) => isValidPosition(solution, next))
        .map((next) => solution.concat(next))
    );
  }
};

const generateRow2 = (
  nbQueens: number,
  currentLine: number
): PositionsForQueens[] => {
  return pipe(
    currentLine,
    O.fromPredicate(notZero),
    O.fold(
      () => [[]],
      (_currentLine) => {
        return generateRow2(nbQueens, currentLine - 1).flatMap((solution) =>
          NEA.range(0, nbQueens - 1)
            .filter((next) => isValidPosition(solution, next))
            .map((next) => solution.concat(next))
        );
      }
    )
  );
};

const notZero = (value: number) => value != 0;

const generateRowOrigins = (
  nbQueens: Col,
  previousSolutions: PositionsForQueens[] = [[]]
): PositionsForQueens[] => {
  const nextRowColumnns: PositionsForQueens[] =
    generateNextRowPositionsToTry(nbQueens);
  const validSolutionsForCurrentIteration = buildValidSolutions(
    previousSolutions,
    nextRowColumnns[0]
  );
  if (validSolutionsForCurrentIteration.length === 0) {
    return [[]].filter((solution) => solution.length === nbQueens);
  }
  if (
    validSolutionsForCurrentIteration.some(
      (solution) => solution.length === nbQueens
    )
  ) {
    return validSolutionsForCurrentIteration.filter(
      (solution) => solution.length === nbQueens
    );
  }
  return generateRowOrigins(nbQueens, validSolutionsForCurrentIteration);
};

const buildValidSolutions = (
  previousSolutions: PositionsForQueens[],
  nextRowColumnns: Col[]
) => {
  return previousSolutions.flatMap((solution) =>
    nextRowColumnns
      .filter((next) => isValidPosition(solution, next))
      .map((next) => solution.concat(next))
  );
};

const isValidPosition = (solution: PositionsForQueens, next: Col) =>
  !isIntersectingOtherQueensDiagonal(solution, next) &&
  !isOnSameColumnAsPreviousQueens(solution, next);

const isIntersectingOtherQueensDiagonal = (
  solution: PositionsForQueens,
  next: Col
) => {
  return solution.some((position, index) => {
    return Math.abs(next - position) === solution.length - index;
  });
};

const isOnSameColumnAsPreviousQueens = (
  solution: PositionsForQueens,
  next: Col
) => {
  return solution.indexOf(next) >= 0;
};

const generateNextRowPositionsToTry = (nbQueens: number) => {
  const range = NEA.range(0, nbQueens - 1).map((item) => [item]);
  return range;
};

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

describe("", () => {
  it("", () => {
    //given
    const start = 4;
    //when
    const result = factorialOpt(start);
    //then
    expect(result).toEqual(24);
  });
});

const factorial = (n) => {
  // Base case: if n is 0 or 1, return 1
  if (n === 0 || n === 1) {
    return 1;
  }
  // Recursive case: n! = n * (n-1)!
  else {
    return n * factorial(n - 1);
  }
};

const factorialOpt = (n, acc = 1) => {
  console.log("acc: ", acc);
  // Base case: if n is 0 or 1, return the accumulator
  if (n === 0 || n === 1) {
    return acc;
  }
  // Recursive case: n! = n * (n-1)!, pass the accumulator along
  else {
    return factorialOpt(n - 1, n * acc);
  }
};

const generateRow3 = (
  nbQueens: number,
  currentLine: number,
  acc: PositionsForQueens[] = [[]]
): PositionsForQueens[] => {
  if (currentLine === 0) {
    return acc;
  } else {
    const rangeOfNextSolution = NEA.range(0, nbQueens - 1); // 0..7
    return buildValidSolutions(
      generateRow3(nbQueens, currentLine - 1),
      rangeOfNextSolution
    );
  }
};
