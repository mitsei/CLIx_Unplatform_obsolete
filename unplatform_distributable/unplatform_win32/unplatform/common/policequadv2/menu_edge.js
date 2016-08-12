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
            id:'menu_bg',
            type:'image',
            rect:['0px','0px','1014px','650px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"menu_bg.jpg",'0px','0px']
         },
         {
            id:'menu_btn_1',
            type:'rect',
            rect:['111px','71','auto','auto','auto','auto'],
            opacity:0.4
         },
         {
            id:'menu_btn_2',
            type:'rect',
            rect:['307','71','auto','auto','auto','auto'],
            cursor:['pointer']
         },
         {
            id:'menu_btn_3',
            type:'rect',
            rect:['689','286','auto','auto','auto','auto'],
            opacity:0.4
         },
         {
            id:'menu_btn_4',
            type:'rect',
            rect:['866','393','auto','auto','auto','auto'],
            opacity:0.4
         },
         {
            id:'btn_LAUNCH',
            type:'rect',
            rect:['359','562','auto','auto','auto','auto'],
            cursor:['pointer']
         },
         {
            id:'audioControl',
            type:'rect',
            rect:['895','4','auto','auto','auto','auto']
         },
         {
            id:'level_02',
            display:'none',
            type:'rect',
            rect:['0px','0','auto','auto','auto','auto'],
            userClass:"M1L1"
         }],
         symbolInstances: [
         {
            id:'menu_btn_1',
            symbolName:'menu_btn_1'
         },
         {
            id:'level_02',
            symbolName:'level_02'
         },
         {
            id:'audioControl',
            symbolName:'audioControl'
         },
         {
            id:'menu_btn_3',
            symbolName:'menu_btn_3'
         },
         {
            id:'menu_btn_2',
            symbolName:'menu_btn_2'
         },
         {
            id:'btn_LAUNCH',
            symbolName:'btn_LAUNCH'
         },
         {
            id:'menu_btn_4',
            symbolName:'menu_btn_4'
         }
         ]
      },
   states: {
      "Base State": {
         "${_menu_btn_1}": [
            ["style", "top", '671px'],
            ["style", "opacity", '0.4'],
            ["style", "left", '111px']
         ],
         "${_menu_bg}": [
            ["style", "left", '0px'],
            ["style", "top", '0px']
         ],
         "${_btn_LAUNCH}": [
            ["style", "top", '542px'],
            ["style", "opacity", '0'],
            ["style", "cursor", 'pointer'],
            ["style", "display", 'block']
         ],
         "${_Stage}": [
            ["color", "background-color", 'rgba(255,255,255,1)'],
            ["style", "width", '1014px'],
            ["style", "height", '650px'],
            ["style", "overflow", 'hidden']
         ],
         "${_menu_btn_3}": [
            ["style", "top", '671px'],
            ["style", "opacity", '0.4'],
            ["style", "left", '507px']
         ],
         "${_menu_btn_4}": [
            ["style", "top", '671px'],
            ["style", "opacity", '0.4'],
            ["style", "left", '708px']
         ],
         "${_level_02}": [
            ["style", "display", 'none'],
            ["style", "left", '0px']
         ],
         "${_menu_btn_2}": [
            ["style", "top", '671px'],
            ["style", "cursor", 'pointer']
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 2500,
         autoPlay: false,
         timeline: [
            { id: "eid23", tween: [ "style", "${_menu_btn_1}", "top", '71px', { fromValue: '671px'}], position: 0, duration: 500, easing: "easeOutBack" },
            { id: "eid33", tween: [ "style", "${_btn_LAUNCH}", "opacity", '1', { fromValue: '0'}], position: 1250, duration: 375, easing: "easeOutBack" },
            { id: "eid24", tween: [ "style", "${_btn_LAUNCH}", "display", 'none', { fromValue: 'block'}], position: 1250, duration: 0, easing: "easeOutBack" },
            { id: "eid49", tween: [ "style", "${_btn_LAUNCH}", "display", 'block', { fromValue: 'none'}], position: 1750, duration: 0 },
            { id: "eid21", tween: [ "style", "${_menu_btn_3}", "top", '71px', { fromValue: '671px'}], position: 500, duration: 500, easing: "easeOutBack" },
            { id: "eid43", tween: [ "style", "${_level_02}", "display", 'none', { fromValue: 'none'}], position: 0, duration: 0 },
            { id: "eid44", tween: [ "style", "${_level_02}", "display", 'none', { fromValue: 'none'}], position: 1750, duration: 0 },
            { id: "eid42", tween: [ "style", "${_level_02}", "display", 'none', { fromValue: 'none'}], position: 2500, duration: 0, easing: "easeOutCirc" },
            { id: "eid20", tween: [ "style", "${_menu_btn_4}", "top", '71px', { fromValue: '671px'}], position: 750, duration: 500, easing: "easeOutBack" },
            { id: "eid30", tween: [ "style", "${_btn_LAUNCH}", "top", '562px', { fromValue: '542px'}], position: 1250, duration: 375, easing: "easeOutBack" },
            { id: "eid22", tween: [ "style", "${_menu_btn_2}", "top", '71px', { fromValue: '671px'}], position: 250, duration: 500, easing: "easeOutBack" }         ]
      }
   }
},
"audioControl": {
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
      id: 'audioControl_bg',
      type: 'image',
      rect: ['40px','0px','75px','23px','auto','auto'],
      fill: ['rgba(0,0,0,0)','images/audioControl_bg.svg','0px','0px']
   },
   {
      font: ['Tahoma, Geneva, sans-serif',10,'rgba(239,96,0,1.00)','700','none','normal'],
      type: 'text',
      id: 'txt_OFF',
      text: 'OFF',
      align: 'right',
      rect: ['86px','4px','auto','auto','auto','auto']
   },
   {
      font: ['Tahoma, Geneva, sans-serif',10,'rgba(147,215,0,1.00)','700','none','normal'],
      type: 'text',
      id: 'txt_ON',
      text: 'ON',
      align: 'right',
      rect: ['52px','4px','auto','auto','auto','auto']
   },
   {
      id: 'audioControl_switch',
      type: 'image',
      rect: ['42px','2px','36px','20px','auto','auto'],
      fill: ['rgba(0,0,0,0)','images/audioControl_switch.svg','0px','0px']
   },
   {
      font: ['Arial, Helvetica, sans-serif',14,'rgba(255,255,255,1.00)','normal','none',''],
      type: 'text',
      id: 'txt_Audio',
      text: 'Audio',
      align: 'right',
      rect: ['0px','3px','auto','auto','auto','auto']
   }],
   symbolInstances: [
   ]
   },
   states: {
      "Base State": {
         "${_audioControl_switch}": [
            ["style", "left", '42px'],
            ["style", "top", '2px']
         ],
         "${symbolSelector}": [
            ["style", "height", '23px'],
            ["style", "width", '115px']
         ],
         "${_audioControl_bg}": [
            ["style", "top", '0px'],
            ["style", "left", '40px']
         ],
         "${_txt_Audio}": [
            ["style", "top", '3px'],
            ["style", "text-align", 'right'],
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["style", "left", '0px'],
            ["style", "font-size", '14px']
         ],
         "${_txt_OFF}": [
            ["style", "top", '4px'],
            ["style", "font-weight", '700'],
            ["color", "color", 'rgba(239,96,0,1.00)'],
            ["style", "font-family", 'Tahoma, Geneva, sans-serif'],
            ["style", "left", '86px'],
            ["style", "font-size", '10px']
         ],
         "${_txt_ON}": [
            ["style", "top", '4px'],
            ["style", "font-weight", '700'],
            ["color", "color", 'rgba(147,215,0,1.00)'],
            ["style", "font-family", 'Tahoma, Geneva, sans-serif'],
            ["style", "left", '52px'],
            ["style", "font-size", '10px']
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 250,
         autoPlay: false,
         labels: {
            "Audio_ON": 0,
            "Audio_OFF": 250
         },
         timeline: [
            { id: "eid6", tween: [ "style", "${_audioControl_switch}", "left", '75px', { fromValue: '42px'}], position: 0, duration: 250 }         ]
      }
   }
},
"menu_btn_1": {
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
      id: 'menu_button_bg',
      type: 'image',
      rect: ['0px','0px','213px','529px','auto','auto'],
      fill: ['rgba(0,0,0,0)','images/menu_button_bg.png','0px','0px']
   },
   {
      type: 'text',
      rect: ['50px','403px','114px','auto','auto','auto'],
      id: 'Text3',
      text: 'MISSION ONE',
      align: 'center',
      font: ['Tahoma, Geneva, sans-serif',28,'rgba(255,255,255,1)','normal','none','normal']
   },
   {
      type: 'text',
      rect: ['151px','19px','13px','auto','auto','auto'],
      id: 'Text4',
      text: '1',
      align: 'center',
      font: ['Tahoma, Geneva, sans-serif',28,'rgba(255,255,255,1.00)','normal','none','normal']
   },
   {
      type: 'text',
      rect: ['166px','21px','13px','auto','auto','auto'],
      id: 'Text4Copy',
      text: 'st',
      align: 'center',
      font: ['Tahoma, Geneva, sans-serif',16,'rgba(255,255,255,1.00)','normal','none','normal']
   },
   {
      rect: ['137px','70px','auto','auto','auto','auto'],
      transform: [[0,0],['90']],
      font: ['Tahoma, Geneva, sans-serif',19,'rgba(255,255,255,1.00)','normal','none','normal'],
      id: 'Text5',
      text: 'MISSION',
      align: 'center',
      type: 'text'
   }],
   symbolInstances: [
   ]
   },
   states: {
      "Base State": {
         "${_menu_button_bg}": [
            ["style", "left", '0px'],
            ["style", "top", '0px']
         ],
         "${symbolSelector}": [
            ["style", "height", '529px'],
            ["style", "width", '213px']
         ],
         "${_Text3}": [
            ["style", "top", '403px'],
            ["style", "text-align", 'center'],
            ["style", "width", '114px'],
            ["style", "font-family", 'Tahoma, Geneva, sans-serif'],
            ["style", "left", '50px'],
            ["style", "font-size", '28px']
         ],
         "${_Text4Copy}": [
            ["style", "top", '21px'],
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["style", "font-size", '16px'],
            ["style", "left", '166px'],
            ["style", "width", '13px']
         ],
         "${_Text5}": [
            ["style", "top", '70px'],
            ["transform", "rotateZ", '90deg'],
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["style", "left", '137px'],
            ["style", "font-size", '19px']
         ],
         "${_Text4}": [
            ["style", "top", '19px'],
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["style", "left", '151px'],
            ["style", "width", '13px']
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
"menu_btn_2": {
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
      id: 'menu_button2_up',
      type: 'image',
      rect: ['0px','0px','213px','529px','auto','auto'],
      fill: ['rgba(0,0,0,0)','images/menu_button2_up.png','0px','0px']
   },
   {
      font: ['Tahoma, Geneva, sans-serif',28,'rgba(255,255,255,1)','normal','none','normal'],
      type: 'text',
      id: 'Text3',
      text: 'WATER ROBBERS',
      align: 'center',
      rect: ['50px','403px','114px','auto','auto','auto']
   },
   {
      font: ['Tahoma, Geneva, sans-serif',28,'rgba(255,255,255,1.00)','normal','none','normal'],
      type: 'text',
      id: 'Text4Copy3',
      text: '2',
      align: 'center',
      rect: ['151px','19px','13px','auto','auto','auto']
   },
   {
      font: ['Tahoma, Geneva, sans-serif',16,'rgba(255,255,255,1.00)','normal','none','normal'],
      type: 'text',
      id: 'Text4Copy2',
      text: 'nd',
      align: 'center',
      rect: ['166px','21px','13px','auto','auto','auto']
   },
   {
      type: 'text',
      rect: ['137px','70px','auto','auto','auto','auto'],
      align: 'center',
      id: 'Text5',
      text: 'MISSION',
      font: ['Tahoma, Geneva, sans-serif',19,'rgba(255,255,255,1.00)','normal','none','normal'],
      transform: [[0,0],['90']]
   }],
   symbolInstances: [
   ]
   },
   states: {
      "Base State": {
         "${_menu_button2_up}": [
            ["style", "left", '0px'],
            ["style", "top", '0px']
         ],
         "${symbolSelector}": [
            ["style", "height", '529px'],
            ["style", "width", '213px']
         ],
         "${_Text3}": [
            ["style", "top", '403px'],
            ["style", "text-align", 'center'],
            ["style", "font-size", '28px'],
            ["style", "font-family", 'Tahoma, Geneva, sans-serif'],
            ["style", "left", '50px'],
            ["style", "width", '114px']
         ],
         "${_Text4Copy2}": [
            ["style", "top", '21px'],
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["style", "width", '13px'],
            ["style", "left", '166px'],
            ["style", "font-size", '16px']
         ],
         "${_Text4Copy3}": [
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["style", "top", '19px'],
            ["style", "left", '151px'],
            ["style", "width", '13px']
         ],
         "${_Text5}": [
            ["style", "top", '70px'],
            ["transform", "rotateZ", '90deg'],
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["style", "left", '137px'],
            ["style", "font-size", '19px']
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
"menu_btn_3": {
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
      id: 'menu_button_bg',
      type: 'image',
      rect: ['0px','0px','213px','529px','auto','auto'],
      fill: ['rgba(0,0,0,0)','images/menu_button_bg.png','0px','0px']
   },
   {
      type: 'text',
      rect: ['50px','403px','114px','auto','auto','auto'],
      id: 'Text3',
      text: 'MISSION THREE',
      align: 'center',
      font: ['Tahoma, Geneva, sans-serif',28,'rgba(255,255,255,1)','normal','none','normal']
   },
   {
      type: 'text',
      rect: ['151px','19px','13px','auto','auto','auto'],
      id: 'Text4',
      text: '3',
      align: 'center',
      font: ['Tahoma, Geneva, sans-serif',28,'rgba(255,255,255,1.00)','normal','none','normal']
   },
   {
      type: 'text',
      rect: ['166px','21px','13px','auto','auto','auto'],
      id: 'Text4Copy',
      text: 'rd',
      align: 'center',
      font: ['Tahoma, Geneva, sans-serif',16,'rgba(255,255,255,1.00)','normal','none','normal']
   },
   {
      rect: ['137px','70px','auto','auto','auto','auto'],
      transform: [[0,0],['90']],
      font: ['Tahoma, Geneva, sans-serif',19,'rgba(255,255,255,1.00)','normal','none','normal'],
      id: 'Text5',
      text: 'MISSION',
      align: 'center',
      type: 'text'
   }],
   symbolInstances: [
   ]
   },
   states: {
      "Base State": {
         "${_menu_button_bg}": [
            ["style", "left", '0px'],
            ["style", "top", '0px']
         ],
         "${symbolSelector}": [
            ["style", "height", '529px'],
            ["style", "width", '213px']
         ],
         "${_Text3}": [
            ["style", "top", '403px'],
            ["style", "text-align", 'center'],
            ["style", "font-size", '28px'],
            ["style", "font-family", 'Tahoma, Geneva, sans-serif'],
            ["style", "left", '50px'],
            ["style", "width", '114px']
         ],
         "${_Text4}": [
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["style", "top", '19px'],
            ["style", "left", '151px'],
            ["style", "width", '13px']
         ],
         "${_Text5}": [
            ["style", "top", '70px'],
            ["transform", "rotateZ", '90deg'],
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["style", "left", '137px'],
            ["style", "font-size", '19px']
         ],
         "${_Text4Copy}": [
            ["style", "top", '21px'],
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["style", "width", '13px'],
            ["style", "left", '166px'],
            ["style", "font-size", '16px']
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
"menu_btn_4": {
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
      id: 'menu_button_bg',
      type: 'image',
      rect: ['0px','0px','213px','529px','auto','auto'],
      fill: ['rgba(0,0,0,0)','images/menu_button_bg.png','0px','0px']
   },
   {
      type: 'text',
      rect: ['50px','403px','114px','auto','auto','auto'],
      id: 'Text3',
      text: 'MISSION FOUR',
      align: 'center',
      font: ['Tahoma, Geneva, sans-serif',28,'rgba(255,255,255,1)','normal','none','normal']
   },
   {
      type: 'text',
      rect: ['151px','19px','13px','auto','auto','auto'],
      id: 'Text4',
      text: '4',
      align: 'center',
      font: ['Tahoma, Geneva, sans-serif',28,'rgba(255,255,255,1.00)','normal','none','normal']
   },
   {
      type: 'text',
      rect: ['166px','21px','13px','auto','auto','auto'],
      id: 'Text4Copy',
      text: 'th',
      align: 'center',
      font: ['Tahoma, Geneva, sans-serif',16,'rgba(255,255,255,1.00)','normal','none','normal']
   },
   {
      rect: ['137px','70px','auto','auto','auto','auto'],
      transform: [[0,0],['90']],
      font: ['Tahoma, Geneva, sans-serif',19,'rgba(255,255,255,1.00)','normal','none','normal'],
      id: 'Text5',
      text: 'MISSION',
      align: 'center',
      type: 'text'
   }],
   symbolInstances: [
   ]
   },
   states: {
      "Base State": {
         "${_menu_button_bg}": [
            ["style", "left", '0px'],
            ["style", "top", '0px']
         ],
         "${symbolSelector}": [
            ["style", "height", '529px'],
            ["style", "width", '213px']
         ],
         "${_Text3}": [
            ["style", "top", '403px'],
            ["style", "text-align", 'center'],
            ["style", "width", '114px'],
            ["style", "font-family", 'Tahoma, Geneva, sans-serif'],
            ["style", "left", '50px'],
            ["style", "font-size", '28px']
         ],
         "${_Text4Copy}": [
            ["style", "top", '21px'],
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["style", "font-size", '16px'],
            ["style", "left", '166px'],
            ["style", "width", '13px']
         ],
         "${_Text5}": [
            ["style", "top", '70px'],
            ["transform", "rotateZ", '90deg'],
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["style", "left", '137px'],
            ["style", "font-size", '19px']
         ],
         "${_Text4}": [
            ["style", "top", '19px'],
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["style", "left", '151px'],
            ["style", "width", '13px']
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
"btn_LAUNCH": {
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
      rect: ['-32px','-473px','172px','490px','auto','auto'],
      id: 'Rectangle',
      stroke: [0,'rgba(0,0,0,1)','none'],
      type: 'rect',
      fill: ['rgba(192,192,192,0.00)']
   },
   {
      id: 'btn_LAUNCH_up',
      type: 'image',
      rect: ['0px','0px','109px','33px','auto','auto'],
      fill: ['rgba(0,0,0,0)','images/btn_LAUNCH_up.png','0px','0px']
   },
   {
      font: ['Tahoma, Geneva, sans-serif',16,'rgba(0,0,0,1.00)','700','none','normal'],
      type: 'text',
      id: 'Text6',
      text: 'LAUNCH',
      align: 'center',
      rect: ['21px','7px','auto','auto','auto','auto']
   }],
   symbolInstances: [
   ]
   },
   states: {
      "Base State": {
         "${_Text6}": [
            ["style", "top", '7px'],
            ["color", "color", 'rgba(0,0,0,1.00)'],
            ["style", "font-weight", '700'],
            ["style", "left", '21px'],
            ["style", "font-size", '16px']
         ],
         "${_btn_LAUNCH_up}": [
            ["style", "left", '0px'],
            ["style", "top", '0px']
         ],
         "${_Rectangle}": [
            ["style", "height", '490px'],
            ["color", "background-color", 'rgba(192,192,192,0.00)']
         ],
         "${symbolSelector}": [
            ["style", "height", '33px'],
            ["style", "width", '109px']
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
"btn_back": {
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
      id: 'btn_back',
      type: 'image',
      rect: ['0px','0px','49px','49px','auto','auto'],
      fill: ['rgba(0,0,0,0)','images/btn_back_up.png','0px','0px']
   }],
   symbolInstances: [
   ]
   },
   states: {
      "Base State": {
         "${_btn_back}": [
            ["style", "left", '0px'],
            ["style", "top", '0px']
         ],
         "${_Ellipse}": [
            ["color", "background-color", 'rgba(0,0,0,1)'],
            ["style", "height", '66px'],
            ["style", "width", '66px']
         ],
         "${symbolSelector}": [
            ["style", "height", '49px'],
            ["style", "width", '49px']
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
"BG11": {
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
      id: 'BG11',
      type: 'image',
      rect: ['0px','0px','1014px','650px','auto','auto'],
      fill: ['rgba(0,0,0,0)','images/BG11.jpg','0px','0px']
   },
   {
      rect: ['155px','277px','288px','1px','auto','auto'],
      id: 'Rectangle',
      stroke: [0,'rgb(0, 0, 0)','none'],
      type: 'rect',
      fill: ['rgba(255,255,255,0.40)']
   },
   {
      rect: ['155px','289px','288px','124px','auto','auto'],
      font: ['Verdana, Geneva, sans-serif',14,'rgba(255,255,255,1.00)','normal','none','normal'],
      id: 'Text6',
      text: 'Here is your mission: Question G2 and use the responses to identify the culprit and release the innocent.<br><br>Click next to move onto the instruction Screen.<br>',
      align: 'left',
      type: 'text'
   },
   {
      rect: ['155px','227px','288px','39px','auto','auto'],
      font: ['Verdana, Geneva, sans-serif',34,'rgba(255,255,255,1.00)','normal','none','normal'],
      id: 'Text6Copy',
      text: 'MISSION BRIEF',
      align: 'center',
      type: 'text'
   }],
   symbolInstances: [
   ]
   },
   states: {
      "Base State": {
         "${_BG11}": [
            ["style", "left", '0px'],
            ["style", "top", '0px']
         ],
         "${symbolSelector}": [
            ["style", "height", '650px'],
            ["style", "width", '1014px']
         ],
         "${_Text6Copy}": [
            ["style", "top", '227px'],
            ["style", "font-size", '34px'],
            ["style", "text-align", 'center'],
            ["style", "height", '39px'],
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["style", "font-family", 'Verdana, Geneva, sans-serif'],
            ["style", "left", '155px'],
            ["style", "width", '288px']
         ],
         "${_Rectangle}": [
            ["color", "background-color", 'rgba(255,255,255,0.40)'],
            ["style", "height", '1px']
         ],
         "${_Text6}": [
            ["style", "top", '289px'],
            ["style", "text-align", 'left'],
            ["style", "height", '124px'],
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["style", "left", '155px'],
            ["style", "width", '288px']
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
"BG10": {
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
      id: 'BG10',
      type: 'image',
      rect: ['0px','0px','1014px','650px','auto','auto'],
      fill: ['rgba(0,0,0,0)','images/BG10.jpg','0px','0px']
   },
   {
      id: 'Group2',
      type: 'group',
      rect: ['42','34','319','265','auto','auto'],
      c: [
      {
         rect: ['0px','0px','305px','131px','auto','auto'],
         borderRadius: ['10px','10px','10px','10px'],
         id: 'RoundRect',
         stroke: [0,'rgb(0, 0, 0)','none'],
         type: 'rect',
         fill: ['rgba(255,255,255,1)']
      },
      {
         transform: [[0,0],['-206'],[],['0.745','1.454']],
         id: 'pointer',
         type: 'image',
         rect: ['220px','13px','35px','120px','auto','auto'],
         fill: ['rgba(0,0,0,0)','images/pointer.svg','0px','0px']
      },
      {
         font: ['Verdana, Geneva, sans-serif',14,'rgba(0,0,0,1.00)','normal','none','normal'],
         type: 'text',
         id: 'Text5',
         text: 'The robot on duty, G2 witnessed the robbery. I’ve called G2 over to answer our questions. But G2 can only reply with “Yes”, “No” and “I don’t know.” You know that, right?<br>',
         align: 'left',
         rect: ['25px','21px','255px','90px','auto','auto']
      }]
   },
   {
      id: 'Group3',
      type: 'group',
      rect: ['117','196','101','138','auto','auto'],
      c: [
      {
         transform: [[0,0],['-160'],[],['0.745','1.092']],
         id: 'pointerCopy',
         type: 'image',
         rect: ['52px','-80px','35px','120px','auto','auto'],
         fill: ['rgba(0,0,0,0)','images/pointer.svg','0px','0px']
      },
      {
         rect: ['0px','0px','101px','38px','auto','auto'],
         borderRadius: ['10px','10px','10px','10px'],
         id: 'RoundRectCopy',
         stroke: [0,'rgb(0, 0, 0)','none'],
         type: 'rect',
         fill: ['rgba(255,255,255,1)']
      },
      {
         type: 'text',
         rect: ['20px','10px','68px','19px','auto','auto'],
         align: 'center',
         id: 'Text5Copy',
         text: 'Yes Sir.',
         font: ['Verdana, Geneva, sans-serif',14,'rgba(0,0,0,1.00)','normal','none','normal'],
         transform: []
      }]
   }],
   symbolInstances: [
   ]
   },
   states: {
      "Base State": {
         "${_RoundRectCopy}": [
            ["style", "top", '0px'],
            ["style", "height", '38px'],
            ["style", "left", '0px'],
            ["style", "width", '101px']
         ],
         "${_RoundRect}": [
            ["style", "height", '131px'],
            ["style", "top", '0px'],
            ["style", "left", '0px'],
            ["style", "width", '305px']
         ],
         "${_BG10}": [
            ["style", "left", '0px'],
            ["style", "top", '0px']
         ],
         "${symbolSelector}": [
            ["style", "height", '652px'],
            ["style", "width", '1014px']
         ],
         "${_pointer}": [
            ["style", "top", '13px'],
            ["transform", "scaleY", '1.45422'],
            ["transform", "rotateZ", '-206deg'],
            ["transform", "scaleX", '0.74471'],
            ["style", "height", '120px'],
            ["style", "left", '220px'],
            ["style", "-webkit-transform-origin", [53.14,89.1], {valueTemplate:'@@0@@% @@1@@%'} ],
            ["style", "-moz-transform-origin", [53.14,89.1],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "-ms-transform-origin", [53.14,89.1],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "msTransformOrigin", [53.14,89.1],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "-o-transform-origin", [53.14,89.1],{valueTemplate:'@@0@@% @@1@@%'}]
         ],
         "${_Text5Copy}": [
            ["color", "color", 'rgba(0,0,0,1.00)'],
            ["style", "left", '20px'],
            ["style", "width", '68px'],
            ["style", "top", '10px'],
            ["transform", "scaleY", '1'],
            ["style", "font-style", 'normal'],
            ["style", "height", '19px'],
            ["transform", "scaleX", '1'],
            ["style", "text-align", 'center']
         ],
         "${_Text5}": [
            ["style", "top", '21px'],
            ["style", "text-align", 'left'],
            ["color", "color", 'rgba(0,0,0,1.00)'],
            ["style", "height", '90px'],
            ["style", "font-style", 'normal'],
            ["style", "left", '25px'],
            ["style", "width", '255px']
         ],
         "${_pointerCopy}": [
            ["style", "top", '-80px'],
            ["transform", "scaleY", '1.09167'],
            ["transform", "rotateZ", '-160deg'],
            ["transform", "scaleX", '0.74471'],
            ["style", "-webkit-transform-origin", [53.14,89.1], {valueTemplate:'@@0@@% @@1@@%'} ],
            ["style", "-moz-transform-origin", [53.14,89.1],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "-ms-transform-origin", [53.14,89.1],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "msTransformOrigin", [53.14,89.1],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "-o-transform-origin", [53.14,89.1],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "left", '52px'],
            ["style", "height", '120px']
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
"level_02": {
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
      id: 'BG09',
      type: 'rect',
      rect: ['0','0','auto','auto','auto','auto']
   },
   {
      id: 'BG10',
      type: 'rect',
      rect: ['-2px','0px','auto','auto','auto','auto']
   },
   {
      id: 'BG12',
      type: 'rect',
      rect: ['-2px','0px','auto','auto','auto','auto']
   },
   {
      id: 'btn_next',
      type: 'rect',
      cursor: ['pointer'],
      rect: ['953px','593px','auto','auto','auto','auto']
   },
   {
      rect: ['953px','593px','auto','auto','auto','auto'],
      id: 'btn_nextCopy',
      display: 'none',
      cursor: ['pointer'],
      type: 'rect'
   },
   {
      rect: ['8px','593px','auto','auto','auto','auto'],
      id: 'btn_back',
      display: 'none',
      cursor: ['pointer'],
      type: 'rect'
   }],
   symbolInstances: [
   {
      id: 'btn_back',
      symbolName: 'btn_back'
   },
   {
      id: 'BG12',
      symbolName: 'BG11'
   },
   {
      id: 'BG09',
      symbolName: 'BG09'
   },
   {
      id: 'BG10',
      symbolName: 'BG10'
   },
   {
      id: 'btn_nextCopy',
      symbolName: 'btn_next'
   },
   {
      id: 'btn_next',
      symbolName: 'btn_next'
   }   ]
   },
   states: {
      "Base State": {
         "${_BG10}": [
            ["style", "left", '1012px'],
            ["style", "top", '0px']
         ],
         "${symbolSelector}": [
            ["style", "height", '652px'],
            ["style", "width", '2026px']
         ],
         "${_BG12}": [
            ["style", "left", '1012px'],
            ["style", "top", '0px']
         ],
         "${_btn_back}": [
            ["style", "top", '593px'],
            ["style", "display", 'none'],
            ["style", "left", '8px'],
            ["style", "cursor", 'pointer']
         ],
         "${_btn_nextCopy}": [
            ["style", "top", '304px'],
            ["style", "display", 'none'],
            ["style", "left", '461px'],
            ["style", "cursor", 'pointer']
         ],
         "${_btn_next}": [
            ["style", "display", 'block'],
            ["style", "cursor", 'pointer'],
            ["style", "left", '953px'],
            ["style", "top", '593px']
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 750,
         autoPlay: false,
         timeline: [
            { id: "eid34", tween: [ "style", "${_btn_back}", "display", 'none', { fromValue: 'none'}], position: 0, duration: 0, easing: "easeOutCirc" },
            { id: "eid35", tween: [ "style", "${_btn_back}", "display", 'block', { fromValue: 'none'}], position: 500, duration: 0, easing: "easeOutCirc" },
            { id: "eid36", tween: [ "style", "${_btn_next}", "left", '953px', { fromValue: '953px'}], position: 0, duration: 0 },
            { id: "eid37", tween: [ "style", "${_btn_next}", "left", '461px', { fromValue: '953px'}], position: 750, duration: 0 },
            { id: "eid40", tween: [ "style", "${_BG12}", "left", '-2px', { fromValue: '1012px'}], position: 500, duration: 250, easing: "easeOutCirc" },
            { id: "eid41", tween: [ "style", "${_BG10}", "left", '-2px', { fromValue: '1012px'}], position: 250, duration: 250, easing: "easeOutCirc" },
            { id: "eid45", tween: [ "style", "${_btn_next}", "display", 'none', { fromValue: 'block'}], position: 750, duration: 0 },
            { id: "eid47", tween: [ "style", "${_btn_nextCopy}", "display", 'none', { fromValue: 'none'}], position: 0, duration: 0 },
            { id: "eid48", tween: [ "style", "${_btn_nextCopy}", "display", 'block', { fromValue: 'none'}], position: 750, duration: 0 },
            { id: "eid38", tween: [ "style", "${_btn_next}", "top", '593px', { fromValue: '593px'}], position: 0, duration: 0 },
            { id: "eid39", tween: [ "style", "${_btn_next}", "top", '304px', { fromValue: '593px'}], position: 750, duration: 0 }         ]
      }
   }
},
"BG09": {
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
      id: 'BG09',
      type: 'image',
      rect: ['0px','0px','1014px','650px','auto','auto'],
      fill: ['rgba(0,0,0,0)','images/BG09.jpg','0px','0px']
   },
   {
      rect: ['29px','27px','167px','46px','auto','auto'],
      id: 'Rectangle',
      stroke: [0,'rgba(0,0,0,1)','none'],
      type: 'rect',
      fill: ['rgba(255,255,255,1.00)']
   },
   {
      rect: ['515px','24px','374px','30px','auto','auto'],
      id: 'Rectangle2',
      stroke: [0,'rgb(0, 0, 0)','none'],
      type: 'rect',
      fill: ['rgba(255,255,255,1)']
   },
   {
      rect: ['42px','31px','142px','38px','auto','auto'],
      id: 'Text',
      text: 'Geo is appointed as Inspector now. <br>',
      font: ['Verdana, Geneva, sans-serif',14,'rgba(0,0,0,1)','normal','none','italic'],
      type: 'text'
   },
   {
      rect: ['525px','29px','354px','20px','auto','auto'],
      font: ['Verdana, Geneva, sans-serif',14,'rgba(0,0,0,1)','normal','none','italic'],
      id: 'Text2',
      text: 'Meanwhile there have been a series of robberies. ',
      align: 'left',
      type: 'text'
   },
   {
      rect: ['523px','585px','374px','auto','auto','auto'],
      font: ['Verdana, Geneva, sans-serif',14,'rgba(255,255,255,1.00)','normal','none','italic'],
      id: 'Text3',
      text: 'A gang of Judics is stealing water cans from shops, offices and homes.<br>',
      align: 'left',
      type: 'text'
   },
   {
      id: 'Group',
      type: 'group',
      rect: ['173','51px','249','147','auto','auto'],
      c: [
      {
         rect: ['67px','0px','182px','115px','auto','auto'],
         borderRadius: ['50%','50%','50%','50%'],
         id: 'Ellipse',
         stroke: [0,'rgb(0, 0, 0)','none'],
         type: 'ellipse',
         fill: ['rgba(255,255,255,1)']
      },
      {
         rect: ['20px','120px','22px','20px','auto','auto'],
         borderRadius: ['50%','50%','50%','50%'],
         id: 'Ellipse2Copy',
         stroke: [0,'rgb(0, 0, 0)','none'],
         type: 'ellipse',
         fill: ['rgba(255,255,255,1)']
      },
      {
         rect: ['46px','93px','33px','30px','auto','auto'],
         borderRadius: ['50%','50%','50%','50%'],
         id: 'Ellipse2Copy2',
         stroke: [0,'rgb(0, 0, 0)','none'],
         type: 'ellipse',
         fill: ['rgba(255,255,255,1)']
      },
      {
         rect: ['87px','16px','142px','87px','auto','auto'],
         font: ['Verdana, Geneva, sans-serif',14,'rgba(0,0,0,1.00)','normal','none','normal'],
         id: 'Text4',
         text: 'Geo is good. But we have a new set of cases. Will he be able to perform the same?<br>',
         align: 'center',
         type: 'text'
      },
      {
         rect: ['0px','137px','11px','10px','auto','auto'],
         borderRadius: ['50%','50%','50%','50%'],
         id: 'Ellipse2',
         stroke: [0,'rgb(0, 0, 0)','none'],
         type: 'ellipse',
         fill: ['rgba(255,255,255,1)']
      }]
   }],
   symbolInstances: [
   ]
   },
   states: {
      "Base State": {
         "${_Rectangle2}": [
            ["style", "top", '24px'],
            ["style", "left", '515px'],
            ["style", "height", '30px']
         ],
         "${_Text3}": [
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["style", "top", '585px'],
            ["style", "left", '523px'],
            ["style", "width", '374px']
         ],
         "${_Ellipse2}": [
            ["style", "left", '0px'],
            ["style", "top", '137px']
         ],
         "${_Text2}": [
            ["style", "height", '20px'],
            ["style", "top", '29px'],
            ["style", "left", '525px'],
            ["style", "width", '354px']
         ],
         "${_Ellipse2Copy2}": [
            ["style", "top", '93px'],
            ["style", "height", '30px'],
            ["style", "left", '46px'],
            ["style", "width", '33px']
         ],
         "${_BG09}": [
            ["style", "left", '0px'],
            ["style", "top", '0px']
         ],
         "${_Ellipse}": [
            ["style", "left", '67px'],
            ["style", "top", '0px']
         ],
         "${_Text}": [
            ["style", "top", '31px'],
            ["style", "font-size", '14px'],
            ["style", "font-style", 'italic'],
            ["style", "font-family", 'Verdana, Geneva, sans-serif'],
            ["style", "left", '42px'],
            ["style", "width", '142px']
         ],
         "${symbolSelector}": [
            ["style", "height", '650px'],
            ["style", "width", '1014px']
         ],
         "${_Ellipse2Copy}": [
            ["style", "height", '20px'],
            ["style", "top", '120px'],
            ["style", "left", '20px'],
            ["style", "width", '22px']
         ],
         "${_Rectangle}": [
            ["style", "height", '46px'],
            ["style", "width", '167px']
         ],
         "${_Group}": [
            ["style", "top", '51px']
         ],
         "${_Text4}": [
            ["style", "top", '16px'],
            ["style", "text-align", 'center'],
            ["style", "height", '87px'],
            ["style", "font-style", 'normal'],
            ["color", "color", 'rgba(0,0,0,1.00)'],
            ["style", "left", '87px'],
            ["style", "width", '142px']
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
})(jQuery, AdobeEdge, "book");
