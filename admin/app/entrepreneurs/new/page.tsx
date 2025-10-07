'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/ImageUploader';

export default function NewEntrepreneurPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [entrepreneur, setEntrepreneur] = useState({
    name: '',
    description: '',
    category: 'food',
    contact_info: '',
    location: 'คลองบางมด',
    status: 'active',
    image_url: '' as string | undefined
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('/api/entrepreneurs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entrepreneur)
      });

      if (response.ok) {
        alert('เพิ่มผู้ประกอบการสำเร็จ!');
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button onClick={() => router.push('/entrepreneurs')} className="text-gray-600 hover:text-gray-900 mb-4">← กลับ</button>
        <h1 className="text-3xl font-bold text-gray-900">เพิ่มผู้ประกอบการใหม่</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">ข้อมูลผู้ประกอบการ</h2>
          
          <div className="space-y-4">
            <ImageUploader
              currentImage=""
              onImageUpload={async (file) => {
                const fakeUrl = `/images/entrepreneurs/${file.name}`;
                setEntrepreneur({ ...entrepreneur, image_url: fakeUrl });
                return fakeUrl;
              }}
              onImageRemove={() => {
                setEntrepreneur({ ...entrepreneur, image_url: undefined });
              }}
              label="รูปภาพ/โลโก้กลุ่ม"
              aspectRatio="1:1"
            />

            <div>
              <label className="form-label">ชื่อกลุ่ม/ผู้ประกอบการ</label>
              <input type="text" value={entrepreneur.name} onChange={(e) => setEntrepreneur({ ...entrepreneur, name: e.target.value })} className="form-input" required />
            </div>

            <div>
              <label className="form-label">คำอธิบาย</label>
              <textarea value={entrepreneur.description} onChange={(e) => setEntrepreneur({ ...entrepreneur, description: e.target.value })} className="form-input min-h-[150px]" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">ข้อมูลติดต่อ</label>
                <textarea value={entrepreneur.contact_info} onChange={(e) => setEntrepreneur({ ...entrepreneur, contact_info: e.target.value })} className="form-input min-h-[80px]" placeholder="Tel: 081-234-5678, Line: @example" />
              </div>

              <div>
                <label className="form-label">สถานที่</label>
                <input type="text" value={entrepreneur.location} onChange={(e) => setEntrepreneur({ ...entrepreneur, location: e.target.value })} className="form-input" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">หมวดหมู่</label>
                <select value={entrepreneur.category} onChange={(e) => setEntrepreneur({ ...entrepreneur, category: e.target.value })} className="form-input">
                  <option value="food">อาหาร</option>
                  <option value="beauty">ความงาม</option>
                  <option value="craft">งานฝีมือ</option>
                  <option value="education">การศึกษา</option>
                </select>
              </div>

              <div>
                <label className="form-label">สถานะ</label>
                <select value={entrepreneur.status} onChange={(e) => setEntrepreneur({ ...entrepreneur, status: e.target.value })} className="form-input">
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
            {saving ? 'กำลังบันทึก...' : 'เพิ่มผู้ประกอบการ'}
          </button>
        </div>
      </form>
    </div>
  );
}

