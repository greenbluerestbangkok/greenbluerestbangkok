import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Return mock trips data directly
    const trips = [
      {
        id: 1,
        name: 'ทริปท่องเที่ยวพายเรือคายัค ลัดเลาะสวนมะพร้าว',
        shortDescription: 'สัมผัสวิถีชีวิตริมคลอง พร้อมกิจกรรมทำขนมไทยโบราณ',
        fullDescription: 'ทริปท่องเที่ยวพิเศษที่จะพาคุณไปสัมผัสความงดงามของธรรมชาติริมคลองบางมด พายเรือคายัคลัดเลาะผ่านสวนมะพร้าวเขียวขจี ชมวิถีชีวิตชาวบ้านที่ยังคงใช้ชีวิตแบบดั้งเดิม พร้อมเรียนรู้การทำขนมไทยโบราณจากปราชญ์ชาวบ้าน',
        price: '800 บาท/คน',
        duration: '3-4 ชั่วโมง',
        capacity: '2-8 คน',
        schedule: 'ทุกวัน 8:00-17:00',
        mainImage: '/images/trip1/small/trip1-main.webp',
        gallery: [
          '/images/trip1/large/trip1-main.webp',
          '/images/trip1/large/trip1-1.webp',
          '/images/trip1/large/trip1-2.webp'
        ],
        highlights: [
          'พายเรือคายัคในคลองบางมด',
          'ชมสวนมะพร้าวเขียวขจี',
          'เรียนรู้การทำขนมไทยโบราณ',
          'สัมผัสวิถีชีวิตชาวบ้าน',
          'ถ่ายภาพธรรมชาติสวยงาม'
        ],
        includes: [
          'อุปกรณ์พายเรือคายัค',
          'ไกด์ท้องถิ่น',
          'ขนมไทยโบราณ',
          'น้ำดื่ม',
          'ประกันอุบัติเหตุ'
        ],
        status: 'active',
        featured: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 2,
        name: 'ทริปท่องเที่ยวปั่นจักรยานชมสวนผลไม้',
        shortDescription: 'ปั่นชิลๆ ชมธรรมชาติและสวนผลไม้ พร้อมชิมผลไม้สดๆ จากสวน',
        fullDescription: 'ปั่นจักรยานชมธรรมชาติในชุมชนคลองบางมด ผ่านสวนผลไม้หลากหลายชนิด ชิมผลไม้สดๆ จากสวน พร้อมเรียนรู้การปลูกผลไม้แบบธรรมชาติและยั่งยืน',
        price: '600 บาท/คน',
        duration: '2-3 ชั่วโมง',
        capacity: '4-12 คน',
        schedule: 'ทุกวัน 7:00-17:00',
        mainImage: '/images/trip2/small/trip2-main.webp',
        gallery: [
          '/images/trip2/large/trip2-main.webp',
          '/images/trip2/large/trip2-1.webp',
          '/images/trip2/large/trip2-2.webp'
        ],
        highlights: [
          'ปั่นจักรยานชมธรรมชาติ',
          'ชมสวนผลไม้หลากหลาย',
          'ชิมผลไม้สดจากสวน',
          'เรียนรู้การปลูกแบบธรรมชาติ'
        ],
        includes: [
          'จักรยาน',
          'หมวกกันน็อค',
          'ไกด์ท้องถิ่น',
          'ผลไม้สด',
          'น้ำดื่ม'
        ],
        status: 'active',
        featured: false,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ];

    return NextResponse.json({
      trips,
      pagination: {
        page: 1,
        limit: 20,
        total: trips.length,
        totalPages: 1
      }
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
