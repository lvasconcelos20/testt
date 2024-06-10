import { Router } from 'express';
import authMiddleware from '../middleware/auth';

import { MemberController } from '../controllers';

const memberRouter = Router();

memberRouter.route('/')
  .post(
     MemberController.create,
  );

  memberRouter.route('/:memberId')
  .get(MemberController.read)
  .patch([authMiddleware], MemberController.update)
  .delete([authMiddleware], MemberController.delete);
  
export default memberRouter;  