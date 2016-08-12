/***********************
* Adobe Edge Animate Composition Actions
*
* Edit this file with caution, being careful to preserve 
* function signatures and comments starting with 'Edge' to maintain the 
* ability to interact with these actions from within Adobe Edge Animate
*
***********************/
(function($, Edge, compId){
var Composition = Edge.Composition, Symbol = Edge.Symbol; // aliases for commonly used Edge classes

   //Edge symbol: 'stage'
   (function(symbolName) {
      
      
   })("stage");
   //Edge symbol end:'stage'

   //=========================================================
   
   //Edge symbol: 'btn_Start'
   (function(symbolName) {   
   
   })("btn_Start");
   //Edge symbol end:'btn_Start'

   //=========================================================
   
   //Edge symbol: 'match_mc'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 500, function(sym, e) {
         // play the timeline from the given position (ms or label)
         sym.play(000);

      });
      //Edge binding end

   })("match_mc");
   //Edge symbol end:'match_mc'

   //=========================================================
   
   //Edge symbol: 'm02_feedback'
   (function(symbolName) {   
   
   })("m02_feedback");
   //Edge symbol end:'m02_feedback'

   //=========================================================
   
   //Edge symbol: 'questionField'
   (function(symbolName) {   
   
   })("questionField");
   //Edge symbol end:'questionField'

   //=========================================================
   
   //Edge symbol: 'Symbol_1'
   (function(symbolName) {   
   
   })("Symbol_1");
   //Edge symbol end:'Symbol_1'

})(jQuery, AdobeEdge, "feedback");