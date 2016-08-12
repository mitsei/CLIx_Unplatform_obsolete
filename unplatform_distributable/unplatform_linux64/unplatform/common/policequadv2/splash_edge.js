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
            id:'splash_bg',
            type:'image',
            rect:['0px','0px','1014px','652px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"splash_bg.jpg",'0px','0px']
         },
         {
            id:'logo_ship',
            type:'image',
            rect:['131px','103px','227px','191px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"logo_ship.png",'0px','0px']
         },
         {
            id:'logo_earth',
            type:'image',
            rect:['373px','213px','251px','232px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"logo_earth.png",'0px','0px']
         },
         {
            id:'logo_shapes',
            type:'image',
            rect:['373px','213px','251px','232px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"logo_shapes.png",'0px','0px']
         },
         {
            id:'logo_GeoInspector',
            type:'image',
            rect:['527px','159px','211px','283px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"logo_GeoInspector.png",'0px','0px']
         },
         {
            id:'logo_title_Quad',
            type:'image',
            rect:['508px','354px','249px','109px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"logo_title_Quad.png",'0px','0px']
         },
         {
            id:'logo_title_Police',
            type:'image',
            rect:['250px','354px','259px','93px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"logo_title_Police.png",'0px','0px']
         },
         {
            id:'btn_Start',
            type:'rect',
            rect:['832','598','auto','auto','auto','auto'],
            cursor:['pointer']
         },
         {
            id:'btn_Instructions',
            type:'rect',
            rect:['12','598','auto','auto','auto','auto']
         }],
         symbolInstances: [
         {
            id:'btn_Instructions',
            symbolName:'btn_Instructions'
         },
         {
            id:'btn_Start',
            symbolName:'btn_Start'
         }
         ]
      },
   states: {
      "Base State": {
         "${_logo_GeoInspector}": [
            ["style", "-webkit-transform-origin", [27.96,85.87], {valueTemplate:'@@0@@% @@1@@%'} ],
            ["style", "-moz-transform-origin", [27.96,85.87],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "-ms-transform-origin", [27.96,85.87],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "msTransformOrigin", [27.96,85.87],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "-o-transform-origin", [27.96,85.87],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "top", '126px'],
            ["transform", "scaleY", '0.22638'],
            ["transform", "scaleX", '0.22638'],
            ["style", "height", '365px'],
            ["style", "opacity", '0'],
            ["style", "left", '527px'],
            ["style", "width", '180px']
         ],
         "${_splash_bg}": [
            ["style", "top", '0px'],
            ["style", "opacity", '0'],
            ["style", "left", '0px'],
            ["style", "height", '652px']
         ],
         "${_logo_earth}": [
            ["style", "top", '224px'],
            ["transform", "rotateZ", '10deg'],
            ["style", "opacity", '0'],
            ["style", "left", '374px'],
            ["style", "-webkit-transform-origin", [62.71,46.83], {valueTemplate:'@@0@@% @@1@@%'} ],
            ["style", "-moz-transform-origin", [62.71,46.83],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "-ms-transform-origin", [62.71,46.83],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "msTransformOrigin", [62.71,46.83],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "-o-transform-origin", [62.71,46.83],{valueTemplate:'@@0@@% @@1@@%'}]
         ],
         "${_logo_title_Quad}": [
            ["style", "left", '1018px'],
            ["style", "top", '354px']
         ],
         "${_logo_title_Police}": [
            ["style", "left", '-270px'],
            ["style", "top", '354px']
         ],
         "${_btn_Start}": [
            ["style", "left", '1022px'],
            ["style", "cursor", 'pointer']
         ],
         "${_Stage}": [
            ["color", "background-color", 'rgba(0,0,0,1.00)'],
            ["style", "width", '1014px'],
            ["style", "height", '652px'],
            ["style", "overflow", 'hidden']
         ],
         "${_logo_ship}": [
            ["style", "top", '103px'],
            ["transform", "scaleY", '0.23348'],
            ["transform", "rotateZ", '10deg'],
            ["transform", "scaleX", '0.23348'],
            ["style", "opacity", '0'],
            ["style", "left", '131px'],
            ["style", "-webkit-transform-origin", [0,0], {valueTemplate:'@@0@@% @@1@@%'} ],
            ["style", "-moz-transform-origin", [0,0],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "-ms-transform-origin", [0,0],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "msTransformOrigin", [0,0],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "-o-transform-origin", [0,0],{valueTemplate:'@@0@@% @@1@@%'}]
         ],
         "${_btn_Instructions}": [
            ["style", "left", '-177px']
         ],
         "${_logo_shapes}": [
            ["style", "top", '213px'],
            ["style", "opacity", '0'],
            ["style", "left", '373px'],
            ["transform", "rotateZ", '20deg']
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 3385,
         autoPlay: false,
         timeline: [
            { id: "eid22", tween: [ "style", "${_logo_shapes}", "opacity", '1', { fromValue: '0'}], position: 750, duration: 250 },
            { id: "eid42", tween: [ "style", "${_logo_earth}", "-webkit-transform-origin", [62.71,46.83], { valueTemplate: '@@0@@% @@1@@%', fromValue: [62.71,46.83]}], position: 375, duration: 0, easing: "easeOutCirc" },
            { id: "eid284", tween: [ "style", "${_logo_earth}", "-moz-transform-origin", [62.71,46.83], { valueTemplate: '@@0@@% @@1@@%', fromValue: [62.71,46.83]}], position: 375, duration: 0, easing: "easeOutCirc" },
            { id: "eid285", tween: [ "style", "${_logo_earth}", "-ms-transform-origin", [62.71,46.83], { valueTemplate: '@@0@@% @@1@@%', fromValue: [62.71,46.83]}], position: 375, duration: 0, easing: "easeOutCirc" },
            { id: "eid286", tween: [ "style", "${_logo_earth}", "msTransformOrigin", [62.71,46.83], { valueTemplate: '@@0@@% @@1@@%', fromValue: [62.71,46.83]}], position: 375, duration: 0, easing: "easeOutCirc" },
            { id: "eid287", tween: [ "style", "${_logo_earth}", "-o-transform-origin", [62.71,46.83], { valueTemplate: '@@0@@% @@1@@%', fromValue: [62.71,46.83]}], position: 375, duration: 0, easing: "easeOutCirc" },
            { id: "eid52", tween: [ "transform", "${_logo_GeoInspector}", "scaleY", '1', { fromValue: '0.22638'}], position: 1402, duration: 260, easing: "easeOutBack" },
            { id: "eid207", tween: [ "style", "${_logo_GeoInspector}", "height", '365px', { fromValue: '365px'}], position: 3385, duration: 0 },
            { id: "eid44", tween: [ "style", "${_logo_earth}", "top", '224px', { fromValue: '224px'}], position: 375, duration: 0, easing: "easeOutCirc" },
            { id: "eid41", tween: [ "transform", "${_logo_earth}", "rotateZ", '0deg', { fromValue: '10deg'}], position: 0, duration: 750, easing: "easeOutCirc" },
            { id: "eid3", tween: [ "style", "${_splash_bg}", "opacity", '1', { fromValue: '0'}], position: 0, duration: 500, easing: "easeOutCirc" },
            { id: "eid47", tween: [ "transform", "${_logo_ship}", "rotateZ", '0deg', { fromValue: '10deg'}], position: 250, duration: 360, easing: "easeInExpo" },
            { id: "eid31", tween: [ "style", "${_logo_earth}", "opacity", '1', { fromValue: '0'}], position: 0, duration: 750, easing: "easeOutCirc" },
            { id: "eid14", tween: [ "style", "${_logo_ship}", "-webkit-transform-origin", [0,0], { valueTemplate: '@@0@@% @@1@@%', fromValue: [0,0]}], position: 250, duration: 0 },
            { id: "eid288", tween: [ "style", "${_logo_ship}", "-moz-transform-origin", [0,0], { valueTemplate: '@@0@@% @@1@@%', fromValue: [0,0]}], position: 250, duration: 0 },
            { id: "eid289", tween: [ "style", "${_logo_ship}", "-ms-transform-origin", [0,0], { valueTemplate: '@@0@@% @@1@@%', fromValue: [0,0]}], position: 250, duration: 0 },
            { id: "eid290", tween: [ "style", "${_logo_ship}", "msTransformOrigin", [0,0], { valueTemplate: '@@0@@% @@1@@%', fromValue: [0,0]}], position: 250, duration: 0 },
            { id: "eid291", tween: [ "style", "${_logo_ship}", "-o-transform-origin", [0,0], { valueTemplate: '@@0@@% @@1@@%', fromValue: [0,0]}], position: 250, duration: 0 },
            { id: "eid28", tween: [ "style", "${_logo_title_Quad}", "left", '508px', { fromValue: '1018px'}], position: 1086, duration: 316, easing: "easeOutBack" },
            { id: "eid63", tween: [ "style", "${_logo_GeoInspector}", "top", '80px', { fromValue: '126px'}], position: 1402, duration: 260, easing: "easeOutBack" },
            { id: "eid85", tween: [ "style", "${_btn_Start}", "left", '832px', { fromValue: '1022px'}], position: 2250, duration: 210, easing: "easeOutBack" },
            { id: "eid16", tween: [ "transform", "${_logo_ship}", "scaleY", '1', { fromValue: '0.23348'}], position: 250, duration: 360, easing: "easeInExpo" },
            { id: "eid67", tween: [ "style", "${_logo_GeoInspector}", "opacity", '1', { fromValue: '0'}], position: 1402, duration: 260, easing: "easeOutBack" },
            { id: "eid27", tween: [ "style", "${_logo_title_Police}", "left", '250px', { fromValue: '-270px'}], position: 750, duration: 336, easing: "easeOutBack" },
            { id: "eid206", tween: [ "style", "${_logo_GeoInspector}", "width", '180px', { fromValue: '180px'}], position: 3385, duration: 0 },
            { id: "eid43", tween: [ "style", "${_logo_earth}", "left", '374px', { fromValue: '374px'}], position: 375, duration: 0, easing: "easeOutCirc" },
            { id: "eid19", tween: [ "style", "${_logo_ship}", "opacity", '1', { fromValue: '0'}], position: 250, duration: 360, easing: "easeInExpo" },
            { id: "eid50", tween: [ "style", "${_logo_GeoInspector}", "-webkit-transform-origin", [27.96,85.87], { valueTemplate: '@@0@@% @@1@@%', fromValue: [27.96,85.87]}], position: 1402, duration: 0, easing: "easeOutCirc" },
            { id: "eid292", tween: [ "style", "${_logo_GeoInspector}", "-moz-transform-origin", [27.96,85.87], { valueTemplate: '@@0@@% @@1@@%', fromValue: [27.96,85.87]}], position: 1402, duration: 0, easing: "easeOutCirc" },
            { id: "eid293", tween: [ "style", "${_logo_GeoInspector}", "-ms-transform-origin", [27.96,85.87], { valueTemplate: '@@0@@% @@1@@%', fromValue: [27.96,85.87]}], position: 1402, duration: 0, easing: "easeOutCirc" },
            { id: "eid294", tween: [ "style", "${_logo_GeoInspector}", "msTransformOrigin", [27.96,85.87], { valueTemplate: '@@0@@% @@1@@%', fromValue: [27.96,85.87]}], position: 1402, duration: 0, easing: "easeOutCirc" },
            { id: "eid295", tween: [ "style", "${_logo_GeoInspector}", "-o-transform-origin", [27.96,85.87], { valueTemplate: '@@0@@% @@1@@%', fromValue: [27.96,85.87]}], position: 1402, duration: 0, easing: "easeOutCirc" },
            { id: "eid84", tween: [ "style", "${_btn_Instructions}", "left", '12px', { fromValue: '-177px'}], position: 2000, duration: 210, easing: "easeOutBack" },
            { id: "eid38", tween: [ "transform", "${_logo_shapes}", "rotateZ", '0deg', { fromValue: '20deg'}], position: 750, duration: 250, easing: "easeOutExpo" },
            { id: "eid58", tween: [ "transform", "${_logo_GeoInspector}", "scaleX", '1', { fromValue: '0.22638'}], position: 1402, duration: 260, easing: "easeOutBack" },
            { id: "eid15", tween: [ "transform", "${_logo_ship}", "scaleX", '1', { fromValue: '0.23348'}], position: 250, duration: 360, easing: "easeInExpo" }         ]
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
      text: 'Let\'s Start',
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
"btn_Instructions": {
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
      id: 'btn_Instructions_up',
      type: 'image',
      rect: ['0px','0px','170px','39px','auto','auto'],
      fill: ['rgba(0,0,0,0)','images/btn_Instructions_up.png','0px','0px']
   },
   {
      rect: ['32px','11px','auto','auto','auto','auto'],
      font: ['Verdana, Geneva, sans-serif',16,'rgba(0,0,0,1)','700','none',''],
      id: 'Text',
      text: 'Instructions',
      align: 'center',
      type: 'text'
   }],
   symbolInstances: [
   ]
   },
   states: {
      "Base State": {
         "${_Text}": [
            ["style", "top", '11px'],
            ["style", "text-align", 'center'],
            ["style", "font-family", 'Verdana, Geneva, sans-serif'],
            ["style", "font-weight", 'bold'],
            ["style", "left", '32px'],
            ["style", "font-size", '16px']
         ],
         "${_btn_Instructions_up}": [
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
}
};


Edge.registerCompositionDefn(compId, symbols, fonts, resources);

/**
 * Adobe Edge DOM Ready Event Handler
 */
$(window).ready(function() {
     Edge.launchComposition(compId);
});
})(jQuery, AdobeEdge, "splash");
