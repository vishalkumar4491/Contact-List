const express = require('express');
const path = require('path');
const port = 3000;

const db = require('./config/mongoose');
const Contact = require('./models/contact')

const app = express();

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
// add parser for adding contact or middleware
app.use(express.urlencoded());
// for static files
app.use(express.static('assets'));

// self made middleware
// app.use(function(req, res, next){
//     console.log('middlware 1');
//     // next nhi likhenge to aage nhi bdega 
//     next();
// })


var contactList = [{
        name: 'Name 1',
        phone: '700278352671'
    },
    {
        name: 'Name 2',
        phone: '1111111111'
    },
    {
        name: 'Name 3',
        phone: '2222222222'
    },
    
]



app.get('/', function(req, res){

    Contact.find({}, function(err, contacts){
        if(err){
            console.log('error in fetching contacts from db');
            return
        }

        return res.render('home', {
        title : 'Contact List',
        contact_list: contacts
    });

    })

    

    // console.log(__dirname);
    // res.send('<h1> sjd\sdjf </h1>');
});




app.get('/practice', function(req, res){

    return res.render('basic', {title : 'basic'});

    // console.log(__dirname);
    // res.send('<h1> sjd\sdjf </h1>');
});


// for adding new contact
app.post('/create-contact', function(req, res){
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log('error in creating the contact'); return;
        }

        console.log('successssss', newContact);
        return res.redirect('back');

    })
    // return  res.redirect('/');
})


// for deleting a contact
app.get('/delete-contact', function(req, res){
    // get query from the requested url
    // let phone = req.query.phone;

    // get theid from query in the url
    let id = req.query.id;

    // find the contact in the db using id and delete
    Contact.findByIdAndDelete(id, function(err){

        if(err){
            console.log('error in deleting objects from database');
            return;
        }
        
        return res.redirect('back');
    })

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if (contactIndex != -1){
    //     contactList.splice(contactIndex, 1);
    // }
 
    
})




// app.get('/profile', function(req, res){
//     console.log(__dirname);
//     res.send('<h1> profile </h1>');
// });

// app.get('/contact', function(req, res){
//     console.log(__dirname);
//     res.send('<h1> contact</h1>');
// });


app.listen(port, function(err){
    if(err){
        console.log('error in the port', err);
    }

    console.log('Server is running on port', port);
})