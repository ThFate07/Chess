import { Square, PieceSymbol, Color } from "chess.js";

export function reverseBoard(
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][]
) {
  // reverse the rows and the elements in row
  var reversedBoard = [...board].reverse();
  for (let i = 0; i < reversedBoard.length; i++) {
    reversedBoard[i] = [...reversedBoard[i].reverse()];
  }

  return reversedBoard;
}
