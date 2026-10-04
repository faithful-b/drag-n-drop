import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import axios from 'axios';
import { Pool } from 'pg';
import 'dotenv/config';
import Element from '../client/src/components/Element.js';

const app = express();
const PORT = process.env.PORT || 3000;
const pool = new Pool({
    user: process.env.DB_USER || 'faithful',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'dnd_local',
    password: process.env.DB_PASSWORD || 'postgre',
    port: process.env.DB_PORT || 5432,
});

// Middleware
app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send("This is the Backend Server For Drag 'n Drop listening on PORT " + PORT)
})

app.get('/api/els', async (req, res) => {
    let innerHTML = ``;
    const response = await pool.query(`SELECT * FROM dnd_local.els`)
    for (const row of response.rows) {
    const props = {
        color: row.color,
        "background-color": row.bgcolor
    };

    const el = new Element(
        row.tag,
        row.innertext,
        props
    );

    innerHTML += el.returnHTML();
}
    res.json({innerHTML})
})

app.post('/api/elsave', async (req, res) => {
    try {
        console.log(req.body)
        for(let i of req.body){
            await pool.query(`INSERT INTO dnd_local.els (tag, innerText, color, bgColor)
            VALUES ($1, $2, $3, $4)
            RETURNING *`, [i.tag, i.innerText, i.props["color"], i.props["background-color"]])
        }
        res.json({success: true});
    } catch(e) {
        console.error(e)
        res.status(500).json({error: "Failed To Save Tag To Database, Unidentified Server Error"})
    }
})

app.post('/api/elsdelete', async (req, res) => {
    try {
        await pool.query(`DELETE FROM dnd_local.els WHERE id IN (SELECT MAX(id) FROM dnd_local.els)`)
        res.json({success: true});
    } catch(e) {
        console.error(e)
        res.status(500).json({error: "Failed To Delete Tags From Database, Unidentified Server Error"})
    }
})


app.listen(PORT, () => console.log(`Server Listening On Fucking PORT ${PORT}`));
