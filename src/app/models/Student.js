const { date } = require('../../lib/utils');

const db = require('../../config/db');

module.exports = {
  index(callback) {
    db.query(`SELECT students.*, teachers.name AS teacher_name 
      FROM students 
      LEFT JOIN teachers ON (students.teacher_id = teachers.id)
      ORDER BY name ASC`, (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback(results.rows)
    })
  },

  post(data, callback) {
    const query = `
      INSERT INTO students (
        avatar_url,
        name,
        email,
        birth_date,
        education_level,
        workload,
        teacher_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `

    const values = [
      data.avatar_url,
      data.name,
      data.email,
      date(data.birth_date).iso,
      data.education_level,
      data.workload,
      data.teacher
    ]

    db.query(query, values, (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback(results.rows[0])
    })
  },

  show(id, callback) {
    db.query(`SELECT students.*, teachers.name AS teacher_name
      FROM students
      LEFT JOIN teachers ON (students.teacher_id = teachers.id)
      WHERE students.id = $1`, [id], (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback(results.rows[0])
    })
  },

  put(data, callback) {
    const query = `
      UPDATE students SET
        avatar_url=($1),
        name=($2),
        email=($3),
        birth_date=($4),
        education_level=($5),
        workload=($6),
        teacher_id=($7)
        WHERE id = $8
    `

    const values = [
      data.avatar_url,
      data.name,
      data.email,
      date(data.birth_date).iso,
      data.education_level,
      data.workload,
      data.teacher,
      data.id
    ]

    db.query(query, values, (err) => {
      if(err) throw `Database Error! ${err}`

      callback()
    })
  },

  delete(id, callback) {
    db.query(`DELETE FROM students WHERE id = $1`, [id], (err) => {
      if(err) throw `Database Error! ${err}`

      callback()
    })
  },

  teachersSelectOptions(callback) {
    db.query(`SELECT name, id FROM teachers`, (err, results) => {
      if(err) throw `Database Error ${err}`

      callback(results.rows)
    })
  }
}