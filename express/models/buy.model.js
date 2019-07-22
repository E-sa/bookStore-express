const db = require('../bootstrap/db');
const Schema = db.Schema;


const BuySchema = new Schema ({
    quantity:   {type: Number, require:true},
    title:      {type: String, require:true},
    user :     {type: String, require: true}

},{
    collection: 'buy',
    timestamps: true
})


module.exports = db.model('Buy', BuySchema);
