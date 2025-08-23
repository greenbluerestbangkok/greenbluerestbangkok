// ข้อมูลทริปท่องเที่ยวทั้งหมด 18 ทริปท่องเที่ยว
import { IMAGE_CONFIG } from './config.js';

const tripsData = [
    {
        id: 1,
        name: "ทริปท่องเที่ยวพายเรือคายัค ลัดเลาะสวนมะพร้าว",
        shortDescription: "สัมผัสวิถีชีวิตริมคลอง พร้อมกิจกรรมทำขนมไทยโบราณ",
        fullDescription: "ทริปท่องเที่ยวพิเศษที่จะพาคุณไปสัมผัสความงดงามของธรรมชาติริมคลองบางมด พายเรือคายัคลัดเลาะผ่านสวนมะพร้าวเขียวขจี ชมวิถีชีวิตชาวบ้านที่ยังคงใช้ชีวิตแบบดั้งเดิม พร้อมเรียนรู้การทำขนมไทยโบราณจากปราชญ์ชาวบ้าน",
        price: "800 บาท/คน",
        duration: "3-4 ชั่วโมง",
        capacity: "2-8 คน",
        schedule: "ทุกวัน 8:00-17:00",
        mainImage: IMAGE_CONFIG.getTripImageUrlByNumber(1, 'small', 1),
        gallery: [
            IMAGE_CONFIG.getTripImageUrlByNumber(1, 'large', 1),
            IMAGE_CONFIG.getTripImageUrlByNumber(1, 'large', 2),
            IMAGE_CONFIG.getTripImageUrlByNumber(1, 'large', 3)
        ],
        highlights: [
            "พายเรือคายัคในคลองบางมด",
            "ชมสวนมะพร้าวเขียวขจี",
            "เรียนรู้การทำขนมไทยโบราณ",
            "สัมผัสวิถีชีวิตชาวบ้าน",
            "ถ่ายภาพธรรมชาติสวยงาม"
        ],
        includes: [
            "อุปกรณ์พายเรือคายัค",
            "ไกด์ท้องถิ่น",
            "ขนมไทยโบราณ",
            "น้ำดื่ม",
            "ประกันอุบัติเหตุ"
        ]
    },
    {
        id: 2,
        name: "ทริปท่องเที่ยวปั่นจักรยานชมสวนผลไม้",
        shortDescription: "ปั่นชิลๆ ชมธรรมชาติและสวนผลไม้ พร้อมชิมผลไม้สดๆ จากสวน",
        fullDescription: "ปั่นจักรยานชมธรรมชาติในชุมชนคลองบางมด ผ่านสวนผลไม้หลากหลายชนิด ชิมผลไม้สดๆ จากสวน พร้อมเรียนรู้การปลูกผลไม้แบบธรรมชาติและยั่งยืน",
        price: "600 บาท/คน",
        duration: "2-3 ชั่วโมง",
        capacity: "4-12 คน",
        schedule: "ทุกวัน 7:00-17:00",
        mainImage: IMAGE_CONFIG.getTripImageUrlByNumber(2, 'small', 1),
        gallery: [
            IMAGE_CONFIG.getTripImageUrlByNumber(2, 'large', 1),
            IMAGE_CONFIG.getTripImageUrlByNumber(2, 'large', 2),
            IMAGE_CONFIG.getTripImageUrlByNumber(2, 'large', 3)
        ],
        highlights: [
            "ปั่นจักรยานชมธรรมชาติ",
            "ชมสวนผลไม้หลากหลาย",
            "ชิมผลไม้สดจากสวน",
            "เรียนรู้การปลูกผลไม้",
            "ออกกำลังกายกลางแจ้ง"
        ],
        includes: [
            "จักรยานและหมวกกันน็อก",
            "ไกด์ท้องถิ่น",
            "ผลไม้สดจากสวน",
            "น้ำดื่ม",
            "ประกันอุบัติเหตุ"
        ]
    },
    {
        id: 3,
        name: "ทริปท่องเที่ยวเรียนทำอาหารไทย",
        shortDescription: "เรียนรู้สูตรลับอาหารท้องถิ่นกับปราชญ์ชาวบ้าน",
        fullDescription: "เรียนรู้สูตรลับการทำอาหารไทยแท้ๆ จากปราชญ์ชาวบ้านในชุมชนคลองบางมด ตั้งแต่การเลือกวัตถุดิบ การปรุงรสชาติ จนถึงการจัดจานแบบไทยโบราณ",
        price: "1000 บาท/คน",
        duration: "4-5 ชั่วโมง",
        capacity: "2-6 คน",
        schedule: "ทุกวัน 9:00-17:00",
        mainImage: IMAGE_CONFIG.getTripImageUrlByNumber(3, 'small', 1),
        gallery: [
            IMAGE_CONFIG.getTripImageUrlByNumber(3, 'large', 1),
            IMAGE_CONFIG.getTripImageUrlByNumber(3, 'large', 2),
            IMAGE_CONFIG.getTripImageUrlByNumber(3, 'large', 3)
        ],
        highlights: [
            "เรียนรู้สูตรลับอาหารไทย",
            "ปรุงอาหารกับปราชญ์ชาวบ้าน",
            "ชิมอาหารที่ทำเอง",
            "ได้สูตรอาหารกลับบ้าน",
            "ประสบการณ์การทำอาหารไทยแท้"
        ],
        includes: [
            "วัตถุดิบทั้งหมด",
            "อุปกรณ์ทำอาหาร",
            "สูตรอาหาร",
            "อาหารกลางวัน",
            "ไกด์สอนทำอาหาร"
        ]
    },
    {
        id: 4,
        name: "ทริปท่องเที่ยวตกปลาในคลอง",
        shortDescription: "สัมผัสประสบการณ์การตกปลาแบบดั้งเดิมริมคลอง",
        fullDescription: "สัมผัสประสบการณ์การตกปลาแบบดั้งเดิมริมคลองบางมด เรียนรู้เทคนิคการตกปลาแบบโบราณจากชาวประมงท้องถิ่น พร้อมชมธรรมชาติริมคลอง",
        price: "400 บาท/คน",
        duration: "2-3 ชั่วโมง",
        capacity: "2-8 คน",
        schedule: "ทุกวัน 6:00-10:00",
        mainImage: IMAGE_CONFIG.getTripImageUrlByNumber(4, 'small', 1),
        gallery: [
            IMAGE_CONFIG.getTripImageUrlByNumber(4, 'large', 1),
            IMAGE_CONFIG.getTripImageUrlByNumber(4, 'large', 2),
            IMAGE_CONFIG.getTripImageUrlByNumber(4, 'large', 3)
        ],
        highlights: [
            "ตกปลาแบบดั้งเดิม",
            "เรียนรู้เทคนิคการตกปลา",
            "ชมธรรมชาติริมคลอง",
            "สัมผัสวิถีชีวิตชาวประมง",
            "ได้ปลากลับบ้าน"
        ],
        includes: [
            "อุปกรณ์ตกปลา",
            "ไกด์สอนตกปลา",
            "น้ำดื่ม",
            "ปลาที่จับได้",
            "ประกันอุบัติเหตุ"
        ]
    },
    {
        id: 5,
        name: "ทริปท่องเที่ยวเรียนรู้การปลูกผัก",
        shortDescription: "เรียนรู้เทคนิคการปลูกผักแบบธรรมชาติและยั่งยืน",
        fullDescription: "เรียนรู้เทคนิคการปลูกผักแบบธรรมชาติและยั่งยืนจากเกษตรกรท้องถิ่น ตั้งแต่การเตรียมดิน การปลูก การดูแล จนถึงการเก็บเกี่ยว",
        price: "500 บาท/คน",
        duration: "3-4 ชั่วโมง",
        capacity: "4-10 คน",
        schedule: "ทุกวันเสาร์ 9:00-17:00",
        mainImage: IMAGE_CONFIG.getTripImageUrlByNumber(5, 'small', 1),
        gallery: [
            IMAGE_CONFIG.getTripImageUrlByNumber(5, 'large', 1),
            IMAGE_CONFIG.getTripImageUrlByNumber(5, 'large', 2),
            IMAGE_CONFIG.getTripImageUrlByNumber(5, 'large', 3)
        ],
        highlights: [
            "เรียนรู้การปลูกผัก",
            "เทคนิคการเกษตรธรรมชาติ",
            "ลงมือปฏิบัติจริง",
            "ได้ผักกลับบ้าน",
            "ความรู้การเกษตรยั่งยืน"
        ],
        includes: [
            "อุปกรณ์การเกษตร",
            "เมล็ดพันธุ์ผัก",
            "ดินและปุ๋ย",
            "ผักที่ปลูก",
            "ไกด์สอนการเกษตร"
        ]
    },
    {
        id: 6,
        name: "ทริปท่องเที่ยวทำเครื่องปั้นดินเผา",
        shortDescription: "เรียนรู้ศิลปะการปั้นดินเผาแบบโบราณจากช่างฝีมือ",
        fullDescription: "เรียนรู้ศิลปะการปั้นดินเผาแบบโบราณจากช่างฝีมือท้องถิ่น ตั้งแต่การเตรียมดิน การปั้น การเผา จนถึงการตกแต่ง",
        price: "700 บาท/คน",
        duration: "3-4 ชั่วโมง",
        capacity: "2-6 คน",
        schedule: "ทุกวันอาทิตย์ 9:00-17:00",
        mainImage: IMAGE_CONFIG.getTripImageUrlByNumber(6, 'small', 1),
        gallery: [
            IMAGE_CONFIG.getTripImageUrlByNumber(6, 'large', 1),
            IMAGE_CONFIG.getTripImageUrlByNumber(6, 'large', 2),
            IMAGE_CONFIG.getTripImageUrlByNumber(6, 'large', 3)
        ],
        highlights: [
            "เรียนรู้การปั้นดินเผา",
            "ศิลปะโบราณท้องถิ่น",
            "ลงมือปั้นจริง",
            "ได้เครื่องปั้นกลับบ้าน",
            "ประสบการณ์ศิลปะไทย"
        ],
        includes: [
            "ดินปั้นและอุปกรณ์",
            "เตาเผา",
            "เครื่องปั้นที่ทำ",
            "ไกด์สอนศิลปะ",
            "ประกันอุบัติเหตุ"
        ]
    },
    {
        id: 7,
        name: "ทริปท่องเที่ยวชมพระอาทิตย์ตกริมคลอง",
        shortDescription: "ชมพระอาทิตย์ตกที่สวยงามริมคลองบางมด พร้อมอาหารเย็น",
        fullDescription: "สัมผัสความโรแมนติกกับการชมพระอาทิตย์ตกริมคลองบางมด พร้อมอาหารเย็นแบบไทยแท้ๆ ในบรรยากาศริมคลอง",
        price: "900 บาท/คน",
        duration: "2-3 ชั่วโมง",
        capacity: "2-10 คน",
        schedule: "ทุกวัน 17:00-20:00",
        mainImage: IMAGE_CONFIG.getTripImageUrlByNumber(7, 'small', 1),
        gallery: [
            IMAGE_CONFIG.getTripImageUrlByNumber(7, 'large', 1),
            IMAGE_CONFIG.getTripImageUrlByNumber(7, 'large', 2),
            IMAGE_CONFIG.getTripImageUrlByNumber(7, 'large', 3)
        ],
        highlights: [
            "ชมพระอาทิตย์ตกสวยงาม",
            "อาหารเย็นริมคลอง",
            "บรรยากาศโรแมนติก",
            "ถ่ายภาพพระอาทิตย์ตก",
            "ประสบการณ์พิเศษ"
        ],
        includes: [
            "อาหารเย็น",
            "เครื่องดื่ม",
            "ที่นั่งริมคลอง",
            "ไกด์ท้องถิ่น",
            "ประกันอุบัติเหตุ"
        ]
    },
    {
        id: 8,
        name: "ทริปท่องเที่ยวเรียนรู้การทำน้ำพริก",
        shortDescription: "เรียนรู้การทำน้ำพริกไทยแท้ๆ จากปราชญ์ชาวบ้าน",
        fullDescription: "เรียนรู้การทำน้ำพริกไทยแท้ๆ จากปราชญ์ชาวบ้านในชุมชนคลองบางมด ตั้งแต่การเลือกเครื่องเทศ การตำ การปรุงรสชาติ",
        price: "600 บาท/คน",
        duration: "2-3 ชั่วโมง",
        capacity: "4-8 คน",
        schedule: "ทุกวันเสาร์ 14:00-17:00",
        mainImage: IMAGE_CONFIG.getTripImageUrlByNumber(8, 'small', 1),
        gallery: [
            IMAGE_CONFIG.getTripImageUrlByNumber(8, 'large', 1),
            IMAGE_CONFIG.getTripImageUrlByNumber(8, 'large', 2),
            IMAGE_CONFIG.getTripImageUrlByNumber(8, 'large', 3)
        ],
        highlights: [
            "เรียนรู้การทำน้ำพริก",
            "สูตรลับน้ำพริกไทย",
            "ลงมือทำจริง",
            "ได้น้ำพริกกลับบ้าน",
            "ความรู้การทำอาหารไทย"
        ],
        includes: [
            "เครื่องเทศและวัตถุดิบ",
            "อุปกรณ์ทำน้ำพริก",
            "สูตรน้ำพริก",
            "น้ำพริกที่ทำ",
            "ไกด์สอนทำอาหาร"
        ]
    },
    {
        id: 9,
        name: "ทริปท่องเที่ยวเรียนรู้การทำผ้าบาติก",
        shortDescription: "เรียนรู้ศิลปะการทำผ้าบาติกแบบดั้งเดิม",
        fullDescription: "เรียนรู้ศิลปะการทำผ้าบาติกแบบดั้งเดิมจากช่างฝีมือท้องถิ่น ตั้งแต่การออกแบบ การวาด การย้อม จนถึงการตกแต่ง",
        price: "800 บาท/คน",
        duration: "4-5 ชั่วโมง",
        capacity: "2-6 คน",
        schedule: "ทุกวันอาทิตย์ 9:00-17:00",
        mainImage: IMAGE_CONFIG.getTripImageUrlByNumber(9, 'small', 1),
        gallery: [
            IMAGE_CONFIG.getTripImageUrlByNumber(9, 'large', 1),
            IMAGE_CONFIG.getTripImageUrlByNumber(9, 'large', 2),
            IMAGE_CONFIG.getTripImageUrlByNumber(9, 'large', 3)
        ],
        highlights: [
            "เรียนรู้การทำผ้าบาติก",
            "ศิลปะการวาดและย้อม",
            "ลงมือทำจริง",
            "ได้ผ้าบาติกกลับบ้าน",
            "ประสบการณ์ศิลปะท้องถิ่น"
        ],
        includes: [
            "ผ้าขาวและสี",
            "อุปกรณ์วาดและย้อม",
            "ผ้าบาติกที่ทำ",
            "ไกด์สอนศิลปะ",
            "ประกันอุบัติเหตุ"
        ]
    },
    {
        id: 10,
        name: "ทริปท่องเที่ยวเรียนรู้การทำขนมไทยโบราณ",
        shortDescription: "เรียนรู้การทำขนมไทยโบราณหลากหลายชนิด",
        fullDescription: "เรียนรู้การทำขนมไทยโบราณหลากหลายชนิดจากปราชญ์ชาวบ้าน ตั้งแต่ขนมหวาน ขนมเค็ม จนถึงขนมที่หายาก",
        price: "700 บาท/คน",
        duration: "3-4 ชั่วโมง",
        capacity: "4-8 คน",
        schedule: "ทุกวันเสาร์ 9:00-17:00",
        mainImage: IMAGE_CONFIG.getTripImageUrlByNumber(10, 'small', 1),
        gallery: [
            IMAGE_CONFIG.getTripImageUrlByNumber(10, 'large', 1),
            IMAGE_CONFIG.getTripImageUrlByNumber(10, 'large', 2),
            IMAGE_CONFIG.getTripImageUrlByNumber(10, 'large', 3)
        ],
        highlights: [
            "เรียนรู้การทำขนมไทย",
            "ขนมโบราณหายาก",
            "ลงมือทำจริง",
            "ได้ขนมกลับบ้าน",
            "ความรู้ขนมไทยโบราณ"
        ],
        includes: [
            "วัตถุดิบทำขนม",
            "อุปกรณ์ทำขนม",
            "สูตรขนม",
            "ขนมที่ทำ",
            "ไกด์สอนทำขนม"
        ]
    },
    {
        id: 11,
        name: "ทริปท่องเที่ยวเรียนรู้การทำเครื่องจักสาน",
        shortDescription: "เรียนรู้การทำเครื่องจักสานจากไม้ไผ่และใบตอง",
        fullDescription: "เรียนรู้การทำเครื่องจักสานจากไม้ไผ่และใบตองแบบดั้งเดิมจากช่างฝีมือท้องถิ่น ตั้งแต่การเลือกไม้ การจัก การสาน",
        price: "600 บาท/คน",
        duration: "3-4 ชั่วโมง",
        capacity: "2-6 คน",
        schedule: "ทุกวันอาทิตย์ 9:00-17:00",
        mainImage: IMAGE_CONFIG.getTripImageUrlByNumber(11, 'small', 1),
        gallery: [
            IMAGE_CONFIG.getTripImageUrlByNumber(11, 'large', 1),
            IMAGE_CONFIG.getTripImageUrlByNumber(11, 'large', 2),
            IMAGE_CONFIG.getTripImageUrlByNumber(11, 'large', 3)
        ],
        highlights: [
            "เรียนรู้การจักสาน",
            "งานฝีมือไม้ไผ่",
            "ลงมือทำจริง",
            "ได้เครื่องจักสานกลับบ้าน",
            "ประสบการณ์งานฝีมือไทย"
        ],
        includes: [
            "ไม้ไผ่และใบตอง",
            "อุปกรณ์จักสาน",
            "เครื่องจักสานที่ทำ",
            "ไกด์สอนงานฝีมือ",
            "ประกันอุบัติเหตุ"
        ]
    },
    {
        id: 12,
        name: "ทริปท่องเที่ยวเรียนรู้การทำน้ำสมุนไพร",
        shortDescription: "เรียนรู้การทำน้ำสมุนไพรไทยเพื่อสุขภาพ",
        fullDescription: "เรียนรู้การทำน้ำสมุนไพรไทยเพื่อสุขภาพจากปราชญ์ชาวบ้าน ตั้งแต่การเลือกสมุนไพร การต้ม การปรุงรสชาติ",
        price: "500 บาท/คน",
        duration: "2-3 ชั่วโมง",
        capacity: "4-8 คน",
        schedule: "ทุกวันเสาร์ 14:00-17:00",
        mainImage: IMAGE_CONFIG.getTripImageUrlByNumber(12, 'small', 1),
        gallery: [
            IMAGE_CONFIG.getTripImageUrlByNumber(12, 'large', 1),
            IMAGE_CONFIG.getTripImageUrlByNumber(12, 'large', 2),
            IMAGE_CONFIG.getTripImageUrlByNumber(12, 'large', 3)
        ],
        highlights: [
            "เรียนรู้สมุนไพรไทย",
            "น้ำสมุนไพรเพื่อสุขภาพ",
            "ลงมือทำจริง",
            "ได้น้ำสมุนไพรกลับบ้าน",
            "ความรู้สมุนไพรไทย"
        ],
        includes: [
            "สมุนไพรและวัตถุดิบ",
            "อุปกรณ์ทำน้ำสมุนไพร",
            "สูตรน้ำสมุนไพร",
            "น้ำสมุนไพรที่ทำ",
            "ไกด์สอนสมุนไพร"
        ]
    },
    {
        id: 13,
        name: "ทริปท่องเที่ยวเรียนรู้การทำเครื่องเงิน",
        shortDescription: "เรียนรู้การทำเครื่องเงินแบบดั้งเดิม",
        fullDescription: "เรียนรู้การทำเครื่องเงินแบบดั้งเดิมจากช่างฝีมือท้องถิ่น ตั้งแต่การหลอม การตี การแกะสลัก จนถึงการขัดเงา",
        price: "1200 บาท/คน",
        duration: "5-6 ชั่วโมง",
        capacity: "2-4 คน",
        schedule: "ทุกวันอาทิตย์ 9:00-17:00",
        mainImage: IMAGE_CONFIG.getTripImageUrlByNumber(13, 'small', 1),
        gallery: [
            IMAGE_CONFIG.getTripImageUrlByNumber(13, 'large', 1),
            IMAGE_CONFIG.getTripImageUrlByNumber(13, 'large', 2),
            IMAGE_CONFIG.getTripImageUrlByNumber(13, 'large', 3)
        ],
        highlights: [
            "เรียนรู้การทำเครื่องเงิน",
            "งานฝีมือโลหะ",
            "ลงมือทำจริง",
            "ได้เครื่องเงินกลับบ้าน",
            "ประสบการณ์งานฝีมือพิเศษ"
        ],
        includes: [
            "เงินและอุปกรณ์",
            "เครื่องมือทำเครื่องเงิน",
            "เครื่องเงินที่ทำ",
            "ไกด์สอนงานฝีมือ",
            "ประกันอุบัติเหตุ"
        ]
    },
    {
        id: 14,
        name: "ทริปท่องเที่ยวเรียนรู้การทำเครื่องทอง",
        shortDescription: "เรียนรู้การทำเครื่องทองแบบดั้งเดิม",
        fullDescription: "เรียนรู้การทำเครื่องทองแบบดั้งเดิมจากช่างฝีมือท้องถิ่น ตั้งแต่การหลอม การตี การแกะสลัก จนถึงการขัดเงา",
        price: "1500 บาท/คน",
        duration: "5-6 ชั่วโมง",
        capacity: "2-4 คน",
        schedule: "ทุกวันอาทิตย์ 9:00-17:00",
        mainImage: IMAGE_CONFIG.getTripImageUrlByNumber(14, 'small', 1),
        gallery: [
            IMAGE_CONFIG.getTripImageUrlByNumber(14, 'large', 1),
            IMAGE_CONFIG.getTripImageUrlByNumber(14, 'large', 2),
            IMAGE_CONFIG.getTripImageUrlByNumber(14, 'large', 3)
        ],
        highlights: [
            "เรียนรู้การทำเครื่องทอง",
            "งานฝีมือโลหะมีค่า",
            "ลงมือทำจริง",
            "ได้เครื่องทองกลับบ้าน",
            "ประสบการณ์งานฝีมือพิเศษ"
        ],
        includes: [
            "ทองและอุปกรณ์",
            "เครื่องมือทำเครื่องทอง",
            "เครื่องทองที่ทำ",
            "ไกด์สอนงานฝีมือ",
            "ประกันอุบัติเหตุ"
        ]
    },
    {
        id: 15,
        name: "ทริปท่องเที่ยวเรียนรู้การทำเครื่องแก้ว",
        shortDescription: "เรียนรู้การทำเครื่องแก้วแบบโบราณ",
        fullDescription: "เรียนรู้การทำเครื่องแก้วแบบโบราณจากช่างฝีมือท้องถิ่น ตั้งแต่การหลอมแก้ว การเป่า การตกแต่ง",
        price: "1000 บาท/คน",
        duration: "4-5 ชั่วโมง",
        capacity: "2-6 คน",
        schedule: "ทุกวันเสาร์ 9:00-17:00",
        mainImage: IMAGE_CONFIG.getTripImageUrlByNumber(15, 'small', 1),
        gallery: [
            IMAGE_CONFIG.getTripImageUrlByNumber(15, 'large', 1),
            IMAGE_CONFIG.getTripImageUrlByNumber(15, 'large', 2),
            IMAGE_CONFIG.getTripImageUrlByNumber(15, 'large', 3)
        ],
        highlights: [
            "เรียนรู้การทำเครื่องแก้ว",
            "ศิลปะการเป่าแก้ว",
            "ลงมือทำจริง",
            "ได้เครื่องแก้วกลับบ้าน",
            "ประสบการณ์ศิลปะพิเศษ"
        ],
        includes: [
            "แก้วและอุปกรณ์",
            "เตาเป่าแก้ว",
            "เครื่องแก้วที่ทำ",
            "ไกด์สอนศิลปะ",
            "ประกันอุบัติเหตุ"
        ]
    },
    {
        id: 16,
        name: "ทริปท่องเที่ยวเรียนรู้การทำเครื่องหนัง",
        shortDescription: "เรียนรู้การทำเครื่องหนังแบบดั้งเดิม",
        fullDescription: "เรียนรู้การทำเครื่องหนังแบบดั้งเดิมจากช่างฝีมือท้องถิ่น ตั้งแต่การฟอกหนัง การตัด การเย็บ จนถึงการตกแต่ง",
        price: "800 บาท/คน",
        duration: "4-5 ชั่วโมง",
        capacity: "2-6 คน",
        schedule: "ทุกวันอาทิตย์ 9:00-17:00",
        mainImage: IMAGE_CONFIG.getTripImageUrlByNumber(16, 'small', 1),
        gallery: [
            IMAGE_CONFIG.getTripImageUrlByNumber(16, 'large', 1),
            IMAGE_CONFIG.getTripImageUrlByNumber(16, 'large', 2),
            IMAGE_CONFIG.getTripImageUrlByNumber(16, 'large', 3)
        ],
        highlights: [
            "เรียนรู้การทำเครื่องหนัง",
            "งานฝีมือหนัง",
            "ลงมือทำจริง",
            "ได้เครื่องหนังกลับบ้าน",
            "ประสบการณ์งานฝีมือไทย"
        ],
        includes: [
            "หนังและอุปกรณ์",
            "เครื่องมือทำเครื่องหนัง",
            "เครื่องหนังที่ทำ",
            "ไกด์สอนงานฝีมือ",
            "ประกันอุบัติเหตุ"
        ]
    },
    {
        id: 17,
        name: "ทริปท่องเที่ยวเรียนรู้การทำเครื่องไม้",
        shortDescription: "เรียนรู้การทำเครื่องไม้แบบดั้งเดิม",
        fullDescription: "เรียนรู้การทำเครื่องไม้แบบดั้งเดิมจากช่างฝีมือท้องถิ่น ตั้งแต่การเลือกไม้ การเลื่อย การแกะสลัก จนถึงการขัดเงา",
        price: "700 บาท/คน",
        duration: "4-5 ชั่วโมง",
        capacity: "2-6 คน",
        schedule: "ทุกวันเสาร์ 9:00-17:00",
        mainImage: IMAGE_CONFIG.getTripImageUrlByNumber(17, 'small', 1),
        gallery: [
            IMAGE_CONFIG.getTripImageUrlByNumber(17, 'large', 1),
            IMAGE_CONFIG.getTripImageUrlByNumber(17, 'large', 2),
            IMAGE_CONFIG.getTripImageUrlByNumber(17, 'large', 3)
        ],
        highlights: [
            "เรียนรู้การทำเครื่องไม้",
            "งานฝีมือไม้",
            "ลงมือทำจริง",
            "ได้เครื่องไม้กลับบ้าน",
            "ประสบการณ์งานฝีมือไทย"
        ],
        includes: [
            "ไม้และอุปกรณ์",
            "เครื่องมือทำเครื่องไม้",
            "เครื่องไม้ที่ทำ",
            "ไกด์สอนงานฝีมือ",
            "ประกันอุบัติเหตุ"
        ]
    },
    {
        id: 18,
        name: "ทริปท่องเที่ยวเรียนรู้การทำเครื่องหิน",
        shortDescription: "เรียนรู้การทำเครื่องหินแบบโบราณ",
        fullDescription: "เรียนรู้การทำเครื่องหินแบบโบราณจากช่างฝีมือท้องถิ่น ตั้งแต่การเลือกหิน การแกะสลัก การขัด จนถึงการตกแต่ง",
        price: "900 บาท/คน",
        duration: "4-5 ชั่วโมง",
        capacity: "2-6 คน",
        schedule: "ทุกวันอาทิตย์ 9:00-17:00",
        mainImage: IMAGE_CONFIG.getTripImageUrlByNumber(18, 'small', 1),
        gallery: [
            IMAGE_CONFIG.getTripImageUrlByNumber(18, 'large', 1),
            IMAGE_CONFIG.getTripImageUrlByNumber(18, 'large', 2),
            IMAGE_CONFIG.getTripImageUrlByNumber(18, 'large', 3)
        ],
        highlights: [
            "เรียนรู้การทำเครื่องหิน",
            "ศิลปะการแกะสลักหิน",
            "ลงมือทำจริง",
            "ได้เครื่องหินกลับบ้าน",
            "ประสบการณ์ศิลปะโบราณ"
        ],
        includes: [
            "หินและอุปกรณ์",
            "เครื่องมือแกะสลัก",
            "เครื่องหินที่ทำ",
            "ไกด์สอนศิลปะ",
            "ประกันอุบัติเหตุ"
        ]
    }
];

// ฟังก์ชันแสดงรายละเอียดทริปท่องเที่ยว
function showTripDetails(tripId) {
    const trip = tripsData.find(t => t.id === tripId);
    if (!trip) return;

    // อัปเดตข้อมูลในหน้า
    document.getElementById('trip-title').textContent = trip.name;
    document.getElementById('trip-name').textContent = trip.name;
    document.getElementById('trip-description').textContent = trip.shortDescription;
    document.getElementById('trip-price').textContent = trip.price;
    document.getElementById('trip-duration').textContent = trip.duration;
    document.getElementById('trip-capacity').textContent = trip.capacity;
    document.getElementById('trip-schedule').textContent = trip.schedule;
    document.getElementById('trip-main-image').src = trip.mainImage;
    document.getElementById('trip-main-image').alt = trip.name;

    // อัปเดตรายละเอียดเพิ่มเติม
    document.getElementById('trip-full-description').innerHTML = `<p>${trip.fullDescription}</p>`;

    // อัปเดตไฮไลท์
    const highlightsList = document.getElementById('trip-highlights-list');
    highlightsList.innerHTML = trip.highlights.map(highlight => `<li>${highlight}</li>`).join('');

    // อัปเดตสิ่งที่รวมในทริปท่องเที่ยว
    const includesList = document.getElementById('trip-includes-list');
    includesList.innerHTML = trip.includes.map(item => `<li>${item}</li>`).join('');

    // อัปเดตแกลเลอรี่
    const gallery = document.getElementById('trip-gallery');
    gallery.innerHTML = trip.gallery.map(img => 
        `<img src="${img}" alt="ภาพทริปท่องเที่ยว" class="gallery-thumb" onclick="openGallery('${img}')">`
    ).join('');

    // อัปเดตลิงก์จอง
    document.getElementById('book-now-btn').href = `#book-${trip.id}`;
    document.getElementById('contact-btn').href = `contact.html?trip=${trip.id}`;
}

// ฟังก์ชันเปิดแกลเลอรี่
function openGallery(imageSrc) {
    // ใช้ PhotoSwipe หรือเปิดภาพในแท็บใหม่
    window.open(imageSrc, '_blank');
}

// Export tripsData สำหรับใช้ในไฟล์อื่น
export { tripsData };

// ตรวจสอบ URL parameters เมื่อโหลดหน้า
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const tripId = parseInt(urlParams.get('id'));
    
    if (tripId) {
        showTripDetails(tripId);
    }
});
