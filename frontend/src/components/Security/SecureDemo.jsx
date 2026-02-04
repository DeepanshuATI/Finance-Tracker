import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Copy, ArrowLeft, CheckCircle } from 'lucide-react';
import axios from 'axios';

const SecureDemo = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [commentData, setCommentData] = useState('');
  const [loginResult, setLoginResult] = useState(null);
  const [commentResult, setCommentResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

  // Same attack payloads to show they don't work
  const sqlInjectionPayload = `{"$ne": null}`;
  const xssPayload = `<script>alert('XSS Attack!')</script>`;
  const xssPayload2 = `<img src=x onerror="alert('XSS')">`;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleSecureLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginResult(null);

    try {
      const response = await axios.post(`${API_URL}/security/secure/login`, loginData);
      setLoginResult({ success: true, data: response.data });
    } catch (error) {
      setLoginResult({ 
        success: false, 
        data: error.response?.data || { message: 'Network error' }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSecureComment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setCommentResult(null);

    try {
      const response = await axios.post(`${API_URL}/security/secure/comment`, {
        comment: commentData
      });
      setCommentResult({ success: true, data: response.data });
    } catch (error) {
      setCommentResult({ 
        success: false, 
        data: error.response?.data || { message: 'Network error' }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-800">Secure Implementations</h1>
          </div>
          <Link to="/security" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Security Dashboard
          </Link>
        </div>

        {/* Success Banner */}
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8 rounded-r-lg">
          <div className="flex items-start">
            <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-green-800 font-semibold mb-1">🔒 Secure Code Implementation</h3>
              <p className="text-green-700 text-sm">
                These endpoints implement security best practices. Try the same attack payloads - they won't work!
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Secure Login Demo */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-green-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">✅ Secure Login Demo</h2>
            
            <form onSubmit={handleSecureLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="text"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Testing...' : 'Login (Secure)'}
              </button>
            </form>

            {/* Test with Attack Payload */}
            <div className="mt-6 bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">🔒 Try the Same Attack:</h3>
              <p className="text-sm text-gray-600 mb-2">NoSQL Injection Payload (Won't Work):</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-white px-3 py-2 rounded text-sm font-mono text-gray-600 border border-green-200">
                  {sqlInjectionPayload}
                </code>
                <button
                  onClick={() => copyToClipboard(sqlInjectionPayload)}
                  className="p-2 hover:bg-green-100 rounded"
                  title="Copy to clipboard"
                >
                  <Copy className="w-4 h-4 text-green-600" />
                </button>
              </div>
              <p className="text-xs text-green-700 mt-2">
                ✅ Parameterized queries prevent this attack
              </p>
            </div>

            {/* Security Measures */}
            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Security Measures:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✅ Input type validation</li>
                <li>✅ Parameterized queries</li>
                <li>✅ Length validation</li>
                <li>✅ Generic error messages</li>
              </ul>
            </div>

            {/* Result */}
            {loginResult && (
              <div className={`mt-4 p-4 rounded-lg ${loginResult.success ? 'bg-green-100 border border-green-300' : 'bg-gray-100 border border-gray-300'}`}>
                <h4 className="font-semibold mb-2">Result:</h4>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(loginResult.data, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Secure Comment Demo */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-green-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">✅ Secure Comment Demo</h2>
            
            <form onSubmit={handleSecureComment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comment
                </label>
                <textarea
                  value={commentData}
                  onChange={(e) => setCommentData(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows="4"
                  placeholder="Enter your comment"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Posting...' : 'Post Comment (Secure)'}
              </button>
            </form>

            {/* Test with Attack Payloads */}
            <div className="mt-6 bg-green-50 p-4 rounded-lg space-y-3">
              <h3 className="font-semibold text-gray-800 mb-2">🔒 Try the Same Attacks:</h3>
              
              <div>
                <p className="text-sm text-gray-600 mb-2">XSS Payload #1 (Won't Work):</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-white px-3 py-2 rounded text-sm font-mono text-gray-600 border border-green-200 break-all">
                    {xssPayload}
                  </code>
                  <button
                    onClick={() => copyToClipboard(xssPayload)}
                    className="p-2 hover:bg-green-100 rounded flex-shrink-0"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4 text-green-600" />
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">XSS Payload #2 (Won't Work):</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-white px-3 py-2 rounded text-sm font-mono text-gray-600 border border-green-200 break-all">
                    {xssPayload2}
                  </code>
                  <button
                    onClick={() => copyToClipboard(xssPayload2)}
                    className="p-2 hover:bg-green-100 rounded flex-shrink-0"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4 text-green-600" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-green-700 mt-2">
                ✅ Input sanitization strips malicious code
              </p>
            </div>

            {/* Security Measures */}
            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Security Measures:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✅ Input sanitization</li>
                <li>✅ HTML tag stripping</li>
                <li>✅ Script execution prevention</li>
                <li>✅ Length validation</li>
              </ul>
            </div>

            {/* Result */}
            {commentResult && (
              <div className={`mt-4 p-4 rounded-lg ${commentResult.success ? 'bg-green-100 border border-green-300' : 'bg-gray-100 border border-gray-300'}`}>
                <h4 className="font-semibold mb-2">Result:</h4>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(commentResult.data, null, 2)}
                </pre>
                {commentResult.data.comment && (
                  <div className="mt-3">
                    <p className="text-sm font-semibold mb-1">Sanitized Output (Safe!):</p>
                    <div className="bg-white p-3 rounded border border-green-300">
                      {commentResult.data.comment}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Educational Info */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">How These Protections Work</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Parameterized Queries</h4>
              <p className="text-sm text-gray-600 mb-2">
                Instead of concatenating user input into queries, we use Mongoose's built-in query methods 
                that treat input as data, not code.
              </p>
              <code className="block bg-white p-2 rounded text-xs mt-2">
                SecurityDemo.findOne(&#123; username, password &#125;)
              </code>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Input Sanitization</h4>
              <p className="text-sm text-gray-600 mb-2">
                We use the sanitize-html library to strip all HTML tags and scripts from user input 
                before storing or displaying it.
              </p>
              <code className="block bg-white p-2 rounded text-xs mt-2">
                sanitizeHtml(input, &#123; allowedTags: [] &#125;)
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecureDemo;
