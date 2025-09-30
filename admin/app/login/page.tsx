'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
      });

      if (response.ok) {
        router.push('/admin'); // Redirect to dashboard
      } else {
        const data = await response.json();
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <span className="text-3xl">🏛️</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Panel
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            GreenBlueRest Bangkok
          </p>
          <p className="text-sm text-gray-500">
            เข้าสู่ระบบเพื่อจัดการเนื้อหาและสื่อ
          </p>
        </div>
        <div className="admin-card">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="identifier" className="form-label">
                  ชื่อผู้ใช้หรืออีเมล
                </label>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  required
                  className="form-input"
                  placeholder="admin หรือ admin@greenbluerestbangkok.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="form-label">
                  รหัสผ่าน
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="alert alert-error">
                <span className="mr-2">❌</span>
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 text-lg disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="spinner mr-2"></div>
                    กำลังเข้าสู่ระบบ...
                  </span>
                ) : (
                  'เข้าสู่ระบบ'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
