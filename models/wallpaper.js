const mongoose = require('mongoose');

// Wallpaper Schema
const wallpaperSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

const Wallpaper = module.exports = mongoose.model('Wallpaper', wallpaperSchema);

// Get Wallpapers
module.exports.getWallpapers = (callback, limit) => {
    Wallpaper.find(callback).limit(limit);
}
