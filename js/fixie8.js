function fixIe(){
	$("label").bind("click",function(){

		var checked = $(this).find("input");

		if (checked.is(":checked")){

			if (checked.attr("type")=="radio") {
				checked.closest(".radio-group").find("label").removeClass("checked");
			};

			$(this).addClass("checked");
		} else {
			$(this).removeClass("checked");
		};
	})
}

$( document ).ready(function() {
    fixIe();
});