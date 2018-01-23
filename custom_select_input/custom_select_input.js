$(".js_selectBlock").on("click", function (e) {
	var selectList = $(this).find(".js_selectList");
	var totalHeight = 0;
	if (!$(selectList).hasClass('open')) {
		$(selectList).children("li").each(function() {
			totalHeight += $(this).outerHeight();
		});
		$(selectList).addClass('open').css('height', totalHeight);
	} else {
		$(selectList).removeClass('open').css('height', '0');
	}
});

$('.js_selectBlock').on('blur', function() {
	$(this).find('.js_selectList.open').removeClass('open').css('height', '0');
});

$('[data-selectValue]').on('click', function(e) {
	e.stopPropagation();
	var selectBlock = $(this).parents('.js_selectBlock');
	$(selectBlock).find('.customSelect__indicationValue').text($(this).text());
	$(selectBlock).find('[type="hidden"]').val($(this).attr('data-selectValue'));
	$(this).parents('.js_selectBlock').blur();
})