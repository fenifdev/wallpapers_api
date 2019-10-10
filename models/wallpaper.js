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

// Add Wallpaper
module.exports.addWallpaper = (wallpaper, callback) => {
    Wallpaper.create(wallpaper, callback);
}

// getWallpaperById
module.exports.getWallpaperById = (id, callback) => {
    Wallpaper.findById(id, callback);
}

// Delete Wallpaper
module.exports.removeWallpaper = (id, callback) => {
    var query = {_id: id};
    Wallpaper.deleteOne(query, callback);
}

module.exports.deleteAll = (callback) => {
    Wallpaper.deleteMany({}, callback);
}
