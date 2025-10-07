'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewVideoPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [video, setVideo] = useState({
    title: '',
    description: '',
    video_url: '',
    duration: '',
    category: 'introduction',
    status: 'published'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(video)
      });

      if (response.ok) {
        alert('เพิ่มวิดีโอสำเร็จ!');
        router.push('/videos');
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
        <button onClick={() => router.push('/videos')} className="text-gray-600 hover:text-gray-900 mb-4">← กลับ</button>
        <h1 className="text-3xl font-bold text-gray-900">เพิ่มวิดีโอใหม่</h1>
        <p className="text-gray-600 mt-2">เพิ่มลิงก์วิดีโอจาก YouTube</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">ข้อมูลวิดีโอ</h2>
          
          <div className="space-y-4">
            <div>
              <label className="form-label">ชื่อวิดีโอ</label>
              <input type="text" value={video.title} onChange={(e) => setVideo({ ...video, title: e.target.value })} className="form-input" required />
            </div>

            <div>
              <label className="form-label">URL วิดีโอ (YouTube)</label>
              <input type="url" value={video.video_url} onChange={(e) => setVideo({ ...video, video_url: e.target.value })} className="form-input" placeholder="https://www.youtube.com/watch?v=..." required />
              <p className="text-xs text-gray-500 mt-1">Paste ลิงก์ YouTube ที่นี่</p>
            </div>

            <div>
              <label className="form-label">คำอธิบาย</label>
              <textarea value={video.description} onChange={(e) => setVideo({ ...video, description: e.target.value })} className="form-input min-h-[100px]" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="form-label">ระยะเวลา</label>
                <input type="text" value={video.duration} onChange={(e) => setVideo({ ...video, duration: e.target.value })} className="form-input" placeholder="เช่น 5:30" />
              </div>

              <div>
                <label className="form-label">หมวดหมู่</label>
                <select value={video.category} onChange={(e) => setVideo({ ...video, category: e.target.value })} className="form-input">
                  <option value="introduction">แนะนำ</option>
                  <option value="activity">กิจกรรม</option>
                  <option value="workshop">Workshop</option>
                  <option value="event">งานอีเว้นท์</option>
                </select>
              </div>

              <div>
                <label className="form-label">สถานะ</label>
                <select value={video.status} onChange={(e) => setVideo({ ...video, status: e.target.value })} className="form-input">
                  <option value="draft">ร่าง</option>
                  <option value="published">เผยแพร่</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button type="button" onClick={() => router.push('/videos')} className="btn-secondary">ยกเลิก</button>
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
            {saving ? 'กำลังบันทึก...' : 'เพิ่มวิดีโอ'}
          </button>
        </div>
      </form>
    </div>
  );
}

