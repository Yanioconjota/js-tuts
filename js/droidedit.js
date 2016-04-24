var GetApp = function(){
	var selectors = {
		buttonClear  		 : 'button.clear',
		replaceFirst 		 : 'pre.replace>p:first',
		replaceLast  		 : 'pre.replace>p:last',
		scoopsTxtWh	 	   : 'pre.scoops-while>p',
		scoopsActWh	 		 : 'a.scoops-while',
		scoopsTxtIf	 		 : 'pre.scoops-if>p',
		scoopsTxtIfVal	 : 'input[name="insertScoops"]',
		scoopsActIf	 		 : 'a.scoops-if'
	};
	var globals = {};
	return {
		init : function(){
			app = this;
			globals.dom = {};
			globals.dom.buttonClear 	 = $(selectors.buttonClear);
			globals.dom.replaceFirst 	 = $(selectors.replaceFirst);
			globals.dom.replaceLast 	 = $(selectors.replaceLast);
			globals.dom.scoopsTxtWh 	 = $(selectors.scoopsTxtWh);
			globals.dom.scoopsActWh 	 = $(selectors.scoopsActWh);
			globals.dom.scoopsTxtIf 	 = $(selectors.scoopsTxtIf);
			globals.dom.scoopsActIf 	 = $(selectors.scoopsActIf);
			globals.dom.scoopsTxtIfVal = $(selectors.scoopsTxtIfVal);

			app.replacetext();
			app.bindEvents();
		},

		bindEvents : function(){

			app = this;
			globals.dom.buttonClear.bind('click',function(){
				$(this).parent().find('pre>p').html('');
				console.log('this is cleared!');
			});

			globals.dom.scoopsActWh.bind('click',function(){
				globals.dom.scoopsTxtWh.html('');
				app.scoopsWhile();
			});

			globals.dom.scoopsActIf.bind('click',function(){
				globals.dom.scoopsTxtIf.html('');
				app.scoopsIf();
			});

		},


		replacetext : function(){
			var dogSentence 	 =  'Dogs are the bane of my existence';
			var dogSentenceRep = dogSentence.replace('Dogs','Those blasted dogs');
			globals.dom.replaceFirst.html(dogSentence);
			globals.dom.replaceLast.html(dogSentenceRep);
		},

		scoopsWhile : function(){
			var scoops = 5;
			while (scoops > 0) {
				globals.dom.scoopsTxtWh.append("Another scoop<br>");
				scoops = scoops - 1;
			}globals.dom.scoopsTxtWh.append("Life without icecream isn't the same");
		},

		scoopsIf : function(){
			console.log(scoops);
			var scoops = globals.dom.scoopsTxtIfVal.val();
			if (scoops >= 5) {
				globals.dom.scoopsTxtIf.append("That's a lot of ice cream");
			} else if (scoops == 4) {
				globals.dom.scoopsTxtIf.append('Eat faster, the ice cream is goint to melt!');
			} else if (scoops == 3) {
				globals.dom.scoopsTxtIf.append('Ice cream is running low');
			} else if (scoops == 2) {
				globals.dom.scoopsTxtIf.append('Going once');
			} else if (scoops == 2) {
				globals.dom.scoopsTxtIf.append('Going twice');
			}
		}
	}
}

$(document).ready(function(){
  var app = GetApp();
  app.init();
});