import { Router } from 'express';

import { MemberController } from '../controllers';

const memberRouter = Router();

memberRouter.route('/')
  .post(
     MemberController.create,
  );

  memberRouter.route('/:memberId')
  .get(MemberController.read)
  .patch(MemberController.update)
  .delete(MemberController.delete);
  
export default memberRouter;  