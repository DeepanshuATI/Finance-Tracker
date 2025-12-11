import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, AlertTriangle, Lock, Code } from 'lucide-react';

const SecurityDashboard = () => {
  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Security Demonstrations</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Learn about web security vulnerabilities and how to protect against them
          </p>
        </div>

        {/* Warning Banner */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-yellow-800 font-semibold mb-1">Educational Purpose Only</h3>
              <p className="text-yellow-700 text-sm">
                These demonstrations contain intentionally vulnerable code for educational purposes. 
                Never use vulnerable implementations in production environments.
              </p>
            </div>
          </div>
        </div>

        {/* SSL/TLS Info Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start gap-4">
            <Lock className="w-8 h-8 text-green-600 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">SSL/TLS Encryption</h2>
              <p className="text-gray-600 mb-4">
                This application supports HTTPS encryption to secure data transmission between client and server. 
                SSL/TLS protocols encrypt all communication, preventing eavesdropping and man-in-the-middle attacks.
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-800 font-medium">✅ HTTPS Enabled</p>
                <p className="text-green-700 text-sm mt-1">
                  Your connection is secured with TLS encryption
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Demonstration Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Vulnerable Demo Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-red-200">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-800">Vulnerable Demo</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Explore common security vulnerabilities including SQL/NoSQL Injection and Cross-Site Scripting (XSS). 
              See how attackers can exploit insecure code.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Code className="w-4 h-4" />
                <span>NoSQL Injection demonstration</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Code className="w-4 h-4" />
                <span>XSS (Cross-Site Scripting) demonstration</span>
              </div>
            </div>
            <Link
              to="/security/vulnerable"
              className="block w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors"
            >
              Explore Vulnerabilities
            </Link>
          </div>

          {/* Secure Demo Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800">Secure Demo</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Learn how to implement proper security measures. See how parameterized queries and input sanitization 
              protect against attacks.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Lock className="w-4 h-4" />
                <span>Parameterized queries</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Lock className="w-4 h-4" />
                <span>Input sanitization</span>
              </div>
            </div>
            <Link
              to="/security/secure"
              className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors"
            >
              Learn Security Best Practices
            </Link>
          </div>
        </div>

        {/* Educational Resources */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">What You'll Learn</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">NoSQL Injection</h4>
              <p className="text-sm text-gray-600">
                Understand how attackers manipulate database queries and how to prevent it with proper input validation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Cross-Site Scripting (XSS)</h4>
              <p className="text-sm text-gray-600">
                Learn how malicious scripts can be injected into web pages and how sanitization protects users.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Secure Coding Practices</h4>
              <p className="text-sm text-gray-600">
                Discover industry-standard techniques for writing secure code and protecting user data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityDashboard;
