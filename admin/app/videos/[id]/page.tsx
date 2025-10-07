'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditVideoPage() {
  const params = useParams();
  const router = useRouter();
  const videoId = params.id;
  
  const [video, setVideo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchVideo();
  }, [videoId]);

  const fetchVideo = async () => {
    try {
      const response = await fetch(`/api/videos/${videoId}`);
      if (response.ok) {
        const data = await response.json();
        setVideo(data.video);
      }
    } catch (error) {
      console.error('Failed to fetch video:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/videos/${videoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(video)
      });

      if (response.ok) {
        alert('บันทึกสำเร็จ!');
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

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div className="spinner"></div></div>;
  }

  if (!video) {
    return <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">ไม่พบวิดีโอ</h1>
        <button onClick={() => router.push('/videos')} className="btn-primary">กลับ</button>
      </div>
    </div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button onClick={() => router.push('/videos')} className="text-gray-600 hover:text-gray-900 mb-4">← กลับ</button>
        <h1 className="text-3xl font-bold text-gray-900">แก้ไขวิดีโอ: {video.title}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">ข้อมูลวิดีโอ</h2>
          
          <div className="space-y-4">
            <div>
              <label className="form-label">ชื่อวิดีโอ</label>
              <input type="text" value={video.title || ''} onChange={(e) => setVideo({ ...video, title: e.target.value })} className="form-input" required />
            </div>

            <div>
              <label className="form-label">URL วิดีโอ (YouTube)</label>
              <input type="url" value={video.video_url || ''} onChange={(e) => setVideo({ ...video, video_url: e.target.value })} className="form-input" required />
            </div>

            <div>
              <label className="form-label">คำอธิบาย</label>
              <textarea value={video.description || ''} onChange={(e) => setVideo({ ...video, description: e.target.value })} className="form-input min-h-[100px]" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="form-label">ระยะเวลา</label>
                <input type="text" value={video.duration || ''} onChange={(e) => setVideo({ ...video, duration: e.target.value })} className="form-input" />
              </div>

              <div>
                <label className="form-label">หมวดหมู่</label>
                <select value={video.category || 'introduction'} onChange={(e) => setVideo({ ...video, category: e.target.value })} className="form-input">
                  <option value="introduction">แนะนำ</option>
                  <option value="activity">กิจกรรม</option>
                  <option value="workshop">Workshop</option>
                  <option value="event">งานอีเว้นท์</option>
                </select>
              </div>

              <div>
                <label className="form-label">สถานะ</label>
                <select value={video.status || 'draft'} onChange={(e) => setVideo({ ...video, status: e.target.value })} className="form-input">
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
            {saving ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}
          </button>
        </div>
      </form>
    </div>
  );
}

