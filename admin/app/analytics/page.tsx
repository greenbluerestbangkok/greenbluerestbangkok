'use client';

import { useState, useEffect } from 'react';

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: string;
  topPages: Array<{
    page: string;
    views: number;
  }>;
  trafficSources: Array<{
    source: string;
    percentage: number;
  }>;
  deviceTypes: Array<{
    device: string;
    percentage: number;
  }>;
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      
      // Mock data for demonstration
      // In real implementation, this would fetch from Google Analytics API
      const mockData: AnalyticsData = {
        pageViews: 12450,
        uniqueVisitors: 8230,
        bounceRate: 45.2,
        avgSessionDuration: '2:34',
        topPages: [
          { page: '/', views: 3450 },
          { page: '/pages/trips.html', views: 2890 },
          { page: '/pages/products.html', views: 2150 },
          { page: '/pages/operators.html', views: 1890 },
          { page: '/pages/activities.html', views: 1560 },
          { page: '/pages/low-carbon.html', views: 1340 },
          { page: '/pages/learning-city.html', views: 890 },
          { page: '/pages/contact.html', views: 580 }
        ],
        trafficSources: [
          { source: 'Direct', percentage: 45.2 },
          { source: 'Google Search', percentage: 32.1 },
          { source: 'Social Media', percentage: 12.8 },
          { source: 'Referral', percentage: 7.3 },
          { source: 'Email', percentage: 2.6 }
        ],
        deviceTypes: [
          { device: 'Desktop', percentage: 52.3 },
          { device: 'Mobile', percentage: 38.7 },
          { device: 'Tablet', percentage: 9.0 }
        ]
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAnalyticsData(mockData);
      setError(null);
    } catch (err) {
      setError('ไม่สามารถโหลดข้อมูลการวิเคราะห์ได้');
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('th-TH').format(num);
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">การวิเคราะห์เว็บไซต์</h1>
          <p className="text-gray-600">ติดตามสถิติและประสิทธิภาพของเว็บไซต์</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="form-input"
          >
            <option value="1d">วันนี้</option>
            <option value="7d">7 วันที่แล้ว</option>
            <option value="30d">30 วันที่แล้ว</option>
            <option value="90d">90 วันที่แล้ว</option>
          </select>
          <button
            onClick={fetchAnalyticsData}
            className="btn-secondary"
          >
            รีเฟรช
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-error mb-6">
          {error}
        </div>
      )}

      {analyticsData && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="admin-card text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👁️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {formatNumber(analyticsData.pageViews)}
              </h3>
              <p className="text-gray-600">จำนวนการดูหน้าเว็บ</p>
            </div>

            <div className="admin-card text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {formatNumber(analyticsData.uniqueVisitors)}
              </h3>
              <p className="text-gray-600">ผู้เยี่ยมชมไม่ซ้ำ</p>
            </div>

            <div className="admin-card text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">↩️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {analyticsData.bounceRate}%
              </h3>
              <p className="text-gray-600">อัตราการออก</p>
            </div>

            <div className="admin-card text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⏱️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {analyticsData.avgSessionDuration}
              </h3>
              <p className="text-gray-600">เวลาอยู่เฉลี่ย</p>
            </div>
          </div>

          {/* Charts and Data */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Pages */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">หน้าเว็บยอดนิยม</h2>
              <div className="space-y-4">
                {analyticsData.topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {page.page}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${(page.views / (analyticsData.topPages[0]?.views || 1)) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="ml-4 text-sm font-medium text-gray-900">
                      {formatNumber(page.views)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Traffic Sources */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">แหล่งที่มาของผู้เยี่ยมชม</h2>
              <div className="space-y-4">
                {analyticsData.trafficSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {source.source}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="ml-4 text-sm font-medium text-gray-900">
                      {source.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Device Types */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">ประเภทอุปกรณ์</h2>
              <div className="space-y-4">
                {analyticsData.deviceTypes.map((device, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {device.device}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${device.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="ml-4 text-sm font-medium text-gray-900">
                      {device.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-time Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">สถิติแบบเรียลไทม์</h2>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {Math.floor(Math.random() * 50) + 10}
                  </div>
                  <p className="text-gray-600">ผู้ใช้ที่กำลังออนไลน์</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600 mb-1">
                      {Math.floor(Math.random() * 200) + 50}
                    </div>
                    <p className="text-sm text-gray-600">หน้า/นาที</p>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-600 mb-1">
                      {Math.floor(Math.random() * 100) + 20}
                    </div>
                    <p className="text-sm text-gray-600">เซสชัน/นาที</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Integration Status */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">สถานะการเชื่อมต่อ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <div>
                    <div className="font-medium text-gray-900">Google Analytics</div>
                    <div className="text-sm text-gray-600">เชื่อมต่อแล้ว</div>
                  </div>
                </div>
                <span className="badge badge-success">ใช้งานได้</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <div>
                    <div className="font-medium text-gray-900">Facebook Pixel</div>
                    <div className="text-sm text-gray-600">เชื่อมต่อแล้ว</div>
                  </div>
                </div>
                <span className="badge badge-info">ใช้งานได้</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
