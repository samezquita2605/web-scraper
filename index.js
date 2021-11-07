const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

const url = 'https://www.nytimes.com/'

// app.METHOD(PATH, HANDLER)
// app.get() //get
// app.post() //add
// app.put() //edit
// app.delete() //delete data

app.get('/', function(req, res) {
    res.json('This is my web-scraper')
})

app.get('/results', (req, res) => {
    axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []

        $('.css-13shibb', html).each(function() {
            const title = $(this).text()
            const url = $(this).attr('href')
            articles.push({
                title, 
                url
            })
        }) 
        res.json(articles)
    }).catch(err => console.log(err))
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))