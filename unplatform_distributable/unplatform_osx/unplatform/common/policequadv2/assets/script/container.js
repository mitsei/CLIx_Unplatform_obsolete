var $j= jQuery.noConflict(); 
var wrapperCurrentPage = "Main";

var loadedComps 	= {};

var gameScore 		= 0;
var lessonLocation  =0;
var avatar_gender ="male";
var count=0;
var containerClass;
var avatarName ="";

//hideAllScreens();
function restaart(){

}
$j(document).ready(function() { 
AdobeEdge.bootstrapCallback(function(compId) {
	count++;
	loadedComps[compId] = AdobeEdge.getComposition(compId);
//	console.log("compId "+compId);
	containerClass	= window;
	
	if(count==7)
	{
		
		loadInstructionXML();
		
	//	loadedComps[compId].getStage().play(1);
		
	}

	AdobeEdge.Symbol.bindTimelineAction(compId, "stage", "Default Timeline", "complete", function(sym, e) {		

	});
	
});
});


var DocXML;
var dataShapeXML;
var setShapeXML;
var finalQuestionsXML;
function loadInstructionXML()
{

	///load questions xml
	var xmlLoader2 	= new loadXML('assets/xml/quiz.xml', convXMLLoadedHandler);
	
	xmlLoader2.loadXMLFile();
		var FinalQuestion = new loadXML('sheetFinalD.xml',questionsXMLLoadedHandler);
		var xmlShape 	= new loadXML('dataShape.xml', shapeXMLLoadedHandler);
		var xmlSetShape 	= new loadXML('setShape.xml', shapeSetXMLLoadedHandler);
		xmlShape.loadXMLFile();
		xmlSetShape.loadXMLFile();
		FinalQuestion.loadXMLFile();
}

function questionsXMLLoadedHandler(xmlDoc)
{
finalQuestionsXML= $(xmlDoc);
}
function shapeXMLLoadedHandler(xmlDoc)
{
dataShapeXML= $(xmlDoc);
}
function shapeSetXMLLoadedHandler(xmlDoc)
{
setShapeXML= $(xmlDoc);

$("#splash").show();
	
loadedComps['splash'].getStage().play(1);
//StartLevel2();
}
function introShow(){
$("#splash").fadeOut( "slow", function() {
    // Animation complete
	loadedComps['intro'].getStage().play(1);
  });
$("#intro").fadeIn();
}
function OpenMenu(){
$("#intro").fadeOut( "slow", function() {
    // Animation complete
	loadedComps['book'].getStage().play(1);
  });
$("#book").fadeIn();

}
var Score=0;
var Mission2 =[440,500,680 ];
var coinsStack =[6,6,8];
var coinsValue =[40,50,60];
var coinMain =["url(images/coin40.png)","url(images/coin50.png)","url(images/coin60.png)"];
var sratsEarned =[2,2,2];//background-image: url("images/coin40.png");

var CurrentLevel = 1;
	var countYes = 0;
	var countN0 = 0;
	var countNA = 0;
	var countTBD = 0;
	var queryString = "";
	var valueObj =""; 
	var stageCoins = 6;
	var missionTxt = "MISSION 2";

	var CurrentStage = 1;
var CurrentSet = [];
var currentCulpret ="fig001";
	var isMatched = false;

function mission1(){
mission2();

EnableMission2();

}
	
function mission2(){
	 countYes = 0;
	countN0 = 0;
	countNA = 0;
	countTBD = 0;
	queryString = "";
	valueObj =""; 
	CurrentSet = [];
	currentCulpret ="fig001";
	isMatched = false;
	stageCoins = coinsStack[CurrentStage-1];
	$j(".coin:gt("+(stageCoins-1)+")").hide();
	$j(".coin:eq(7)").show();
	$j(".coin:lt(7)").css("background-image",coinMain[CurrentStage-1]);
$("#book").hide();
$("#feedback").hide();
$("#trans").hide();
$j(".mission").html("MISSION 2");
$j(".level").html("LEVEL "+CurrentStage);
currentScore =Mission2[CurrentStage-1];
$j(".scoretxt").html(currentScore);
  StartLevel2();
  enableTools();
  $j('.ask').hide();
$("#main").fadeIn("slow");
}


//////////////
function resetLevel(){
//$j(".grid .rect").remove();
$j(".quest").empty();
$j(".quest2").empty();
$j(".bucket").empty();
$j(".tool.active").trigger("click");
$j(".grid").removeClass("suspect");

$j(".grid.selected").trigger("click");
$j(".grid").show();
$j(".coin").show();
}
function convXMLLoadedHandler(xmlDoc)
{

	WIPAlerts();
	DocXML= $(xmlDoc);
	jQuery('.img').parent().css('cursor','pointer');
	jQuery('.txt,.HUD').css({pointerEvents: "none"});
	//enableTools();
	jQuery('.img').parent().mouseout(function() {
		if(jQuery(this).hasClass('active')) return true; 
		var imgPath = jQuery(this).find('.img').css("background-image").replace(window.location.href,"");
		jQuery(this).find('.img').css('background-image',imgPath.replace("_over","_up"));
		
		
	}) .mouseover(function() {
		if(jQuery(this).hasClass('active')) return true; 
		var imgPath = jQuery(this).find('.img').css("background-image").replace(window.location.href,"");
		jQuery(this).find('.img').css('background-image',imgPath.replace("_up","_over"));
	});/* .click(function() {
		if(jQuery(this).hasClass('enable')) {return true}; 
		//togglePage();
		jQuery(this).addClass('enable');
		jQuery(this).css('background-image',jQuery(this).css("background-image").replace("_over","_selected").replace("_up","_selected"));
	
		
	}); */
	//$("#intro").show();
	//console.log("kya");
	//loadedComps["main"].getStage().play(1);
	//$("#intro").show();
	
}
//CurrentLevel
	//CurrentStage
	//stageCoins = 6;
	//missionTxt = "MISSION 2";
function EnableMission2(){
	jQuery(".cont_btn").click(function() { 
		if(isMatched){
		
		CurrentStage++;

		/* resetLevel();
		mission2(); */
		if(CurrentStage == 4 ){
		$j('.trans').hide();
		$j(".feedback").hide("slide", function() {
			
			$j('.end2').show("slide");
		});
		return;
		
		}
		$j(".feedback").hide("slide", function() {
			if(CurrentStage==3){$j('.lvlScreen:eq(1)').hide();$j('.lvlScreen:eq(0)').show();}
			if(CurrentStage==2){$j('.lvlScreen:eq(0)').hide();$j('.lvlScreen:eq(1)').show();}
			$j('.trans').show("slide");
		});
		}else{
		
		resetLevel();
		mission2();
		$j(".feedback").hide("slide");
		}
		
	});
	$j(".ToolMain").hide();
	$j(".ToolMain2").hide();
	
	jQuery(".toolA").click(function() { 
	$j(".toolb").hide();
	});
	jQuery(".tool:eq(3)").click(function() { 
	if($j(this).hasClass('active')){$j(this).removeClass('active');
	$j(".ToolMain").freetrans('destroy');
	
	$j(".ToolMain").hide();
		var imgpath = $j(this).find('.img').css("background-image").replace(window.location.href,"");
	$j(this).find('.img').css('background-image',imgpath.replace(imgpath.substring(imgpath.indexOf("_"),imgpath.indexOf(".")),"_up"));
	return;}
	$j(this).addClass('active');
	$j(".ToolMain").show();
	$j(".ToolMain").freetrans({ x: 250, y: 150, 'rot-origin': '50% 50%'});
		var imgpath = $j(this).find('.img').css("background-image").replace(window.location.href,"");
	$j(this).find('.img').css('background-image',imgpath.replace(imgpath.substring(imgpath.indexOf("_"),imgpath.indexOf(".")),"_selected"));
	
	});
	jQuery(".tool:eq(1)").click(function() { 
	jQuery(".toolA").css('background-image','url(images/tool2_selected.png)');
	$j(".toolb").show();
	
	});
	jQuery(".tool:eq(0)").click(function() { 
	//replace here 
	
	if($j(this).hasClass('active')){
	$j(this).removeClass('active');	
	var imgpath = $j(this).find('.img').css("background-image").replace(window.location.href,"");
	$j(this).find('.img').css('background-image',imgpath.replace(imgpath.substring(imgpath.indexOf("_"),imgpath.indexOf(".")),"_up"));
	$j('.rect').each(function (){
	var imagePath = $j(this).css("background-image").replace(window.location.href,"");
	
	$j(this).css('background-image',$j(this).css("background-image").replace(imagePath.substring(imagePath.indexOf("_"),imagePath.indexOf(".")),"_normal"));
	});
	return;
	}
		jQuery(".toolA").trigger("click");
	jQuery(".tool:lt(3)").each(function(){
	$j(this).removeClass("active");
	var imgpath = $j(this).find('.img').css("background-image").replace(window.location.href,"");
	$j(this).find('.img').css('background-image',imgpath.replace(imgpath.substring(imgpath.indexOf("_"),imgpath.indexOf(".")),"_up"));
	});
	$j(this).addClass('active');
	var imgpath = $j(this).find('.img').css("background-image").replace(window.location.href,"");
	$j(this).find('.img').css('background-image',imgpath.replace(imgpath.substring(imgpath.indexOf("_"),imgpath.indexOf(".")),"_selected"));
	
	$j('.rect').each(function (){
	var imagePath = $j(this).css("background-image").replace(window.location.href,"");
	
	$j(this).css('background-image',$j(this).css("background-image").replace(imagePath.substring(imagePath.indexOf("_"),imagePath.indexOf(".")),"_tool1"));
	}
	
	
	);
	

	});
	
	jQuery(".tool:eq(2)").click(function() { 
	//replace here 
	
	if($j(this).hasClass('active')){
	$j(".ToolMain2").freetrans('destroy');
	
	$j(".ToolMain2").hide();
	$j(this).removeClass('active');	
	var imgpath = $j(this).find('.img').css("background-image").replace(window.location.href,"");
	$j(this).find('.img').css('background-image',imgpath.replace(imgpath.substring(imgpath.indexOf("_"),imgpath.indexOf(".")),"_up"));
	$j('.rect').each(function (){
	var imagePath = $j(this).css("background-image").replace(window.location.href,"");
	
	$j(this).css('background-image',$j(this).css("background-image").replace(imagePath.substring(imagePath.indexOf("_"),imagePath.indexOf(".")),"_normal"));
	});
	return;
	}
	jQuery(".toolA").trigger("click");

	jQuery(".tool:lt(3)").each(function(){
	$j(this).removeClass("active");
	$j(".ToolMain2").show();
	$j(".ToolMain2").freetrans({ x: 250, y: 150, 'rot-origin': '50% 50%'});
	var imgpath = $j(this).find('.img').css("background-image").replace(window.location.href,"");
	$j(this).find('.img').css('background-image',imgpath.replace(imgpath.substring(imgpath.indexOf("_"),imgpath.indexOf(".")),"_up"));
	});
	$j(this).addClass('active');
	var imgpath = $j(this).find('.img').css("background-image").replace(window.location.href,"");
	$j(this).find('.img').css('background-image',imgpath.replace(imgpath.substring(imgpath.indexOf("_"),imgpath.indexOf(".")),"_selected"));
	$j('.rect').each(function (){
	var imagePath = $j(this).css("background-image").replace(window.location.href,"");
	
	$j(this).css('background-image',$j(this).css("background-image").replace(imagePath.substring(imagePath.indexOf("_"),imagePath.indexOf(".")),"_tool3"));
	}
	
	
	);
	
	
	});
	
	
	jQuery(".tool2:eq(0)").click(function() { 	jQuery(".toolA").css('background-image','url(images/tool1A_selected.png)');
	jQuery(".tool:lt(3)").each(function(){
	$j(this).removeClass("active");
	var imgpath = $j(this).find('.img').css("background-image").replace(window.location.href,"");
	$j(this).find('.img').css('background-image',imgpath.replace(imgpath.substring(imgpath.indexOf("_"),imgpath.indexOf(".")),"_up"));
	});	
	$j('.rect').each(function (){
		var imagePath = $j(this).css("background-image").replace(window.location.href,"");	
		$j(this).css('background-image',$j(this).css("background-image").replace(imagePath.substring(imagePath.indexOf("_"),imagePath.indexOf(".")),"_tool2A"));
	});	
	});
	jQuery(".tool2:eq(1)").click(function() { 		jQuery(".toolA").css('background-image','url(images/tool1B_selected.png)');
		jQuery(".tool:lt(3)").each(function(){
	$j(this).removeClass("active");
	var imgpath = $j(this).find('.img').css("background-image").replace(window.location.href,"");
	$j(this).find('.img').css('background-image',imgpath.replace(imgpath.substring(imgpath.indexOf("_"),imgpath.indexOf(".")),"_up"));
	});
	$j('.rect').each(function (){
	var imagePath = $j(this).css("background-image").replace(window.location.href,"");	
	$j(this).css('background-image',$j(this).css("background-image").replace(imagePath.substring(imagePath.indexOf("_"),imagePath.indexOf(".")),"_tool2B"));
	});	
	});
	jQuery(".tool2:eq(2)").click(function() { 		jQuery(".toolA").css('background-image','url(images/tool1C_selected.png)');
		jQuery(".tool:lt(3)").each(function(){
	$j(this).removeClass("active");
	var imgpath = $j(this).find('.img').css("background-image").replace(window.location.href,"");
	$j(this).find('.img').css('background-image',imgpath.replace(imgpath.substring(imgpath.indexOf("_"),imgpath.indexOf(".")),"_up"));
	});
	$j('.rect').each(function (){
	var imagePath = $j(this).css("background-image").replace(window.location.href,"");	
	$j(this).css('background-image',$j(this).css("background-image").replace(imagePath.substring(imagePath.indexOf("_"),imagePath.indexOf(".")),"_tool2C"));
	});	
	}); 
	$j('.grid').ruler({
        vRuleSize: 0,
        hRuleSize: 0,
        showCrosshair : true,
        showMousePos: true
    }); 
	$j('.ask').on('click', function() {
	var statment =$j('#bucket1>option:selected').text() +' '+$j('#bucket2>option:selected').val() +' ' +$j('#bucket3>option:selected').val()+' ' +$j('#bucket4>option:selected').text() +'?'
	var QuestionText = 'The culprit has ' +statment;
	var ResponseText= getResponse($j('#bucket1>option:selected').val(),$j('#bucket2>option:selected').val(), $j('#bucket3>option:selected').val(),$j('#bucket4>option:selected').val());
	var QuestionDiv ='<div class="questionField" style="position: relative; margin: 0px;  width: 690px; margin: 5px; height: 20px; right: auto; bottom: auto; "><div class="questionText" style="position: absolute;    text-align: left; margin: 0px; left: 0px; top: 0px; width: 525px; height: 20px; right: auto; bottom: auto;  font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: rgb(81, 249, 255); font-weight: 700; text-decoration: none;">'+QuestionText+'</div><div class="questionResponse" style="position: absolute; margin: 0px; left: 565px; top: 0px; width: 119px; height: 20px; right: auto; bottom: auto;  font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: rgb(168, 255, 81); font-weight: 700; text-decoration: none; text-align: right;">'+ResponseText+'</div><div class="questionLine" style="position: absolute; margin: 0px; left: 0px; top: 20px; width: 683px; height: 1px; right: auto; bottom: auto; border: 0px none rgb(0, 0, 0);  background-color: rgb(50, 133, 180);"></div></div>';
	$j('.sample').hide();
	$j('.quest').prepend(QuestionDiv);
	if(ResponseText == "Yes" || ResponseText == "No" ){
	var feedBackDiv ='<div class="feedbackStatment" resp="'+ResponseText+'" statment="'+queryString+'" style="position: relative; margin: 5px;   width: 336px; height: 23px; right: auto; bottom: auto; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); transform: translateZ(0px);"><div class="statmentText" style="position: absolute; margin: 0px; left: 18px; top: 0px; width: 213px; height: 20px; right: auto; bottom: auto; font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: rgb(255, 255, 255); font-weight: 700; text-decoration: none;">'+statment+'</div><div style="position: absolute; margin: 0px; left: 213px; top: 0px; width: 95px; height: 20px; right: auto; bottom: auto; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: rgb(168, 255, 81); font-weight: 700; text-decoration: none; text-align: right;">'+ResponseText+'</div><div style="position: absolute; margin: 0px; left: 0px; top: 20px; width: 683px; height: 1px; right: auto; bottom: auto; border: 0px none rgb(0, 0, 0); -webkit-tap-highlight-color: rgba(0, 0, 0, 0); background-color: rgb(50, 133, 180);"></div><div class="spot" style="position: absolute; margin: 0px; left: 0px; top: 1px; width: 13px; height: 13px; right: auto; bottom: auto; border-radius: 50%; border: 0px none rgb(0, 0, 0);  background-color: #1dc105;"></div></div>';
	$j('.quest2').prepend(feedBackDiv);
	}
	});
	
	$j(".tool2:eq(0)").qtip({    content: {text: 'Obtuse Angle Marker'}	});
	$j(".tool2:eq(1)").qtip({    content: {text: 'Right Angles'}	});
	$j(".tool2:eq(2)").qtip({    content: {text: 'Acute Angle Marker'}	});
}
function enableTools(){
	//jQuery(".tool:eq(0)");
	//rightAndge tool
	

	$j('.bucket:eq(0)').append('<select id="bucket1"><option value="">Select Qualifier</option><option value="atleast">At Least</option><option value="lessthan">Less Than</option><option value="morethan">More Than</option><option disabled value="atthemost">At the most</option><option value="exactly">Exactly</option><option value="all">All</option><option value="no">No</option> </select>');
	
	$j('.bucket:eq(1)').append('<select id="bucket2"><option value="">Quantity</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option></select>');
	
	$j('.bucket:eq(2)').append('<select id="bucket3"><option value="">Select Property</option><option value="equal">equal</option><option value="parallel">parallel</option><option value="right">right</option><option value="reflex">reflex</option><option value="obtuse">obtuse</option><option value="acute">acute</option></select>');
	//<option value="" style="display:none" disabled>adjacent sides equal</option><option style="display:none" value="" disabled>opposite sides equal</option>
	
	$j('.bucket:eq(3)').append('<select id="bucket4"><option value="">Select Attribute</option><option value="sides">sides</option><option value="angles">angles</option><option value="pairsofsides">pairs of sides</option></select>');

	$j('select').selectric().on('change', function() {
			//console.log(""+$j(this)[0].selectedIndex );
			if($j('#bucket1')[0].selectedIndex ==7 || $j('#bucket1')[0].selectedIndex ==6) {$j('.bucket:eq(1)').hide();$j('#bucket2').prop('selectedIndex', 0).selectric('refresh');}else $j('.bucket:eq(1)').show();
				 if($j('#bucket1')[0].selectedIndex && $j('#bucket4')[0].selectedIndex) {//$j('#bucket2')[0].selectedIndex //&& $j('#bucket3')[0].selectedIndex && 
		$j('.ask').show();
				}else{
	 $j('.ask').hide();
			}
	});
	
	CalScore();
	}

	function CalScore(){
		
			$j(".coin").prop("coinVal", coinsValue[CurrentStage-1]);
			$j(".coin:eq(7)").prop("coinVal", 200);
			
			
		
	}
function getResponse(b1,b2,b3,b4){
if(b2=="") b2 ="1";
if(b3=="") b3 ="empty";
var fig=currentCulpret;
queryString = b1+b2+b3+b4;
valueObj = finalQuestionsXML.find('mergedBucket:contains('+queryString+')').parent().find(fig).text();
if (valueObj =="Y"){countYes++; return "Yes";}
if (valueObj =="N"){countN0++; return "No";}
if (valueObj =="NA"){countNA++; 
if(countNA>3){
 alertify.error('Please ask a valid question, your Score is impacted.');
$j(".coin:eq("+--stageCoins+")").effect( "pulsate", {}, 500, callbackPuff );
}else
alertify.error('More than 3 invalid questions will impact score... Invalid Count('+countNA+')' );
return "Invalid";
}
if (valueObj =="TBD"){ countTBD++; return "Don't Know";}
}
	function WIPAlerts(){
			$j('.reset').click(function() { 	
			 //alertify.alert('Reset is WIP');
				resetLevel();
				mission2();
			 });
			 $j('.grid').click(function() { 	
			 { 
			 if(jQuery(this).hasClass('selected')){ 
			 jQuery(this).removeClass('selected');
			 $j(this).find('.rect').css('opacity',1);
			 var imgpath = $j(this).find('.img').css("background-image").replace(window.location.href,"");
				$j(this).find('.img').css('background-image',imgpath.replace(imgpath.substring(imgpath.indexOf("_"),imgpath.indexOf(".")),"_up"));
				return true;
			 }
			 jQuery(this).addClass('selected');
			 alertify.success('select release button to free the selected suspect(s)');
			  $j(this).find('.rect').css('opacity',0.3);
				var imgpath = $j(this).find('.img').css("background-image").replace(window.location.href,"");
				$j(this).find('.img').css('background-image',imgpath.replace(imgpath.substring(imgpath.indexOf("_"),imgpath.indexOf(".")),"_selected"));
				
			 }
			 
			 });
			 $j('.release').click(function() { 	
			 if(!((countYes+countN0)>0)){alertify.alert('You must ask at least 1 valid questions to release a suspect');
			 return;
			 }
			if( $j('.grid.selected').length >= CurrentSet.length){alertify.alert('Not all suspects can be released one is a culpret, Please Identify him.');
			 return;
			 }
			if( $j('.grid.selected').length ==0){alertify.alert('Please select a suspects to release.');
			 return;
			 }
			{  $j('.grid.selected').hide();
				//$j('.grid.selected').removeClass('selected');
			}
			  
			  if($j('.grid.selected').length == CurrentSet.length-1){
				var culpret = $j('.suspect:visible').prop("fig");
				var res= (culpret== currentCulpret )?", he pleads guilty. Record his statement.":", However he pleads innocence! Attempt again with different set of suspects.";
				isMatched = (culpret== currentCulpret );
				alertify.set({ labels: {ok: "Continue"}  });//,onok:
				alertify.alert('You Cought a culprit'+ res,getFeedback);
				 
				}
				
			 });
	}

	function getFeedback(){
	
	if(!isMatched){ $j(".mtch_txt").html("NO MATCH"); $j(".job").html("Nice Try!");$j(".solved").html("Please attempt again!");
	
	}//star 
	var cp = currentCulpret.replace("fig0","");
	var suspected = $j('.suspect:visible').prop("fig");
	var sp = suspected.replace("fig0","");
	$j(".matchShape:eq(1)").css('background-image',' url("shapes/'+sp+'/'+sp+'_normal.svg"');
	$j(".matchShape:eq(0)").css('background-image',' url("shapes/'+cp+'/'+cp+'_normal.svg"');
	$j(".feedbackStatment").each(function(){
var Correct = ($j(this).attr('resp') ==(finalQuestionsXML.find('mergedBucket:contains('+$j(this).attr('statment')+')').parent().find(suspected).text().replace("Y","Yes").replace("N","No")));
if(!Correct) $j(this).find('.spot').css("background-color","rgb(248, 13, 13)");
else $j(this).find('.spot').css("background-color","#1dc105");
});
	$j("#feedback").toggle("slide", function(){
	$j( ".matchShape:eq(0)" ).effect( "transfer",{ to: ".matchShape:eq(1)", className: "ui-effects-transfer" }, 500).delay(800).effect( "transfer",{ to: ".matchShape:eq(1)", className: "ui-effects-transfer" }, 500);});
	//Great Job! //You solved he case.
	}
	var currentScore = 0;
	//scoretxt
	function callbackPuff(){$j(this).effect( "puff", {}, 300); 
	currentScore = currentScore- $j(this).prop("coinVal")
	$j(".scoretxt").html(currentScore);
	$j(".scoretxt").effect( "highlight",200);
	if(currentScore ==0){
		alertify.alert('You have exhausted all appempts. Please Replay this level.');
			resetLevel();
			mission2();
		}
	};
	
	//$j( ".matchShape:eq(0)" ).effect( "transfer",{ to: ".matchShape:eq(1)", className: "ui-effects-transfer" }, 500);
//$j(".tool:eq(0)").effect( "pulsate", {}, 500, callback ); //puff //explode

//$j( ".matchShape:eq(0)" ).effect( "transfer",{ to: ".matchShape:eq(1)", className: "ui-effects-transfer" }, 500).delay(600).effect( "transfer",{ to: ".matchShape:eq(1)", className: "ui-effects-transfer" }, 500);


function StartLevel2(){
//.filter(function() { return $(this).text() == 'bar'; })...
	$Sett = setShapeXML.find('stage:contains('+CurrentStage+')').parent();
$randomSet= $Sett.eq(Math.floor(Math.random() * $Sett.length));

	
	$shapes = $randomSet.find('shapeId').text().split(',');
	$shapes.shuffle();
	$.each($shapes , function( index, value ) {
	//console.log( index + ": " + value );
	CurrentSet.push(dataShapeXML.find('Shape[nos='+value+']'));
	var filename = (parseInt(value)>9)?value:'0'+value;
	var filepath = "shapes/"+filename+"/"+filename+"_normal.svg";
		$('.grid:eq('+index+') .rect').css('background-image',' url("'+filepath+'"');
		$('.grid:eq('+index+')').prop("fig","fig0"+filename);
		$('.grid:eq('+index+')').addClass("suspect");
	});
	CurrentSet.shuffle();
	currentCulpret =CurrentSet[0].find('ShapeID').text();
	$('.grid').not(".suspect").hide();
	//random shape is a culprit  
	/* $.each(CurrentSet , function( index, value ) {
	//console.log( index + ": " + value );
	//console.log(value.find('nos'));
	$('.grid:eq('+index+') .rect').css('background-image',' url("shapes/2000px-Rapporteur_180deg.svg.png"');
	
	});
	 */
}
	
/* function LogoClicked(){
$("#Main").css({"height": "650px"});
	jQuery('.Iframe').html('<iframe style="width:1024px; height:650px" src="scr_Home.html" frameborder="0" scrolling="no" id="myFrame"></iframe>');
} */



Array.prototype.shuffle = function() {
    var input = this;
     
    for (var i = input.length-1; i >=0; i--) {
     
        var randomIndex = Math.floor(Math.random()*(i+1)); 
        var itemAtIndex = input[randomIndex]; 
         
        input[randomIndex] = input[i]; 
        input[i] = itemAtIndex;
    }
    return input;
}
function hideAllScreens()
{
	
	$("#main").hide();

}

/* function togglePage(){
		jQuery('.menubuttons').each(function (){
		
		jQuery(this).removeClass('enable');
		jQuery(this).css('background-image',jQuery(this).css("background-image").replace("_Over","_Normal").replace("_Click","_Normal"));
		});
		
		//jQuery('.menubuttons').css('background-image',jQuery(this).css("background-image").replace("_Normal","_Click"));
}
 */

