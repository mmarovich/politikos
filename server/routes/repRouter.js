const Rep = require('./models/reps')
const Post = require('./models/post')
const Legit = require('./models/legit')
const Comment = require('./models/comment')
const moment = require('moment')
const mongoose = require('mongoose')
// const deepPopulate = require('mongoose-deep-populate')(mongoose)

moment.locale('en')

module.exports = function (app) {

    app.post('/api/comment', (req, res, next) => {
        Post.findOne({
            _id: req.body.postId
        }, (err, post) => {
            console.log(post)
            if (err) {
                console.log("comment error")
                res.status(400).send(err)
            }

            Comment.findOneAndUpdate({
                '_id': req.body.commentId || new mongoose.mongo.ObjectID()
            }, {
                    $set: {
                        'username': req.body.username,
                        'comment': req.body.comment,
                        'date': moment().format('LLLL')
                    }
                }, {
                    new: true,
                    upsert: true
                }, (err, comment) => {
                    if (err) {
                        throw err;
                    }

                    if (!req.body.commentId) {
                        post.comments.push(comment._id);

                        post.save((err, post) => {
                            if (err) {
                                throw err;
                            }

                            Post.findById(req.body.postId)
                                .populate('legits comments')
                                .exec((err, post) => {
                                    console.log(post)
                                    if (err) {
                                        throw err;
                                    }
                                    res.status(200).json(post)
                                })
                        })
                    }
                })
        })
    })

    app.post('/api/postLegit', (req, res, next) => {
        Post.findOne({
            _id: req.body.postId
        }, (err, post) => {
            if (err) {
                console.log("postLegit error")
                res.status(400).send(err)
            }

            Legit.findOneAndUpdate({
                '_id': req.body.legitId || new mongoose.mongo.ObjectID()
            }, {
                    $set: {
                        'username': req.body.username,
                        'vote': req.body.value
                    }
                }, {
                    new: true,
                    upsert: true
                }, (err, legit) => {
                    console.log(legit)
                    if (err) {
                        throw err;
                    }

                    if (!req.body.legitId) {
                        post.legits.push(legit._id);

                        post.save((err, post) => {
                            if (err) {
                                throw err;
                            }

                            Post.findById(req.body.postId)
                                .populate('legits comments')
                                .exec((err, post) => {
                                    console.log(post)
                                    if (err) {
                                        throw err;
                                    }
                                    res.status(200).json(post)
                                })
                        })
                    } else {
                        Post.findById(req.body.postId)
                            .populate('legits comments')
                            .exec((err, post) => {
                                console.log(post)
                                if (err) {
                                    throw err;
                                }
                                res.status(200).json(post)
                            })
                    }
                }
            )
        })
    })

    app.delete('/api/delete-post/:id', function (req, res) {
        console.log(req.params)
        var id = req.params.id;

        Post.remove({
            _id: id
        }, function (err) {
            if (err) {
                console.log(err)
            }
            else {
                res.json({msg:"Post deleted"});
            }
        });
    })

    app.post('/api/delete-comment', function (req, res) {
        Comment.remove({
            _id: req.body.commentId
        }, function (err) {
            if (err) {
                console.log(err)
            }
            else {
                Post.findByIdAndUpdate({
                    _id: req.body.postId,
                }, {
                    $pull: {
                        comments: req.body.commentId
                    }
                }, 
                {new: true})
                .populate('legits comments')
                .exec((err, post) => {
                    console.log(post)
                    if (err) {
                        throw err;
                    }
                    res.status(200).json(post)
                })
            }
        })
    })


    app.post('/api/feedpost', (req, res, next) => {
            Rep.find({
                party: req.body.party,
                name: req.body.name
            }, (err, rep) => {
                if (err) {
                    res.status(400).send(err)
                }
                if (rep.length > 0) {
                    const newPost = new Post();

                    newPost.headline = req.body.headline;
                    newPost.link = req.body.link;
                    newPost.username = req.body.username;
                    newPost.date = moment().format('LLLL');
                    newPost.comments = [];
                    newPost.legits = [];

                    newPost.save((err, post) => {
                        if (err) {
                            throw err;
                        }
                        rep[0].feed.push(post._id);

                        rep[0].save((err, rep) => {
                            if (err) {
                                throw err;
                            }

                            Rep.findById(rep._id)
                                .populate('feed').exec((err, rep) => {
                                    console.log(rep.feed)
                                    if (err) {
                                        throw err;
                                    }
                                    res.status(200).json(rep.feed[rep.feed.length - 1]);
                                })
                        })
                    })
                }
                if (rep.length === 0) {
                    const newRep = new Rep();
                    const newPost = new Post();

                    newPost.headline = req.body.headline;
                    newPost.link = req.body.link;
                    newPost.username = req.body.username;
                    newPost.date = moment().format('LLLL');
                    newPost.comments = [];
                    newPost.legits = [];

                    newPost.save((err, post) => {
                        if (err)
                            throw err;

                        newRep.name = req.body.name
                        newRep.party = req.body.party
                        newRep.feed = []
                        newRep.feed.push(post);

                        newRep.save((err, rep) => {
                            console.log(rep);
                            if (err) {
                                throw err;
                            }
                            Rep.findById(rep._id)
                                .populate('feed').exec((err, rep) => {
                                    if (err) {
                                        throw err;
                                    }
                                    res.status(200).json(rep.feed[rep.feed.length - 1])
                                })
                        })
                    })
                }
            })
        })

    app.get('/api/rep/:party/:name/:length', (req, res, next) => {
            Rep
                .findOne({
                    party: req.params.party,
                    name: req.params.name
                }, (err, rep) => {
                    if (err) {
                        res.status(400).send(err);
                    }
                    if (!rep) {
                        console.log("rep not found");
                        res.status(204).send("Rep Not Found")
                    }
                    if (rep) {
                        Rep.findById(rep._id)
                            .deepPopulate('feed feed.comments feed.legits').exec((err, rep) => {
                                let length = parseInt(req.params.length)
                                if (err) {
                                    throw err;
                                }
                                if (rep.feed.length >= length + 5) {
                                    console.log(length)
                                    const feedSlice = rep.feed.length - length
                                    const feedSliced = rep.feed.slice(feedSlice - 5, feedSlice).reverse()
                                    res.status(200).json({ feed: feedSliced, id: rep.id })
                                }
                                if (rep.feed.length > length && rep.feed.length < length + 5) {
                                    const feedSlice = rep.feed.length - length
                                    const feedSliced = rep.feed.slice(0, feedSlice).reverse()
                                    res.status(200).json({ feed: feedSliced, id: rep.id })
                                }
                                if (rep.feed.length === length) {
                                    res.status(200).json({ feed: [], id: rep.id })
                                }
                            })
                    }
                })
        })
}