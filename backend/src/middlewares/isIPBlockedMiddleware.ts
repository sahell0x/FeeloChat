import StatusCode from 'status-code-enum';
import { blockList } from './../index';

const isIPBlockedMiddleware = (req: any, res: any, next: any) => {
  console.log(blockList);
    const ip = req.ip;
    const expirationTime = blockList.get(ip);
    
    if (expirationTime) {
        if (expirationTime > Date.now()) {
            return res.status(StatusCode.ClientErrorTooManyRequests).json({ message: 'You are blocked for 30 minutes.' });
        } else {
            blockList.delete(ip); 
        }
    }
    next();
}


export default isIPBlockedMiddleware;