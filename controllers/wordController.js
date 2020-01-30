function wordController() {
    const post = (req, res) => {
        console.log('post');
        console.log(req.body);
        const response = { status: 'success', body: req.body };
        return res.status(201).json(response);
    };

    const get = (req, res) => {
        console.log('get')
        // deal with the url query string. for example: /voc?word=test
        if (req.query.word) {
            // query db for the word
            // db.query('select * from', (err,rows, fields)=>{})
            return res.json({ word: req.query.word });
        }
        const response = { text: 'a list of words' };
        return res.json(response);
    };

    // implement get single item
    // implement put
    // implement patch
    // implement delete

    // revealing module pattern
    return { post, get };
}

module.exports = wordController;
