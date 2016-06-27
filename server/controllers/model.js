'use strict';

const Model = require('../models/model');
const _ = require('lodash');
const mongoose = require('mongoose');

const multer  = require('multer');
const fs = require('fs');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, global.appRoot+'/dist/models')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

 
module.exports = function modelRoutes(router) {
  router.route('/models')
  .post(function(req, res) {
    const post = req.body;
    let model = new Model(post);
    model._id = mongoose.Types.ObjectId();
    const id = model._id;
    if (post.image) {
      var extension = '';
      var lowerCase = post.image.toLowerCase();
      if (lowerCase.indexOf("png") !== -1) extension = ".png";
      else if (lowerCase.indexOf("jpg") !== -1 || lowerCase.indexOf("jpeg") !== -1)
          extension = ".jpg";
      const data = post.image.replace(/^data:image\/\w+;base64,/, "");
      model.image = '/images/' + id + extension;
      base64Decode(data, id + extension);
    }
    model.save(function(err, model) {
      console.log(model);
      if (err) {
        res.send(err);
      }
      res.json(model);
    });
  })
  .get(function(req, res) {
    let params = 'id image';
    if (req.query.full == 1) {
      params = '';
    }
    Model.find().exec(function(err, models) {
      if (err) {
        console.log(err);
        res.send(err);
      }
      res.json(models);
    });
  });
  router.route('/models/:id')
  .get(function(req, res) {
    const id = req.params.id;
    Model.findById(id).exec(function(err, model) {
      if (err) {
        res.send(err);
      }
      res.json(model);
    });
  })
  .put(function(req, res) {
    const id = req.params.id;
    let post = req.body;
    if (post.image) {
      var extension = '';
      var lowerCase = post.image.toLowerCase();
      if (lowerCase.indexOf("png") !== -1) extension = ".png";
      else if (lowerCase.indexOf("jpg") !== -1 || lowerCase.indexOf("jpeg") !== -1)
          extension = ".jpg";
      const data = post.image.replace(/^data:image\/\w+;base64,/, "");
      post.image = '/images/' + id + extension;
      base64Decode(data, id + extension);
    }
    if(req.file && req.file.originalname) {
      post.onemodel = req.file.originalname;
    }
    Model.findByIdAndUpdate(id, post, {new: true, upsert: true}).exec(function(err, model) {
      if (err) {
        res.send(err);
      }
      res.json(model);
    });
  })
  .delete(function(req, res) {
    const id = req.params.id;
    Model.findByIdAndRemove(id).exec(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({});
    })
  });
  router.route('/models/:id/upload')
  .put(upload.single('model'), function(req, res) {
    console.log(req.file.filename);
    const id = req.params.id;
    let post = {};
    if(req.file && req.file.filename) {
      post.onemodel = req.file.filename;
    }
    Model.findByIdAndUpdate(id, post, {new: true, upsert: true}).exec(function(err, model) {
      if (err) {
        res.send(err);
      }
      res.json(model);
    });
  })

};
var base64Decode = function(base64str, file) {
  // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
  var bitmap = new Buffer(base64str, 'base64');
  // write buffer to file
  fs.writeFile(global.appRoot + '/images/' + file, bitmap);
  console.log('******** File created from base64 encoded string ********');
};