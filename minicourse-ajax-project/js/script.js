
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr+', '+cityStr;
    $greeting.text('Do you wnt to live at'+address+'?');
    var streetviewURL = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location='+address+'';
    $body.append('<img class="bgimg" src="'+streetviewURL+'">');
     
    // load streetview

    // YOUR CODE GOES HERE!



//     $.getJSON( "ajax/test.json", function( data ) {
//   var items = [];
//   $.each( data, function( key, val ) {
//     items.push( "<li id='" + key + "'>" + val + "</li>" );
//   });
 
//   $( "<ul/>", {
//     "class": "my-new-list",
//     html: items.join( "" )
//   }).appendTo( "body" );
// });

var url = "http://export.arxiv.org/api/query?search_query=all:electron&start=0&max_results=10";

//     var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
// url += '?' + $.param({
//   'api-key': "9fd4432d7f844efbbf07624769918b83",
//   'q':cityStr,
//   'sort': 'newest'
// });
$.getJSON(url, function(data){
	$nytHeaderElem.text('New York Times artcles about'+cityStr);

	articles=data.response.docs;
	for (var i = 0; i < articles.length; i++) {
		var article =articles[i];
		$nytElem.append('<li class="article">'+
			'<a href="'+article.web_url+'">'+
			article.headline.main+
			'</a>'+
			'<p>'+article.snippet+'</p>'+
			'</li>');
		};
});

    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+
    cityStr+'&format=json&callback=wikiCallback';

    var wikiRequestTimeout = setTimeout(function(){
    	$wikiElem.text('failed to get wikipedia resources');
    	    }, 8000);

    $.ajax({
    	url: wikiUrl,
    	dataType:"jsonp",
    	success: function(response){
    		var articlesList = response[1];


    		for (var i = 0; i < articlesList.length; i++) {
    			articleStr = articlesList[i];
    			var url='http://en.wikipedia.org/wiki/'+articleStr;
    			$wikiElem.append('<li><a href="'+url+'">'+
    				articleStr+'</a></li>');

    		};
    		clearTimeout(wikiRequestTimeout);
    	}
    });

    return false;
};

$('#form-container').submit(loadData);
