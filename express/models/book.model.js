const db = require('../bootstrap/db');
const Schema = db.Schema;


const BookSchema = new Schema ({
    title:      {type: String, require:true, unique: true},
    author:     {type: String, require: true},
    price:      {type: Number, require:true},
    quantity:   {type: Number, require:true},
    users :     {type: Array, require: true},
    description:{type: String, require: true},
    place:      {type: String, require: true}

},{
    collection: 'books',
    timestamps: true
})


module.exports = db.model('Book', BookSchema);
