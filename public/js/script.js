"use strict";

var num;

$(document).ready(function() {
	// console.log(data);
	for (var i = 0; i < data.length; i++) {
		var value = data[i];
		// могут понадобиться
		var tools, code;
		var atls = '';
		if (value.assocProducts != '') {
			tools = value.assocProducts.split(';');
			for (var j = 0; j < tools.length; j++) {
				if (tools[j] != "") {
					atls += '<a href="#">'+tools[j]+'</a>,';
				};
			};
			atls = atls.slice(0, -1);
			atls = '<span class="bold">Могут понадобиться: </span>' + atls + '.';
		} else {
			console.log(value.assocProducts);
		};
		// console.log(atls);
		// 6значный код
		code = value.code;
		code = code.slice(-6);
		// console.log(code);
		// проверка цен на кол-во после запятой
		var price_ret = value.priceRetail;
		var price_ret_alt = value.priceRetailAlt;
		var price_gold = value.priceGold;
		var price_gold_alt = value.priceGoldAlt;
		price_ret = (price_ret % 1 !== 0) ? (price_ret = price_ret.toFixed(2)) : price_ret;
		price_ret_alt = (price_ret_alt % 1 !== 0) ? (price_ret_alt = price_ret_alt.toFixed(2)) : price_ret_alt;
		price_gold = (price_gold % 1 !== 0) ? (price_gold = price_gold.toFixed(2)) : price_gold;
		price_gold_alt = (price_gold_alt % 1 !== 0) ? (price_gold_alt = price_gold_alt.toFixed(2)) : price_gold_alt;
		// изменение изображения
		var img = value.primaryImageUrl;
		img = img.replace('.jpg', '_220x220_1.jpg');
		// id товара на кнопке в корзину
		var prod_id = value.productId;
		// содержание упаковки
		var ratio_alt = value.unitRatioAlt;
		ratio_alt = ratio_alt.toFixed(2);
		// item конструктор
		var item = '<div class="item">';
		item += '<div class="item-img"><img src="http:'+ img +'"></div>';
		item += '<div class="item-words">';
		item += '<div class="item-words-top"><div class="item-left-desc-code">Код: '+ code 
				+'</div><div class="item-right-status">Наличие</div></div>';
		item += '<div class="item-left"><div class="item-left-desc">';
		item += '<div class="item-left-desc-name"><a href="#">'+ value.title +'</a></div>';
		item += '<div class="item-left-desc-supp">'
				+ atls +'</div></div></div>';
		item += '<div class="item-right"><div class="right-div"><div class="item-right-money">';
		item += '<div class="item-right-money-card"><div class="item-right-money-card-desc">По карте клуба</div><div class="item-right-money-card-price">'
				+ price_gold_alt +'</div><div class="ruble"><i class="fas fa-ruble-sign fa-2x"></i></div></div>';
		item += '<div class="item-right-money-full"><div class="item-right-money-full-price">'
				+ price_ret_alt + '</div><div class="ruble"><i class="fas fa-ruble-sign fa-2x"></i></div></div></div>';
		item += '<div class="right-div-sub">';
		item += '<div class="item-right-points">Можно купить за <span>231,75</span> балла</div>';
		item += '<div class="item-right-mode">';
		item += '<div class="item-right-mode-one selected" data-price="'
				+ price_ret_alt +'" data-price-gold="'
				+ price_gold_alt +'"><span>За '+ value.unitAlt +'</span></div>';
		item += '<div class="item-right-mode-one" data-price="'
				+ price_ret +'" data-price-gold="'
				+ price_gold +'"><span>За '+ value.unit +'</span></div></div></div></div>';
		item += '<div class="item-right-info">';
		item += '<div class="item-right-info-sign"></div>';
		item += '<div class="item-right-info-words"><span>Продается упаковками:</span><span>'
				+ value.unitRatio +' '+ value.unit +' = '
				+ ratio_alt +' '+ value.unitAlt +'</span></div>';
		item += '<div class="item-right-info-angle"></div></div>';
		item += '<div class="item-right-buttons">';
		item += '<div class="item-right-buttons-count"><div class="item-right-buttons-count-one">1</div><div class="item-right-buttons-count-angles">'
				+ '<div class="angle-up"></div><div class="angle-down"></div></div></div>';
		item += '<div class="item-right-buttons-basket" data-prod-id="'
				+ value.productId +'"><div class="item-right-buttons-basket-sign"></div><div class="item-right-buttons-basket-in">в корзину</div></div>';
		item += '</div></div></div></div>';
		$(".warn").css('display', 'none');
		$(".whole").append(item);
	};
});

$('.whole').on('click', ".angle-up", function(){
	num = $(this).closest('.item-right-buttons-count').find('.item-right-buttons-count-one').html();
	if (num < 11) { //до 11ти ограничение
		num++;
		$(this).closest('.item-right-buttons-count').find('.item-right-buttons-count-one').html(num);
	};
});

$('.whole').on('click', ".angle-down", function(){
	num = $(this).closest('.item-right-buttons-count').find('.item-right-buttons-count-one').html();
	if (num > 1) {
		num--;
		$(this).closest('.item-right-buttons-count').find('.item-right-buttons-count-one').html(num);
	};
});

$(".whole").on('click', ".item-right-mode-one", function(){
	$(this).closest('.item-right-mode').find('.item-right-mode-one').removeClass("selected").eq($(this).index()).addClass("selected");
	$(this).closest('.item-right').find('.item-right-money-card-price').html($(this).closest('.item-right-mode').find('.selected').attr('data-price-gold'));
	$(this).closest('.item-right').find('.item-right-money-full-price').html($(this).closest('.item-right-mode').find('.selected').attr('data-price'));
});