import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Copy, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const VulnerableDemo = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [commentData, setCommentData] = useState('');
  const [loginResult, setLoginResult] = useState(null);
  const [commentResult, setCommentResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

  // Attack payloads
  const sqlInjectionPayload = `{"$ne": null}`;
  const xssPayload = `<script>alert('XSS Attack!')</script>`;
  const xssPayload2 = `<img src=x onerror="alert('XSS')">`;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleVulnerableLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginResult(null);

    try {
      const response = await axios.post(`${API_URL}/security/vulnerable/login`, loginData);
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

  const handleVulnerableComment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setCommentResult(null);

    try {
      const response = await axios.post(`${API_URL}/security/vulnerable/comment`, {
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
            <AlertTriangle className="w-10 h-10 text-red-600" />
            <h1 className="text-4xl font-bold text-gray-800">Vulnerable Demonstrations</h1>
          </div>
          <Link to="/security" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Security Dashboard
          </Link>
        </div>

        {/* Warning Banner */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-lg">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-red-800 font-semibold mb-1">⚠️ Intentionally Vulnerable Code</h3>
              <p className="text-red-700 text-sm">
                These endpoints contain security vulnerabilities for educational purposes. 
                Try the attack payloads below to see how they work.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* NoSQL Injection Demo */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">❌ NoSQL Injection Demo</h2>
            
            <form onSubmit={handleVulnerableLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="text"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="text"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Testing...' : 'Login (Vulnerable)'}
              </button>
            </form>

            {/* Attack Payload */}
            <div className="mt-6 bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">🔓 Try This Attack:</h3>
              <p className="text-sm text-gray-600 mb-2">NoSQL Injection Payload:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-white px-3 py-2 rounded text-sm font-mono text-red-600 border border-red-200">
                  {sqlInjectionPayload}
                </code>
                <button
                  onClick={() => copyToClipboard(sqlInjectionPayload)}
                  className="p-2 hover:bg-red-100 rounded"
                  title="Copy to clipboard"
                >
                  <Copy className="w-4 h-4 text-red-600" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Paste this in the email field to bypass authentication
              </p>
            </div>

            {/* Result */}
            {loginResult && (
              <div className={`mt-4 p-4 rounded-lg ${loginResult.success ? 'bg-red-100 border border-red-300' : 'bg-gray-100 border border-gray-300'}`}>
                <h4 className="font-semibold mb-2">Result:</h4>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(loginResult.data, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* XSS Demo */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">❌ XSS (Cross-Site Scripting) Demo</h2>
            
            <form onSubmit={handleVulnerableComment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comment
                </label>
                <textarea
                  value={commentData}
                  onChange={(e) => setCommentData(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows="4"
                  placeholder="Enter your comment"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Posting...' : 'Post Comment (Vulnerable)'}
              </button>
            </form>

            {/* Attack Payloads */}
            <div className="mt-6 bg-red-50 p-4 rounded-lg space-y-3">
              <h3 className="font-semibold text-gray-800 mb-2">🔓 Try These Attacks:</h3>
              
              <div>
                <p className="text-sm text-gray-600 mb-2">XSS Payload #1:</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-white px-3 py-2 rounded text-sm font-mono text-red-600 border border-red-200 break-all">
                    {xssPayload}
                  </code>
                  <button
                    onClick={() => copyToClipboard(xssPayload)}
                    className="p-2 hover:bg-red-100 rounded flex-shrink-0"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">XSS Payload #2:</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-white px-3 py-2 rounded text-sm font-mono text-red-600 border border-red-200 break-all">
                    {xssPayload2}
                  </code>
                  <button
                    onClick={() => copyToClipboard(xssPayload2)}
                    className="p-2 hover:bg-red-100 rounded flex-shrink-0"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Result */}
            {commentResult && (
              <div className={`mt-4 p-4 rounded-lg ${commentResult.success ? 'bg-red-100 border border-red-300' : 'bg-gray-100 border border-gray-300'}`}>
                <h4 className="font-semibold mb-2">Result:</h4>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(commentResult.data, null, 2)}
                </pre>
                {commentResult.data.html && (
                  <div className="mt-3">
                    <p className="text-sm font-semibold mb-1">Rendered HTML (Dangerous!):</p>
                    <div 
                      className="bg-white p-3 rounded border border-red-300"
                      dangerouslySetInnerHTML={{ __html: commentResult.data.html }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Educational Info */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Why These Are Dangerous</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">NoSQL Injection</h4>
              <p className="text-sm text-gray-600">
                Attackers can manipulate database queries by injecting malicious operators. 
                This can bypass authentication, access unauthorized data, or modify database contents.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Cross-Site Scripting (XSS)</h4>
              <p className="text-sm text-gray-600">
                Malicious scripts can be injected into web pages, allowing attackers to steal cookies, 
                session tokens, or perform actions on behalf of users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VulnerableDemo;
