'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/ImageUploader';

export default function NewArticlePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [article, setArticle] = useState({
    title: '',
    description: '',
    content: '',
    author: 'Admin',
    category: 'community',
    status: 'published',
    image_url: '' as string | undefined
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article)
      });

      if (response.ok) {
        alert('เพิ่มบทความสำเร็จ!');
        router.push('/articles');
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
        <button onClick={() => router.push('/articles')} className="text-gray-600 hover:text-gray-900 mb-4">← กลับ</button>
        <h1 className="text-3xl font-bold text-gray-900">เขียนบทความใหม่</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">ข้อมูลบทความ</h2>
          
          <div className="space-y-4">
            <ImageUploader
              currentImage=""
              onImageUpload={async (file) => {
                const fakeUrl = `/images/articles/${file.name}`;
                setArticle({ ...article, image_url: fakeUrl });
                return fakeUrl;
              }}
              onImageRemove={() => {
                setArticle({ ...article, image_url: undefined });
              }}
              label="รูปภาพปกบทความ"
              aspectRatio="16:9"
            />

            <div>
              <label className="form-label">หัวข้อบทความ</label>
              <input type="text" value={article.title} onChange={(e) => setArticle({ ...article, title: e.target.value })} className="form-input" required />
            </div>

            <div>
              <label className="form-label">คำอธิบายสั้น</label>
              <textarea value={article.description} onChange={(e) => setArticle({ ...article, description: e.target.value })} className="form-input min-h-[100px]" required />
            </div>

            <div>
              <label className="form-label">เนื้อหาบทความ</label>
              <textarea value={article.content} onChange={(e) => setArticle({ ...article, content: e.target.value })} className="form-input min-h-[300px]" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="form-label">ผู้เขียน</label>
                <input type="text" value={article.author} onChange={(e) => setArticle({ ...article, author: e.target.value })} className="form-input" />
              </div>

              <div>
                <label className="form-label">หมวดหมู่</label>
                <select value={article.category} onChange={(e) => setArticle({ ...article, category: e.target.value })} className="form-input">
                  <option value="community">ชุมชน</option>
                  <option value="education">การศึกษา</option>
                  <option value="travel">การท่องเที่ยว</option>
                  <option value="events">กิจกรรม</option>
                </select>
              </div>

              <div>
                <label className="form-label">สถานะ</label>
                <select value={article.status} onChange={(e) => setArticle({ ...article, status: e.target.value })} className="form-input">
                  <option value="draft">ร่าง</option>
                  <option value="published">เผยแพร่</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button type="button" onClick={() => router.push('/articles')} className="btn-secondary">ยกเลิก</button>
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
            {saving ? 'กำลังบันทึก...' : 'เพิ่มบทความ'}
          </button>
        </div>
      </form>
    </div>
  );
}

