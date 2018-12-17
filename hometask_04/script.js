$(function(){
	$('.tabs .headers li').on('click', function(){
		$('.tabs .headers li.active').removeClass('active');
		$(this).addClass('active');
		$('.tabs .content').removeClass('active').eq($(this).index()).addClass('active');
	});
	
	$.ajax({
		url: 'ajax.json',
		dataType: 'json',
		success: function(cities){
			$.each(cities, function(i, city){
				$('<option>', { text: city }).appendTo('#townInput');
			});
			console.log(cities);
		},
		error: function(errorObj){
			console.log('Ошибка при загрузке списка городов (Перезагрузите страницу и попробуйте снова)',errorObj);
		}
	});
});