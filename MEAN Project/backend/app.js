var express =require ('express');
var cors =require ('cors');
var bodyParser =require ('body-parser');
var mongoose =require ('mongoose');

var Taste =require('./models/Taste');

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/tastes');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

router.route('/Tastes').get((req, res) => {
    Taste.find((err, tastes) => {
        if (err)
            console.log(err);
        else
            res.json(tastes);
    });
});

router.route('/Tastes/:id').get((req, res) => {
    Taste.findById(req.params.id, (err, taste) => {
        if (err)
            console.log(err);
        else
            res.json(taste);
    });
});

router.route('/Tastes/add').post((req, res) => {
    let taste = new Taste(req.body);
    taste.save()
        .then(taste => {
            res.status(200).json({'taste': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/Tastes/update/:id').post((req, res) => {
    Taste.findById(req.params.id, (err, taste) => {
        if (!taste)
            return next(new Error('Could not load document'));
        else {
            taste.food = req.body.food;
            taste.type = req.body.type;
            taste.review=req.body.review;
            taste.rating = req.body.rating;
            
         
            taste.save().then(taste => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/Tastes/delete/:id').get((req, res) => {
    Taste.findByIdAndRemove({_id: req.params.id}, (err, taste) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    })
})

app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));