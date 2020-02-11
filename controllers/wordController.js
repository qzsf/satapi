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

    // post /api/voc
    const post = (req, res) => {
        console.log('post');
        console.log(req.body);
        const response = { status: 'success', body: req.body };
        return res.status(201).json(response);
    };

    // get /api/voc
    const getAll = (req, res) => {
        console.log('getAll')
        // for url query string. example: /voc?word=test
        if (req.query.word) {
            // query db for the word
            const queryStr = `select * from entries where word = '${req.query.word}'`;
            db.query(queryStr, (err, result) => {
                if (err) return res.send(err);
                return res.json(result);
            });
            setTimeout(() => {
                return res.json({ word: req.query.word });
            }, 1000);
        } else {
            return res.send('URI format: /api/voc/queryword');
        }
    };

    // getSat /api/voc/sat/:obj
    const getSat = (req,res)=>{
        console.log('getSat');
        const obj = JSON.parse(req.params.obj);
        const queryStr = `select * from entries where sat = true limit ${obj.offset},${obj.count}`;
        db.query(queryStr, (err, result) => {
            if (err) return res.send(err);
            return res.json(result);
        });
    };

    // get /api/voc/:word
    const get = (req, res) => {
        console.log('get');
        const queryStr = `select * from entries where word = '${req.word}'`;
        db.query(queryStr, (err, result) => {
            if (err) return res.send(err);
            return res.json(result);
        });
    };

    // search from start of a word
    const search = (req, res)=>{
        console.log('search');
        const queryStr = `select * from entries where word like '${req.params.str}%' limit 10`;
        db.query(queryStr, (err, result) => {
            if (err) return res.send(err);
            return res.json(result);
        });
    }

    // put /api/voc/word
    const put = (req, res) => {
        console.log('put');
        // update 'sat' column
        if (req.body.sat) {
            const queryStr = `update entries set sat = ${req.body.sat} where word = '${req.word}'`;
            db.query(queryStr, (err, result) => {
                if (err) return res.send(err);
                return res.json(result);
            });
        } else {
            res.json({ error: 'word.sat cannot be empty.' });
        }
    };

    // patch /api/voc/word
    const patch = (req, res) => {
        console.log('patch');
        // update 'sat' column
        if (req.body.sat) {
            const queryStr = `update entries set sat = ${req.body.sat} where word = '${req.word}'`;
            db.query(queryStr, (err, result) => {
                if (err) return res.send(err);
                return res.json(result);
            });
        } else {
            res.json({ error: 'word.sat cannot be empty.' });
        }
    };

    // delete /api/voc/word
    const deleteEntry = (req, res) => res.json({ error: 'delete function disabled.' });

    // revealing module pattern
    return { post, getAll, getSat, get, search, put, patch, deleteEntry };
}

module.exports = wordController;
