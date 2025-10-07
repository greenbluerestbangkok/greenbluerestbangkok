'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Entrepreneur {
  id: number;
  title: string;
  description: string;
  image_url: string;
  slug: string;
  content: string;
  contact_info: string;
  location: string;
  category: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function EntrepreneursPage() {
  const [entrepreneurs, setEntrepreneurs] = useState<Entrepreneur[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const router = useRouter();

  useEffect(() => {
    fetchEntrepreneurs();
  }, []);

  const fetchEntrepreneurs = async () => {
    try {
      const response = await fetch('/api/entrepreneurs');
      if (response.ok) {
        const data = await response.json();
        setEntrepreneurs(data);
      } else {
        console.error('Failed to fetch entrepreneurs');
      }
    } catch (error) {
      console.error('Error fetching entrepreneurs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('คุณต้องการลบผู้ประกอบการรายนี้หรือไม่?')) return;

    try {
      const response = await fetch(`/api/entrepreneurs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEntrepreneurs(entrepreneurs.filter(entrepreneur => entrepreneur.id !== id));
      } else {
        alert('เกิดข้อผิดพลาดในการลบผู้ประกอบการ');
      }
    } catch (error) {
      console.error('Error deleting entrepreneur:', error);
      alert('เกิดข้อผิดพลาดในการลบผู้ประกอบการ');
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    
    try {
      const response = await fetch(`/api/entrepreneurs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setEntrepreneurs(entrepreneurs.map(entrepreneur => 
          entrepreneur.id === id ? { ...entrepreneur, status: newStatus } : entrepreneur
        ));
      } else {
        alert('เกิดข้อผิดพลาดในการอัปเดตสถานะ');
      }
    } catch (error) {
      console.error('Error updating entrepreneur status:', error);
      alert('เกิดข้อผิดพลาดในการอัปเดตสถานะ');
    }
  };

  const filteredEntrepreneurs = entrepreneurs.filter(entrepreneur => {
    const matchesSearch = entrepreneur.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entrepreneur.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entrepreneur.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || entrepreneur.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">จัดการผู้ประกอบการ</h1>
          <button
            onClick={() => router.push('/entrepreneurs/new')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            เพิ่มผู้ประกอบการใหม่
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="ค้นหาผู้ประกอบการ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">ทุกสถานะ</option>
              <option value="published">เผยแพร่แล้ว</option>
              <option value="draft">ร่าง</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntrepreneurs.map((entrepreneur) => (
            <div key={entrepreneur.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  {entrepreneur.image_url ? (
                    <img
                      src={entrepreneur.image_url}
                      alt={entrepreneur.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-gray-400">
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {entrepreneur.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {entrepreneur.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {entrepreneur.category}
                  </span>
                  <span className="text-xs">{entrepreneur.location}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded text-xs ${
                    entrepreneur.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {entrepreneur.status === 'published' ? 'เผยแพร่แล้ว' : 'ร่าง'}
                  </span>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleToggleStatus(entrepreneur.id, entrepreneur.status)}
                      className={`px-3 py-1 rounded text-xs ${
                        entrepreneur.status === 'published'
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                    >
                      {entrepreneur.status === 'published' ? 'ปิดการเผยแพร่' : 'เผยแพร่'}
                    </button>
                    
                    <button
                      onClick={() => router.push(`/entrepreneurs/${entrepreneur.id}/edit`)}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-xs hover:bg-blue-200"
                    >
                      แก้ไข
                    </button>
                    
                    <button
                      onClick={() => handleDelete(entrepreneur.id)}
                      className="bg-red-100 text-red-800 px-3 py-1 rounded text-xs hover:bg-red-200"
                    >
                      ลบ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEntrepreneurs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่มีผู้ประกอบการ</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || statusFilter !== 'all' 
                ? 'ไม่พบผู้ประกอบการที่ตรงกับเงื่อนไขการค้นหา' 
                : 'เริ่มต้นด้วยการเพิ่มผู้ประกอบการใหม่'}
            </p>
            {(!searchTerm && statusFilter === 'all') && (
              <button
                onClick={() => router.push('/entrepreneurs/new')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                เพิ่มผู้ประกอบการใหม่
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
