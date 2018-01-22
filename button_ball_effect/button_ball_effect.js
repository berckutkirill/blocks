$(document).on('click', '.js-basket_add', function(e) {
	e.preventDefault();
	var button = $(this);
	var form = $('#'+$(button).parents('.example_wrap').find('form').attr('id'))[0];// change to nessesary form
	var formData = new FormData(form);
	$.ajax({
		url: "",
		type: "POST",
		data: formData,
		contentType: false,
		processData: false,
		beforeSend: function() {

		},
		success: function() {

			var buttonParams = {
                        borderR: $(button).css('border-radius'),
                        bgc: $(button).css('background-color'),
                        height: $(button).outerHeight(),
                        width: $(button).outerWidth(),
                        top: $(button).offset().top,
                        left: $(button).offset().left
                  }
                  var basket_aim = {
                        height: $('.js_top_basket_aim').outerHeight(),
                        width: $('.js_top_basket_aim').outerWidth(),
                        top: $('.js_top_basket_aim').offset().top,
                        left: $('.js_top_basket_aim').offset().left
                  };
                  var buttonNext = {
                        button: $(button).siblings('.ball_button-go'),
                        bgc: $(button).siblings('.ball_button-go').css('background-color'),
                        borderR: $(button).siblings('.ball_button-go').css('border-radius'),
                        height: $(button).siblings('.ball_button-go').outerHeight(),
                        width: $(button).siblings('.ball_button-go').outerWidth()
                  }

                  $(button).addClass('animated').css({
                        'height': buttonParams.height,
                        'width': buttonParams.width
                  }).animate({
                        'border-radius':buttonParams.height/2,
                        'width':buttonParams.height
                  }, 300, function() {
                        $(button).css({
                              'border-radius': '50%'
                        })
                        var newBut = $(button).clone().appendTo('body');
                        newBut.css({
                              'position':'absolute',
                              'top': buttonParams.top,
                              'left': buttonParams.left
                        }).animate({
                              'height': basket_aim.height,
                              'width': basket_aim.width,
                              'top': basket_aim.top,
                              'left': basket_aim.left
                        }, function() {
                              newBut.fadeOut().remove();
                              $('.js_top_basket_aim').text(function(i, ot){
                                    return parseInt(ot)+1;
                              });
                              if($('.js_top_basket_aim').hasClass('ball_invisible')){
                                    $('.js_top_basket_aim').removeClass('ball_invisible')
                              };
                              $(buttonNext.button).addClass('ball_invisible').removeClass('ball_hidden');
                              $(button).css({
                                    'background':buttonNext.bgc,
                                    'border-radius':buttonNext.height/2
                              }).animate({
                                    'height': buttonNext.height,
                                    'width': buttonNext.width,
                                    'border-radius': buttonNext.borderR
                              }, function() {
                                    $(buttonNext.button).css({'z-index': '4'}).animate({'opacity': 1}, 50, function() {
                                          $(button).animate({'opacity':'0'},300); /*for FF*/
                                    });
                              })
                        })
                  })
            }
      });
})