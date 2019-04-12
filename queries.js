const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'fkinfjvdilmpak',
  host: 'ec2-174-129-10-235.compute-1.amazonaws.com',
  database: 'd7jhpfaghses97',
  password: '8d9cf4129ec0dadd619dc5b6e61c2698ae7814b5db5aa29dee228abb67679ea0',
  port: 5432,
});


const getLeads = (request, response) => {
  pool.query('SELECT * FROM leads ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getLeadById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM leads WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const createLead = (request, response) => {
  const { createddate, email, firstname, isdeleted, lastname, mobilephone, name, postalcode, sms_opt_in__c, systemmodstamp } = request.body;

  pool.query('INSERT INTO leads (createddate, email, firstname, isdeleted, lastname, mobilephone, name, postalcode, sms_opt_in__c, systemmodstamp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Lead added with ID: ${result.insertId}`)
  })
};

const updateLead = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    'UPDATE leads SET email = $1, firstname = $2, lastname = $3, mobilephone = $4, postalcode = $5, sms_opt_in__c = $6 WHERE id = ' + id,
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
};

const deleteLead = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM leads WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
};


module.exports = {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
};
