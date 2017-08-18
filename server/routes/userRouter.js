
const User = require('./models/user');
const TempUser = require('./models/tempUserModel')
const mongoose = require('mongoose')

module.exports = function (app) {


// app.get('/email-verification/:URL', function (req, res) {
//     console.log("Email VERIFICATION route")
//     var url = req.params.URL;

//     nev.confirmTempUser(url, function (err, user) {
//         if (user) {
//             nev.sendConfirmationEmail(user.email, function (err, info) {
//                 if (err) {
//                     return res.status(404).send('ERROR: sending confirmation email FAILED');
//                 }
//                 res.send('Your email has been confirmed! Thank you! <a href="http://localhost:3000/login">Click here to log in!</a>')
//             });
//         } else {
//             return res.status(404).send('ERROR: confirming temp user FAILED');
//         }
//     });
// });

// app.post('/signup', function (req, res) {
//     const username = req.body.username
//     const email = req.body.email;
//     const pw = req.body.password;
//     const newUser = new User({
//         username: username,
//         email: email,
//         password: pw
//     });

//     nev.createTempUser(newUser, (err, existingPersistentUser, newTempUser) => {

//         if (err) {
//             return res.status(404).send(`ERROR: creating temp user FAILED ${err}`);
//         }

//         if (existingPersistentUser) {
//             return res.json({
//                 msg: `You have already signed up and confirmed your account. Did you forget your password?`
//             });
//         }

//         if (newTempUser) {
//             var URL = newTempUser[nev.options.URLFieldName];

//             nev.sendVerificationEmail(email, URL, function (err, info) {
//                 console.log(info)
//                 if (err) {
//                     console.error(err);
//                     return res.status(500).send('ERROR: sending verification email FAILED');
//                 }
//                 res.json({
//                     // msg: 'An email has been sent to you. Please check it to verify your account.',
//                     info: info
//                 });
//             });

//         } else {
//             res.json({
//                 msg: 'You have already signed up. Please check your email to verify your account.'
//             });
//         }
//     })
// })

app.post('/api/signup', (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.send(err)
        }
        if (user) {
            return res.send({ msg: 'User already exists' })
        }
        if (!user) {
            let newUser = new User()
            newUser.username = req.body.username
            newUser.email = req.body.email
            newUser.password = newUser.generateHash(req.body.password)

            newUser.save((err, user) => {
                if (err) {
                    res.send(err)
                }
                res.status(200).json(user)
            })
        }

    })
})

app.post('/api/login', (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.send(err)
        }
        if (!user) {
            return res.sendStatus(404)
        }
        if (!user.validPassword(req.body.password)) {
            return res.sendStatus(403)
        }

        res.status(201).json(user)
    })
});


// app.post('/login',
//     passport.authenticate('local-login', { session: true }),
//     function (req, res) {
//         if (!req.user) {
//             return res.status(500).send(err);
//         } else {
//             res.status(201).json(req.user);
//         }
//     });

app.put('/api/location/:id', (req, res, next) => {
    console.log(req.body);
    User
        .findByIdAndUpdate(
        { _id: req.params.id },
        { $set: req.body })
        .then(data => {
            User
                .findOne({ _id: req.params.id })
                .then(data => {
                    console.log("data" + data)
                    res.status(200).json(data.location)
                })
        })
        .catch(err => {
            res.status(400).send()
        })

})


app.get('/api/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});
};