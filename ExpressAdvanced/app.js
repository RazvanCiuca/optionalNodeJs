var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');

var app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
//app.use(express.static('src/views'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

var port = 9001;

var sections = [
    {
        title: 'Featured',
        items: [
            {
                id: 1,
                title: 'Trump bans romanians',
                source: 'romaniatv.ro',
                timestamp: '1 hour ago'
            }
        ]
    },
    {
        title: 'Wishlist',
        items: [
            {
                id: 2,
                title: 'Dragnea condamnat a doua oara',
                source: 'antena3.tv',
                timestamp: '2 hour ago'
            },
            {
                id: 3,
                title: 'Jumatate din parlamentul Romaniei gasit rastignit in Piata Constitutiei',
                source: 'digi24.ro',
                timestamp: '4 hour ago'
            }
        ]
    }
];

var articles = [
    {
        id: 1,
        title: 'Trump bans romanians',
        content: "One a those days, huh. Wal, a wiser fella than m'self once said, sometimes you eat the bar and sometimes the bar, wal, he eats you. That wasn't her toe. Excuse me! Mark it zero. Next frame. Mind if I smoke a jay? Brandt can't watch though. Or he has to pay a hundred. Sex. The physical act of love. Coitus. Do you like it? Shomer shabbos."
    },
    {
        id: 2,
        title: 'Dragnea condamnat a doua oara',
        content: "Tomorrow vee come back und cut off your chonson. Walter, you can't do that. These guys're like me, they're pacifists. Smokey was a conscientious objector. You got the wrong guy. I'm the Dude, man. I'm not Mr. Lebowski; you're Mr. Lebowski. I'm the Dude. I got a nice quiet beach community here, and I aim to keep it nice and quiet. Vee belief in nossing. Okay. Vee take ze money you haf on you und vee call it eefen."
    },
    {
        id: 3,
        title: 'Jumatate din parlamentul Romaniei gasit rastignit in Piata Constitutiei',
        content: "The Knutsens. It's a wandering daughter job. Bunny Lebowski, man. Her real name is Fawn Knutsen. Her parents want her back. I hope you're not avoiding this call because of the rug, which, I assure you, is not a problem. I know how he likes to present himself; Father's weakness is vanity. Hence the slut. Ja, it seems you forgot our little deal, Lebowski. DO YOU SEE WHAT HAPPENS, LARRY?"
    }
];

var router = express.Router();
var articleRouter = express.Router();


router.get('/', function(req, res) {
    res.render('index', {sections: sections});
});

articleRouter.route('/:id')
    .get(function(req, res) {
        var article = _.find(articles, {id: parseInt(req.params.id, 10)});
        res.render('article', {article: article});
    });


app.use('/', router);
app.use('/articles', articleRouter);

app.listen(port, function() {
    console.log('Listening on ', port);
});