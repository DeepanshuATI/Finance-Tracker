import SecurityDemo from '../models/SecurityDemo.model.js';
import { sanitizeInput } from '../utils/sanitize.util.js';

/**
 * ❌ VULNERABLE LOGIN - Intentionally insecure for educational purposes
 * Demonstrates NoSQL injection vulnerability
 */
export const vulnerableLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // ❌ VULNERABLE: Using eval or direct object construction allows injection
    // This simulates SQL injection in a NoSQL context
    let query;
    try {
      // Attempt to evaluate the input (DANGEROUS!)
      query = {
        type: 'user',
        username: username,
        password: password
      };
      
      // If username contains MongoDB operators like {$ne: null}, it will work
      if (typeof username === 'object' || typeof password === 'object') {
        query = {
          type: 'user',
          ...username,
          ...password
        };
      }
    } catch (e) {
      query = {
        type: 'user',
        username: username,
        password: password
      };
    }
    
    console.log('❌ Vulnerable query:', JSON.stringify(query));
    
    const user = await SecurityDemo.findOne(query);
    
    if (user) {
      return res.status(200).json({
        success: true,
        message: '✅ Login Successful (HACKED)',
        user: {
          username: user.username
        },
        warning: '⚠️ This login was vulnerable to NoSQL Injection'
      });
    } else {
      return res.status(401).json({
        success: false,
        message: '❌ Login Failed',
        error: 'Invalid credentials'
      });
    }
  } catch (error) {
    // ❌ VULNERABLE: Exposing detailed error messages
    console.error('Vulnerable login error:', error);
    return res.status(500).json({
      success: false,
      message: '❌ Error occurred',
      error: error.message,
      stack: error.stack // NEVER do this in production!
    });
  }
};

/**
 * ❌ VULNERABLE COMMENT - Intentionally insecure for educational purposes
 * Demonstrates XSS (Cross-Site Scripting) vulnerability
 */
export const vulnerableComment = async (req, res) => {
  try {
    const { comment } = req.body;
    
    if (!comment) {
      return res.status(400).json({
        success: false,
        message: 'Comment is required'
      });
    }
    
    // ❌ VULNERABLE: Storing unsanitized input
    const newComment = await SecurityDemo.create({
      type: 'comment',
      comment: comment // No sanitization!
    });
    
    console.log('❌ Stored unsanitized comment:', comment);
    
    // ❌ VULNERABLE: Returning unsanitized HTML
    return res.status(200).json({
      success: true,
      message: 'Comment posted',
      comment: newComment.comment, // Unsanitized!
      html: `<div class="comment">${comment}</div>`, // Direct HTML injection!
      warning: '⚠️ This comment was not sanitized - XSS vulnerability'
    });
  } catch (error) {
    // ❌ VULNERABLE: Exposing detailed error messages
    console.error('Vulnerable comment error:', error);
    return res.status(500).json({
      success: false,
      message: '❌ Error occurred',
      error: error.message
    });
  }
};

/**
 * Seed security demonstration data
 * Creates sample users for testing
 */
export const seedSecurityData = async (req, res) => {
  try {
    // Check if data already exists
    const existingUsers = await SecurityDemo.find({ type: 'user' });
    
    if (existingUsers.length > 0) {
      return res.status(200).json({
        success: true,
        message: 'Security demo data already exists',
        users: existingUsers.map(u => ({ username: u.username }))
      });
    }
    
    // Create sample users
    const sampleUsers = [
      { type: 'user', username: 'admin', password: 'admin123' },
      { type: 'user', username: 'user', password: 'password123' },
      { type: 'user', username: 'test', password: 'test123' }
    ];
    
    const createdUsers = await SecurityDemo.insertMany(sampleUsers);
    
    console.log('✅ Created security demo users:', createdUsers.length);
    
    return res.status(201).json({
      success: true,
      message: 'Security demo data seeded successfully',
      count: createdUsers.length,
      users: createdUsers.map(u => ({ username: u.username }))
    });
  } catch (error) {
    console.error('Seed data error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to seed security demo data',
      error: error.message
    });
  }
};

/**
 * ✅ SECURE LOGIN - Demonstrates proper security practices
 * Protected against NoSQL injection
 */
export const secureLogin = async (req, res) => {
  try {
    let { username, password } = req.body;
    
    // ✅ SECURE: Input validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }
    
    // ✅ SECURE: Type checking - only accept strings
    if (typeof username !== 'string' || typeof password !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Invalid input format'
      });
    }
    
    // ✅ SECURE: Length validation
    if (username.length > 50 || password.length > 50) {
      return res.status(400).json({
        success: false,
        message: 'Input too long'
      });
    }
    
    // ✅ SECURE: Using Mongoose's built-in parameterized queries
    // This prevents NoSQL injection
    const user = await SecurityDemo.findOne({
      type: 'user',
      username: username,
      password: password
    });
    
    console.log('✅ Secure query executed safely');
    
    if (user) {
      return res.status(200).json({
        success: true,
        message: '✅ Secure Login Success',
        user: {
          username: user.username
        },
        security: '🔒 This login is protected against NoSQL Injection'
      });
    } else {
      // ✅ SECURE: Generic error message (no information leakage)
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
  } catch (error) {
    // ✅ SECURE: Log detailed error server-side only
    console.error('Secure login error:', error);
    
    // ✅ SECURE: Return generic error to client
    return res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again.'
    });
  }
};

/**
 * ✅ SECURE COMMENT - Demonstrates proper security practices
 * Protected against XSS (Cross-Site Scripting)
 */
export const secureComment = async (req, res) => {
  try {
    let { comment } = req.body;
    
    // ✅ SECURE: Input validation
    if (!comment) {
      return res.status(400).json({
        success: false,
        message: 'Comment is required'
      });
    }
    
    // ✅ SECURE: Type checking
    if (typeof comment !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Invalid input format'
      });
    }
    
    // ✅ SECURE: Length validation
    if (comment.length > 500) {
      return res.status(400).json({
        success: false,
        message: 'Comment too long (max 500 characters)'
      });
    }
    
    // ✅ SECURE: Sanitize input to prevent XSS
    const sanitizedComment = sanitizeInput(comment);
    
    // ✅ SECURE: Store sanitized input
    const newComment = await SecurityDemo.create({
      type: 'comment',
      comment: sanitizedComment
    });
    
    console.log('✅ Stored sanitized comment');
    console.log('Original:', comment);
    console.log('Sanitized:', sanitizedComment);
    
    // ✅ SECURE: Return sanitized content
    return res.status(200).json({
      success: true,
      message: 'Comment posted securely',
      comment: newComment.comment,
      original: comment !== sanitizedComment ? 'Malicious content removed' : 'No threats detected',
      security: '🔒 This comment was sanitized to prevent XSS attacks'
    });
  } catch (error) {
    // ✅ SECURE: Log detailed error server-side only
    console.error('Secure comment error:', error);
    
    // ✅ SECURE: Return generic error to client
    return res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again.'
    });
  }
};
