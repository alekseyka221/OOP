import {PORT} from "./config";
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import {IncomingMessage, ServerResponse} from "http";
console.log(PORT)
const server = http.createServer((req:IncomingMessage, res:ServerResponse) => {
	if(req.url.endsWith('.css'))
	{
		fs.readFile(path.join(__dirname,'public', 'style.css'), ((err, data) =>
		{
			if(err)
			{
				throw err;
			}
			res.setHeader('Content-Type', 'text/css');
			res.statusCode = 200;
			res.write(data);
			res.end();
		}))
	}
	if(req.url.endsWith('.js'))
	{
		fs.readFile(path.join(__dirname,'public', 'calc_procedure_style.js'), ((err, data) =>
		{
			if(err)
			{
				throw err;
			}
			res.setHeader('Content-Type', 'text/js');
			res.statusCode = 200;
			res.write(data);
			res.end();
		}))
	}
	if(req.url === '/')
	{
		fs.readFile(path.join(__dirname,'public', 'calc.html'), ((err, data) =>
		{
			if(err)
			{
				throw err;
			}
			res.setHeader('Content-Type', 'text/html');
			res.statusCode = 200;
			res.write(data);
			res.end();
		}))
	}

})

server.listen(3000,()=>
{
	console.log('Server has been started...');
})
