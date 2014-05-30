var speech, wsr;

wsr = new webkitSpeechRecognition();

speech = {
  error: false,
  init: function() {
    wsr.continuous = true;
    wsr.maxAlternatives = 1;
    wsr.interimResults = false;
    wsr.lang = "English";
    wsr.onend = speech.reset;
    wsr.onresult = speech.listen;
    wsr.onerror = function(e) {
      return speech.error = true;
    };
    return speech.start();
  },
  start: function() {
    if (speech.working) {
      wsr.stop();
      return speech.reset();
    } else {
      wsr.start();
      speech.working = true;
      return speech.error = false;
    }
  },
  reset: function() {
    speech.working = false;
    if (!speech.error) {
      return speech.start();
    }
  },
  listen: function(e) {
    var best, bestLetter, bestNumber, letter, number, result;
    best = e.results[e.results.length - 1][0].transcript.toLowerCase().trim();
    if (best === 'move' && chess.selectedPiece) {
      speech.speak('Move ' + chess.selectedPiece + ' to?');
      return chess.selectMode = 'move';
    } else {
      letter = {
        b: ['bee', 'b', 'pet', 'be'],
        f: ['f', 'eff', 'ph'],
        c: ['c', 'see', 'sed', 'sea'],
        d: ['d', 'dee', 'day'],
        e: ['e', 'eye', '28', 't'],
        g: ['gee', 'g'],
        h: ['ache', 'h', 'ch'],
        a: ['aye', 'a', '8']
      };
      bestLetter = speech.sortBest(letter, best);
      number = {
        six: ['6', 'x'],
        five: ['5', 'ive'],
        seven: ['7', 'seven'],
        four: ['4', 'full', 'four', 'for', 'fault'],
        one: ['1', 'one', 'won', 'own', 'lon'],
        two: ['2', 'two', 'to', 'ter'],
        three: ['3', 'three', 'ee'],
        eight: ['8', 'eight', 'ate', ' it', 'a']
      };
      bestNumber = speech.sortBest(number, best);
      if (bestLetter && bestNumber) {
        result = bestLetter + speech.toNumber(bestNumber);
        if (chess.selectMode === 'select') {
          speech.speak(result);
          chess.select(result);
        }
        if (chess.selectMode === 'move') {
          speech.speak(chess.selectedPiece + ' at ' + chess.selected + ' moved to ' + result + '.');
          return chess.move(result);
        }
      } else {
        return speech.speak('Sorry, say that again?');
      }
    }
  },
  sortBest: function(catches, best) {
    var key, v, value, _i, _len;
    for (key in catches) {
      value = catches[key];
      for (_i = 0, _len = value.length; _i < _len; _i++) {
        v = value[_i];
        if (best.indexOf(v) > -1) {
          return key;
        }
      }
    }
    return false;
  },
  toNumber: function(word) {
    if (word) {
      switch (word.toLowerCase()) {
        case "one":
          return 1;
        case "two":
          return 2;
        case "three":
          return 3;
        case "four":
          return 4;
        case "five":
          return 5;
        case "six":
          return 6;
        case "seven":
          return 7;
        case "eight":
          return 8;
      }
    } else {
      return false;
    }
  },
  speak: function(text) {
    return speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  },
  working: false
};

speech.init();
