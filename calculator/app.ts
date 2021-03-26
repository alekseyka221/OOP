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
		fs.readFile(path.join(__dirname,'public', 'calc.js'), ((err, data) =>
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
		const filePath = './public/calc.html';
		fs.access(filePath, fs.constants.R_OK,err => {
			if(err)
			{
				res.statusCode = 404;
				res.end("Resource not found!");
			}
			else
			{
				fs.createReadStream(filePath).pipe(res);
			}
		});
	}

})

server.listen(3000,()=>
{
	console.log('Server has been started...');
})
