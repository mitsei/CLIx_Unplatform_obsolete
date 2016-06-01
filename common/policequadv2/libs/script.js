var totalTimeTaken = 0;
var completed = 0;
var score = 0;
var extraParameters = "";
var currentScreen = 0;
var numberLanguage;
var canvas, ctx, ctx2, canvas2, canvas3, ctx3, canvas4, ctx4;
var timeObj;
var valueEntered;
var fakePrompt = 0;
var subScreenNo = 1;
var row = 1;
var counter = 1, counter2 = 1, counter3 = 1, counter4 = 1;
var currScreen;
var innocentsArr= new Array();
var clues = new Array();
var mainCulprit;
var stage1scores = [0];
var stars=0;
var gamePoints=0;
var totalTreats=4;
var totalTreatsLeft=4;
var bonusPoints=0;
var multiplier=10;
var perfectPoints=0;
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

    $("#mainDiv").css({ "-webkit-transform": "scale(" + scaleFactor + ")" });
    $("#mainDiv").css({ "-moz-transform": "scale(" + scaleFactor + ")" });
    $("#mainDiv").css({ "-o-transform": "scale(" + scaleFactor + ")" });
    $("#mainDiv").css({ "-ms-transform": "scale(" + scaleFactor + ")" });
    $("#mainDiv").css({ "transform": "scale(" + scaleFactor + ")" });

}
var db;
 
function indexedDBOk() {
    return "indexedDB" in window;
}
 

$(document).ready(function (e)
{
    // Create the loader and queue all images. Images will not 
    // begin downloading until we tell the loader to start.

    $(".promptContainer").draggable({
        containment: 'body'
    });

    var imageArray = new Array('small_cup1.png', 'small_cup2.png', 'small_cup3.png', 'small_cup4.png');
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
                if(!indexedDBOk) return;
                indexedDB.deleteDatabase("idarticle_people");
                var openRequest = indexedDB.open("idarticle_people",1);
             
                openRequest.onupgradeneeded = function(e) {
                    var thisDB = e.target.result;
             
                    if(!thisDB.objectStoreNames.contains("shapes")) {
                        objectStore=thisDB.createObjectStore("shapes");
                        objectStore2=thisDB.createObjectStore("clues");
                        objectStore.createIndex("id","id", {unique:false});
                        objectStore.createIndex("acuteAngles","acuteAngles", {unique:false});
                        objectStore.createIndex("curvedSides","curvedSides", {unique:false});
                        objectStore.createIndex("obtuseAngles","obtuseAngles", {unique:false});
                        objectStore.createIndex("reflexAngles","reflexAngles", {unique:false});
                        objectStore.createIndex("rightAngles","rightAngles", {unique:false});
                        objectStore.createIndex("sidesEqual","sidesEqual", {unique:false});
                        objectStore.createIndex("straightSides","straightSides", {unique:false});
                        objectStore2.createIndex("property","property", {unique:false});
                    }
                }
             
                openRequest.onsuccess = function(e) {
                    console.log("running onsuccess");
             
                    db = e.target.result;
                    start();
                   
                }
             
                openRequest.onerror = function(e) {
                    //Do something for the error
                }
             
            
            $('#PreLoader').css({ 'display': 'none' });
            $('#mainDiv').fadeIn(200);
            showLeval(3);
            // startGameTimer();
        });
    });

    loader.start();
    });

function start(){
    var transaction = db.transaction(["shapes"],"readwrite");
    var store = transaction.objectStore("shapes");
    shapes0=JSON.parse(shapes0)
    var clues=JSON.parse(clues0)
    for(var i=0;i<shapes0.length;i++){
        var request = store.add(shapes0[i],(i+1));
 
        request.onerror = function(e) {
            console.log("Error",e.target.error.name);
            //some type of error handler
        }
     
        request.onsuccess = function(e) {
            console.log("Woot! Did it");
        }
    }
    var transaction = db.transaction(["clues"],"readwrite");
    var store = transaction.objectStore("clues");
    for(var i=0;i<clues.length;i++){
        var request = store.add(clues[i],(i+1));
 
        request.onerror = function(e) {
            console.log("Error",e.target.error.name);
            //some type of error handler
        }
     
        request.onsuccess = function(e) {
            console.log("Woot! Did it");
        }
    }
    $('#highScore').text(Math.max.apply(Math,stage1scores))
    generateShapes()
    
}
function showLeval(){

}
function generateShapes(){
    
    var noOfSuspects = 4;
    var transaction = db.transaction(["clues"],"readonly");
    var store = transaction.objectStore("clues");
    var index = store.index("property");
    var correctFigures = new Array();
    var wrongFigures = new Array();
    // var range = IDBKeyRange.getAll();
    var s = "";
    index.getAll().onsuccess = function(e) {
        var cursor = e.target.result;
        for(var i=0;i<cursor.length;i++){
            clues[i]=cursor[i]
        }
        if(clues.length==1)
            $('.nextClue').css('opacity',0.5)
        displayClues(clues[0]);
        for (var i = 0; i < clues.length; i++) {
        var clueVal=clues[i].property.split(' = ')
        var stransaction = db.transaction(["shapes"],"readonly");
        var shapeId=stransaction.objectStore('shapes').index(clueVal[0]);
        // var range = IDBKeyRange.getAll();
        shapeId.getAll().onsuccess = function(e) {
            var cursor = e.target.result;
            for(var i=0;i<cursor.length;i++){
                if(cursor[i][clueVal[0]]==clueVal[1])
                    correctFigures.push(cursor[i])
                else
                    wrongFigures.push(cursor[i])
            }
            renderShapes(correctFigures,wrongFigures,noOfSuspects)
            attachEvents();
        }
    }
    }
}
function renderShapes(culprit, suspects, noOfSuspects){
    mainCulprit=culprit[0].id;
    var newArr=new Array();
    newArr[0]=culprit[0];
    for (var i=0;i<(noOfSuspects-1);i++){
        newArr[i+1]=suspects[i]
    }
    console.log(newArr);
    newArr = arrayShuffle(newArr);
    // $('#shapes').append('<div id="'+culprit[0].id+'" class="shapeFig"><img src="../assets/'+culprit[0].id+'" /><div class="cross"><i class="fa fa-times" aria-hidden="true"></i></div><div class="undo"><i class="fa fa-undo" aria-hidden="true"></i></div></div>')
    for (var i=0;i<newArr.length;i++){
        $('#shapes').append('<div id="'+newArr[i].id+'" class="shapeFig"><img src="../assets/'+newArr[i].id+'" /><div class="cross"><i class="fa fa-times" aria-hidden="true"></i></div><div class="undo"><i class="fa fa-undo" aria-hidden="true"></i></div></div>')
    }
    renderMangoes(totalTreats,totalTreatsLeft)
}
function renderMangoes(totalMangoes, filledMangoes){
    $('#mangoTreats').html('')
     for (var i=0;i<(totalMangoes-filledMangoes);i++){
        $('#mangoTreats').append('<i class="fa fa-star-o" aria-hidden="true"></i>')
    }
     for (var i=0;i<filledMangoes;i++){
        $('#mangoTreats').append('<i class="fa fa-star" aria-hidden="true"></i>')
    }
}
function displayClues(clue){
    $('.cluesList, #summaryClues').append('<li>'+clue['English']+'</li>')
}
function attachEvents(){
    $('#shapes .shapeFig').hover( function(){
        if(innocentsArr.indexOf(this.id)==-1)
            $(this).children('.cross').show()
        else
            $(this).children('.undo').show()
    },function(){
        $(this).children('.cross').hide()
        $(this).children('.undo').hide()
    });
    $('#shapes .shapeFig div.cross').on('click',function(){
        innocentsArr.push($($(this).parent()).attr('id'))
        $($(this).parent()).addClass('innocent')
        $(this).hide()
    })
    $('#shapes .shapeFig div.undo').on('click',function(){
        innocentsArr.splice(innocentsArr.indexOf($($(this).parent()).attr('id')),1)
        $($(this).parent()).removeClass('innocent')
        $(this).hide();
        $(this).parent().children('.cross').show()
    });
    $('.nextClue').on('click',function(){
        var visibleClues=$('.cluesList li').length;
        if(clues[visibleClues] != undefined){
            displayClues(clues[visibleClues])
        }
        else{
            alert('No more Clues Available')
        }
    })
    toastr.options.closeDuration = 3000;
     $('.finishGame').on('click',function(){
        if(innocentsArr.indexOf(mainCulprit)==-1 && innocentsArr.length==3){
            // toastr.success('Great job! You solved it!');
            $("#endStatus").html('Great job! You solved it!');
            bonusPoints=totalTreatsLeft*multiplier;
            gamePoints=10;
            perfectPoints=100;
            
            }
        else{
            gamePoints=10;
            // totalTreatsLeft=0;
             bonusPoints=totalTreatsLeft*multiplier;
            renderMangoes(totalTreats,totalTreatsLeft);
        
            var visibleClues=$('.cluesList li').length;
            if(clues[visibleClues] == undefined && innocentsArr.length==3){
                // toastr.error('Oops! That is not the culprit -better luck with the next case!');
                $("#endStatus").html('Oops! That is not the culprit -better luck with the next case!');
            }
            else if(clues[visibleClues] == undefined && innocentsArr.length<3){
                // toastr.error('Oops! Some innocents were not released – better luck with the next case!');
                $("#endStatus").html('Oops! Some innocents were not released – better luck with the next case!');
            }
             else if(clues[visibleClues] == undefined && innocentsArr.length==4){
                // toastr.error('Oops! The culprit was released too – better luck with the next case!');
                $("#endStatus").html('Oops! The culprit was released too – better luck with the next case!');
            }
            else if(clues[visibleClues] != undefined){
                // toastr.error('Don’t be in a hurry – next time, check all the clues!');
                $("#endStatus").html('Don’t be in a hurry – next time, check all the clues!');
            }
            
        }
        showSummary()
            // toastr.error('No cookie for you :(')
        
    });
    $('.replayGame, #replay').on('click',function(){
        restartGame()
    })
}
function showSummary(){
    $('.overlay').show();
    window.setTimeout(function(){
        $("#gameStats").fadeIn(200);
    },3000);
    $('#gamePoints').text(gamePoints);
    for(var i=0;i<totalTreatsLeft;i++){
        $('#treatsEarned').append('<i class="fa fa-star-o" aria-hidden="true"></i>');
    }
    $('#bonusPoints').text(bonusPoints);
    score=bonusPoints+gamePoints+perfectPoints;
    stage1scores.push(score)    
    $('#totalScore').text(score)

}
function restartGame(){
    $('.overlay').hide();
    $('.cluesList,#summaryClues').html('');
    $('.shapeFig').removeClass('innocent')
    displayClues(clues[0]);
    innocentsArr= new Array();
    $('#highScore').text(Math.max.apply(Math,stage1scores))
}