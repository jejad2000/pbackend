import { Router } from 'express';
import UserAccess from './controller/UserAccess';

const router = Router();

router.post('/api/v1/user/register', UserAccess.register);
router.post('/api/v1/user/login', UserAccess.login);

export default router;
