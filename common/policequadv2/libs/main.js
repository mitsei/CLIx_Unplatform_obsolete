var PoliceQuad = {
    noOfChapters: 3,
    noOfLevels: 3,
    noOfStages: 3,
    score: 0,
    currentStage: 0,
    currentLevel:1,
    innocentsArr: [],
    clues: [],
    mainCulprit: false,
    stage1scores: [0],
    stars: 0,
    gamePoints: 0,
    totalTreats: 4,
    totalTreatsLeft: 4,
    bonusPoints: 0,
    multiplier: 10,
    perfectPoints: 0,
    db: '',
    nextCaseAvailable: false,
    screenActive: true,
    eventsAttached: false,
    currentClue: '',
    culprit: '',
    innocentsInLineup: [],
    lineup: new Array(),
    clueList: new Array(),
    clueCopy:[],
    selection: [],
    noOfSuspects: 0,
    releasedArr: [],
    language:'',
    indexedDBOk: function () {
        return "indexedDB" in window;
    },
    start: function () {
//        var transaction = db.transaction(["shapes"], "readwrite");
//        var store = transaction.objectStore("shapes");
//        switch (this.currentStage) {
//            case 0:
//                var shapes = JSON.parse(shapes0)
//                var clues = JSON.parse(clues0)
//                break;
//            case 2:
//                var shapes = JSON.parse(shapes1)
//                var clues = JSON.parse(clues1)
//                break;
//            case 3:
//                var shapes = JSON.parse(shapes2)
//                var clues = JSON.parse(clues2)
//                break;
//        }

        // for(var i=0;i<shapes.length;i++){
        //     var request = store.add(shapes[i],(i+1));

        //     request.onerror = function(e) {
        //         console.log("Error",e.target.error.name);
        //         //some type of error handler
        //     }

        //     request.onsuccess = function(e) {
        //     }
        // }
        /* var transaction = db.transaction(["clues"],"readwrite");
         var store = transaction.objectStore("clues");
         for(var i=0;i<clues.length;i++){
         var request = store.add(clues[i],(i+1));
         
         request.onerror = function(e) {
         console.log("Error",e.target.error.name);
         //some type of error handler
         }
         
         request.onsuccess = function(e) {
         }
         }*/
         this.language=this.getParameterByName('language');
        $('#highScore').text(Math.max.apply(Math, this.stage1scores))
        $('#level').text(this.currentLevel);
       while (true) {
	        // culprits
	        stage = this.currentStage;
	        var thisStage = stage;
	        if (stage >= 5 && stage <= 8) {
	            thisStage = 4;
	        } else if (stage == 9) {
	            stage = 8;
	        }
	        var cList = JSON.parse(eval("shapes" + thisStage));
	        thisStage = stage;
	        lineup = [];
	        this.clueList = [];
	        this.clues = JSON.parse(eval("clues" + stage));
	        for (thisStage = 1; thisStage < stage; thisStage++) {
	            this.clues = this.clues.concat(JSON.parse(eval("clues" + thisStage)));
	        }
	        if (this.clues.length == 1)
	            $('.nextClue').css('opacity', 0.5)
	        else
	            $('.nextClue').css('opacity', 1)
	        $('.cluesList, #summaryClues').html('');

	        while (this.clues.length > 0) {
	            var j = Math.floor(Math.random() * this.clues.length);
	            var thisClue = this.clues[j]["property"];
	            var newCList = [];
	            var dList = [];
	            for (var i = 0; i < cList.length; i++) {
	                var shape = cList[i];
	                var hp = this.hasProperty(shape, thisClue);
	                if (hp == true) {
	                    newCList.push(shape);
	                } else if (hp == false) {
	                    dList.push(shape);
	                }
	            }
	            if (newCList.length > 0) {
	                for (var i = 0; i < lineup.length; i++) {
	                    if (this.hasProperty(lineup[i], thisClue) != null) {
	                        dList.push(lineup[i]);
	                    }
	                }
	                if (dList.length > 1) {
	                    this.clueList.push(this.clues[j]);
	                    this.clueCopy.push(this.clues[j]);
	                    cList = newCList;
	                    lineup = dList;
	                }
	            }
	            this.clues.splice(j, 1);
	        }

	        if (cList.length > 0 && lineup.length > 1
	                && this.clueList.length > 0) {
	            culprit = cList[Math.floor(Math.random() * cList.length)];
	            break;
	        }
       }

        this.noOfSuspects = 4;
        if (this.currentStage > 2 && this.currentStage < 6)
            this.noOfSuspects = 6;
        if (this.currentStage > 5 && this.currentStage < 9)
            this.noOfSuspects = 8;
        if (lineup.length + 1 < this.noOfSuspects) {
            this.noOfSuspects = lineup.length + 1;
        }
        
        for (var i = 0; i < this.noOfSuspects - 1; i++) {
            var j = Math.floor(Math.random() * lineup.length);
            this.selection.push(lineup[j]);
            lineup.splice(j, 1);
        }

        // selection.splice(Math.floor(Math.random()*(numSuspects-1)),0, culprit);

        //this.generateShapes()
        this.renderShapes(new Array(culprit), this.selection, this.noOfSuspects)
        this.attachEvents();
        this.displayClues(this.clues[0]);
        var wid=parseFloat(100/this.noOfSuspects)
        $('.shapeFig').css({
        	'width':wid+'%'
        })
    },
    hasProperty: function (shape, clue) {
        var propEqn = clue.split(" ");
        if (!shape.hasOwnProperty(propEqn[0])) {
            return null;  // unusable
        }

        if (propEqn[2] == "allSides") {
            propEqn[2] = shape["straightSides"];
        }

        if (propEqn[1] == "=") {
            return (shape[propEqn[0]] == propEqn[2]);
        } else if (propEqn[1] == "!=") {
            return (shape[propEqn[0]] != propEqn[2]);
        } else if (propEqn[1] == "<=") {
            return (shape[propEqn[0]] <= propEqn[2]);
        } else if (propEqn[1] == ">=") {
            return (shape[propEqn[0]] >= propEqn[2]);
        } else if (propEqn[1] == "<") {
            return (shape[propEqn[0]] < propEqn[2]);
        } else if (propEqn[1] == ">") {
            return (shape[propEqn[0]] > propEqn[2]);
        }
        return null;
    },
    showGameIntro: function () {
        var _this = this;
        $('#introDiv').html('');
        window.setTimeout(function () {
            $('#introDiv').html('<p>'+replaceDynamicText(instArr['i101'], numberLanguage, "")+'</p>');
        }, 1000);
        window.setTimeout(function () {
            $('#introDiv').css('background-image', 'url("../assets/story02.png")');
            $('#introDiv').html('<p class="line1">'+replaceDynamicText(instArr['i102'], numberLanguage, "")+'</p>')
            $('#introDiv p.line1').css({
                'font-size': '16px',
                'position': 'absolute',
                'right': '5px',
                'top': '5px',
                'width': '70%'
            });
            window.setTimeout(function () {
                $('#introDiv').append('<p class="line2">'+replaceDynamicText(instArr['i103'], numberLanguage, "")+'</p>')
                $('#introDiv p.line2').css({
                    'font-size': '16px',
                    'position': 'absolute',
                    'left': '5px',
                    'bottom': '5px',
                    'width': '70%'
                })
            }, 3000)
        }, 3000);
        window.setTimeout(function () {
            $('#introDiv').css('background', 'black');
            $('#introDiv').html('<div class="leftStory"><p>'+replaceDynamicText(instArr['i104'], numberLanguage, "")+'<br><br></p></div>')
            $('#introDiv').append('<div class="rightStory"></div>');
            $('#introDiv p').css({
                'font-size': '16px',
                'padding': '50px',
                'text-align': 'center'
            })
        }, 15000);
        window.setTimeout(function () {
            var butt = document.createElement('div');
            butt.id = 'play2';
            butt.className = 'button';
            butt.innerHTML = 'REPORT FOR DUTY';
            butt.onclick = _this.showChapterIntro;
            $('#introDiv').html(butt);
            $('#play2').css({
                'margin': '0 auto',
                'width': '200px',
                'text-align': 'center',
                'position': 'absolute',
                'top': '50%',
                'left': '50%',
                'margin-left': '-150px',
                'margin-top': '-25px'
            })
        }, 25000)
    },
    showChapterIntro: function () {
        var _this = this;
        $('#introDiv').html('<div id="gameTitle"><h1 class="blue">CHAPTER 1</h1></div>');
        $('#introDiv,#gameTitle').css('background', 'black');
        window.setTimeout(function () {
            $('#introDiv').css('background', 'url("../assets/story04.png") 0% 0% / contain');
            $('#introDiv').html('<p class="line1">'+replaceDynamicText(instArr['i105'], numberLanguage, "")+'</p>')
            $('#introDiv p.line1').css({
                'font-size': '18px',
                'position': 'absolute',
                'right': '5px',
                'top': '5px',
                'width': '90%'
            });
            window.setTimeout(function () {
                $('#introDiv').append('<p class="line2">'+replaceDynamicText(instArr['i106'], numberLanguage, "")+'</p>')
                $('#introDiv p.line2').css({
                    'font-size': '18px',
                    'position': 'absolute',
                    'left': '5px',
                    'bottom': '5px',
                    'width': '90%'
                })
            }, 3000)
        }, 1000)
        window.setTimeout(function () {
            $('#introDiv').css('background', 'black');
            $('#introDiv').html('<div class="story-image"><img src="../assets/story05.png" /></div>')
            $('#introDiv').append('<div class="bottom-story"><p>T'+replaceDynamicText(instArr['i107'], numberLanguage, "")+'</p></div>');
            $('#introDiv p').css({
                'font-size': '16px',
                'padding': '50px',
                'text-align': 'center'
            })
        }, 8000);

        window.setTimeout(function () {
            $('#introDiv').hide();
            $('#screenDiv1').show();
        }, 12000)

    },
    generateShapes: function () {
        var noOfSuspects = 4;
        if (this.currentStage > 3 && this.currentStage < 7)
            noOfSuspects = 6;
        if (this.currentStage > 6 && this.currentStage < 10)
            noOfSuspects = 8;
        var transaction = db.transaction(["clues"], "readonly");
        var store = transaction.objectStore("clues");
        var index = store.index("property");
        var correctFigures = new Array();
        var wrongFigures = new Array();
        // var range = IDBKeyRange.getAll();
        var s = "";
        var _this = this;
        index.getAll().onsuccess = function (e) {
            var cursor = e.target.result;
            for (var i = 0; i < cursor.length; i++) {
                _this.clues[i] = cursor[i]
            }
            if (_this.clues.length == 1)
                $('.nextClue').css('opacity', 0.5)
            else
                $('.nextClue').css('opacity', 1)
            $('.cluesList, #summaryClues').html('');
            _this.displayClues(_this.clues[0]);
            for (var i = 0; i < _this.clues.length; i++) {
                var clueVal = _this.clues[i].property.split(' = ')
                var stransaction = db.transaction(["shapes"], "readonly");
                var shapeId = stransaction.objectStore('shapes').index(clueVal[0]);
                // var range = IDBKeyRange.getAll();
                shapeId.getAll().onsuccess = function (e) {
                    var cursor = e.target.result;
                    for (var i = 0; i < cursor.length; i++) {
                        if (cursor[i][clueVal[0]] == clueVal[1])
                            correctFigures.push(cursor[i])
                        else
                            wrongFigures.push(cursor[i])
                    }
                    _this.renderShapes(correctFigures, wrongFigures, noOfSuspects)
                    _this.attachEvents();
                }
            }
        }
    },
    renderShapes: function (culprit, suspects, noOfSuspects) {
        $('#shapes').html('');
        mainCulprit = culprit[0].id;
        var newArr = new Array();
        this.innocentsInLineup=[];
        this.lineup = {};
        newArr[0] = culprit[0];
        this.lineup[culprit[0].id] = culprit[0];
        for (var i = 0; i < (noOfSuspects - 1); i++) {
            newArr[i + 1] = suspects[i]
            this.innocentsInLineup.push(suspects[i]);
            this.lineup[suspects[i].id] = suspects[i];
        }
        newArr = arrayShuffle(newArr);
        console.log(newArr,culprit)
        // $('#shapes').append('<div id="'+culprit[0].id+'" class="shapeFig"><img src="../assets/'+culprit[0].id+'" /><div class="cross"><i class="fa fa-times" aria-hidden="true"></i></div><div class="undo"><i class="fa fa-undo" aria-hidden="true"></i></div></div>')
        for (var i = 0; i < newArr.length; i++) {
            $('#shapes').append('<div id="' + newArr[i].id + '" class="shapeFig"><img src="../assets/' + newArr[i].id + '" /><div class="cross"><i class="fa fa-times" aria-hidden="true"></i></div><div class="undo"><i class="fa fa-undo" aria-hidden="true"></i></div></div>')
        }
        this.renderMangoes(this.totalTreats, this.totalTreatsLeft)
    },
    renderMangoes: function (totalMangoes, filledMangoes) {

        $('#mangoTreats').html('')
        for (var i = 0; i < (totalMangoes - filledMangoes); i++) {
            $('#mangoTreats').append('<i class="fa fa-star-o" aria-hidden="true"></i>')
        }
        for (var i = 0; i < filledMangoes; i++) {
            $('#mangoTreats').append('<i class="fa fa-star" aria-hidden="true"></i>')
        }
        if (filledMangoes == 0) {
        	this.gamePoints = 10;
            this.bonusPoints = 0;
            this.score = this.bonusPoints + this.gamePoints + this.perfectPoints;
			this.stage1scores.push(this.score)
          	$("#endStatus").html('Oops! You ran out of chances, Better luck next time!');
            this.showSummary();
        }
    },
    getInnocent: function () {
        if (this.currentClue == "") {
            return null;  // unusable
        }

        var innocent = [];
        for(var id in this.lineup) {
        	if( this.releasedArr.indexOf(id) == -1){
	            if(!this.hasProperty(this.lineup[id], this.currentClue)) {
	              innocent.push(id);
	            }
        	}
        }
        return innocent;
    },
    getBestClue: function () {
        var bestClueIndex = -1;
        var bestClueValue = this.noOfSuspects;
        for (var i = 0; i < this.clueList.length; i++) {
            this.currentClue = this.clueList[i]["property"];
            var len = this.getInnocent().length;
            if (len > 0 && len < bestClueValue) {
                bestClueIndex = i;
                bestClueValue = len;
            }
        }
        return bestClueIndex;
    },
    innocentOK: function (innocent) {
        var j = 0;
        for (var id in this.lineup) {
            if (this.releasedArr.indexOf(id) == -1) {
                if (this.innocentsArr.indexOf(id) == -1 && j < innocent.length
                        && id == innocent[j]) {
                    toastr.info("Oops... someone else is innocent! Try again.");
                    return false;
                } else if (this.innocentsArr.indexOf(id) != -1) {
                    if (j < innocent.length && id == innocent[j]) {
                        j++;
                    } else {
                        toastr.info("Oops... who else can be the culprit? Try again.");
                        return false;
                    }
                }
            }
        }
        for (var i in innocent) {
            this.releasedArr.push(innocent[i])
            this.innocentsArr.splice(this.innocentsArr.indexOf(innocent[i]), 1)
            var img = document.getElementById(innocent[i]);
            img.style.opacity = "0.2";
            img.style.filter = "alpha(opacity=20)";
            img.className += ' released';
        }
        return true;
    },
    displayClues: function (clue) {
        var innocent = this.getInnocent();
        if (innocent != null) {
            if (!this.innocentOK(innocent)) {
                this.totalTreatsLeft--;
                this.renderMangoes(this.totalTreats, this.totalTreatsLeft)
                return;
            }
            this.noOfSuspects = this.noOfSuspects - innocent.length;
        }
        if (this.noOfSuspects <= 1) {
            toastr.info("You have sufficient clues to make an arrest!");
            return;
        }
        //Append the next clue to the HTML page
        var clueObject = this.clueList.splice(this.getBestClue(), 1)[0];
        this.currentClue = clueObject["property"];
        // clueBox.innerHTML += "<br>"
        //               + clueObject[this.language] + " ("
        //               + clueObject[clueLanguage] + ")";
        $('.cluesList, #summaryClues').append('<li>' + clueObject[this.language] + '</li>')
    },
    getParameterByName:function(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" :
               decodeURIComponent(results[1].replace(/\+/g, " "));
      },
    attachEvents: function () {
        var _this = this;

        $('#shapes .shapeFig').hover(function () {
            if (_this.screenActive && (_this.releasedArr.indexOf(this.id) == -1)) {
                if (_this.innocentsArr.indexOf(this.id) == -1)
                    $(this).children('.cross').show()
                else
                    $(this).children('.undo').show()
            }
        }, function () {
            $(this).children('.cross').hide()
            $(this).children('.undo').hide()
        });
        $('#shapes .shapeFig div.cross').on('click', function () {
            if (_this.screenActive && (_this.releasedArr.indexOf($($(this).parent()).attr('id')) == -1)) {
                _this.innocentsArr.push($($(this).parent()).attr('id'))
                $($(this).parent()).addClass('innocent')
                $(this).hide()
            }
        })
        $('#shapes .shapeFig div.undo').on('click', function () {
            if (_this.screenActive && (_this.releasedArr.indexOf($($(this).parent()).attr('id')) == -1)) {
                _this.innocentsArr.splice(_this.innocentsArr.indexOf($($(this).parent()).attr('id')), 1)
                $($(this).parent()).removeClass('innocent')
                $(this).hide();
                $(this).parent().children('.cross').show()
            }
        });
        if (!this.eventsAttached) {
            $('.nextClue').on('click', function () {
                if (_this.screenActive) {
                    var visibleClues = $('.cluesList li').length;
                    // if (_this.clues[visibleClues] != undefined) {
                    //     _this.displayClues()
                    // }
                    // else {
                    //     alert('No more Clues Available')
                    // }
                     _this.displayClues()
                }
            })

            $('#nextCase').on('click', function () {
                if (_this.nextCaseAvailable) {
                    _this.startNewStage();
                }
                else {
                    toastr.info('Finish this case to move to next case.');
                }

            })
             $('#nextLevel').on('click', function () {
             	 $('.overlay').hide();
		        $('.cluesList,#summaryClues').html('');
		        $('.shapeFig').removeClass('innocent')
		        $('.shapeFig').css('opacity','1');
               _this.startNewStage();

            })
            toastr.options.closeDuration = 3000;
            $('.finishGame').on('click', function () {
                if (_this.screenActive) {
                    _this.nextCaseAvailable = true;
                    _this.screenActive = false;
                    $('#nextCase').css({
                        'opacity': '1',
                        'cursor': 'pointer'
                    });
                    var innocent = _this.getInnocent();
			        var numUnmarked = 0;
			        for(var id in _this.lineup) {
			          if(_this.innocentsArr.indexOf(id) == -1 && _this.releasedArr.indexOf(id) == -1) {
			            numUnmarked++;
			          }
			        }
			        if(numUnmarked != 1 || innocent == null) {
			        	_this.gamePoints = 10;
                        _this.totalTreatsLeft=0;
                         // _this.renderMangoes(_this.totalTreats, _this.totalTreatsLeft)
                        _this.bonusPoints = 0;
                        _this.score = _this.bonusPoints + _this.gamePoints + _this.perfectPoints;
        				_this.stage1scores.push(_this.score)
			          if(numUnmarked == 0) {
			          	$("#endStatus").html('Oops! The culprit was released too – better luck with the next case!');
			            toastr.error('Oops! The culprit was released too – better luck with the next case!');
			          } else {
			          	$("#endStatus").html('Oops! Some innocents were not released – better luck with the next case!');
			              toastr.error('Oops! Some innocents were not released – better luck with the next case!');
			          }
			         _this.showSummary();
			          return;
			        }
			        if(!_this.innocentOK(innocent)) {
			        	_this.gamePoints = 10;
                        _this.totalTreatsLeft=0;
                      _this.bonusPoints = 0;
			          // _this.totalTreatsLeft--;
             //    	  _this.renderMangoes(_this.totalTreats, _this.totalTreatsLeft)
                	  _this.score = _this.bonusPoints + _this.gamePoints + _this.perfectPoints;
    				  _this.stage1scores.push(_this.score)
    				  _this.showSummary();
			          return;
			        }
			        toastr.success('Great job! You solved it!');
			        _this.noOfSuspects = 0;
			         $("#endStatus").html('Great job! You solved it!');
                        _this.bonusPoints = _this.totalTreatsLeft * _this.multiplier;
                        _this.gamePoints = 10;
                        _this.perfectPoints = 100;
                        _this.currentStage++;
                         _this.score = _this.bonusPoints + _this.gamePoints + _this.perfectPoints;
    				  _this.stage1scores.push(_this.score)
    				  if(_this.currentStage==3){
    				  	_this.showSummary(true);
    				  	_this.currentLevel = 2;
    				  }
    				   if(_this.currentStage==6){
    				  	_this.showSummary(true);
    				  	_this.currentLevel = 3;
    				  }
    				   if(_this.currentStage==9){
    				  	_this.showSummary(true);
    				  	$("#endStatus").html('Great job! You solved it all!');
    				  	$('#nextLevel').hide();
    				  	_this.currentLevel = 3;
    				  }
                    // if (_this.innocentsArr.indexOf(mainCulprit) == -1 && _this.innocentsArr.length == (_this.noOfSuspects - 1)) {
                    //     toastr.success('Great job! You solved it!');
                    //     $("#endStatus").html('Great job! You solved it!');
                    //     _this.bonusPoints = _this.totalTreatsLeft * _this.multiplier;
                    //     _this.gamePoints = 10;
                    //     _this.perfectPoints = 100;
                    //     _this.currentStage++;
                    // }
                    // else {
                    //     _this.gamePoints = 10;
                    //     // totalTreatsLeft=0;
                    //     _this.bonusPoints = _this.totalTreatsLeft * _this.multiplier;
                    //     _this.renderMangoes(_this.totalTreats, _this.totalTreatsLeft);

                    //     var visibleClues = $('.cluesList li').length;
                    //     if (clues[visibleClues] == undefined && _this.innocentsArr.length == 3) {
                    //         toastr.error('Oops! That is not the culprit -better luck with the next case!');
                    //         $("#endStatus").html('Oops! That is not the culprit -better luck with the next case!');
                    //     }
                    //     else if (clues[visibleClues] == undefined && _this.innocentsArr.length < 3) {
                    //         toastr.error('Oops! Some innocents were not released – better luck with the next case!');
                    //         $("#endStatus").html('Oops! Some innocents were not released – better luck with the next case!');
                    //     }
                    //     else if (clues[visibleClues] == undefined && _this.innocentsArr.length == 4) {
                    //         toastr.error('Oops! The culprit was released too – better luck with the next case!');
                    //         $("#endStatus").html('Oops! The culprit was released too – better luck with the next case!');
                    //     }
                    //     else if (clues[visibleClues] != undefined) {
                    //         toastr.error('Don’t be in a hurry – next time, check all the clues!');
                    //         $("#endStatus").html('Don’t be in a hurry – next time, check all the clues!');
                    //     }

                    // }

                    // _this.showSummary()
                    // toastr.error('No cookie for you :(')
                }
            });
            $('.replayGame, #replay').on('click', function () {
                if (true) {
                	 $('.overlay').hide();
			        $('.cluesList,#summaryClues').html('');
			        $('.shapeFig').removeClass('innocent')
			        $('.shapeFig').css('opacity','1');
                    _this.startNewStage();
                    // _this.restartGame()
                }
            });
            $('#play').on('click', function () {
                 _this.showGameIntro();
                // $('#introDiv').hide();
                // $('#screenDiv1').show();
            });
        }
        this.eventsAttached = true;
    },
    startNewStage: function () {
    	toastr.remove()
        var _this = this;
        this.screenActive = true;
        this.nextCaseAvailable = false;
        this.currentClue = '';
        this.releasedArr=[];
        this.innocentsArr=[];
        this.totalTreatsLeft=4;
        this.renderMangoes(this.totalTreats, this.totalTreatsLeft)
        $('#nextCase').css({
            'opacity': '0.5',
            'cursor': 'normal'
        });
        $('#highScore').text(Math.max.apply(Math, this.stage1scores))
        // var openRequest = indexedDB.open("idarticle_people", 1);

        // openRequest.onupgradeneeded = function (e) {
        //     var thisDB = e.target.result;

        //     if (!thisDB.objectStoreNames.contains("shapes")) {
        //         objectStore = thisDB.createObjectStore("shapes");
        //         objectStore2 = thisDB.createObjectStore("clues");
        //         objectStore.createIndex("id", "id", {unique: false});
        //         objectStore.createIndex("acuteAngles", "acuteAngles", {unique: false});
        //         objectStore.createIndex("curvedSides", "curvedSides", {unique: false});
        //         objectStore.createIndex("obtuseAngles", "obtuseAngles", {unique: false});
        //         objectStore.createIndex("reflexAngles", "reflexAngles", {unique: false});
        //         objectStore.createIndex("rightAngles", "rightAngles", {unique: false});
        //         objectStore.createIndex("sidesEqual", "sidesEqual", {unique: false});
        //         objectStore.createIndex("straightSides", "straightSides", {unique: false});
        //         objectStore.createIndex("pairsOfSidesEqual", "pairsOfSidesEqual", {unique: false});
        //         objectStore2.createIndex("property", "property", {unique: false});
        //     }
        // }

        // openRequest.onsuccess = function (e) {
        //     thisDB = e.target.result;
        //     var stransaction = thisDB.transaction(["shapes"], "readwrite");
        //     var transaction = thisDB.transaction(["clues"], "readwrite");
        //     transaction.objectStore('clues').clear();
        //     stransaction.objectStore('shapes').clear();
        //     _this.start();
        // }
         _this.start();

    },
    showSummary: function (level=false) {
    	toastr.remove()
        $('.overlay').show();
        window.setTimeout(function () {
            $("#gameStats").fadeIn(200);
        }, 3000);
        $('#gamePoints').text(this.gamePoints);
        for (var i = 0; i < this.totalTreatsLeft; i++) {
            $('#treatsEarned').append('<i class="fa fa-star-o" aria-hidden="true"></i>');
        }
        $('#bonusPoints').text(this.bonusPoints);
        
        $('#totalScore').text(this.score)
        if(level){
        	$('#replay').hide();
        	$('#nextLevel').show();
        }
        else{
        	$('#replay').show();
        	$('#nextLevel').hide();
        }

    },
    restartGame: function () {
    	toastr.remove()
        $('.overlay').hide();
        $('.cluesList,#summaryClues').html('');
        $('.shapeFig').removeClass('innocent')
        $('.shapeFig').css('opacity','1');
         this.screenActive = true;
        this.nextCaseAvailable = false;
        this.currentClue = '';
        this.releasedArr=[];
        this.innocentsArr=[];
         this.totalTreatsLeft=4;
         this.renderMangoes(this.totalTreats, this.totalTreatsLeft)
         this.clueList=[];
         for(var i=0;i<this.clueCopy.length;i++){
         	this.clueList.push(this.clueCopy[i])
         }
         this.displayClues();
        $('#highScore').text(Math.max.apply(Math, this.stage1scores))
    },
    initialize: function () {
        var _this = this;
        var imageArray = new Array('alien1.png');
        var loader = new PxLoader();
        $.each(imageArray, function (key, value)
        {
            var pxImage = new PxLoaderImage('../assets/' + value);
            loader.add(pxImage);
        });

        loader.addCompletionListener(function ()
        {
            var gameXMLFile = "XML.xml";
            //Loading XML file for data..
            loadXML(gameXMLFile, function ()
            {
                //No support? Go in the corner and pout.
                // if (!_this.indexedDBOk)
                //     return;
                // indexedDB.deleteDatabase("idarticle_people");
                // var openRequest = indexedDB.open("idarticle_people", 1);

                // openRequest.onupgradeneeded = function (e) {
                //     var thisDB = e.target.result;

                //     if (!thisDB.objectStoreNames.contains("shapes")) {
                //         objectStore = thisDB.createObjectStore("shapes");
                //         objectStore2 = thisDB.createObjectStore("clues");
                //         objectStore.createIndex("id", "id", {unique: false});
                //         objectStore.createIndex("acuteAngles", "acuteAngles", {unique: false});
                //         objectStore.createIndex("curvedSides", "curvedSides", {unique: false});
                //         objectStore.createIndex("obtuseAngles", "obtuseAngles", {unique: false});
                //         objectStore.createIndex("reflexAngles", "reflexAngles", {unique: false});
                //         objectStore.createIndex("rightAngles", "rightAngles", {unique: false});
                //         objectStore.createIndex("sidesEqual", "sidesEqual", {unique: false});
                //         objectStore.createIndex("straightSides", "straightSides", {unique: false});
                //         objectStore.createIndex("pairsOfSidesEqual", "pairsOfSidesEqual", {unique: false});
                //         objectStore2.createIndex("property", "property", {unique: false});
                //     }
                // }

                // openRequest.onsuccess = function (e) {
                //     console.log("running onsuccess");

                //     db = e.target.result;
                //     _this.start();
                // }

                // openRequest.onerror = function (e) {
                //     //Do something for the error
                // }
                _this.start();

                $('#PreLoader').css({'display': 'none'});
                $('#mainDiv').fadeIn(200);
                // showLeval(3);
                // startGameTimer();
            });
        });

        loader.start();
    }
};

$(document).ready(function () {
    PoliceQuad.initialize()
})

function resize()
{

    var scaleFactor = 1;
    if (window.innerHeight < 600)
    {
        scaleFactor = parseFloat(window.innerHeight / 600); //console.log("height "+window.innerWidth+'-'+window.innerHeight+"-"+scaleFactor);
    } else if (window.innerWidth < 800)
    {
        scaleFactor = parseFloat(window.innerWidth / 800); //console.log("width "+window.innerWidth+'-'+window.innerHeight+"-"+scaleFactor);
    } else
    {
        scaleFactor = 1;
    }

    $("#mainDiv").css({"-webkit-transform": "scale(" + scaleFactor + ")"});
    $("#mainDiv").css({"-moz-transform": "scale(" + scaleFactor + ")"});
    $("#mainDiv").css({"-o-transform": "scale(" + scaleFactor + ")"});
    $("#mainDiv").css({"-ms-transform": "scale(" + scaleFactor + ")"});
    $("#mainDiv").css({"transform": "scale(" + scaleFactor + ")"});

}