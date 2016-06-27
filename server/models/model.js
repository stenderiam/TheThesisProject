'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');
// Var fs = require('fs')

const ModelSchema = mongoose.Schema({
  _id: {type: Schema.Types.ObjectId, unique: true},
  name: {type: String},
  desc: {type: String},
  onemodel: {type: String},
  image: {type: String}
});

ModelSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Model', ModelSchema);
