import Router from '@koa/router';
const infoRouter =  new Router({ prefix: '/infoRouter'});
import os from 'os';
const numCPUs = os.cpus().length;

import compression from 'compression';



  infoRouter.get('/info', compression(), (ctx) => {
    const datos = {
      'carpeta de proyecto': process.cwd(),
      'plataforma': process.platform,
      'version de node': process.version,
      'memoria reservada': process.memoryUsage().heapTotal,
      'process id': process.pid,
      'numero de procesadores' : numCPUs,
    };
    ctx.body = datos;
    
  });



  export default infoRouter;