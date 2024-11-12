var cursort = 'ASC';


// Функция поиска книг / POST запрос HTML
// Находит книги по указанным фильтрам и сразу добавляет данные на сайт
// Показывает и скрывает информацию о пустом ответе (Нет книг)
function searchBooks(){
    var cursearch = $('#searchtab').val();
    var curcat = $('#category').val();
        
    var booksarr = [];
    var params = JSON.stringify({
        "filters": {
            "search": cursearch,
            "sortPrice": cursort,
            "categoryId": curcat
        }
    });
            var http = new XMLHttpRequest();
            var url = 'http://45.8.249.57/bookstore-api/books';
        
            http.open('POST', url, true);
        
            http.setRequestHeader('Content-type', 'application/json');
        
            http.onreadystatechange = function() {
                if(http.readyState == 4 && http.status == 200) {
                    booksarr = JSON.parse(http.responseText);
                    $('#shelf').empty();
                    booksarr.forEach(function(book, index){
                        $('#shelf').append("<div id='book" + index + "' class='singlebook'></div>");
                        $('#book' + index).append("<img src='" + booksarr[index].coverUrl + "'></img>");  
                        $('#book' + index).append("<h2 id='bookname'>" + booksarr[index].name + "</h2>");
                        $('#book' + index).append("<h3>" + booksarr[index].authorName + "</h3>");
                        $('#book' + index).append("<p class='price'><span id='price'>" + booksarr[index].price + "</span> руб.</p>");
                        $('#book' + index).append("<button id='buybook' class='buybook' name='" + index + "' onclick='buybook()' type='submit'>В корзину</button>")
                    });
                    if($('#shelf div').length > 0){
                        $('#nobooks').css('display', 'none');
                    }else{
                        $('#nobooks').css('display', 'inherit');
                    }
                }
            }
        
            http.send(params);
    };
    searchBooks();


// Моментальный поиск по каталогу
$('#searchtab').keyup(function (){
    cursearch = $(this).val();
    searchBooks();
});

// Фикс бага при очищении поиска через крестик
// Без него при нажатии крестика на поиске ничего не произойдет и поиск не сбросит фильтр до тех пор, пока не будет нажата какая-либо клавиша в поиске
function onClear(event) {
    cursearch = $(this).val();
    searchBooks();
}

const input = document.getElementById('searchtab');

input.addEventListener('click', () => {
    input.addEventListener('search', onClear);
    setTimeout(() => input.removeEventListener('search', onClear));
});


// Сортировка по цене
$('#sortout').on('click', function(){
    
    if(cursort === 'ASC'){
        cursort = 'DESC';
        $('img', this).addClass('flipped');
        searchBooks();
    }else{
        cursort = 'ASC';
        $('img', this).removeClass('flipped');
        searchBooks();
    }
});

