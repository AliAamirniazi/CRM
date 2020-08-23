const fs = require('fs');
const { json } = require('body-parser');

const Transaction = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/chain.json`)
);


exports.getChain = (req, res) => {
    console.log(
      JSON.stringify(Transaction)
    );
  
    res.status(200).json({
        
        Transaction
        
    });
  };
  exports.createChain = (req, res) => {
    res.status(200).render('createChain', {
      title: 'chain'
    });
  
  };
  
  exports.addChain = (req, res) => {
    // console.log(req.body);
  console.log(req.body);
    const newId = [Transaction.length];
    const newChain = Object.assign({ Key: `TR${newId}`,Record:req.body});
  
    Transaction.push(newChain);
  
    fs.writeFile(
      `${__dirname}/dev-data/data/chain.json`,
      JSON.stringify(Transaction),
      err => {
        res.status(201).json({
          status: 'success',
          data: {
            Transaction: newChain
          }
        });
      }
    );
  };

//   {"Key":"CAR1", "Record":{"product":"red","client":"Ford","price":"Mustang","date":"Brad"}}