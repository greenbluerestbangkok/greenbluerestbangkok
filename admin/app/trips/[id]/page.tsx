'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ImageUploader from '@/components/ImageUploader';

export default function EditTripPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.id;
  
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTrip();
  }, [tripId]);

  const fetchTrip = async () => {
    try {
      const response = await fetch(`/api/trips/${tripId}`);
      if (response.ok) {
        const data = await response.json();
        setTrip(data.trip);
      }
    } catch (error) {
      console.error('Failed to fetch trip:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/trips/${tripId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trip)
      });

      if (response.ok) {
        alert('บันทึกสำเร็จ!');
        router.push('/trips');
      } else {
        alert('เกิดข้อผิดพลาด');
      }
    } catch (error) {
      alert('เกิดข้อผิดพลาด: ' + error);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    // TODO: Upload to Supabase Storage
    console.log('Upload image:', file);
    return '/images/placeholder.jpg';
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="spinner"></div>
    </div>;
  }

  if (!trip) {
    return <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">ไม่พบทริป</h1>
        <button onClick={() => router.push('/trips')} className="btn-primary">
          กลับไปหน้ารายการทริป
        </button>
      </div>
    </div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button onClick={() => router.push('/trips')} className="text-gray-600 hover:text-gray-900 mb-4">
          ← กลับ
        </button>
        <h1 className="text-3xl font-bold text-gray-900">แก้ไขทริป</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">ข้อมูลพื้นฐาน</h2>
          
          <div className="space-y-4">
            <ImageUploader
              currentImage={trip.image_url}
              onImageUpload={async (file) => {
                console.log('Uploading image:', file.name);
                const fakeUrl = `/images/trips/${file.name}`;
                setTrip({ ...trip, image_url: fakeUrl });
                return fakeUrl;
              }}
              onImageRemove={() => {
                setTrip({ ...trip, image_url: null });
              }}
              label="รูปภาพหลักทริป"
              aspectRatio="16:9"
            />

            <div>
              <label className="form-label">ชื่อทริป</label>
              <input
                type="text"
                value={trip.title || trip.name || ''}
                onChange={(e) => setTrip({ ...trip, title: e.target.value, name: e.target.value })}
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="form-label">คำอธิบายสั้น</label>
              <textarea
                value={trip.description || ''}
                onChange={(e) => setTrip({ ...trip, description: e.target.value })}
                className="form-input min-h-[100px]"
                required
              />
            </div>

            <div>
              <label className="form-label">คำอธิบายเต็ม</label>
              <textarea
                value={trip.content || ''}
                onChange={(e) => setTrip({ ...trip, content: e.target.value })}
                className="form-input min-h-[200px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">ราคา</label>
                <input
                  type="text"
                  value={trip.price || ''}
                  onChange={(e) => setTrip({ ...trip, price: e.target.value })}
                  className="form-input"
                  placeholder="เช่น 1,500 บาท"
                />
              </div>

              <div>
                <label className="form-label">ระยะเวลา</label>
                <input
                  type="text"
                  value={trip.duration || ''}
                  onChange={(e) => setTrip({ ...trip, duration: e.target.value })}
                  className="form-input"
                  placeholder="เช่น 1 วัน, ครึ่งวัน"
                />
              </div>

              <div>
                <label className="form-label">ความจุ</label>
                <input
                  type="text"
                  value={trip.capacity || ''}
                  onChange={(e) => setTrip({ ...trip, capacity: e.target.value })}
                  className="form-input"
                  placeholder="เช่น 10-15 คน"
                />
              </div>

              <div>
                <label className="form-label">สถานที่</label>
                <input
                  type="text"
                  value={trip.location || ''}
                  onChange={(e) => setTrip({ ...trip, location: e.target.value })}
                  className="form-input"
                  placeholder="เช่น คลองบางมด"
                />
              </div>
            </div>

            <div>
              <label className="form-label">สถานะ</label>
              <select
                value={trip.status || 'draft'}
                onChange={(e) => setTrip({ ...trip, status: e.target.value })}
                className="form-input"
              >
                <option value="draft">ร่าง</option>
                <option value="published">เผยแพร่</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/trips')}
            className="btn-secondary"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            disabled={saving}
            className="btn-primary disabled:opacity-50"
          >
            {saving ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}
          </button>
        </div>
      </form>
    </div>
  );
}

