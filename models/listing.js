const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        set: (v) => v === ""
            ? "https://media.istockphoto.com/id/2170790699/photo/a-christmas-tree-ornament-with-a-glass-ball-inside-of-it.jpg?s=1024x1024&w=is&k=20&c=0eHE_Ma2Tz-GtLuc4OELW_ZwAIUS5s35Sc-Tim4xLLs="
            : v.url,
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;