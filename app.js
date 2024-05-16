const express= require("express");
const app= express();
const winston = require('winston');
const { createLogger, transports, format } = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.json(),
    defaultMeta: { service: 'calculate-service' },
    transports: [
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'combined.log' }),
    ],
  });
  
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
      format: format.simple(),
    }));
}

const add= (n1,n2) => {
    return n1 + n2;
}

const subtract= (n1,n2) => {
    return n1 - n2;
}

const multiply= (n1,n2) => {
    return n1 * n2;
}

const divide= (n1,n2) => {
    return n1 / n2;
}

const exponentiation= (base, exponent) => {
    return Math.pow(base, exponent);
}

const squareRoot= (number) => {
    return Math.sqrt(number);
}

const modulo= (dividend, divisor) => {
    return dividend % divisor;
}

app.get("/add", (req,res)=>{
    try{
        const n1= parseFloat(req.query.n1);
        const n2= parseFloat(req.query.n2);
        if(isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if(isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }
        logger.info('Parameters '+n1+' and '+n2+' received for addition');
        const result = add(n1, n2);
        res.status(200).json({ statuscode: 200, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(500).json({ statuscode: 500, msg: error.toString() })
    }
});

app.get("/subtract", (req,res)=>{
    try{
        const n1= parseFloat(req.query.n1);
        const n2= parseFloat(req.query.n2);
        if(isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if(isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }
        logger.info('Parameters '+n1+' and '+n2+' received for subtraction');
        const result = subtract(n1, n2);
        res.status(200).json({ statuscode: 200, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(500).json({ statuscode: 500, msg: error.toString() })
    }
});

app.get("/multiply", (req,res)=>{
    try{
        const n1= parseFloat(req.query.n1);
        const n2= parseFloat(req.query.n2);
        if(isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if(isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }
        logger.info('Parameters '+n1+' and '+n2+' received for multiplication');
        const result = multiply(n1, n2);
        res.status(200).json({ statuscode: 200, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(500).json({ statuscode: 500, msg: error.toString() })
    }
});

app.get("/divide", (req,res)=>{
    try{
        const n1= parseFloat(req.query.n1);
        const n2= parseFloat(req.query.n2);
        if(isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if(isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }
        if(n2 === 0) {
            logger.error("n2 cannot be zero for division");
            throw new Error("n2 cannot be zero for division");
        }
        logger.info('Parameters '+n1+' and '+n2+' received for division');
        const result = divide(n1, n2);
        res.status(200).json({ statuscode: 200, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(500).json({ statuscode: 500, msg: error.toString() })
    }
});

app.get("/exponentiation", (req,res)=>{
    try{
        const base= parseFloat(req.query.base);
        const exponent= parseFloat(req.query.exponent);
        if(isNaN(base)) {
            logger.error("base is incorrectly defined");
            throw new Error("base incorrectly defined");
        }
        if(isNaN(exponent)) {
            logger.error("exponent is incorrectly defined");
            throw new Error("exponent incorrectly defined");
        }
        logger.info('Parameters '+base+' and '+exponent+' received for exponentiation');
        const result = exponentiation(base, exponent);
        res.status(200).json({ statuscode: 200, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(500).json({ statuscode: 500, msg: error.toString() })
    }
});

app.get("/square-root", (req,res)=>{
    try{
        const number= parseFloat(req.query.number);
        if(isNaN(number)) {
            logger.error("number is incorrectly defined");
            throw new Error("number incorrectly defined");
        }
        logger.info('Parameter '+number+' received for square root');
        const result = squareRoot(number);
        res.status(200).json({ statuscode: 200, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(500).json({ statuscode: 500, msg: error.toString() })
    }
});

app.get("/modulo", (req,res)=>{
    try{
        const dividend= parseFloat(req.query.dividend);
        const divisor= parseFloat(req.query.divisor);
        if(isNaN(dividend)) {
            logger.error("dividend is incorrectly defined");
            throw new Error("dividend incorrectly defined");
        }
        if(isNaN(divisor)) {
            logger.error("divisor is incorrectly defined");
            throw new Error("divisor incorrectly defined");
        }
        if(divisor === 0) {
            logger.error("divisor cannot be zero for modulo operation");
            throw new Error("divisor cannot be zero for modulo operation");
        }
        logger.info('Parameters '+dividend+' and '+divisor+' received for modulo operation');
        const result = modulo(dividend, divisor);
        res.status(200).json({ statuscode: 200, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(500).json({ statuscode: 500, msg: error.toString() })
    }
});

const port=3040;
app.listen(port,()=> {
    console.log("Server is running on port "+port);
});
