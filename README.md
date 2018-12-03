# js-nodebook

run js-notebook 


    npm install
    node ./index.js

Sample Code

    book.text('hello');
    book.json({value:'hello'});
    book.html("<h1>hello</h1>");
    book.image('http://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg');

    book.http({
        method: 'post',
        url: 'http://localhost:1337/api/hello',
        data: {'name':'name'},
        params:{},
        headers:{}
    }).then(function (response) {
        book.json(response.data);
    });
