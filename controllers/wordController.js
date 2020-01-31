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

    // get /api/voc/word
    const get = (req, res) => {
        console.log('get');
        const queryStr = `select * from entries where word = '${req.word}'`;
        db.query(queryStr, (err, result) => {
            if (err) return res.send(err);
            return res.json(result);
        });
    };

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
    return { post, getAll, get, put, patch, deleteEntry };
}

module.exports = wordController;
