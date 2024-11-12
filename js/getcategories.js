var curcat = [];

// Функция GET запроса HTML
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

// Парсинг результата в JSON и добавление опций в виде категорий
curcat = JSON.parse(httpGet('http://45.8.249.57/bookstore-api/books/categories'));
curcat.forEach(function(category, index){
    $('#category').append("<option value='" + curcat[index].id + "'>" + curcat[index].name + "</option>");
});