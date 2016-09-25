/**
 * Created by Lee_G on 2016-09-25.
 */

//link to the required npm packages
var connect = require('connect');
var url = require('url');

//instantiate a new connect object
var app = connect();

//setup
var calculator = function(req, res, next)
{
    // get the variables from from url's querystring
    var qs = url.parse(req.url, true).query;
    var method = qs.method;
    var x = qs.x;
    var y = qs.y;
    var total;
    var methodSymbol;

    // determine method
    if(method == 'add')
    {
        var methodSymbol = '+';
        var total = parseFloat(x) + parseFloat(y);
    } else if(method == 'subtract')
    {
        var methodSymbol = '-';
        var total = parseFloat(x) - parseFloat(y);
    } else if(method == 'multiply')
    {
        var methodSymbol = '*';
        var total = parseFloat(x) * parseFloat(y);
    } else if(method == 'divide')
    {
        var methodSymbol = '/';
        var total = parseFloat(x) / parseFloat(y);
    } else
    {
        //if a method is not found
        res.end('Incorrect method');
    }

    // display the values
    res.end(x + ' ' + methodSymbol + ' ' + y + ' = ' + total);
};

//if proper url is not used
var fallback = function(req,res,next)
{
    res.end('Please use lab 3 calculator');
};

//execute the appropiate function based on the http request
app.use('/lab3', calculator);
app.use(fallback);

//display a message
console.log('Connect using port 3000');

//start the server on port 3000
app.listen(3000);