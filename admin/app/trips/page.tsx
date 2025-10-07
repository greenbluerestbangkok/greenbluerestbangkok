'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trip } from '@/lib/schema';

interface TripListResponse {
  trips: Trip[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  });

  const fetchTrips = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(search && { search }),
        ...(statusFilter && { status: statusFilter })
      });

      // Fetch from API
      const response = await fetch(`/api/trips?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch trips');
      }

      const data: TripListResponse = await response.json();
      
      setTrips(data.trips || []);
      setPagination(data.pagination || {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0
      });
      setError(null);
      setLoading(false);

    } catch (err) {
      console.error('Error fetching trips:', err);
      
      // Use fallback mock data if API fails
      const mockTrips = [
        {
          id: 1,
          name: 'เที่ยวชุมชนคลองบางมด 1 วัน',
          shortDescription: 'สัมผัสวิถีชีวิตชุมชนริมคลองบางมด',
          fullDescription: 'ทริปท่องเที่ยวชุมชนริมคลองบางมด เรียนรู้วิถีชีวิตดั้งเดิม',
          price: '1,500 บาท',
          duration: '1 วัน',
          capacity: '10-15 คน',
          schedule: '08:00 - 17:00',
          mainImage: '/images/trip1/large/trip1-main.webp',
          gallery: ['/images/trip1/large/trip1-main.webp'],
          highlights: ['เรียนรู้วิถีชีวิตชุมชน', 'ล่องเรือชมธรรมชาติ', 'ชิมอาหารท้องถิ่น'],
          includes: ['รถรับส่ง', 'อาหารกลางวัน', 'ไกด์ท้องถิ่น'],
          videoUrl: '',
          status: 'active' as const,
          featured: true
        },
        {
          id: 2,
          name: 'ตลาดน้ำบางมด',
          shortDescription: 'สัมผัสตลาดน้ำแบบดั้งเดิม',
          fullDescription: 'เยี่ยมชมตลาดน้ำบางมด ตลาดน้ำที่ยังคงวิถีชีวิตดั้งเดิม',
          price: '800 บาท',
          duration: 'ครึ่งวัน',
          capacity: '8-12 คน',
          schedule: '06:00 - 12:00',
          mainImage: '/images/trip2/large/trip2-main.webp',
          gallery: ['/images/trip2/large/trip2-main.webp'],
          highlights: ['ตลาดน้ำดั้งเดิม', 'อาหารพื้นบ้าน', 'วิถีชีวิตชุมชน'],
          includes: ['รถรับส่ง', 'อาหารเช้า'],
          videoUrl: '',
          status: 'active' as const,
          featured: false
        },
        {
          id: 3,
          name: 'ท่องเที่ยวชุมชนคลองลัดโพธิ์',
          shortDescription: 'สัมผัสวิถีชีวิตชุมชนริมคลองลัดโพธิ์',
          fullDescription: 'ทริปท่องเที่ยวชุมชนริมคลองลัดโพธิ์ เรียนรู้วิถีชีวิตดั้งเดิมของชาวคลอง',
          price: '1,200 บาท',
          duration: '1 วัน',
          capacity: '12-20 คน',
          schedule: '07:00 - 16:00',
          mainImage: '/images/trip3/large/trip3-main.webp',
          gallery: ['/images/trip3/large/trip3-main.webp'],
          highlights: ['ล่องเรือชมคลอง', 'เรียนรู้การทำเกษตร', 'ชิมอาหารพื้นบ้าน'],
          includes: ['รถรับส่ง', 'อาหารกลางวัน', 'ไกด์ท้องถิ่น', 'อุปกรณ์ล่องเรือ'],
          videoUrl: '',
          status: 'active' as const,
          featured: true
        },
        {
          id: 4,
          name: 'ตลาดนัดชุมชนบางมด',
          shortDescription: 'สัมผัสตลาดนัดชุมชนบางมด',
          fullDescription: 'เยี่ยมชมตลาดนัดชุมชนบางมด ตลาดนัดที่ยังคงวิถีชีวิตดั้งเดิม',
          price: '600 บาท',
          duration: 'ครึ่งวัน',
          capacity: '6-10 คน',
          schedule: '05:00 - 11:00',
          mainImage: '/images/trip4/large/trip4-main.webp',
          gallery: ['/images/trip4/large/trip4-main.webp'],
          highlights: ['ตลาดนัดชุมชน', 'อาหารพื้นบ้าน', 'ของฝากท้องถิ่น'],
          includes: ['รถรับส่ง', 'อาหารเช้า'],
          videoUrl: '',
          status: 'active' as const,
          featured: false
        },
        {
          id: 5,
          name: 'ท่องเที่ยวชุมชนคลองบางมด 2 วัน 1 คืน',
          shortDescription: 'สัมผัสวิถีชีวิตชุมชนริมคลองบางมด 2 วัน 1 คืน',
          fullDescription: 'ทริปท่องเที่ยวชุมชนริมคลองบางมด 2 วัน 1 คืน เรียนรู้วิถีชีวิตดั้งเดิมแบบเต็มรูปแบบ',
          price: '2,800 บาท',
          duration: '2 วัน 1 คืน',
          capacity: '8-15 คน',
          schedule: 'วันแรก 08:00 - วันที่สอง 17:00',
          mainImage: '/images/trip5/large/trip5-main.webp',
          gallery: ['/images/trip5/large/trip5-main.webp'],
          highlights: ['เรียนรู้วิถีชีวิตชุมชน', 'ล่องเรือชมธรรมชาติ', 'ชิมอาหารท้องถิ่น', 'พักค้างคืน'],
          includes: ['รถรับส่ง', 'อาหาร 3 มื้อ', 'ไกด์ท้องถิ่น', 'ที่พัก'],
          videoUrl: '',
          status: 'active' as const,
          featured: true
        },
        {
          id: 6,
          name: 'ตลาดน้ำคลองลัดโพธิ์',
          shortDescription: 'สัมผัสตลาดน้ำคลองลัดโพธิ์',
          fullDescription: 'เยี่ยมชมตลาดน้ำคลองลัดโพธิ์ ตลาดน้ำที่ยังคงวิถีชีวิตดั้งเดิม',
          price: '900 บาท',
          duration: 'ครึ่งวัน',
          capacity: '8-12 คน',
          schedule: '06:00 - 12:00',
          mainImage: '/images/trip6/large/trip6-main.webp',
          gallery: ['/images/trip6/large/trip6-main.webp'],
          highlights: ['ตลาดน้ำดั้งเดิม', 'อาหารพื้นบ้าน', 'วิถีชีวิตชุมชน'],
          includes: ['รถรับส่ง', 'อาหารเช้า'],
          videoUrl: '',
          status: 'active' as const,
          featured: false
        },
        {
          id: 7,
          name: 'ท่องเที่ยวชุมชนคลองบางมด ครึ่งวัน',
          shortDescription: 'สัมผัสวิถีชีวิตชุมชนริมคลองบางมด ครึ่งวัน',
          fullDescription: 'ทริปท่องเที่ยวชุมชนริมคลองบางมด ครึ่งวัน เรียนรู้วิถีชีวิตดั้งเดิมแบบสั้นๆ',
          price: '1,000 บาท',
          duration: 'ครึ่งวัน',
          capacity: '10-15 คน',
          schedule: '08:00 - 12:00',
          mainImage: '/images/trip7/large/trip7-main.webp',
          gallery: ['/images/trip7/large/trip7-main.webp'],
          highlights: ['เรียนรู้วิถีชีวิตชุมชน', 'ล่องเรือชมธรรมชาติ', 'ชิมอาหารท้องถิ่น'],
          includes: ['รถรับส่ง', 'อาหารเช้า', 'ไกด์ท้องถิ่น'],
          videoUrl: '',
          status: 'active' as const,
          featured: false
        },
        {
          id: 8,
          name: 'ตลาดนัดชุมชนคลองลัดโพธิ์',
          shortDescription: 'สัมผัสตลาดนัดชุมชนคลองลัดโพธิ์',
          fullDescription: 'เยี่ยมชมตลาดนัดชุมชนคลองลัดโพธิ์ ตลาดนัดที่ยังคงวิถีชีวิตดั้งเดิม',
          price: '700 บาท',
          duration: 'ครึ่งวัน',
          capacity: '6-10 คน',
          schedule: '05:00 - 11:00',
          mainImage: '/images/trip8/large/trip8-main.webp',
          gallery: ['/images/trip8/large/trip8-main.webp'],
          highlights: ['ตลาดนัดชุมชน', 'อาหารพื้นบ้าน', 'ของฝากท้องถิ่น'],
          includes: ['รถรับส่ง', 'อาหารเช้า'],
          videoUrl: '',
          status: 'active' as const,
          featured: false
        },
        {
          id: 9,
          name: 'ท่องเที่ยวชุมชนคลองบางมด 3 วัน 2 คืน',
          shortDescription: 'สัมผัสวิถีชีวิตชุมชนริมคลองบางมด 3 วัน 2 คืน',
          fullDescription: 'ทริปท่องเที่ยวชุมชนริมคลองบางมด 3 วัน 2 คืน เรียนรู้วิถีชีวิตดั้งเดิมแบบเต็มรูปแบบ',
          price: '4,500 บาท',
          duration: '3 วัน 2 คืน',
          capacity: '6-12 คน',
          schedule: 'วันแรก 08:00 - วันที่สาม 17:00',
          mainImage: '/images/trip9/large/trip9-main.webp',
          gallery: ['/images/trip9/large/trip9-main.webp'],
          highlights: ['เรียนรู้วิถีชีวิตชุมชน', 'ล่องเรือชมธรรมชาติ', 'ชิมอาหารท้องถิ่น', 'พักค้างคืน 2 คืน'],
          includes: ['รถรับส่ง', 'อาหาร 6 มื้อ', 'ไกด์ท้องถิ่น', 'ที่พัก 2 คืน'],
          videoUrl: '',
          status: 'active' as const,
          featured: true
        },
        {
          id: 10,
          name: 'ตลาดน้ำคลองบางมด',
          shortDescription: 'สัมผัสตลาดน้ำคลองบางมด',
          fullDescription: 'เยี่ยมชมตลาดน้ำคลองบางมด ตลาดน้ำที่ยังคงวิถีชีวิตดั้งเดิม',
          price: '750 บาท',
          duration: 'ครึ่งวัน',
          capacity: '8-12 คน',
          schedule: '06:00 - 12:00',
          mainImage: '/images/trip10/large/trip10-main.webp',
          gallery: ['/images/trip10/large/trip10-main.webp'],
          highlights: ['ตลาดน้ำดั้งเดิม', 'อาหารพื้นบ้าน', 'วิถีชีวิตชุมชน'],
          includes: ['รถรับส่ง', 'อาหารเช้า'],
          videoUrl: '',
          status: 'active' as const,
          featured: false
        }
      ];

      setTrips(mockTrips);
      setPagination({
        page: 1,
        limit: 20,
        total: mockTrips.length,
        totalPages: 1
      });
      setError(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [search, statusFilter]);

  const handleDelete = async (tripId: number, tripName: string) => {
    if (!confirm(`คุณต้องการลบทริป "${tripName}" หรือไม่?`)) {
      return;
    }

    try {
      // Mock delete - just remove from local state
      setTrips(prevTrips => prevTrips.filter(trip => trip.id !== tripId));
      
      // Reset to full mock data after 2 seconds to restore deleted trips
      setTimeout(() => {
        console.log('Restoring mock data after delete...');
        fetchTrips();
      }, 2000);
      
      alert('ลบทริปเรียบร้อยแล้ว (Mock Data) - ทริปจะกลับมาใน 2 วินาที');

    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete trip');
    }
  };

  const handleStatusToggle = async (tripId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    try {
      // Mock update - just update local state
      setTrips(prevTrips => 
        prevTrips.map(trip => 
          trip.id === tripId ? { ...trip, status: newStatus } : trip
        )
      );
      alert(`อัปเดตสถานะเรียบร้อยแล้ว (Mock Data): ${newStatus === 'active' ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}`);

    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update trip status');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">จัดการทริปท่องเที่ยว</h1>
          <p className="text-gray-600">จัดการข้อมูลทริปท่องเที่ยวทั้งหมด</p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => {
              fetchTrips();
              alert('กู้คืนทริปแนะนำเรียบร้อยแล้ว!');
            }}
            className="btn-secondary"
          >
            🔄 กู้คืนทริปแนะนำ
          </button>
          <Link
            href="/trips/new"
            className="btn-primary"
          >
            เพิ่มทริปใหม่
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="form-label">ค้นหาทริป</label>
            <input
              type="text"
              placeholder="ค้นหาตามชื่อหรือคำอธิบาย..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">สถานะ</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-input"
            >
              <option value="">ทุกสถานะ</option>
              <option value="active">เปิดใช้งาน</option>
              <option value="inactive">ปิดใช้งาน</option>
              <option value="draft">ร่าง</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => fetchTrips(1)}
              className="btn-secondary w-full"
            >
              ค้นหา
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-error mb-6">
          {error}
        </div>
      )}

      {/* Trips Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ทริป
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ราคา
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ระยะเวลา
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  สถานะ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  จัดการ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {trips.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    ไม่พบทริปท่องเที่ยว
                  </td>
                </tr>
              ) : (
                trips.map((trip) => (
                  <tr key={trip.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {trip.mainImage && (
                          <img
                            src={trip.mainImage}
                            alt={trip.name}
                            className="h-12 w-12 rounded-lg object-cover mr-4"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {trip.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {trip.shortDescription}
                          </div>
                          <div className="text-xs text-gray-400">
                            ความจุ: {trip.capacity}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {trip.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {trip.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className={`badge ${
                          trip.status === 'active' ? 'badge-success' :
                          trip.status === 'inactive' ? 'badge-error' : 'badge-warning'
                        }`}>
                          {trip.status === 'active' ? 'เปิดใช้งาน' :
                           trip.status === 'inactive' ? 'ปิดใช้งาน' : 'ร่าง'}
                        </span>
                        {trip.featured && (
                          <span className="badge badge-info">แนะนำ</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Link
                        href={`/trips/${trip.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        แก้ไข
                      </Link>
                      <button
                        onClick={() => handleStatusToggle(trip.id, trip.status)}
                        className={`${
                          trip.status === 'active' 
                            ? 'text-red-600 hover:text-red-900' 
                            : 'text-green-600 hover:text-green-900'
                        }`}
                      >
                        {trip.status === 'active' ? 'ปิดใช้งาน' : 'เปิดใช้งาน'}
                      </button>
                      <button
                        onClick={() => handleDelete(trip.id, trip.name)}
                        className="text-red-600 hover:text-red-900"
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                แสดง {((pagination.page - 1) * pagination.limit) + 1} ถึง{' '}
                {Math.min(pagination.page * pagination.limit, pagination.total)} จาก{' '}
                {pagination.total} รายการ
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => fetchTrips(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ก่อนหน้า
                </button>
                <span className="px-3 py-2 text-sm text-gray-700">
                  หน้า {pagination.page} จาก {pagination.totalPages}
                </span>
                <button
                  onClick={() => fetchTrips(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ถัดไป
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
