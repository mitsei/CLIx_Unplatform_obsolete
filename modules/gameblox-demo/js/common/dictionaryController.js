goog.provide('bd.dictionary.ctr');

bd.dictionary.ctr.wordList = {};

bd.dictionary.ctr.defaultDict = "intermediate_english";
bd.dictionary.ctr.currDict = bd.dictionary.ctr.defaultDict;
bd.dictionary.ctr.currDictByFirstLetter = bd.dictionary.ctr.currDict + "_by_first_letter.js";
bd.dictionary.ctr.currDictByLength = bd.dictionary.ctr.currDict + "_by_length.js";

bd.dictionary.ctr.numWords = {};
bd.dictionary.ctr.numWordsPerKey = {};

bd.dictionary.ctr.numDictsToLoad = 0;

bd.dictionary.ctr.dictBlocksNames = ['dictionary_is_word', 
                                     'dictionary_anagrams', 
                                     'dictionary_rand_word_with_length', 
                                     'dictionary_rand_word',
                                     'dictionary_words_in_string',
                                     'dictionary_words_using_letters_in_string',
                                     'dictionary_set_dictionary'];

bd.dictionary.ctr.setDictionary = function(dict) {
  bd.dictionary.ctr.currDict = dict;
  bd.dictionary.ctr.currDictByFirstLetter = dict + "_by_first_letter.js";
  bd.dictionary.ctr.currDictByLength = dict + "_by_length.js";
}

bd.dictionary.ctr.getPermutations = function(letters, word) {
  var word = word || '';
  if (letters.length == 1) {
  	return [word.concat(letters[0])];
  }
  var words = [];
  for (var l=0; l<letters.length; l++) {
    if (letters.slice(0,l).indexOf(letters[l]) == -1) {
  	  words = words.concat(bd.dictionary.ctr.getPermutations(letters.slice(0,l).concat(letters.slice(l+1)),
  	 					             word.concat(letters[l])));
    }
  }
  return words;
}

bd.dictionary.ctr.getCombinations = function(letters, word) {
  var word = word || '';
  if (letters.length == 1) {
    return [word.concat(letters[0])];
  }
  var words = [];
  for (var l=0; l<letters.length; l++) {
    if (letters.slice(0,l).indexOf(letters[l]) == -1) {
      words.push(word.concat(letters[l]));
      words = words.concat(bd.dictionary.ctr.getCombinations(letters.slice(l+1),
                         word.concat(letters[l])));
    }
  }
  return words;
}

bd.dictionary.ctr.isWord = function(word) {
  var word = word.toLowerCase();
  var letter = word.charAt(0);
  return (bd.dictionary.ctr.wordList[bd.dictionary.ctr.currDictByFirstLetter][letter].indexOf(word) > -1);
}

bd.dictionary.ctr.getRandWordGivenLength = function(len) {
  var wordList = bd.dictionary.ctr.wordList[bd.dictionary.ctr.currDictByLength];
  if (!(len.toString() in wordList)) {
    return bd.model.nullBlockString;
  }
  var lenList = wordList[len.toString()];
  var randWord = lenList[Math.floor(Math.random()*lenList.length)];
  return randWord;
}

bd.dictionary.ctr.getRandWord = function() {
  var currDict = bd.dictionary.ctr.currDictByFirstLetter;
  var wordList = bd.dictionary.ctr.wordList[currDict];
  if (!(currDict in bd.dictionary.ctr.numWords)) {
    bd.dictionary.ctr.numWords[currDict] = 0;
    bd.dictionary.ctr.numWordsPerKey[currDict] = {}
    for (var key in wordList) {
      bd.dictionary.ctr.numWordsPerKey[currDict][key] = wordList[key].length;
      bd.dictionary.ctr.numWords[currDict] += wordList[key].length;
    }
  }
  var numWords = bd.dictionary.ctr.numWords[currDict];
  var numWordsPerKey = bd.dictionary.ctr.numWordsPerKey[currDict];
  var randIndex = Math.floor(Math.random()*numWords);
  for (var key in numWordsPerKey) {
    if (randIndex < numWordsPerKey[key]) {
      return wordList[key][randIndex];
    }
    randIndex -= numWordsPerKey[key];
  }
}

bd.dictionary.ctr.getWordsInString = function(letters) {
  var words = [];
  for (var i = 0; i < letters.length; i++) {
    for (var j = i+1; j < letters.length+1; j++) {
      if (bd.dictionary.ctr.isWord(letters.substr(i,j)) && words.indexOf(letters.substr(i,j)) == -1) {
        words.push(letters.substr(i,j));
      };
    }
  }
  return words;
}

bd.dictionary.ctr.getWordsUsingLettersInString = function(letters) {
  var words = [];
  var combos = bd.dictionary.ctr.getCombinations(letters);
  for (var c = 0; c < combos.length; c++) {
    var perms = bd.dictionary.ctr.getPermutations(combos[c]);
    for (var p = 0; p < perms.length; p++) {
      if (bd.dictionary.ctr.isWord(perms[p]) && words.indexOf(perms[p]) == -1) {
        words.push(perms[p]);
      }
    }
  }
  return words;
}

bd.dictionary.ctr.getDictsForGame = function(letters) {
  var dicts = [];
  var blocks = bd.script.ctr.getAllBlocks();
  for (var i = 0; i < blocks.length; i++) {
    var isFloating = !(blocks[i].getRootBlock().isEvent || 
                       blocks[i].getRootBlock().isProcedure || 
                       blocks[i].getRootBlock().isGlobalVariableDefintion);
    if (blocks[i].isDictionaryBlock && !isFloating) {
      var defaultDict = bd.dictionary.ctr.defaultDict;
      if (dicts.indexOf(defaultDict) == -1) {
        dicts.push(defaultDict);
      }
      if (blocks[i].type == 'dictionary_set_dictionary') {
        var selectedDict = blocks[i].getFieldValue('DICT').toLowerCase(); 
        if (dicts.indexOf(selectedDict) == -1) {
          dicts.push(selectedDict);
        }
      }
    }
  }
  return dicts;
}

bd.dictionary.ctr.loadDictionaries = function(callback) {
  var dicts = bd.model.getGameInfo().dictionaries;

  if (dicts.length == 0) {
    callback.call();
  }

  bd.dictionary.ctr.numDictsToLoad = 2 * dicts.length;
  for (var i = 0; i < dicts.length; i++) {
    bd.util.ajaxGet('/static/scripts/libraries/dictionaries/'+dicts[i]+'_by_first_letter.js',
                    bd.dictionary.ctr.loadDictionariesCallback(callback, dicts[i]+'_by_first_letter.js'));
    bd.util.ajaxGet('/static/scripts/libraries/dictionaries/'+dicts[i]+'_by_length.js',
                    bd.dictionary.ctr.loadDictionariesCallback(callback, dicts[i]+'_by_length.js'));
  }
}

bd.dictionary.ctr.loadDictionariesCallback = function(callback, name) {
  return function (dictStr, dictName, cb) {
    dictName = dictName || name; 
    cb = cb || callback;
    var dictObj = JSON.parse(dictStr);
    bd.dictionary.ctr.wordList[dictName] = dictObj;
    if (bd.dictionary.ctr.numDictsToLoad == 1) {
      callback.call();
    } else {
      bd.dictionary.ctr.numDictsToLoad--;
    }
  }
}