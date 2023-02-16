import axios from 'axios'
import express from 'express';
let router = express.Router()

async function get_all_games(req:any, res:any) {
    axios.get(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`)
    .then(function (response:any) {
        res.send(response.data.results);
    })
}

async function get_game_data(req:any, res:any) {
    axios.get(`https://api.rawg.io/api/games/${req.params.id}?key=${process.env.RAWG_API_KEY}`)
    .then(function (response:any) {
        res.send(response.data);
    })
}

router.get('/', (req, res) => { get_all_games(req, res) })
router.get('/:id', (req, res) => { get_game_data(req, res) })

// module.exports = router;
export default router;