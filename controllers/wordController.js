const mysql = require('mysql');

function wordController() {
    // DB
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'pwd',
        database: 'dictionary'
    })
    db.connect((err) => {
        if (err) {
            throw err;
        }
        console.log('mysql connected.');
    })

    const post = (req, res) => {
        console.log('post');
        console.log(req.body);
        const response = { status: 'success', body: req.body };
        return res.status(201).json(response);
    };
    const get = (req, res) => {
        console.log('get')
        // deal with the url query string. for example: /voc?word=test
        //if (false) {
        // query db for the word
        // db.query('select * from', (err,rows, fields)=>{})
        // return res.json({ word: req.query.word });
        //const query = `select * from entries where word = '${req.query.word}'`;
        //db.query(query, (err, result, fields)=>{
        //  if(err){
        //      return res.json(err);
        //  }
        //  return res.write(result);
        //  // return res.json(result);
        //});
        //}
        const query = `select * from entries where word = 'test'`;
        //const response = { text: 'a list of words' };
        db.query(query, (err, result, fields) => {
            if (err) {
                return res.json(err);
            }
            //  return res.write(result);
            return res.json(result);
            //return res.json(response);
        });
    };

    // implement get single item
    // implement put
    // implement patch
    // implement delete

    // revealing module pattern
    return { post, get };
}

module.exports = wordController;
