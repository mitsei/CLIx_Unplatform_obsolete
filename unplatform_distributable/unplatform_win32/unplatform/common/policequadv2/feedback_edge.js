/**
 * Adobe Edge: symbol definitions
 */
(function($, Edge, compId){
//images folder
var im='images/';

var fonts = {};


var resources = [
];
var symbols = {
"stage": {
   version: "1.5.0",
   minimumCompatibleVersion: "1.5.0",
   build: "1.5.0.217",
   baseState: "Base State",
   initialState: "Base State",
   gpuAccelerate: false,
   resizeInstances: false,
   content: {
         dom: [
         {
            id:'m02_feedback',
            type:'rect',
            rect:['0','0','auto','auto','auto','auto']
         }],
         symbolInstances: [
         {
            id:'m02_feedback',
            symbolName:'m02_feedback'
         }
         ]
      },
   states: {
      "Base State": {
         "${_Stage}": [
            ["color", "background-color", 'rgba(255,255,255,1)'],
            ["style", "overflow", 'hidden'],
            ["style", "height", '652px'],
            ["style", "width", '1014px']
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 0,
         autoPlay: false,
         timeline: [
         ]
      }
   }
},
"btn_Start": {
   version: "1.5.0",
   minimumCompatibleVersion: "1.5.0",
   build: "1.5.0.217",
   baseState: "Base State",
   initialState: "Base State",
   gpuAccelerate: false,
   resizeInstances: false,
   content: {
   dom: [
   {
      id: 'btn_Start_up',
      type: 'image',
      rect: ['0px','0px','170px','39px','auto','auto'],
      fill: ['rgba(0,0,0,0)','images/btn_Start_up.png','0px','0px']
   },
   {
      rect: ['27px','7px','auto','auto','auto','auto'],
      font: ['Verdana, Geneva, sans-serif',20,'rgba(0,0,0,1)','700','none',''],
      id: 'Text',
      text: 'CONTINUE',
      align: 'center',
      type: 'text'
   }],
   symbolInstances: [
   ]
   },
   states: {
      "Base State": {
         "${_Text}": [
            ["style", "top", '7px'],
            ["style", "text-align", 'center'],
            ["style", "font-family", 'Verdana, Geneva, sans-serif'],
            ["style", "font-weight", '700'],
            ["style", "left", '27px'],
            ["style", "font-size", '20px']
         ],
         "${_btn_Start_up}": [
            ["style", "top", '0px'],
            ["style", "left", '0px']
         ],
         "${symbolSelector}": [
            ["style", "height", '39px'],
            ["style", "width", '170px']
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 0,
         autoPlay: false,
         timeline: [
         ]
      }
   }
},
"match_mc": {
   version: "1.5.0",
   minimumCompatibleVersion: "1.5.0",
   build: "1.5.0.217",
   baseState: "Base State",
   initialState: "Base State",
   gpuAccelerate: false,
   resizeInstances: false,
   content: {
   dom: [
   {
      rect: ['-41px','0px','182px','auto','auto','auto'],
      font: ['Tahoma, Geneva, sans-serif',30,'rgba(255,255,255,1)','400','none','normal'],
      userClass: 'mtch_txt',
      id: 'Text8',
      text: 'MATCH',
      align: 'center',
      type: 'text'
   }],
   symbolInstances: [
   ]
   },
   states: {
      "Base State": {
         "${_Text8}": [
            ["style", "top", '0px'],
            ["style", "width", '182px'],
            ["style", "display", 'block'],
            ["style", "font-weight", '400'],
            ["style", "left", '-41px'],
            ["style", "font-size", '30px']
         ],
         "${symbolSelector}": [
            ["style", "height", '36px'],
            ["style", "width", '97px']
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 500,
         autoPlay: true,
         timeline: [
            { id: "eid4", tween: [ "style", "${_Text8}", "display", 'block', { fromValue: 'block'}], position: 0, duration: 0 },
            { id: "eid3", tween: [ "style", "${_Text8}", "display", 'none', { fromValue: 'block'}], position: 250, duration: 0 },
            { id: "eid5", tween: [ "style", "${_Text8}", "display", 'block', { fromValue: 'none'}], position: 500, duration: 0 }         ]
      }
   }
},
"m02_feedback": {
   version: "1.5.0",
   minimumCompatibleVersion: "1.5.0",
   build: "1.5.0.217",
   baseState: "Base State",
   initialState: "Base State",
   gpuAccelerate: false,
   resizeInstances: false,
   content: {
   dom: [
   {
      id: 'feedback_bg',
      type: 'image',
      rect: ['0px','0px','1014px','652px','auto','auto'],
      fill: ['rgba(0,0,0,0)','images/feedback_bg.jpg','0px','0px']
   },
   {
      id: 'feedback_popup',
      type: 'image',
      rect: ['266px','26px','541px','558px','auto','auto'],
      fill: ['rgba(0,0,0,0)','images/feedback_popup.png','0px','0px']
   },
   {
      rect: ['402px','389px','48px','45px','auto','auto'],
      id: 'coin200',
      userClass: 'coinToken',
      type: 'image',
      fill: ['rgba(0,0,0,0)','images/coin200.png','0px','0px']
   },
   {
      rect: ['561px','389px','48px','45px','auto','auto'],
      id: 'coin50',
      userClass: 'coinToken',
      type: 'image',
      fill: ['rgba(0,0,0,0)','images/coin50.png','0px','0px']
   },
   {
      id: 'feedback_list',
      type: 'image',
      rect: ['244px','201px','433px','152px','auto','auto'],
      fill: ['rgba(0,0,0,0)','images/feedback_list.png','0px','0px']
   },
   {
      id: 'feedback_shape',
      type: 'image',
      rect: ['612px','170px','214px','213px','auto','auto'],
      fill: ['rgba(0,0,0,0)','images/feedback_shape.png','0px','0px']
   },
   {
      id: 'feedback_star',
      type: 'image',
      rect: ['481px','151px','110px','59px','auto','auto'],
      fill: ['rgba(0,0,0,0)','images/feedback_star.png','0px','0px']
   },
   {
      id: 'feedback_alien',
      type: 'image',
      rect: ['50px','209px','186px','560px','auto','auto'],
      fill: ['rgba(0,0,0,0)','images/feedback_alien.png','0px','0px']
   },
   {
      rect: ['137px','392px','37px','37px','auto','auto'],
      id: '_28_normal',
      userClass: 'matchShape',
      type: 'image',
      fill: ['rgba(0,0,0,0)','shapes/28/28_normal.svg','0px','0px']
   },
   {
      rect: ['644px','201px','152px','152px','auto','auto'],
      id: '_28_normalCopy',
      userClass: 'matchShape',
      type: 'image',
      fill: ['rgba(0,0,0,0)','shapes/28/28_normal.svg','0px','0px']
   },
   {
      rect: ['605px','531px','115px','100px','auto','auto'],
      id: 'cord22',
      transform: [[],['-11']],
      type: 'image',
      fill: ['rgba(0,0,0,0)','images/cord22.svg','0px','0px']
   },
   {
      rect: ['432px','600px','89px','60px','auto','auto'],
      id: 'cord2',
      transform: [[],['-144']],
      type: 'image',
      fill: ['rgba(0,0,0,0)','images/cord.svg','0px','0px']
   },
   {
      rect: ['540px','575px','89px','60px','auto','auto'],
      id: 'cord2Copy',
      transform: [[],['-273']],
      type: 'image',
      fill: ['rgba(0,0,0,0)','images/cord.svg','0px','0px']
   },
   {
      rect: ['455px','399px','43px','auto','auto','auto'],
      font: ['Tahoma, Geneva, sans-serif',20,'rgba(255,255,255,1)','normal','none','normal'],
      userClass: 'token',
      id: 'Text7',
      text: 'X 1',
      align: 'left',
      type: 'text'
   },
   {
      rect: ['613px','399px','43px','auto','auto','auto'],
      font: ['Tahoma, Geneva, sans-serif',20,'rgba(255,255,255,1)','normal','none','normal'],
      userClass: 'token',
      id: 'Text7Copy',
      text: 'X 6',
      align: 'left',
      type: 'text'
   },
   {
      rect: ['545px','171px','auto','auto','auto','auto'],
      font: ['Tahoma, Geneva, sans-serif',20,'rgba(255,255,255,1)','700','none','normal'],
      userClass: 'star ',
      id: 'Text3',
      text: '02',
      align: 'center',
      type: 'text'
   },
   {
      rect: ['474px','353px','auto','auto','auto','auto'],
      font: ['Tahoma, Geneva, sans-serif',16,'rgba(255,255,255,1)','400','none','normal'],
      id: 'Text4',
      text: 'Tokens preserved',
      align: 'center',
      type: 'text'
   },
   {
      rect: ['398px','63px','271px','auto','auto','auto'],
      font: ['Tahoma, Geneva, sans-serif',36,'rgba(255,255,255,1.00)','700','none',''],
      userClass: 'job',
      id: 'Text',
      text: 'Great Job!',
      align: 'center',
      type: 'text'
   },
   {
      rect: ['351px','105px','376px','auto','auto','auto'],
      font: ['Tahoma, Geneva, sans-serif',31,'rgba(255,255,255,1)','400','none','normal'],
      userClass: 'solved',
      id: 'Text2',
      text: 'You solved he case!',
      align: 'center',
      type: 'text'
   },
   {
      rect: ['465px','477px','auto','auto','auto','auto'],
      font: ['Tahoma, Geneva, sans-serif',18,'rgba(243,205,34,1.00)','normal','none','normal'],
      id: 'Text5',
      text: 'Your<br>Score',
      align: 'right',
      type: 'text'
   },
   {
      rect: ['517px','471px','89px','auto','auto','auto'],
      font: ['Tahoma, Geneva, sans-serif',42,'rgba(243,205,34,1)','normal','none','normal'],
      userClass: 'scoretxt',
      id: 'Text6',
      text: '50',
      align: 'left',
      type: 'text'
   },
   {
      id: 'match_mc',
      type: 'rect',
      transform: [],
      rect: ['671px','259px','auto','auto','auto','auto']
   },
   {
      rect: ['832px','598px','auto','auto','auto','auto'],
      id: 'btn_Start',
      userClass: 'cont_btn',
      cursor: ['pointer'],
      type: 'rect'
   },
   {
      rect: ['274px','232px','347px','87px','auto','auto'],
      userClass: 'quest2',
      id: 'Rectangle2',
      stroke: [0,'rgb(0, 0, 0)','none'],
      type: 'rect',
      fill: ['rgba(192,192,192,1)']
   }],
   symbolInstances: [
   {
      id: 'btn_Start',
      symbolName: 'btn_Start'
   },
   {
      id: 'match_mc',
      symbolName: 'match_mc'
   }   ]
   },
   states: {
      "Base State": {
         "${_Rectangle2}": [
            ["style", "height", '87px'],
            ["style", "top", '232px'],
            ["style", "left", '274px'],
            ["style", "width", '347px']
         ],
         "${_Text7}": [
            ["style", "top", '399px'],
            ["style", "text-align", 'left'],
            ["style", "font-size", '20px'],
            ["style", "left", '455px'],
            ["style", "width", '43px']
         ],
         "${_Text3}": [
            ["style", "top", '171px'],
            ["style", "font-weight", '700'],
            ["style", "left", '545px'],
            ["style", "font-size", '20px']
         ],
         "${_coin200}": [
            ["style", "top", '389px'],
            ["style", "height", '45px'],
            ["style", "left", '402px'],
            ["style", "width", '48px']
         ],
         "${_Text2}": [
            ["style", "top", '105px'],
            ["style", "width", '376px'],
            ["style", "font-weight", '400'],
            ["style", "left", '351px'],
            ["style", "font-size", '31px']
         ],
         "${_cord2Copy}": [
            ["style", "-webkit-transform-origin", [86.69,77], {valueTemplate:'@@0@@% @@1@@%'} ],
            ["style", "-moz-transform-origin", [86.69,77],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "-ms-transform-origin", [86.69,77],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "msTransformOrigin", [86.69,77],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "-o-transform-origin", [86.69,77],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "top", '575px'],
            ["style", "left", '540px'],
            ["transform", "rotateZ", '-273deg']
         ],
         "${symbolSelector}": [
            ["style", "height", '768px'],
            ["style", "width", '1014px']
         ],
         "${_Text5}": [
            ["style", "top", '477px'],
            ["style", "text-align", 'right'],
            ["color", "color", 'rgba(243,205,34,1.00)'],
            ["style", "line-height", '20px'],
            ["style", "left", '465px'],
            ["style", "font-size", '18px']
         ],
         "${_Text7Copy}": [
            ["style", "top", '399px'],
            ["style", "text-align", 'left'],
            ["style", "width", '43px'],
            ["style", "left", '613px'],
            ["style", "font-size", '20px']
         ],
         "${_Text4}": [
            ["style", "top", '353px'],
            ["style", "font-weight", '400'],
            ["style", "left", '474px'],
            ["style", "font-size", '16px']
         ],
         "${_feedback_popup}": [
            ["style", "top", '26px'],
            ["style", "left", '266px']
         ],
         "${_coin50}": [
            ["style", "top", '389px'],
            ["style", "height", '45px'],
            ["style", "left", '561px'],
            ["style", "width", '48px']
         ],
         "${_feedback_alien}": [
            ["style", "top", '209px'],
            ["style", "left", '50px']
         ],
         "${_feedback_shape}": [
            ["style", "left", '612px'],
            ["style", "top", '170px']
         ],
         "${_feedback_bg}": [
            ["style", "left", '0px'],
            ["style", "top", '0px']
         ],
         "${_cord2}": [
            ["style", "top", '600px'],
            ["style", "-webkit-transform-origin", [16.98,22.89], {valueTemplate:'@@0@@% @@1@@%'} ],
            ["style", "-moz-transform-origin", [16.98,22.89],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "-ms-transform-origin", [16.98,22.89],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "msTransformOrigin", [16.98,22.89],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "-o-transform-origin", [16.98,22.89],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "left", '432px'],
            ["transform", "rotateZ", '-144deg']
         ],
         "${_feedback_list}": [
            ["style", "left", '244px'],
            ["style", "top", '201px']
         ],
         "${_Text6}": [
            ["style", "top", '471px'],
            ["style", "text-align", 'left'],
            ["style", "width", '89px'],
            ["style", "left", '517px'],
            ["style", "font-size", '42px']
         ],
         "${__28_normal}": [
            ["style", "top", '392px'],
            ["style", "height", '37px'],
            ["style", "left", '137px'],
            ["style", "width", '37px']
         ],
         "${_Text}": [
            ["style", "top", '63px'],
            ["style", "width", '271px'],
            ["style", "text-align", 'center'],
            ["style", "font-family", 'Tahoma, Geneva, sans-serif'],
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["style", "font-weight", '700'],
            ["style", "left", '398px'],
            ["style", "font-size", '36px']
         ],
         "${_btn_Start}": [
            ["style", "top", '599px'],
            ["style", "cursor", 'pointer'],
            ["style", "left", '447px']
         ],
         "${__28_normalCopy}": [
            ["style", "height", '152px'],
            ["style", "top", '201px'],
            ["style", "left", '644px'],
            ["style", "width", '152px']
         ],
         "${_cord22}": [
            ["style", "top", '531px'],
            ["style", "-webkit-transform-origin", [8.15,87.72], {valueTemplate:'@@0@@% @@1@@%'} ],
            ["style", "-moz-transform-origin", [8.15,87.72],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "-ms-transform-origin", [8.15,87.72],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "msTransformOrigin", [8.15,87.72],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "-o-transform-origin", [8.15,87.72],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "left", '605px'],
            ["transform", "rotateZ", '-11deg']
         ],
         "${_match_mc}": [
            ["style", "top", '259px'],
            ["style", "left", '671px']
         ],
         "${_feedback_star}": [
            ["style", "top", '151px'],
            ["style", "left", '481px']
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 0,
         autoPlay: false,
         timeline: [
         ]
      }
   }
}
};


Edge.registerCompositionDefn(compId, symbols, fonts, resources);

/**
 * Adobe Edge DOM Ready Event Handler
 */
$(window).ready(function() {
     Edge.launchComposition(compId);
});
})(jQuery, AdobeEdge, "feedback");
