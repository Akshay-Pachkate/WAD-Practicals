const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');   


const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Music')
.then(async () => {
    let data = fs.readFileSync(__dirname + '/songs.json', 'utf8');
    let songs = JSON.parse(data);

    await Song.insertMany(songs);
    
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log(err);
});



// Create a schema for the song details
const songSchema = new mongoose.Schema({
    SongName: String,
    Film: String,
    MusicDirector: String,
    Singer: String,
    Actor: String,
    Actress: String
});

// Create a model for the song details
const Song = mongoose.model('Song', songSchema);

app.post('/insertSong', async (req, res) => {
    const body = req.body;
    
    try {
        const insertedSong = await Song.create(body);
        res.status(200).json(insertedSong);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error inserting songs' });
    }
});

// Display total count of documents
app.get('/totalCount', async (req, res) => {
    try {
        const totalCount = await Song.countDocuments();
        res.status(200).json({ count: totalCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error getting total count' });
    }
});




// Delete a song
app.delete('/deleteSong/:id', async (req, res) => {
    const id = req.params.id;
    const song = req.params.singer;
    console.log(song);
    try {
        await Song.findByIdAndDelete(id);
        res.status(200).json({ message: 'Song deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting song' });
    }
});





// Display the data in Browser in tabular format
app.get('/displayInBrowser', async (req, res) => {
    try {
        let {director, singer, film} = req.query;

        if(!director) director = "";
        if(!singer) singer = "";
        if(!film) film = "";
         

        const allSongs = await Song.find({ MusicDirector: {$regex: director, $options: "i"}, Singer: {$regex: singer, $options: "i"}});
        
        // read the file displayInBrowser.html from template folder as string
        let html = fs.readFileSync(__dirname + '/template/displayInBrowser.html', 'utf8');
        var str = '';
        allSongs.forEach((song, index) => {
            str += `<tr>
            <td>${index+1}</td>
            <td>${song.SongName}</td>
            <td>${song.Film}</td>
            <td>${song.MusicDirector}</td>
            <td>${song.Singer}</td>
            <td>${song.Actor}</td>
            <td>${song.Actress}</td>
            <td>
                <button class="btn-del" id="${song._id}">Delete</button>
            </td>
            </tr>`;
        });

        html = html.replace('{{songsInDb}}', str);

        res.send(html);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error displaying data in browser' });
    }
});


app.get('/', async (req, res) => {
    res.sendFile( __dirname + '/public/addSong.html')    
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


