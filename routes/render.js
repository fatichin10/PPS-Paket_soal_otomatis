const express = require('express')
const router = express.Router()


router.get('/soal', (req, res) => {
    const endpoint1 = "http://localhost:3000/api/topik"
    const endpoint2 = "http://localhost:3000/api/soal"

    async function hitAPI() {
        const api1 = await fetch(endpoint1)
        const { topik } = await api1.json()
        
        const api2 = await fetch(endpoint2)        
        const { soal } = await api2.json()

        res.render('soal', { topik, soal })
    }

    hitAPI()
})


router.get('/soal/tambah', (req, res) => {
    const endpoint = "http://localhost:3000/api/topik"
    
    async function hitAPI() {
        const api = await fetch(endpoint)
        const { topik } = await api.json()

        res.render('soal_tambah', { topik })
    }

    hitAPI()
})


router.get('/soal/:id', (req, res) => {
    const id = req.params.id
    const endpoint1 = "http://localhost:3000/api/topik"
    const endpoint2 = `http://localhost:3000/api/soal/${id}`
    
    async function hitAPI() {
        const api1 = await fetch(endpoint1)
        const { topik } = await api1.json()
        
        const api2 = await fetch(endpoint2)
        if (api2.status === 200) {
            const { soal } = await api2.json()
            res.render('soal_edit', { topik, soal })
        } else {
            const { message } = await api2.json()
            res.send(`<h1>${ message }</h1>`)
        }
    }

    hitAPI()
})


router.get('/paketsoal', (req, res) => {
    const endpoint = "http://localhost:3000/api/paketsoal"

    async function hitAPI() {
        const api = await fetch(endpoint)
        const { paketsoal } = await api.json()

        res.render('paketsoal', { paketsoal })
    }
    
    hitAPI()
})


router.get('/paketsoal/:id', (req, res) => {
    const id = req.params.id
    const endpoint = `http://localhost:3000/api/paketsoal/${id}`
    
    async function hitAPI() {
        const api = await fetch(endpoint)
        if (api.status === 200) {
            const { paketsoal, soalujian } = await api.json()
            res.render('paketsoal_detail', { paketsoal, soalujian })
        } else {
            const { message } = await api.json()
            res.send(`<h1>${ message }</h1>`)
        }
    }
    
    hitAPI()
})


router.get('/konfigurasi/:id', (req, res) => {
    const id = req.params.id
    const endpoint1 = "http://localhost:3000/api/topik"
    const endpoint2 = `http://localhost:3000/api/konfigurasi/${id}`
    
    async function hitAPI() {
        const api1 = await fetch(endpoint1)
        const { topik } = await api1.json()
        
        const api2 = await fetch(endpoint2)
        if (api2.status === 200) {
            const { paketsoal, topikujian } = await api2.json()
            res.render('konfigurasi', { topik, paketsoal, topikujian })
        } else {
            const { message } = await api2.json()
            res.send(`<h1>${ message }</h1>`)
        }
    }

    hitAPI()
})


module.exports = router