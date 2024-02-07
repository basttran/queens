import { describe, expect, it } from "vitest";
import * as NEA from "fp-ts/NonEmptyArray";
import * as O from "fp-ts/Option";
import { pipe } from "fp-ts/lib/function";

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
});

const solveNQueens = (nbQueens: Col): Array<PositionsForQueens> => {
  const result = generateRow2(nbQueens, nbQueens);
  return result;
};

const generateRow2 = (
  nbQueens: number,
  currentLine: number
): PositionsForQueens[] => {
  return pipe(
    currentLine,
    O.fromPredicate(notZero),
    O.map((step) => generateRow2(nbQueens, step - 1).flatMap(doPlop(nbQueens))),
    O.fold(
      () => [[]],
      (value) => value
    )
  );
};

const notZero = (value: number) => value != 0;

const doPlop =
  (nbQueens: number) =>
  (solution: PositionsForQueens): Col[] | readonly Col[][] => {
    return NEA.range(0, nbQueens - 1)
      .filter((next) => isValidPosition(solution, next))
      .map((next) => solution.concat(next));
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

type Col = number;
type PositionsForQueens = Array<Col>;
