var express = require('express'); 
var app = express(); 
var bodyParser = require('body-parser');
var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var fs = require('fs'); // Add fs module
var mongoose = require('mongoose'); // Add mongoose module
const cors = require('cors');

const { body, validationResult } = require('express-validator');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/questions1', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Create a schema for the questions
// var questionSchema = new mongoose.Schema({
//     type: String,
//     srNo: String,
//     questions: String,
//     co: String,
//     rbt: String,
//     pi: String,
//     marks: String
// });

// // Create a model based on the schema
// var Question = mongoose.model('Question', questionSchema);

app.use(bodyParser.json());  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//added localhost:5173 to the list of allowed origins
app.use(cors({
    origin: 'http://localhost:5173'
}));

var uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// var storage = multer.diskStorage({ //multers disk storage settings
//     destination: function (req, file, cb) {
//         cb(null, './uploads/')
//     },
//     filename: function (req, file, cb) {
//         var datetimestamp = Date.now();
//         cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
//     }
// });

// var upload = multer({ //multer settings
//     storage: storage,
//     fileFilter : function(req, file, callback) { //file filter
//         if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
//             return callback(new Error('Wrong extension type'));
//         }
//         callback(null, true);
//     }
// }).single('file');

/** API path that will upload the files */
//store excel question bank to database
// app.post('/upload', function(req, res) {
//     var exceltojson;
//     upload(req,res,function(err){
//         if(err){
//             res.json({error_code:1,err_desc:err});
//             return;
//         }
//         /** Multer gives us file info in req.file object */
//         if(!req.file){
//             res.json({error_code:1,err_desc:"No file passed"});
//             return;
//         }
//         /** Check the extension of the incoming file and 
//          *  use the appropriate module
//          */
//         if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
//             exceltojson = xlsxtojson;
//         } else {
//             exceltojson = xlstojson;
//         }
//         console.log(req.file.path);
//         try {
//             exceltojson({
//                 input: req.file.path,
//                 output: null, //since we don't need output.json
//                 lowerCaseHeaders:true
//             }, function(err,result){
//                 if(err) {
//                     return res.json({error_code:1,err_desc:err, data: null});
//                 } 
//                 res.json({error_code:0,err_desc:null, data: result}); //Json coming out

//                 // Save the questions to the database
//                 Promise.all(result.map(questionData => {
//                     var question = new Question(questionData);
//                     return question.save().catch(err => {
//                         console.error("Error saving question: ", err);
//                         return null; // Return null to handle the error and continue with other questions
//                     });
//                 })).then(savedQuestions => {
//                     savedQuestions = savedQuestions.filter(question => question !== null); // Remove null entries
//                     console.log(Saved ${savedQuestions.length} questions);
//                     // Delete the file after parsing
//                     fs.unlink(req.file.path, function(err) {
//                         if (err) {
//                             console.error("Error deleting file: ", err);
//                         } else {
//                             console.log("File deleted successfully");
//                         }
//                     });
//                 }).catch(err => {
//                     console.error("Error saving questions: ", err);
//                 });
//             });
//         } catch (e){
//             res.json({error_code:1,err_desc:"Corrupted excel file"});
//         }
//     })
// });


// Create a schema for the questions with subject name
const questionsubSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    sr_no: {
        type: String,
        required: true
    },
    questions: {
        type: String,
        required: true
    },
    co: {
        type: String,
        required: true
    },
    rbt: {
        type: String,
        required: true
    },
    pi: {
        type: String,
        required: true
    },
    marks: {
        type: String,
        required: true
    },
    _v: { 
        type: Number, 
        default: 0 
    }
});

// for example:
// [
//     {
//     "subject": "daa"
//     },
//     {
//     "type": "T",
//     "sr_no": "1",
//     "questions": "List operators used in Java.",
//     "co": "CO1",
//     "rbt": "R",
//     "pi": "1.1.1",
//     "marks": "2"
//     },
//     {
//     "type": "T",
//     "sr_no": "2",
//     "questions": "Classify data types used.",
//     "co": "CO1",
//     "rbt": "U",
//     "pi": "1.3.1",
//     "marks": "2"
//     }
//     ]

app.post('/store', async (req, res) => {
    try {
        const dataArray = req.body;

        // Extract subject from the first element
        const subject = dataArray[0].subject;
        if (!subject) {
            return res.status(400).send('Subject is required');
        }

        // Create a model based on the schema
        const Question = mongoose.model(subject.toLowerCase(), questionsubSchema);

        // Iterate over the remaining elements (questions) and save them to the database
        for (let i = 1; i < dataArray.length; i++) {
            const questionData = dataArray[i];
            // Add subject to question data
            questionData.subject = subject;
            const question = new Question(questionData);
            await question.save();
        }

        res.send('Data stored successfully');
    } catch (err) {
        console.error('Failed to store data:', err);
        res.status(500).send('Failed to store data');
    }
});

//to save subject wise section info
//for example:
// {
//     "subject": "DAA",
//     "totalMarks": 20,
//     "sections": [
//       {
//         "no_of_ques": 7,
//         "each_ques_marks": 2
//       },
//       {
//         "no_of_ques": 2,
//         "each_ques_marks": 5
//       },
//       {
//         "no_of_ques": 2,
//         "each_ques_marks": 5
//       }
//     ]
//   }
// app.post('/upload0', async (req, res) => {
//     const subjectSchema = new mongoose.Schema({
//         name: String,
//         sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }],
//     });

//     const sectionSchema = new mongoose.Schema({
//         no_of_ques: Number,
//         each_ques_marks: Number,
//     });

//     try {
//         const { subject, totalMarks, sections } = req.body;

//         const Subject = mongoose.model(subject.replace(/\s+/g, '_') + '_Subject', subjectSchema);
//         const Section = mongoose.model(subject.replace(/\s+/g, '_') + '_Section', sectionSchema);

//         let subjectFolder = await Subject.findOne({ name: subject });
//         if (!subjectFolder) {
//             subjectFolder = new Subject({ name: subject, sections: [] });
//             await subjectFolder.save();
//         }

//         const sectionDocs = await Promise.all(sections.map(async (section) => {
//             const newSection = new Section({
//                 no_of_ques: parseInt(section.no_of_ques),
//                 each_ques_marks: parseInt(section.each_ques_marks)
//             });
//             await newSection.save();
//             subjectFolder.sections.push(newSection._id);
//         }));

//         await subjectFolder.save();

//         res.status(201).json({ message: 'Question paper saved successfully' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to save question paper. Please check your input data and try again.' });
//     }
// });



app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.listen('3000', function(){
    console.log('Listening on http://localhost:3000');
});
