const express = require('express')
const db = require('../config/connection')
const router = express.Router()


router.get('/topik', (req, res) => {
    const sqlTopik = `SELECT id, nama FROM topik`
    db.query(sqlTopik, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Ada kesalahan!' })
        }
        res.status(200).json({ topik: result })
    })
})


router.post('/topik', (req, res) => {
    const { nama } = req.body
    const sqlInsert = `INSERT INTO topik (id, nama) VALUES (NULL, ?)`
    db.query(sqlInsert, [ nama ], (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Topik tidak berhasil ditambahkan!' })
        }
        res.status(201).json({ message: 'Topik berhasil ditambahkan!' })
    })
})


router.delete('/topik/:id', (req, res) => {
    const id = req.params.id
    const sqlSearch = `SELECT * FROM topik WHERE id = ?`
    const sqlDelete = `DELETE FROM topik WHERE id = ?`
    db.query(sqlSearch, [ id ], (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Ada kesalahan!' })
        }
        
        if (result.length) {
            db.query(sqlDelete, [ id ], (error, result) => {
                if (error) {
                    return res.status(500).json({ message: 'Topik tidak berhasil dihapus!' })
                }
                res.status(200).json({ message: 'Topik berhasil dihapus!' })
            })
        } else {
            return res.status(404).json({ message: 'Topik tidak ditemukan!' })
        }
    })
})


router.get('/soal', (req, res) => {
    const sqlSoal = `SELECT soal.id, soal.pertanyaan, soal.tingkat_kesulitan, topik.nama  FROM soal INNER JOIN topik ON soal.id_topik = topik.id`
    db.query(sqlSoal, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Ada kesalahan!' })
        }
        res.status(200).json({ soal: result })
    })
})


router.get('/soal/:id', (req, res) => {
    const id = req.params.id
    const sqlSoal = `SELECT * FROM soal WHERE id = ?`
    db.query(sqlSoal, [ id ], (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Ada kesalahan!' })
        }

        if (result.length) {
            res.status(200).json({ soal: result[0] })
        } else {
            return res.status(404).json({ message: 'Soal tidak ditemukan!' })
        }
    })
})


router.post('/soal', (req, res) => {
    const { pertanyaan, pilihan_a, pilihan_b, pilihan_c, pilihan_d, pilihan_benar, id_topik, tingkat_kesulitan } = req.body
    const sqlInsert = `INSERT INTO soal (id, pertanyaan, pilihan_a, pilihan_b, pilihan_c, pilihan_d, pilihan_benar, id_topik, tingkat_kesulitan) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)`
    db.query(sqlInsert, [ pertanyaan, pilihan_a, pilihan_b, pilihan_c, pilihan_d, pilihan_benar, id_topik, tingkat_kesulitan ], (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Soal tidak berhasil ditambahkan!' })
        }
        res.status(201).json({ message: 'Soal berhasil ditambahkan!' })
    })
})


router.put('/soal/:id', (req, res) => {
    const id = req.params.id
    const { pertanyaan, pilihan_a, pilihan_b, pilihan_c, pilihan_d, pilihan_benar, id_topik, tingkat_kesulitan } = req.body
    const sqlSearch = `SELECT * FROM soal WHERE id = ?`
    const sqlUpdate = `UPDATE soal SET pertanyaan = ?, pilihan_a = ?, pilihan_b = ?, pilihan_c = ?, pilihan_d = ?, pilihan_benar = ?, id_topik = ?, tingkat_kesulitan = ? WHERE id = ?`
    db.query(sqlSearch, [ id ], (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Ada kesalahan!' })
        }

        if (result.length) {
            db.query(sqlUpdate, [ pertanyaan, pilihan_a, pilihan_b, pilihan_c, pilihan_d, pilihan_benar, id_topik, tingkat_kesulitan, id ], (error, result) => {
                if (error) {
                    return res.status(500).json({ message: 'Soal tidak berhasil diubah!' })
                }
                res.status(200).json({ message: 'Soal berhasil diubah!' })
            })
        } else {
            return res.status(404).json({ message: 'Soal tidak ditemukan!' })
        }
    })
})


router.delete('/soal/:id', (req, res) => {
    const id = req.params.id
    const sqlSearch = `SELECT * FROM soal WHERE id = ?`
    const sqlDelete = `DELETE FROM soal WHERE id = ?`
    db.query(sqlSearch, [ id ], (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Ada kesalahan!' })
        }
        
        if (result.length) {
            db.query(sqlDelete, [ id ], (error, result) => {
                if (error) {
                    return res.status(500).json({ message: 'Soal tidak berhasil dihapus!' })
                }
                res.status(200).json({ message: 'Soal berhasil dihapus!' })
            })
        } else {
            return res.status(404).json({ message: 'Soal tidak ditemukan!' })
        }
    })
})


router.get('/paketsoal', (req, res) => {
    const sqlPaketsoal = `SELECT * FROM paketsoal`
    db.query(sqlPaketsoal, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Ada kesalahan!' })
        }
        res.status(200).json({ paketsoal: result })
    })
})


router.get('/paketsoal/:id', (req, res) => {
    const id = req.params.id
    const sqlPaketsoal = `SELECT * FROM paketsoal WHERE id = ?`
    const sqlSoalujian = `SELECT soal.pertanyaan, soal.pilihan_a, soal.pilihan_b, soal.pilihan_c, soal.pilihan_d FROM soal_ujian INNER JOIN soal ON soal_ujian.id_soal = soal.id WHERE soal_ujian.id_paketsoal = ?`
    
    db.query(sqlPaketsoal, [ id ], (error, result1) => {
        if (error) {
            return res.status(500).json({ message: 'Ada kesalahan!' })
        }

        if(result1.length) {
            db.query(sqlSoalujian, [ id ], (error, result2) => {
                if (error) {
                    return res.status(500).json({ message: 'Ada kesalahan!' })
                }
                res.status(200).json({ paketsoal: result1[0], soalujian: result2 })
            })
        } else {
            return res.status(404).json({ message: 'Paket Soal tidak ditemukan!' })
        }
    })
})


router.post('/paketsoal/:id', (req, res) => {
    const id = req.params.id

    // Cek konfigurasi paket soal
    async function checkConfig(id) {
        try {
            const sqlCheckConfig = `SELECT ROUND(SUM(persentase_topik), 2) AS 'total' FROM topik_ujian WHERE id_paketsoal = ?`
            const result = await new Promise((resolve, reject) => {
                db.query(sqlCheckConfig, [ id ], (error, result) => {
                    if (error) reject(error)
                    else resolve(result)
                })
            })
            return result[0].total
        } catch (error) {
            return res.status(500).json({ message: 'Ada kesalahan!' })
        }
    }
    
    // Hitung soal yang diperlukan
    async function getNumofSoal(id) {
        try {
            const sqlPaketsoal = `SELECT jumlah_soal FROM paketsoal WHERE id = ?`
            const jumlahsoal = await new Promise((resolve, reject) => {
                db.query(sqlPaketsoal, [ id ], (error, result) => {
                    if (error) reject(error)
                    else resolve(result[0].jumlah_soal)
                })
            })
            const sqlTopikujian = `SELECT id_topik, ROUND((persentase_mudah * persentase_topik * ${ jumlahsoal }), 0) AS 'soal_mudah', ROUND((persentase_sedang * persentase_topik * ${ jumlahsoal }), 0) AS 'soal_sedang', ROUND((persentase_sulit * persentase_topik * ${ jumlahsoal }), 0) AS 'soal_sulit' FROM topik_ujian WHERE id_paketsoal = ?`
            const requiredSoal = await new Promise((resolve, reject) => {
                db.query(sqlTopikujian, [ id ], (error, result) => {
                    if (error) reject(error)
                    else resolve(result)
                })
            })
            return requiredSoal
        } catch (error) {
            return res.status(500).json({ message: 'Gagal menghitung jumlah soal yang diperlukan!'})
        }
    }

    // Periksa ketersediaan soal
    async function checkSoal(requiredSoal) {
        try {
            const statuses = await Promise.all(requiredSoal.map(async (result) => {
                let idtopik = result.id_topik
                let soalRequired = [result.soal_mudah, result.soal_sedang, result.soal_sulit]
                for (let i = 0; i < 3; i++) {
                    let sqlCekSoal = `SELECT COUNT(id) AS 'jumlah' FROM soal WHERE id_topik = ${ idtopik } AND tingkat_kesulitan = ${ i+1 }`
                    let soaltersedia = await new Promise((resolve, reject) => {
                        db.query(sqlCekSoal, (error, result) => {
                            if (error) reject(error)
                            else resolve(result[0].jumlah)
                        })
                    })
                    if (soaltersedia < soalRequired[i]) { return 'tidak tesedia' }
                }
                return 'tersedia'
            }))
            return statuses.includes('tidak tesedia') ? 'tidak tesedia' : 'tersedia'
        } catch (error) {
            return res.status(500).json({ message: 'Gagal memeriksa ketersediaan soal!' })
        }
    }

    // Generate soal random
    async function getRandomSoal(requiredSoal) {
        try {
            const draft = await Promise.all(requiredSoal.map(async (result) => {
                let idtopik = result.id_topik
                let soalRequired = [result.soal_mudah, result.soal_sedang, result.soal_sulit]
                let soals = await Promise.all(soalRequired.map(async (required, j) => {
                    let sqlSoalUjian = `SELECT id FROM soal WHERE id_topik = ${ idtopik } AND tingkat_kesulitan = ${ j+1 } ORDER BY RAND() LIMIT ${ required }`
                    let random = await new Promise((resolve, reject) => {
                        db.query(sqlSoalUjian, (error, result) => {
                            if (error) reject(error)
                            else resolve(result)
                        })
                    })
                    return random
                }))
                return [].concat(...soals)
            }))
            return [].concat(...draft)
        } catch (error) {
            return res.status(500).json({ message: 'Gagal menghasilkan random soal' })
        }
    }

    // Jalankan fungsi
    async function runFunction(id) {
        try {
            const totalPersenTopik = await checkConfig(id)
            if (totalPersenTopik == 1.00) {
                const requiredSoal = await getNumofSoal(id)
                let status = await checkSoal(requiredSoal)
                if (status == 'tersedia') {
                    let draft = await getRandomSoal(requiredSoal)
                    // return res.status(200).json({ draft })
                    
                    // Menyimpan draft paket soal
                    let json = JSON.stringify(draft)
                    const dataArray = JSON.parse(json)
                    const values = dataArray.map(function(item) {
                        return `(NULL, ${ id }, ` + item.id + ")"
                    }).join(", ")
                    
                    const sqlInsert = "INSERT INTO soal_ujian (id, id_paketsoal, id_soal) VALUES " + values
                    const sqlSearch = `SELECT * FROM soal_ujian WHERE id_paketsoal = ?`
                    const sqlDelete = `DELETE FROM soal_ujian WHERE id_paketsoal = ?`
                    const sqlKode = `UPDATE paketsoal SET kode_paketsoal = ROUND(RAND()*(999999-100000)+100000, 0) WHERE id = ?`
                    
                    db.query(sqlSearch, [ id ], (error, result) => {
                        if (error) {
                            return res.status(500).json({ message: 'Ada kesalahan!' })
                        }
                        
                        if (result.length) {
                            db.query(sqlDelete, [ id ], (error, result) => {
                                if (error) {
                                    return res.status(500).json({ message: 'Soal ujian tidak berhasil dihapus!' })
                                }
                                db.query(sqlInsert, (error, result) => {
                                    if (error) {
                                        return res.status(500).json({ message: 'Paket soal tidak berhasil dibuat!' })
                                    } else {
                                        db.query(sqlKode, [ id ], (error, result) => {
                                            if (error) {
                                                return res.status(500).json({ message: 'Ada kesalahan!' })
                                            } else {
                                                return res.status(200).json({ message: 'Paket soal berhasil dibuat!' })
                                            }
                                        })
                                    }
                                })
                            })
                        } else {
                            db.query(sqlInsert, (error, result) => {
                                if (error) {
                                    return res.status(500).json({ message: 'Paket soal tidak berhasil dibuat!' })
                                } else {
                                    db.query(sqlKode, [ id ], (error, result) => {
                                        if (error) {
                                            return res.status(500).json({ message: 'Ada kesalahan!' })
                                        } else {
                                            return res.status(200).json({ message: 'Paket soal berhasil dibuat!' })
                                        }
                                    })
                                }
                            })
                        }
                    })
                } else {
                    return res.status(500).json({ message: 'Soal yang tersedia tidak cukup!' })
                }
            } else {
                return res.status(500).json({ message: "Jumlah persentase topik harus tepat sama dengan 1 !" })
            }
        } catch (error) {
            return res.status(500).json({ message: 'Error' })
        }
    }

    runFunction(id)
})


router.get('/konfigurasi/:id', (req, res) => {
    const id = req.params.id
    const sqlPaketsoal = `SELECT id, nama, jumlah_soal FROM paketsoal WHERE id = ?`
    const sqlTopikujian = `SELECT topik_ujian.id, topik.nama, topik_ujian.persentase_topik, topik_ujian.persentase_mudah, topik_ujian.persentase_sedang, topik_ujian.persentase_sulit FROM topik_ujian INNER JOIN topik ON topik_ujian.id_topik = topik.id WHERE topik_ujian.id_paketsoal = ?`
    
    db.query(sqlPaketsoal, [ id ], (error, result1) => {
        if (error) {
            return res.status(500).json({ message: 'Ada kesalahan!' })
        }

        if (result1.length) {
            db.query(sqlTopikujian, [ id ], (error, result2) => {
                if (error) {
                    return res.status(500).json({ message: 'Ada kesalahan!' })
                }
                res.status(200).json({ paketsoal: result1[0], topikujian: result2 })
            })
        } else {
            return res.status(404).json({ message: 'Konfigurasi Paket Soal tidak ditemukan!' })
        }  
    })
})


router.post('/konfigurasi', (req, res) => {
    const { nama, jumlah_soal } = req.body
    const sqlInsert = `INSERT INTO paketsoal (id, nama, jumlah_soal, kode_paketsoal) VALUES (NULL, ?, ?, NULL)`
    
    db.query(sqlInsert, [ nama, jumlah_soal ], (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Paket Soal tidak berhasil ditambahkan!' })
        }
        res.status(201).json({ message: 'Paket Soal berhasil ditambahkan!', newId: result.insertId })
    })
})


router.put('/konfigurasi/:id', (req, res) => {
    const id = req.params.id
    const { nama, jumlah_soal } = req.body
    const sqlSearch = `SELECT id FROM paketsoal WHERE id = ?`
    const sqlUpdate = `UPDATE paketsoal SET nama = ?, jumlah_soal = ? WHERE id = ?`
    
    db.query(sqlSearch, [ id ], (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Ada kesalahan!' })
        }

        if (result.length) {
            db.query(sqlUpdate, [ nama, jumlah_soal, id ], (error, result) => {
                if (error) {
                    return res.status(500).json({ message: 'Paket Soal tidak berhasil diubah!' })
                }
                res.status(200).json({ message: 'Paket Soal berhasil diubah!' })
            })
        } else {
            return res.status(404).json({ message: 'Paket Soal tidak ditemukan!' });
        }
    })
})


router.post('/topikujian', (req,res) => {
    const { id_paketsoal, id_topik, persentase_topik, persentase_mudah, persentase_sedang, persentase_sulit } = req.body

    if (parseFloat(persentase_mudah) + parseFloat(persentase_sedang) + parseFloat(persentase_sulit) == 1.00) {
        const sqlCheck = `SELECT EXISTS (SELECT id FROM topik_ujian WHERE id_paketsoal = ? AND id_topik = ?) AS isExists`
        const sqlInsert = `INSERT INTO topik_ujian (id, id_paketsoal, id_topik, persentase_topik, persentase_mudah, persentase_sedang, persentase_sulit) VALUES (NULL, ?, ?, ?, ?, ?, ?)`
        db.query(sqlCheck, [ id_paketsoal, id_topik ], (error, result1) => {
            if (error) {
                return res.status(500).json({ message: 'Ada kesalahan!' })
            }

            if (result1[0].isExists == 0) {
                db.query(sqlInsert, [ id_paketsoal, id_topik, persentase_topik, persentase_mudah, persentase_sedang, persentase_sulit ], (error, result2) => {
                    if (error) {
                        return res.status(500).json({ message: 'Topik Ujian tidak berhasil ditambahkan!' })
                    }
                    res.status(201).json({ message: 'Topik Ujian berhasil ditambahkan!' })
                })
            } else {
                return res.status(500).json({ message: 'Topik Ujian sudah ada!' })
            }
        })
    } else {
        return res.status(500).json({ message: 'Jumlah persentase kesulitan harus tepat sama dengan 1 !' })
    }
})


router.delete('/topikujian/:id', (req, res) => {
    const id = req.params.id
    const sqlSearch = `SELECT * FROM topik_ujian WHERE id = ?`
    const sqlDelete = `DELETE FROM topik_ujian WHERE id = ?`
    db.query(sqlSearch, [ id ], (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Ada kesalahan!' })
        }
        
        if (result.length) {
            db.query(sqlDelete, [ id ], (error, result) => {
                if (error) {
                    return res.status(500).json({ message: 'Topik Ujian tidak berhasil dihapus!' })
                }
                res.status(200).json({ message: 'Topik Ujian berhasil dihapus!' })
            })
        } else {
            return res.status(404).json({ message: 'Topik Ujian tidak ditemukan!' });
        }
    })
})


module.exports = router