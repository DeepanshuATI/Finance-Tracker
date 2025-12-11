import { Router } from 'express';
import {
  vulnerableLogin,
  vulnerableComment,
  secureLogin,
  secureComment,
  seedSecurityData
} from '../controllers/security.controller.js';

const router = Router();

// Seed data endpoint
router.post('/seed', seedSecurityData);

// Vulnerable endpoints (for educational demonstration)
router.post('/vulnerable/login', vulnerableLogin);
router.post('/vulnerable/comment', vulnerableComment);

// Secure endpoints (demonstrating best practices)
router.post('/secure/login', secureLogin);
router.post('/secure/comment', secureComment);

export default router;
