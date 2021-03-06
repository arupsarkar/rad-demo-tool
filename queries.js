const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'fkinfjvdilmpak',
  host: 'ec2-174-129-10-235.compute-1.amazonaws.com',
  database: 'd7jhpfaghses97',
  password: '8d9cf4129ec0dadd619dc5b6e61c2698ae7814b5db5aa29dee228abb67679ea0',
  port: 5432,
});
// Contacts api CRUD interfaces - START
const getContacts = (request, response) => {
  pool.query('SELECT * FROM contacts ORDER BY id ASC', (error, results) => {
    if (error) {
      console.log('getContacts error : ' + error);
      throw error
    }else{
      console.log('getContacts success : ' + JSON.stringify(results.rows));
    }
    response.status(200).json(results.rows)
  })
};

const createContact = (request, response) => {
  console.log('---> createContact : ', request.body);
  const { createddate, email, firstname, isdeleted, lastname, mobilephone, name, postalcode, sms_opt_in__c, systemmodstamp } = request.body;

  pool.query('INSERT INTO contacts (createddate, email, firstname, isdeleted, lastname, mobilephone, name, ' +
    'postalcode, sms_opt_in__c, systemmodstamp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ' +
    'RETURNING id, firstname, lastname, email, mobilephone, postalcode, sms_opt_in__c',
    [createddate, email, firstname, isdeleted, lastname, mobilephone, name, postalcode, sms_opt_in__c, systemmodstamp], (err, res) => {
      if (err) {
        console.error('Error committing transaction', err.stack);
        throw err
      }
      console.log('createContact results ', res.rows[0].id);
      console.log('createContact results ', res.rows[0]);
      response.status(200).json(res.rows[0]);
    })
};

const updateContact = (request, response) => {
  const contactId = parseInt(request.params.id);
  const { email, firstname, lastname,mobilephone,postalcode, sms_opt_in__c, systemmodstamp  } = request.body;
  console.log('---> updateContact : ', request.body);
  console.log('---> updateContact Id : ', contactId);
  pool.query(
    'UPDATE contacts SET email = $1, firstname = $2, lastname = $3, mobilephone = $4, postalcode = $5, sms_opt_in__c = $6, systemmodstamp = $7 ' +
    'WHERE id = ' + contactId + ' ' +
    'RETURNING id, firstname, lastname, email, mobilephone, postalcode, sms_opt_in__c',
    [email, firstname, lastname,mobilephone,postalcode, sms_opt_in__c, systemmodstamp],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows[0]);
    }
  )
};

const deleteContact = (request, response) => {
  const id = parseInt(request.params.id);
  console.log('---> deleteContact', id);
  pool.query('DELETE FROM contacts WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.error('Error committing transaction', error.stack);
      throw error
    }
    response.status(200).json({"success " : true});
  })
};
// Contacts api CRUD interfaces - END

// Leads api CRUD interfaces - START
const getLeads = (request, response) => {
  pool.query('SELECT * FROM leads ORDER BY id ASC', (error, results) => {
    if (error) {
      console.log('getLeads error : ' + error);
      throw error
    }else{
      console.log('getLeads success : ' + JSON.stringify(results.rows));
    }
    response.status(200).json(results.rows)
  })
};

const getLeadById = (request, response) => {
  const id = parseInt(request.params.id);
  console.log('---> getLeadById : ', id);
  pool.query('SELECT * FROM leads WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const createLead = (request, response) => {
  console.log('---> createLead : ', request.body);
  const { createddate, email, firstname, isdeleted, lastname, mobilephone, name, postalcode, sms_opt_in__c, systemmodstamp } = request.body;

  pool.query('INSERT INTO leads (createddate, email, firstname, isdeleted, lastname, mobilephone, name, ' +
                                'postalcode, sms_opt_in__c, systemmodstamp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ' +
                                'RETURNING id, firstname, lastname, email, mobilephone, postalcode, sms_opt_in__c',
    [createddate, email, firstname, isdeleted, lastname, mobilephone, name, postalcode, sms_opt_in__c, systemmodstamp], (err, res) => {
    if (err) {
      console.error('Error committing transaction', err.stack);
      throw err
    }
    console.log('createLead results ', res.rows[0].id);
    console.log('createLead results ', res.rows[0]);
    // response.status(201).send(`Lead added with ID: ${res.rows[0].id}`)
    response.status(200).json(res.rows[0]);
  })
};

const updateLead = (request, response) => {
  const leadId = parseInt(request.params.id);
  const { email, firstname, lastname,mobilephone,postalcode, sms_opt_in__c, systemmodstamp  } = request.body;
  console.log('---> updateLead : ', request.body);
  console.log('---> updateLead Id : ', leadId);
  pool.query(
    'UPDATE leads SET email = $1, firstname = $2, lastname = $3, mobilephone = $4, postalcode = $5, sms_opt_in__c = $6, systemmodstamp = $7 ' +
      'WHERE id = ' + leadId + ' ' +
      'RETURNING id, firstname, lastname, email, mobilephone, postalcode, sms_opt_in__c',
    [email, firstname, lastname,mobilephone,postalcode, sms_opt_in__c, systemmodstamp],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows[0]);
    }
  )
};

const deleteLead = (request, response) => {
  const id = parseInt(request.params.id);
  console.log('---> deleteLead', id);
  pool.query('DELETE FROM leads WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.error('Error committing transaction', error.stack);
      throw error
    }
    response.status(200).json({"success " : true});
  })
};
// Leads api CRUD interfaces - END

module.exports = {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
};
