var cart = [];


// Функция проверки и записи конечного счета
function recheckFPrice(){
    var citems = $('#side div').length;
    var fprice = 0;
    if(citems === 0){
        $('#finalprice').text(0);
    }else{
        for (var i = 0; i < citems; i++){
            let currentitem = $('#side').find('div').eq(i).attr('id');
            let prcsingle = parseInt($('#' + currentitem).find('#cartprice').text());
            fprice = fprice + prcsingle;
            $('#finalprice').text(fprice);
        }
    }
};


// Кнопка "В корзину"
// Присутствует подсчитывание штук в корзине и появление информации о пустой корзине
$('#shelf').on('click', '#buybook', function(){
    var bid = $(this).attr('name');
    var bn = $('#book' + bid).find('#bookname').text();
    var bprice = $('#book' + bid).find('#price').text();
    var bimg = $('#book' + bid).find('img').attr('src');



    if($('#side').find('#' + bid).length > 0){
        var itemcount = $('#' + bid).find('#cartcount').text();
        itemcount = parseInt(itemcount) + 1;
        var itemcountprice = $('#' + bid).find('#cartprice').text();
        itemcountprice = parseInt(itemcount) * parseInt(bprice);
        $('#' + bid).find('#cartcount').text(itemcount);
        $('#' + bid).find('#cartprice').text(itemcountprice + ' руб.');
        recheckFPrice();
    }else{
        $('#side').append("<div id='" + bid + "' class='cartbook'></div");
        $('#' + bid).append("<img id='cartimg' src='" + bimg + "'></img>");  
        $('#' + bid).append("<h2 id='cartbname'>" + bn + "</h2>");
        $('#' + bid).append("<h2><span id='cartcount'>" + 1 + "</span> шт.</h2>");
        $('#' + bid).append("<h3 id='cartprice'>" + bprice + " руб.</h3>");
        $('#' + bid).append("<span id='close' name='" + bid + "' style='cursor:pointer;'>X</span>");
        recheckFPrice()
    }
    if($('#side div').length > 0){
        $('#noaddbooks').css('display', 'none');
    }else{
        $('#noaddbooks').css('display', 'inherit');
    }
});


// Кнопка "X"
// Удаляет предмет из корзины поштучно, а затем вовсе
$('#side').on('click', '#close', function(){
    var cartbid = $(this).attr('name');
    var singleitem = parseInt($('#' + cartbid).find('#cartcount').text());

    if(singleitem === 1){
        $('#' + cartbid).remove();
        recheckFPrice()
    }else{
        var bprice = $('#book' + cartbid).find('#price').text();
        var itemcount = $('#' + cartbid).find('#cartcount').text();
        itemcount = parseInt(itemcount) - 1;
        var itemcountprice = $('#' + cartbid).find('#cartprice').text();
        itemcountprice = parseInt(itemcount) * parseInt(bprice);
        $('#' + cartbid).find('#cartcount').text(itemcount);
        $('#' + cartbid).find('#cartprice').text(itemcountprice + ' руб.');
        recheckFPrice()
    }
    if($('#side div').length > 0){
        $('#noaddbooks').css('display', 'none');
    }else{
        $('#noaddbooks').css('display', 'inherit');
    }
});