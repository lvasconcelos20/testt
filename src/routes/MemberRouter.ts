import { Router } from 'express';

import { MemberController } from '../controllers';

const memberRouter = Router();

memberRouter.route('/')
  .post(
     MemberController.create,
  );

memberRouter.route('/:userId')
  .get(
     MemberController.read,
  );

memberRouter.route('/:userId')
  .patch(
     MemberController.update,
  );

memberRouter.route('/:userId')
  .delete(
     MemberController.delete,
  );

export default memberRouter;  