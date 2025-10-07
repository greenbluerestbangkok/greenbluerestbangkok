'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ImageUploader from '@/components/ImageUploader';

export default function EditEntrepreneurPage() {
  const params = useParams();
  const router = useRouter();
  const entrepreneurId = params.id;
  
  const [entrepreneur, setEntrepreneur] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchEntrepreneur();
  }, [entrepreneurId]);

  const fetchEntrepreneur = async () => {
    try {
      const response = await fetch(`/api/entrepreneurs/${entrepreneurId}`);
      if (response.ok) {
        const data = await response.json();
        setEntrepreneur(data.entrepreneur);
      }
    } catch (error) {
      console.error('Failed to fetch entrepreneur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/entrepreneurs/${entrepreneurId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entrepreneur)
      });

      if (response.ok) {
        alert('บันทึกสำเร็จ!');
        router.push('/entrepreneurs');
      } else {
        alert('เกิดข้อผิดพลาด');
      }
    } catch (error) {
      alert('เกิดข้อผิดพลาด: ' + error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div className="spinner"></div></div>;
  }

  if (!entrepreneur) {
    return <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">ไม่พบผู้ประกอบการ</h1>
        <button onClick={() => router.push('/entrepreneurs')} className="btn-primary">กลับ</button>
      </div>
    </div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button onClick={() => router.push('/entrepreneurs')} className="text-gray-600 hover:text-gray-900 mb-4">← กลับ</button>
        <h1 className="text-3xl font-bold text-gray-900">แก้ไขผู้ประกอบการ: {entrepreneur.name}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">ข้อมูลผู้ประกอบการ</h2>
          
          <div className="space-y-4">
            <ImageUploader
              currentImage={entrepreneur.image_url}
              onImageUpload={async (file) => {
                const fakeUrl = `/images/entrepreneurs/${file.name}`;
                setEntrepreneur({ ...entrepreneur, image_url: fakeUrl });
                return fakeUrl;
              }}
              onImageRemove={() => {
                setEntrepreneur({ ...entrepreneur, image_url: null });
              }}
              label="รูปภาพ/โลโก้กลุ่ม"
              aspectRatio="1:1"
            />

            <div>
              <label className="form-label">ชื่อกลุ่ม/ผู้ประกอบการ</label>
              <input type="text" value={entrepreneur.name || ''} onChange={(e) => setEntrepreneur({ ...entrepreneur, name: e.target.value })} className="form-input" required />
            </div>

            <div>
              <label className="form-label">คำอธิบาย</label>
              <textarea value={entrepreneur.description || ''} onChange={(e) => setEntrepreneur({ ...entrepreneur, description: e.target.value })} className="form-input min-h-[150px]" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">ข้อมูลติดต่อ</label>
                <textarea value={entrepreneur.contact_info || ''} onChange={(e) => setEntrepreneur({ ...entrepreneur, contact_info: e.target.value })} className="form-input min-h-[80px]" />
              </div>

              <div>
                <label className="form-label">สถานที่</label>
                <input type="text" value={entrepreneur.location || ''} onChange={(e) => setEntrepreneur({ ...entrepreneur, location: e.target.value })} className="form-input" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">หมวดหมู่</label>
                <select value={entrepreneur.category || 'food'} onChange={(e) => setEntrepreneur({ ...entrepreneur, category: e.target.value })} className="form-input">
                  <option value="food">อาหาร</option>
                  <option value="beauty">ความงาม</option>
                  <option value="craft">งานฝีมือ</option>
                  <option value="education">การศึกษา</option>
                </select>
              </div>

              <div>
                <label className="form-label">สถานะ</label>
                <select value={entrepreneur.status || 'active'} onChange={(e) => setEntrepreneur({ ...entrepreneur, status: e.target.value })} className="form-input">
                  <option value="active">ใช้งาน</option>
                  <option value="inactive">ไม่ใช้งาน</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button type="button" onClick={() => router.push('/entrepreneurs')} className="btn-secondary">ยกเลิก</button>
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
            {saving ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}
          </button>
        </div>
      </form>
    </div>
  );
}

