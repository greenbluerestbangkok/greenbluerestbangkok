'use client';

import { useState } from 'react';

interface BulkActionsProps {
  selectedIds: number[];
  onClearSelection: () => void;
  onBulkDelete: (ids: number[]) => Promise<void>;
  onBulkStatusChange: (ids: number[], status: string) => Promise<void>;
  itemType: 'trip' | 'product' | 'article';
}

export default function BulkActions({
  selectedIds,
  onClearSelection,
  onBulkDelete,
  onBulkStatusChange,
  itemType
}: BulkActionsProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBulkDelete = async () => {
    if (!confirm(`คุณต้องการลบ ${itemType === 'trip' ? 'ทริป' : itemType === 'product' ? 'สินค้า' : 'บทความ'} ${selectedIds.length} รายการหรือไม่?`)) {
      return;
    }

    setIsProcessing(true);
    try {
      await onBulkDelete(selectedIds);
      onClearSelection();
      alert('ลบสำเร็จ!');
    } catch (error) {
      alert('เกิดข้อผิดพลาด: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBulkStatusChange = async (status: string) => {
    setIsProcessing(true);
    try {
      await onBulkStatusChange(selectedIds, status);
      onClearSelection();
      alert('อัปเดตสถานะสำเร็จ!');
    } catch (error) {
      alert('เกิดข้อผิดพลาด: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  };

  if (selectedIds.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-indigo-500 shadow-2xl z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-lg font-semibold text-gray-900">
              เลือกแล้ว {selectedIds.length} รายการ
            </div>
            <button
              onClick={onClearSelection}
              className="text-sm text-gray-600 hover:text-gray-900 underline"
              disabled={isProcessing}
            >
              ยกเลิกการเลือก
            </button>
          </div>

          <div className="flex items-center space-x-3">
            {/* Status Change Buttons */}
            <div className="flex items-center space-x-2 border-r pr-3">
              <span className="text-sm text-gray-600">เปลี่ยนสถานะ:</span>
              {itemType === 'trip' || itemType === 'article' ? (
                <>
                  <button
                    onClick={() => handleBulkStatusChange('published')}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    เผยแพร่
                  </button>
                  <button
                    onClick={() => handleBulkStatusChange('draft')}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    ร่าง
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleBulkStatusChange('available')}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    มีสินค้า
                  </button>
                  <button
                    onClick={() => handleBulkStatusChange('out_of_stock')}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    หมดสต็อก
                  </button>
                </>
              )}
            </div>

            {/* Delete Button */}
            <button
              onClick={handleBulkDelete}
              disabled={isProcessing}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              🗑️ ลบทั้งหมด
            </button>
          </div>
        </div>

        {isProcessing && (
          <div className="mt-2 text-center text-sm text-gray-600">
            กำลังดำเนินการ...
          </div>
        )}
      </div>
    </div>
  );
}

