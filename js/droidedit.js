var GetApp = function(){
	var selectors = {
		replaceFirst : 'pre.replace>p:first',
		replaceLast  : 'pre.replace>p:last'
	};
	var globals = {};
	return {
		init : function(){
			app = this;
			globals.dom = {};
			globals.dom.replaceFirst = $(selectors.replaceFirst);
			globals.dom.replaceLast = $(selectors.replaceLast);

			app.replacetext();
		},

		replacetext : function(){
			var dogSentence 	 =  'Dogs are the bane of my existence';
			var dogSentenceRep = dogSentence.replace('Dogs','Those blasted dogs');
			globals.dom.replaceFirst.html(dogSentence);
			globals.dom.replaceLast.html(dogSentenceRep);
		}
	}
}

$(document).ready(function(){
  var app = GetApp();
  app.init();
});