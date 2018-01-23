$(document).ready(function() {
	if($('.slider_item__priceContainer').length) {
		$('.slider_item__priceContainer').each(function() {
			$(this).find('.slider_item__price-new').text($(this).data('price-new').toLocaleString('ru-RU',{useGrouping:true}));
			if($(this).data('price-old') > 0) {
				$(this).addClass('onsale');
				$(this).find('.slider_item__price-old').text($(this).data('price-old').toLocaleString('ru-RU',{useGrouping:true}));
			}
		});
	}
})

/*slider*/
function slider(slider_id) {
	var sliderContent = $(slider_id+" .slider_content");
	var slider_items = $(slider_id+" .slider_item");
	var slider_item_width = $(slider_id).find(".slider_item").width();
	var slider_item_quantity = $(slider_id+" .slider_item").length;
	var sliderPosition = ($(slider_id).hasClass("cyclical") ? 1 : 0);

	if(slider_item_quantity == 1) {
		$(".slider_control_item").hide();
	}

	if(!$(slider_id).hasClass("cyclical")) {
		if(sliderPosition == 0) {
			$(slider_id+" .slider_control_item.left").addClass("disabled");
		} else if (sliderPosition == slider_item_quantity - 1) {
			$(slider_id+" .slider_control_item.right").addClass("disabled");
		}
	} else {
		$(slider_items).eq(0).clone().appendTo(sliderContent);
		$(slider_items).eq(slider_item_quantity-1).clone().prependTo(sliderContent);
		$(sliderContent).css({left:(-slider_item_width*sliderPosition)+"px"});
	}

	$(document).on("click", slider_id+" .slider_control_item:not(.disabled)", function() {
		if(!sliderContent.is(':animated')) {
			if($(this).hasClass("right")){
				sliderPosition++;
				if(sliderPosition == slider_item_quantity - 1 && !$(slider_id).hasClass("cyclical")) {
					$(this).addClass("disabled");
				}
				if(sliderPosition == slider_item_quantity+1) {
					$(sliderContent).addClass("animated").animate({"left":(-slider_item_width*sliderPosition)+"px"}, 400, function() {
						sliderPosition = 1;
						$(sliderContent).removeClass("animated");
						$(sliderContent).css({left:(-slider_item_width*sliderPosition)+"px"}).attr("data-slposition",sliderPosition);
					});
					return;
				}
			} else {
				sliderPosition--;
				if(sliderPosition == 0) {
					if($(slider_id).hasClass("cyclical")) {
						$(sliderContent).addClass("animated").animate({"left":(-slider_item_width*sliderPosition)+"px"}, 400, function() {
							sliderPosition = slider_item_quantity;
							$(sliderContent).removeClass("animated");
							$(sliderContent).css({left:(-slider_item_width*sliderPosition)+"px"}).attr("data-slposition",sliderPosition);
						});
						return;
					} else {
						$(this).addClass("disabled");
					}
				}
			}
			$(this).siblings(".slider_control_item").removeClass("disabled");
			$(sliderContent).addClass("animated").animate({"left":(-slider_item_width*sliderPosition)+"px"}, 400, function() {
				$(sliderContent).removeClass("animated");
			}).attr("data-slposition",sliderPosition);
		}
	});
	$(document).on("mouseover", ".slider_control_item", function() {
		if($(this).hasClass('right')) {
			$(this).find(".js_tooltip").text($(slider_id+" .slider_item").eq(sliderPosition+1).data("slide-title"));
		} else {
			$(this).find(".js_tooltip").text($(slider_id+" .slider_item").eq(sliderPosition-1).data("slide-title"));
		}

	});
	$(document).on("click", ".slider_link .slider_content_wrap", function() {
		var selected_slide = $(this).find(".slider_item").eq($(this).children(".slider_content").attr("data-slposition")|| 1)
		location.assign((selected_slide).find("a").attr("href"));
	})
}


//controls tooltip
$(".js_tooltipOwner").on("mouseenter", function() {
	var tooltip = $(this).find(".js_tooltip");
	if(!$(tooltip).is(':animated')){
		$(tooltip).css('display', 'block');
		if($(tooltip).hasClass('js_tooltip-side')) {
			$(tooltip).animate({ opacity: 0, top: "0" }, 0, 'swing');
			$(tooltip).animate({ opacity: 1, top: "50%" }, 200, 'swing');
		} else {
			$(tooltip).animate({ opacity: 0, top: "85%" }, 0, 'swing');
			$(tooltip).animate({ opacity: 1, top: "100%" }, 200, 'swing');
		}
		
	}
})
$(".js_tooltipOwner").on("mouseleave", function() {
	var tooltip = $(this).find(".js_tooltip");
	if($(tooltip).hasClass('.js_tooltip-side')) {
		$(tooltip).animate({ opacity: 0, top: "-50%" }, 120, 'swing', function() {
			$(tooltip).css('display', 'none');
		});
	} else {
		$(tooltip).animate({ opacity: 0, top: "85%" }, 120, 'swing', function() {
			$(tooltip).css('display', 'none');
		});
	}
	
})