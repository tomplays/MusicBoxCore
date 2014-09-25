'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Document Schema
 */

var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;
//
// generate _id
//http://stackoverflow.com/questions/11604928/is-there-a-way-to-auto-generate-objectid-when-a-mongoose-model-is-newed

var MarkupSchema = new Schema({
    _id:  {type:ObjectIdSchema, default: function () { return new ObjectId()} },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: Number,
        default: '',
        trim: true
    },
    doc_id: {
        type: Number,
        default: '',
        trim: true
    },

    start: {
        type: Number,
        default: '',
        trim: true
    },
    end: {
        type: Number,
        default: '',
        trim: true
    },
    metadata: {
        type: String,
        default: '',
        trim: true
    },
    type: {
        type: String,
        default: '',
        trim: true
    },
    subtype: {
        type: String,
        default: '',
        trim: true
    },
    status: {
        type: String,
        default: '',
        trim: true
    },
    position: {
        type: String,
        default: 'left',
        trim: true
    },
    depth: {
        type: Number,
        default: 1,
        trim: true
    }
});

var DocumentSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: 'Yout title',
        trim: true
    },
    subtitle: {
        type: String,
        default: '',
        trim: true
    },
    content: {
        type: String,
        default: 'Your content',
        trim: true
    },
    markups: [MarkupSchema], 
    published:{
        type: Boolean,
        default: false
    }
});

/**
 * Validations
 */
DocumentSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
 /*
ArticleSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};
*/

mongoose.model('Document', DocumentSchema);
