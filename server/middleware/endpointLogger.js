const endpointLogger = (req, res, next) => {
  const timestamp = new Date().toISOString(); 
  const method = req.method; 
  const url = req.url; 
  const ipAddress = req.ip || req.connection.remoteAddress; 

  console.log(`[${timestamp}] ${method} - ${url} from IP: ${ipAddress}`);

  next(); 
};

module.exports = endpointLogger
