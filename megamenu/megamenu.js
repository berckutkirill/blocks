
$('.js_megamenu_show').on('click', function(e) {
	e.stopPropagation();
	e.preventDefault();
	$('.megamenu').addClass('open');
	if(document.body.clientHeight > window.innerHeight) {
		pageScrollStop();
	}
	$('body').addClass('menu_open');

})

$('.js_megamenu_hide, body').on('click', function(e) {
	closeMegaMenu();
})
$('body').on('keydown', function(e) {
	if(e.keyCode == 27) {
		closeMegaMenu();
	}
})
$('.megamenu').on('click', function(e){
	e.stopPropagation();
})
function closeMegaMenu() {
	$('.megamenu').removeClass('open');
	$('body').removeClass('menu_open');
	if(document.body.clientHeight > window.innerHeight) {
		pageScrollGo();
	}
}



/* hide/show scroll*/
function pageScrollStop(list) {
	var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;
    if($('.fixed_screen').length && $('.fixed_screen').hasClass('open')) {
    	document.body.style.overflow='hidden'; 
    	if(isMac) {
            // document.body.style.paddingRight='15px';
        } else {
        	$('body').children().not('.fixed_screen').css('padding-right', '17px');
        }	
    }
}

function pageScrollGo() {
	document.body.style.overflow='auto'; 
	if($('.fixed_screen').length) {
		$('body').children().not('.fixed_screen').css('padding-right', '0');
	}
}