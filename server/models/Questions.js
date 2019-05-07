const mongoose = require('mongoose');

const QuestionsSchema = new mongoose.Schema({
  questionText: {
    type: String,
    trim: true,
    required : [true, 'Question text is a required field']
},
options: [String],
answer: {
    type: Number,
    min: 0,
    max: 3,
    required: [true, 'Answer is a required field']
}
},
{
    strict: true,
    runSettersOnQuery: true,
    timestamps: {
        createdAt: 'created', updatedAt: 'updated'
    }
    // QuestionsSchema.path('options').validate({
    //     isAsync : false,
    //     validator: function (options) {
    //         return options.length === 4;
    //     },
    //     message: 'Each question must have 4 options'
    // });

});
module.exports = mongoose.model('Questions', QuestionsSchema);
