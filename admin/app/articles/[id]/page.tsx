'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ImageUploader from '@/components/ImageUploader';

export default function EditArticlePage() {
  const params = useParams();
  const router = useRouter();
  const articleId = params.id;
  
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchArticle();
  }, [articleId]);

  const fetchArticle = async () => {
    try {
      const response = await fetch(`/api/articles/${articleId}`);
      if (response.ok) {
        const data = await response.json();
        setArticle(data.article);
      }
    } catch (error) {
      console.error('Failed to fetch article:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/articles/${articleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article)
      });

      if (response.ok) {
        alert('บันทึกสำเร็จ!');
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

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div className="spinner"></div></div>;
  }

  if (!article) {
    return <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">ไม่พบบทความ</h1>
        <button onClick={() => router.push('/articles')} className="btn-primary">กลับ</button>
      </div>
    </div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button onClick={() => router.push('/articles')} className="text-gray-600 hover:text-gray-900 mb-4">← กลับ</button>
        <h1 className="text-3xl font-bold text-gray-900">แก้ไขบทความ: {article.title}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">ข้อมูลบทความ</h2>
          
          <div className="space-y-4">
            <ImageUploader
              currentImage={article.image_url}
              onImageUpload={async (file) => {
                const fakeUrl = `/images/articles/${file.name}`;
                setArticle({ ...article, image_url: fakeUrl });
                return fakeUrl;
              }}
              onImageRemove={() => {
                setArticle({ ...article, image_url: null });
              }}
              label="รูปภาพปกบทความ"
              aspectRatio="16:9"
            />

            <div>
              <label className="form-label">หัวข้อบทความ</label>
              <input type="text" value={article.title || ''} onChange={(e) => setArticle({ ...article, title: e.target.value })} className="form-input" required />
            </div>

            <div>
              <label className="form-label">คำอธิบายสั้น</label>
              <textarea value={article.description || ''} onChange={(e) => setArticle({ ...article, description: e.target.value })} className="form-input min-h-[100px]" required />
            </div>

            <div>
              <label className="form-label">เนื้อหาบทความ</label>
              <textarea value={article.content || ''} onChange={(e) => setArticle({ ...article, content: e.target.value })} className="form-input min-h-[300px]" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="form-label">ผู้เขียน</label>
                <input type="text" value={article.author || ''} onChange={(e) => setArticle({ ...article, author: e.target.value })} className="form-input" />
              </div>

              <div>
                <label className="form-label">หมวดหมู่</label>
                <select value={article.category || 'community'} onChange={(e) => setArticle({ ...article, category: e.target.value })} className="form-input">
                  <option value="community">ชุมชน</option>
                  <option value="education">การศึกษา</option>
                  <option value="travel">การท่องเที่ยว</option>
                  <option value="events">กิจกรรม</option>
                </select>
              </div>

              <div>
                <label className="form-label">สถานะ</label>
                <select value={article.status || 'draft'} onChange={(e) => setArticle({ ...article, status: e.target.value })} className="form-input">
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
            {saving ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}
          </button>
        </div>
      </form>
    </div>
  );
}

