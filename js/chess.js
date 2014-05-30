var chess;

window.onload = function() {
  var container, even, evenRow, html, i, j, letters, piece, _i, _j;
  container = document.getElementById('container');
  html = "";
  letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  for (i = _i = 7; _i >= 0; i = --_i) {
    piece = '';
    evenRow = (i % 2 ? true : false);
    if (i === 1) {
      piece = 0;
    }
    if (i === 6) {
      piece = 6;
    }
    for (j = _j = 0; _j < 8; j = ++_j) {
      if (evenRow) {
        even = (j % 2 ? 'white' : 'black');
      } else {
        even = (j % 2 ? 'black' : 'white');
      }
      html += '<div class="tile ' + even + ' ' + letters[j] + (i + 1) + '">' + piece + '</div>';
    }
  }
  return container.innerHTML = html;
};

chess = {
  selected: false,
  selectedPiece: false,
  selectMode: 'select',
  select: function(what) {
    var piece, tile;
    chess.clearSelected();
    chess.selected = what;
    tile = $('.' + what);
    tile.addClass('selected');
    piece = speech.sortBest(chess.identifiers, tile.html());
    chess.selectedPiece = piece;
    return speech.speak(piece || 'empty');
  },
  move: function(to) {
    var newTile, tile;
    if (chess.selected !== to) {
      chess.clearSelected();
      tile = $('.' + chess.selected);
      newTile = $('.' + to);
      newTile.addClass('selected');
      newTile.html(tile.html());
      tile.html('');
      return chess.selectMode = 'select';
    }
  },
  clearSelected: function() {
    return $('.tile').removeClass('selected');
  },
  identifiers: {
    pawn: [6, 0],
    rook: [9, 3],
    knight: [7, 1],
    bishop: [8, 2],
    king: [':', 4],
    queen: [';', 5]
  }
};
