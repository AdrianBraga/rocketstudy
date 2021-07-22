const { date } = require('../../lib/utils');

const db = require('../../config/db');

module.exports = {
  index(callback) {
    db.query(`SELECT * FROM teachers ORDER BY name ASC`, (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback(results.rows)
    })
  },

  findBy(filter, callback) {
    db.query(`SELECT * FROM teachers 
    WHERE name ILIKE '%${filter}%'
    OR subjects_taught ILIKE '%${filter}%'
    GROUP BY teachers.id
    ORDER BY name ASC`, (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback(results.rows)
    })
  },

  post(data, callback) {
    const query = `
      INSERT INTO teachers (
        avatar_url,
        name,
        birth_date,
        education_level,
        class_type,
        subjects_taught,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `

    const values = [
      data.avatar_url,
      data.name,
      date(data.birth_date).iso,
      data.education_level,
      data.class_type,
      data.subjects_taught,
      date(Date.now()).iso
    ]

    db.query(query, values, (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback(results.rows[0])
    })
  },

  show(id, callback) {
    db.query(`SELECT * FROM teachers WHERE id = $1`, [id], (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback(results.rows[0])
    })
  },

  put(data, callback) {
    const query = `
      UPDATE teachers SET
        avatar_url=($1),
        name=($2),
        birth_date=($3),
        education_level=($4),
        class_type=($5),
        subjects_taught=($6)
        WHERE id = $7
    `

    const values = [
      data.avatar_url,
      data.name,
      date(data.birth_date).iso,
      data.education_level,
      data.class_type,
      data.subjects_taught,
      data.id
    ]

    db.query(query, values, (err) => {
      if(err) throw `Database Error! ${err}`

      callback()
    })
  },

  delete(id, callback) {
    db.query(`DELETE FROM teachers WHERE id = $1`, [id], (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback()
    })
  },
  paginate(params) {
    const { filter, limit, offset, callback } = params;

    let query = '',
        filterQuery = '',
        totalQuery = `(SELECT count(*) FROM teachers) AS total`
      
    if (filter) {
      filterQuery = `
        WHERE teachers.name ILIKE '%${filter}%'
        OR teachers.subjects_taught ILIKE '%${filter}%'
      `

      totalQuery = `(
        SELECT count(*) FROM teachers ${filterQuery}
      ) AS total`
    }

    query = `
      SELECT teachers.*, ${totalQuery} FROM teachers
      ${filterQuery}LIMIT $1 OFFSET $2
    `

    db.query(query, [limit, offset], (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback(results.rows)
    });
  }
}