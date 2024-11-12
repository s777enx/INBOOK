var balance = localStorage.getItem('balance');


// Первоначальная установка баланса
if(null === balance){
    balance = 10000;
    localStorage.setItem('balance', balance);
    loadBal();
}else{
    loadBal();
}


// Функция загрузки баланса из локального хранилища
function loadBal(){
    balance = localStorage.getItem('balance');
    var balobj = document.getElementById('balance');
    balobj.innerHTML = "Баланс: " + balance + " руб.";
}


// Кнопка "Купить сейчас"
// Не позволяет покупать предметы с отрицательным балансом
// Не позволяет покупать "пустую" корзину
// Очищает корзину после покупки
$('#buynow').on('click', function(){
    var final = parseInt($('#finalprice').text());
    balance = parseInt(localStorage.getItem('balance'));
    if(final === 0){
        alert('Ваша корзина пуста!');
    }else{
        if(final > balance){
            alert('У вас недостаточно средств на счету');
        }else{
            balance = balance - final;
            localStorage.setItem('balance', balance);
            loadBal();
            $('#side').empty();
            recheckFPrice();
            alert('Покупка прошла успешно');
            if($('#side div').length > 0){
                $('#noaddbooks').css('display', 'none');
            }else{
                $('#noaddbooks').css('display', 'inherit');
            }
        }
    }
});

// Debug кнопка "+" (Находится около баланса)
// Добавляет +2500 руб. к балансу
$('#addmoney').on('click', function(){
    balance = parseInt(localStorage.getItem('balance'));
    balance = balance + 2500;
    localStorage.setItem('balance', balance);
    loadBal();
    
});