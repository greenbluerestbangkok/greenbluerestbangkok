'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewTripPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    fullDescription: '',
    price: '',
    duration: '',
    capacity: '',
    schedule: '',
    mainImage: '',
    gallery: '',
    highlights: '',
    includes: '',
    videoUrl: '',
    status: 'active'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Parse gallery and highlights from strings to arrays
      const parsedGallery = formData.gallery ? formData.gallery.split('\n').filter(url => url.trim()) : [];
      const parsedHighlights = formData.highlights ? formData.highlights.split('\n').filter(item => item.trim()) : [];
      const parsedIncludes = formData.includes ? formData.includes.split('\n').filter(item => item.trim()) : [];

      // Mock API call for now
      console.log('Mock creating trip:', {
        ...formData,
        gallery: parsedGallery,
        highlights: parsedHighlights,
        includes: parsedIncludes,
      });

      // Simulate successful creation
      alert('สร้างทริปเรียบร้อยแล้ว (Mock Data)');
      router.push('/trips');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create trip');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">เพิ่มทริปใหม่</h1>
          <p className="text-gray-600">สร้างทริปท่องเที่ยวใหม่</p>
        </div>
        <Link href="/trips" className="btn-secondary">
          กลับไปรายการทริป
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-error mb-6">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">ข้อมูลพื้นฐาน</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="name" className="form-label">
                ชื่อทริป *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="ชื่อทริปท่องเที่ยว"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="shortDescription" className="form-label">
                คำอธิบายสั้น *
              </label>
              <textarea
                id="shortDescription"
                name="shortDescription"
                required
                rows={3}
                value={formData.shortDescription}
                onChange={handleChange}
                className="form-input"
                placeholder="คำอธิบายสั้นๆ เกี่ยวกับทริป"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="fullDescription" className="form-label">
                คำอธิบายเต็ม
              </label>
              <textarea
                id="fullDescription"
                name="fullDescription"
                rows={6}
                value={formData.fullDescription}
                onChange={handleChange}
                className="form-input"
                placeholder="คำอธิบายรายละเอียดของทริป"
              />
            </div>

            <div>
              <label htmlFor="price" className="form-label">
                ราคา *
              </label>
              <input
                type="text"
                id="price"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                className="form-input"
                placeholder="เช่น 1,500 บาท"
              />
            </div>

            <div>
              <label htmlFor="duration" className="form-label">
                ระยะเวลา *
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                required
                value={formData.duration}
                onChange={handleChange}
                className="form-input"
                placeholder="เช่น 1 วัน"
              />
            </div>

            <div>
              <label htmlFor="capacity" className="form-label">
                ความจุ
              </label>
              <input
                type="text"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="form-input"
                placeholder="เช่น 10-15 คน"
              />
            </div>

            <div>
              <label htmlFor="status" className="form-label">
                สถานะ
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-input"
              >
                <option value="active">เปิดใช้งาน</option>
                <option value="inactive">ปิดใช้งาน</option>
                <option value="draft">ร่าง</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">รูปภาพและสื่อ</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="mainImage" className="form-label">
                รูปภาพหลัก
              </label>
              <input
                type="url"
                id="mainImage"
                name="mainImage"
                value={formData.mainImage}
                onChange={handleChange}
                className="form-input"
                placeholder="URL ของรูปภาพหลัก"
              />
            </div>

            <div>
              <label htmlFor="gallery" className="form-label">
                แกลเลอรี่รูปภาพ
              </label>
              <textarea
                id="gallery"
                name="gallery"
                rows={4}
                value={formData.gallery}
                onChange={handleChange}
                className="form-input"
                placeholder="URL ของรูปภาพ (แยกแต่ละบรรทัด)"
              />
            </div>

            <div>
              <label htmlFor="videoUrl" className="form-label">
                URL วิดีโอ
              </label>
              <input
                type="url"
                id="videoUrl"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                className="form-input"
                placeholder="URL ของวิดีโอ"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">รายละเอียดเพิ่มเติม</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="schedule" className="form-label">
                ตารางการเดินทาง
              </label>
              <textarea
                id="schedule"
                name="schedule"
                rows={6}
                value={formData.schedule}
                onChange={handleChange}
                className="form-input"
                placeholder="รายละเอียดตารางการเดินทาง"
              />
            </div>

            <div>
              <label htmlFor="highlights" className="form-label">
                จุดเด่น
              </label>
              <textarea
                id="highlights"
                name="highlights"
                rows={4}
                value={formData.highlights}
                onChange={handleChange}
                className="form-input"
                placeholder="จุดเด่นของทริป (แยกแต่ละบรรทัด)"
              />
            </div>

            <div>
              <label htmlFor="includes" className="form-label">
                สิ่งที่รวมในราคา
              </label>
              <textarea
                id="includes"
                name="includes"
                rows={4}
                value={formData.includes}
                onChange={handleChange}
                className="form-input"
                placeholder="สิ่งที่รวมในราคา (แยกแต่ละบรรทัด)"
              />
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <Link href="/trips" className="btn-secondary">
            ยกเลิก
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50"
          >
            {loading ? 'กำลังบันทึก...' : 'สร้างทริป'}
          </button>
        </div>
      </form>
    </div>
  );
}