(function($){
  var autoConway = {

    spaces: [],
    prevGenLive: [],
    nextGenLive: [],
    gridCols: 25,
    gridRows: 44,
    loopCounter: 0,
    interval: '',

    init: function(){
      autoConway.setGrid();
    },

    setGrid: function() {
      autoConway.buildGrid();
      $('#grid-builder').remove();
    },

    buildGrid: function() {
      for(x = 0; x < (autoConway.gridCols * autoConway.gridRows); x++) {
        autoConway.spaces.push(x);
        $('#conway-grid').append('<div data-cell="' + x + '" data-col="' + x % autoConway.gridCols + '" data-row="' + Math.floor(x / autoConway.gridCols) + '" id="cell-' + x + '" class="conway-cell"></div>');
      }
      
      autoConway.setLiveCells();
    },

    setLiveCells: function() {
      $('.conway-cell').each(function() {
        if(Math.random() <= 0.25) {
          $(this).addClass('live-cell');
        }
      })

      setTimeout(function(){ autoConway.startGame(); }, 3000);
    },

    startGame: function() {
      this.nextGenLive = [];
      this.gridLoop();
    },

    gridLoop: function() {
      $('.conway-cell').each(function() {
        autoConway.checkNeighbors($(this));
      });

      this.interval = setInterval(function(){
        autoConway.nextGenLive = [];
        $('.conway-cell').each(function() {
          autoConway.checkNeighbors($(this));
        });
        autoConway.loopCounter += 1;

        if(autoConway.prevGenLive.join() == autoConway.nextGenLive.join() || autoConway.loopCounter == 300) {
          autoConway.resetGame();
        }

      }, 500);
    },

    checkNeighbors: function(current) {
      var grWd = autoConway.gridCols;
      var grHt = autoConway.gridRows;

      var curCell = current.data('cell');
      var curRow = current.data('row');

      var rows = [grWd * -1, 0, grWd];
      var cols = [-1, 0, 1];

      if(curRow == 0) { rows.shift(); } // top
      if(curRow == autoConway.grHt - 1) { rows.pop(); } // bottom
      if(curCell % grWd == 0) { cols.shift(); } // left
      if(curCell % grWd == grWd - 1) { cols.pop(); } // right

      liveNeighbors = [];
      rows.forEach(function(r) {
        cols.forEach(function(c) {
          if(($('#cell-' + autoConway.spaces[curCell + (r + c)]).hasClass('live-cell')) && ((curCell + r + c) != curCell)) {
            liveNeighbors.push(curCell + (r + c));
          }
        });
      });
      autoConway.buildNextGen(curCell, liveNeighbors);
    },

    buildNextGen: function(curCell, liveNeighbors) {
      if($('#cell-' + curCell).hasClass('live-cell')) {
        if(liveNeighbors.length == 2 || liveNeighbors.length == 3) { autoConway.nextGenLive.push(curCell); }
      } else {
        if(liveNeighbors.length == 3) { autoConway.nextGenLive.push(curCell); }
      }
      if(curCell == autoConway.spaces.length - 1) { autoConway.lastCellGenerationLoop(); }
    },

    lastCellGenerationLoop: function() {
      autoConway.prevGenLive = [];
      $('.prev-live-cell').each(function(){
        $(this).removeClass('prev-live-cell');
      });

      $('.live-cell').each(function(){
        autoConway.prevGenLive.push($(this).data('cell'));
        $(this).addClass('prev-live-cell');
        $(this).removeClass('live-cell');
      });
      autoConway.nextGenLive.forEach(function(curCell) {
        $('#cell-' + curCell).addClass('live-cell');
      });
    },

    resetGame: function() {
      clearInterval(autoConway.interval);
      autoConway.interval = '';
      autoConway.loopCounter = 0;
      autoConway.prevGenLive = [];
      autoConway.nextGenLive = [];
      $('.live-cell').removeClass('live-cell');
      $('.prev-live-cell').removeClass('prev-live-cell');

      autoConway.setLiveCells();
    }

  };

  window.autoConway = autoConway;

})(jQuery);

$(document).ready(autoConway.init);



