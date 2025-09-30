'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateTrip } from '@/lib/schema';

export default function NewTripPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<CreateTrip>({
    name: '',
    shortDescription: '',
    fullDescription: '',
    price: '',
    duration: '',
    capacity: '',
    schedule: '',
    mainImage: '',
    gallery: [],
    highlights: [],
    includes: [],
    operator: '',
    category: '',
    status: 'draft',
    featured: false
  });

  const handleInputChange = (field: keyof CreateTrip, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayInputChange = (field: 'gallery' | 'highlights' | 'includes', value: string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addArrayItem = (field: 'gallery' | 'highlights' | 'includes', value: string) => {
    if (!value.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], value.trim()]
    }));
  };

  const removeArrayItem = (field: 'gallery' | 'highlights' | 'includes', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.shortDescription.trim()) {
      setError('กรุณากรอกชื่อทริปและคำอธิบายสั้น');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/admin/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create trip');
      }

      // Redirect to trip list
      router.push('/admin/trips');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create trip');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">เพิ่มทริปใหม่</h1>
          <p className="text-gray-600">สร้างทริปท่องเที่ยวใหม่</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="alert alert-error mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">ข้อมูลพื้นฐาน</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="form-label">ชื่อทริป *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="form-label">คำอธิบายสั้น *</label>
                <textarea
                  value={formData.shortDescription}
                  onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                  className="form-input"
                  rows={2}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="form-label">คำอธิบายเต็ม</label>
                <textarea
                  value={formData.fullDescription}
                  onChange={(e) => handleInputChange('fullDescription', e.target.value)}
                  className="form-input"
                  rows={4}
                />
              </div>

              <div>
                <label className="form-label">ราคา *</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="เช่น 800 บาท/คน"
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="form-label">ระยะเวลา *</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  placeholder="เช่น 3-4 ชั่วโมง"
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="form-label">ความจุ *</label>
                <input
                  type="text"
                  value={formData.capacity}
                  onChange={(e) => handleInputChange('capacity', e.target.value)}
                  placeholder="เช่น 2-8 คน"
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="form-label">ตารางเวลา *</label>
                <input
                  type="text"
                  value={formData.schedule}
                  onChange={(e) => handleInputChange('schedule', e.target.value)}
                  placeholder="เช่น ทุกวัน 8:00-17:00"
                  className="form-input"
                  required
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">รูปภาพ</h2>
            
            <div className="space-y-4">
              <div>
                <label className="form-label">รูปภาพหลัก</label>
                <input
                  type="url"
                  value={formData.mainImage}
                  onChange={(e) => handleInputChange('mainImage', e.target.value)}
                  placeholder="URL รูปภาพหลัก"
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">แกลเลอรี่รูปภาพ</label>
                <div className="space-y-2">
                  {formData.gallery.map((url, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => {
                          const newGallery = [...formData.gallery];
                          newGallery[index] = e.target.value;
                          handleArrayInputChange('gallery', newGallery);
                        }}
                        placeholder="URL รูปภาพ"
                        className="form-input flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('gallery', index)}
                        className="btn-secondary"
                      >
                        ลบ
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('gallery', '')}
                    className="btn-secondary"
                  >
                    เพิ่มรูปภาพ
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights & Includes */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">จุดเด่น</h3>
                <div className="space-y-2">
                  {formData.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) => {
                          const newHighlights = [...formData.highlights];
                          newHighlights[index] = e.target.value;
                          handleArrayInputChange('highlights', newHighlights);
                        }}
                        className="form-input flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('highlights', index)}
                        className="btn-secondary"
                      >
                        ลบ
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('highlights', '')}
                    className="btn-secondary"
                  >
                    เพิ่มจุดเด่น
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">สิ่งที่รวม</h3>
                <div className="space-y-2">
                  {formData.includes.map((include, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={include}
                        onChange={(e) => {
                          const newIncludes = [...formData.includes];
                          newIncludes[index] = e.target.value;
                          handleArrayInputChange('includes', newIncludes);
                        }}
                        className="form-input flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('includes', index)}
                        className="btn-secondary"
                      >
                        ลบ
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('includes', '')}
                    className="btn-secondary"
                  >
                    เพิ่มสิ่งที่รวม
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">การตั้งค่า</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="form-label">ผู้ประกอบการ</label>
                <input
                  type="text"
                  value={formData.operator}
                  onChange={(e) => handleInputChange('operator', e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">หมวดหมู่</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">สถานะ</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="form-input"
                >
                  <option value="draft">ร่าง</option>
                  <option value="active">เปิดใช้งาน</option>
                  <option value="inactive">ปิดใช้งาน</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => handleInputChange('featured', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">ทริปแนะนำ</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/admin/trips')}
              className="btn-secondary"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50"
            >
              {loading ? 'กำลังบันทึก...' : 'บันทึกทริป'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
