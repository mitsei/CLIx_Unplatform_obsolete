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
            id:'Mission2_end',
            type:'rect',
            rect:['-340','0','auto','auto','auto','auto']
         }],
         symbolInstances: [
         {
            id:'Mission2_end',
            symbolName:'Mission2_end'
         }
         ]
      },
   states: {
      "Base State": {
         "${_Stage}": [
            ["color", "background-color", 'rgba(0,0,0,1.00)'],
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
"BG15": {
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
      id: 'BG15',
      type: 'image',
      rect: ['0px','0px','1014px','650px','auto','auto'],
      fill: ['rgba(0,0,0,0)','images/BG15.jpg','0px','0px']
   },
   {
      id: 'Group',
      type: 'group',
      rect: ['66px','84px','280','194','auto','auto'],
      c: [
      {
         rect: ['0px','-11px','232px','90px','auto','auto'],
         borderRadius: ['10px','10px','10px','10px'],
         id: 'RoundRect',
         stroke: [0,'rgba(0,0,0,1)','none'],
         type: 'rect',
         fill: ['rgba(255,255,255,1.00)']
      },
      {
         transform: [[0,0],['142'],[],['1','1.44']],
         id: 'pointer',
         type: 'image',
         rect: ['156px','-39px','35px','104px','auto','auto'],
         fill: ['rgba(0,0,0,0)','images/pointer.svg','0px','0px']
      },
      {
         font: ['Verdana, Geneva, sans-serif',14,'rgba(0,0,0,1)','normal','none',''],
         type: 'text',
         id: 'Text',
         text: 'We\'ve rounded up the ringleaders. Now our water is safe. Time for some rest, Geo. <br>',
         align: 'center',
         rect: ['19px','0px','193px','79px','auto','auto']
      }]
   },
   {
      id: 'Group2',
      type: 'group',
      rect: ['721px','339px','204','139','auto','auto'],
      c: [
      {
         rect: ['55px','76px','149px','63px','auto','auto'],
         borderRadius: ['10px','10px','10px','10px'],
         id: 'RoundRectCopy',
         stroke: [0,'rgba(0,0,0,1)','none'],
         type: 'rect',
         fill: ['rgba(255,255,255,1.00)']
      },
      {
         transform: [[0,0],['308'],[],['1','1.44']],
         id: 'pointerCopy',
         type: 'image',
         rect: ['111px','2px','35px','104px','auto','auto'],
         fill: ['rgba(0,0,0,0)','images/pointer.svg','0px','0px']
      },
      {
         font: ['Verdana, Geneva, sans-serif',14,'rgba(0,0,0,1)','normal','none',''],
         type: 'text',
         id: 'TextCopy',
         text: 'Good night, Inspector Kata.',
         align: 'center',
         rect: ['70px','92px','119px','31px','auto','auto']
      }]
   }],
   symbolInstances: [
   ]
   },
   states: {
      "Base State": {
         "${_RoundRect}": [
            ["style", "top", '-11px'],
            ["style", "height", '90px'],
            ["color", "background-color", 'rgba(255,255,255,1.00)'],
            ["style", "left", '0px'],
            ["style", "width", '232px']
         ],
         "${_BG15}": [
            ["style", "left", '0px'],
            ["style", "top", '0px']
         ],
         "${_Group}": [
            ["style", "left", '66px'],
            ["style", "top", '84px']
         ],
         "${_Group2}": [
            ["style", "left", '721px'],
            ["style", "top", '339px']
         ],
         "${_Text}": [
            ["style", "top", '0px'],
            ["style", "text-align", 'center'],
            ["style", "font-size", '14px'],
            ["style", "height", '79px'],
            ["style", "font-family", 'Verdana, Geneva, sans-serif'],
            ["style", "left", '19px'],
            ["style", "width", '193px']
         ],
         "${symbolSelector}": [
            ["style", "height", '650px'],
            ["style", "width", '1014px']
         ],
         "${_RoundRectCopy}": [
            ["style", "top", '76px'],
            ["style", "height", '63px'],
            ["color", "background-color", 'rgba(255,255,255,1.00)'],
            ["style", "left", '55px'],
            ["style", "width", '149px']
         ],
         "${_pointer}": [
            ["style", "-webkit-transform-origin", [50,100], {valueTemplate:'@@0@@% @@1@@%'} ],
            ["style", "-moz-transform-origin", [50,100],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "-ms-transform-origin", [50,100],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "msTransformOrigin", [50,100],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "-o-transform-origin", [50,100],{valueTemplate:'@@0@@% @@1@@%'}],
            ["transform", "scaleY", '1.44019'],
            ["transform", "rotateZ", '142deg'],
            ["style", "left", '156px'],
            ["style", "top", '-39px']
         ],
         "${_TextCopy}": [
            ["style", "top", '92px'],
            ["style", "text-align", 'center'],
            ["style", "width", '119px'],
            ["style", "height", '31px'],
            ["style", "font-family", 'Verdana, Geneva, sans-serif'],
            ["style", "left", '70px'],
            ["style", "font-size", '14px']
         ],
         "${_pointerCopy}": [
            ["style", "-webkit-transform-origin", [50,100], {valueTemplate:'@@0@@% @@1@@%'} ],
            ["style", "-moz-transform-origin", [50,100],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "-ms-transform-origin", [50,100],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "msTransformOrigin", [50,100],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "-o-transform-origin", [50,100],{valueTemplate:'@@0@@% @@1@@%'}],
            ["transform", "scaleY", '1.44019'],
            ["transform", "rotateZ", '308deg'],
            ["style", "left", '111px'],
            ["style", "top", '2px']
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
"promotion": {
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
      id: 'Promotion_bg',
      type: 'image',
      rect: ['0px','0px','1014px','652px','auto','auto'],
      fill: ['rgba(0,0,0,0)','images/menu_bg.jpg','0px','0px']
   },
   {
      type: 'image',
      display: 'none',
      rect: ['0px','317px','1014px','84px','auto','auto'],
      id: 'promotion_strip',
      fill: ['rgba(0,0,0,0)','images/promotion_strip.png','0px','0px']
   },
   {
      type: 'image',
      display: 'none',
      rect: ['0px','67px','1014px','583px','auto','auto'],
      id: 'badge_glow',
      fill: ['rgba(0,0,0,0)','images/badge_glow.png','0px','0px']
   },
   {
      type: 'image',
      display: 'none',
      rect: ['388px','222px','239px','274px','auto','auto'],
      id: 'badge',
      fill: ['rgba(0,0,0,0)','images/badge.png','0px','0px']
   },
   {
      id: 'badge_star',
      type: 'image',
      rect: ['446px','317px','59px','59px','auto','auto'],
      fill: ['rgba(0,0,0,0)','images/badge_star.png','0px','0px']
   },
   {
      id: 'badge_starCopy',
      type: 'image',
      rect: ['509px','317px','59px','59px','auto','auto'],
      fill: ['rgba(0,0,0,0)','images/badge_star.png','0px','0px']
   },
   {
      id: 'btn_Start',
      type: 'rect',
      cursor: ['pointer'],
      rect: ['421','563','auto','auto','auto','auto']
   },
   {
      type: 'text',
      rect: ['330px','90px','auto','auto','auto','auto'],
      id: 'Text2',
      filter: [0,0,1,1,0,0,0,0,'rgba(0,0,0,0)',0,0,0],
      align: 'center',
      text: 'Congratulations!',
      textShadow: ['rgba(7,63,104,1.00)',0,1,10],
      font: ['Verdana, Geneva, sans-serif',36,'rgba(255,255,255,1.00)','bold','none','normal']
   },
   {
      type: 'text',
      rect: ['195px','134px','654px','68px','auto','auto'],
      id: 'Text2Copy',
      filter: [0,0,1,1,0,0,0,0,'rgba(0,0,0,0)',0,0,0],
      align: 'center',
      text: 'You\'ve Been promoted',
      textShadow: ['rgba(7,63,104,1.00)',0,1,10],
      font: ['Verdana, Geneva, sans-serif',48,'rgba(255,255,255,1.00)','bold','none','normal']
   }],
   symbolInstances: [
   {
      id: 'btn_Start',
      symbolName: 'btn_Start'
   }   ]
   },
   states: {
      "Base State": {
         "${_Promotion_bg}": [
            ["style", "top", '0px'],
            ["style", "opacity", '0'],
            ["style", "left", '0px']
         ],
         "${_Text2Copy}": [
            ["subproperty", "textShadow.blur", '10px'],
            ["subproperty", "textShadow.offsetH", '0px'],
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["subproperty", "textShadow.offsetV", '1px'],
            ["style", "left", '1025px'],
            ["style", "font-size", '48px'],
            ["style", "top", '134px'],
            ["style", "height", '68px'],
            ["subproperty", "textShadow.color", 'rgba(7,63,104,1.00)'],
            ["style", "width", '654px']
         ],
         "${_Text2}": [
            ["subproperty", "textShadow.blur", '10px'],
            ["subproperty", "textShadow.offsetH", '0px'],
            ["style", "top", '90px'],
            ["subproperty", "textShadow.offsetV", '1px'],
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["subproperty", "textShadow.color", 'rgba(7,63,104,1.00)'],
            ["style", "left", '-340px'],
            ["style", "font-size", '36px']
         ],
         "${_badge_glow}": [
            ["style", "top", '67px'],
            ["transform", "scaleY", '0.17'],
            ["style", "display", 'none'],
            ["style", "left", '0px'],
            ["transform", "scaleX", '0.17']
         ],
         "${_badge_star}": [
            ["style", "top", '317px'],
            ["transform", "scaleY", '5'],
            ["transform", "scaleX", '5'],
            ["style", "opacity", '0'],
            ["style", "left", '446px']
         ],
         "${_btn_Start}": [
            ["style", "top", '653px'],
            ["style", "left", '422px'],
            ["style", "cursor", 'pointer']
         ],
         "${symbolSelector}": [
            ["style", "height", '652px'],
            ["style", "width", '1014px']
         ],
         "${_badge}": [
            ["style", "top", '222px'],
            ["transform", "scaleY", '2.18'],
            ["transform", "scaleX", '2.18'],
            ["style", "opacity", '0'],
            ["style", "left", '388px'],
            ["style", "display", 'none']
         ],
         "${_promotion_strip}": [
            ["style", "display", 'none'],
            ["transform", "scaleY", '0.01'],
            ["style", "left", '0px'],
            ["style", "top", '317px']
         ],
         "${_badge_starCopy}": [
            ["style", "top", '317px'],
            ["transform", "scaleY", '5'],
            ["transform", "scaleX", '5'],
            ["style", "opacity", '0'],
            ["style", "left", '509px']
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 3750,
         autoPlay: true,
         timeline: [
            { id: "eid37", tween: [ "transform", "${_badge_starCopy}", "scaleX", '1', { fromValue: '5'}], position: 2250, duration: 500, easing: "easeOutBack" },
            { id: "eid38", tween: [ "style", "${_badge_starCopy}", "opacity", '1', { fromValue: '0'}], position: 2250, duration: 500, easing: "easeOutBack" },
            { id: "eid15", tween: [ "transform", "${_badge_glow}", "scaleY", '1', { fromValue: '0.17'}], position: 2750, duration: 615, easing: "easeOutBack" },
            { id: "eid26", tween: [ "style", "${_badge}", "opacity", '1', { fromValue: '0'}], position: 1250, duration: 500, easing: "easeInOutBack" },
            { id: "eid36", tween: [ "style", "${_badge_star}", "opacity", '1', { fromValue: '0'}], position: 1750, duration: 500, easing: "easeOutBack" },
            { id: "eid7", tween: [ "transform", "${_promotion_strip}", "scaleY", '1', { fromValue: '0.01'}], position: 410, duration: 340, easing: "easeOutBack" },
            { id: "eid8", tween: [ "style", "${_promotion_strip}", "display", 'block', { fromValue: 'none'}], position: 410, duration: 0 },
            { id: "eid55", tween: [ "style", "${_Text2}", "left", '330px', { fromValue: '-340px'}], position: 750, duration: 250, easing: "easeInOutBack" },
            { id: "eid1", tween: [ "style", "${_btn_Start}", "left", '422px', { fromValue: '422px'}], position: 0, duration: 0 },
            { id: "eid46", tween: [ "style", "${_btn_Start}", "top", '563px', { fromValue: '653px'}], position: 3500, duration: 250, easing: "easeOutBack" },
            { id: "eid33", tween: [ "transform", "${_badge_star}", "scaleY", '1', { fromValue: '5'}], position: 1750, duration: 500, easing: "easeOutBack" },
            { id: "eid18", tween: [ "style", "${_badge}", "display", 'block', { fromValue: 'none'}], position: 1250, duration: 0, easing: "easeInOutBack" },
            { id: "eid13", tween: [ "style", "${_badge_glow}", "display", 'block', { fromValue: 'none'}], position: 2750, duration: 0 },
            { id: "eid22", tween: [ "transform", "${_badge}", "scaleX", '1', { fromValue: '2.18'}], position: 1250, duration: 500, easing: "easeInOutBack" },
            { id: "eid4", tween: [ "style", "${_Promotion_bg}", "opacity", '1', { fromValue: '0'}], position: 0, duration: 500, easing: "easeOutQuint" },
            { id: "eid32", tween: [ "transform", "${_badge_star}", "scaleX", '1', { fromValue: '5'}], position: 1750, duration: 500, easing: "easeOutBack" },
            { id: "eid54", tween: [ "style", "${_Text2Copy}", "left", '180px', { fromValue: '1025px'}], position: 1000, duration: 250, easing: "easeInOutBack" },
            { id: "eid14", tween: [ "transform", "${_badge_glow}", "scaleX", '1', { fromValue: '0.17'}], position: 2750, duration: 615, easing: "easeOutBack" },
            { id: "eid23", tween: [ "transform", "${_badge}", "scaleY", '1', { fromValue: '2.18'}], position: 1250, duration: 500, easing: "easeInOutBack" },
            { id: "eid39", tween: [ "transform", "${_badge_starCopy}", "scaleY", '1', { fromValue: '5'}], position: 2250, duration: 500, easing: "easeOutBack" }         ]
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
      type: 'text',
      rect: ['25px','7px','auto','auto','auto','auto'],
      id: 'Text',
      text: 'CONTINUE',
      align: 'center',
      font: ['Verdana, Geneva, sans-serif',20,'rgba(0,0,0,1)','700','none','']
   }],
   symbolInstances: [
   ]
   },
   states: {
      "Base State": {
         "${_Text}": [
            ["style", "top", '7px'],
            ["style", "text-align", 'center'],
            ["style", "font-weight", '700'],
            ["style", "font-family", 'Verdana, Geneva, sans-serif'],
            ["style", "left", '25px'],
            ["style", "font-size", '20px']
         ],
         "${_btn_Start_up}": [
            ["style", "left", '0px'],
            ["style", "top", '0px']
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
"btn_next": {
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
      rect: ['-8px','-8px','66px','66px','auto','auto'],
      borderRadius: ['50%','50%','50%','50%'],
      id: 'Ellipse',
      stroke: [0,'rgba(0,0,0,1)','none'],
      type: 'ellipse',
      fill: ['rgba(0,0,0,1.00)']
   },
   {
      id: 'btn_next',
      type: 'image',
      rect: ['0px','0px','49px','49px','auto','auto'],
      fill: ['rgba(0,0,0,0)','images/btn_next_up.png','0px','0px']
   }],
   symbolInstances: [
   ]
   },
   states: {
      "Base State": {
         "${symbolSelector}": [
            ["style", "height", '49px'],
            ["style", "width", '49px']
         ],
         "${_Ellipse}": [
            ["style", "height", '66px'],
            ["color", "background-color", 'rgba(0,0,0,1.00)'],
            ["style", "width", '66px']
         ],
         "${_btn_next}": [
            ["style", "left", '0px'],
            ["style", "top", '0px']
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 0,
         autoPlay: true,
         timeline: [
         ]
      }
   }
},
"Mission2_end": {
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
      id: 'BG152',
      type: 'rect',
      rect: ['340px','0px','auto','auto','auto','auto']
   },
   {
      id: 'promotion',
      type: 'rect',
      rect: ['340px','0px','auto','auto','auto','auto']
   },
   {
      id: 'btn_next',
      type: 'rect',
      cursor: ['pointer'],
      rect: ['1295px','593px','auto','auto','auto','auto']
   }],
   symbolInstances: [
   {
      id: 'BG152',
      symbolName: 'BG15'
   },
   {
      id: 'promotion',
      symbolName: 'promotion'
   },
   {
      id: 'btn_next',
      symbolName: 'btn_next'
   }   ]
   },
   states: {
      "Base State": {
         "${_btn_next}": [
            ["style", "display", 'block'],
            ["style", "cursor", 'pointer'],
            ["style", "left", '1295px'],
            ["style", "top", '593px']
         ],
         "${_BG152}": [
            ["style", "left", '340px'],
            ["style", "top", '0px']
         ],
         "${_promotion}": [
            ["style", "left", '340px'],
            ["style", "top", '0px']
         ],
         "${symbolSelector}": [
            ["style", "height", '692px'],
            ["style", "width", '2019px']
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 4000,
         autoPlay: false,
         timeline: [
            { id: "eid57", tween: [ "style", "${_btn_next}", "display", 'none', { fromValue: 'block'}], position: 500, duration: 0, easing: "easeInOutBack" },
            { id: "eid60", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_promotion}', [] ], ""], position: 0 },
            { id: "eid59", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${_promotion}', [0] ], ""], position: 250 }         ]
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
})(jQuery, AdobeEdge, "end2");
