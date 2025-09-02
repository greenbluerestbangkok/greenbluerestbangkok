// ข้อมูลทริปท่องเที่ยวทั้งหมด 11 ทริปท่องเที่ยว
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
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=cooking-trip",
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
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=fishing-trip",
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
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=farming-trip",
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
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=pottery-trip",
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
    // อัปเดตรูปภาพ 2 รูป
    const image1 = document.getElementById('trip-image-1');
    const image2 = document.getElementById('trip-image-2');
    
    if (trip.gallery && trip.gallery.length >= 2) {
        image1.src = trip.gallery[0];
        image1.alt = `${trip.name} - รูปที่ 1`;
        image2.src = trip.gallery[1];
        image2.alt = `${trip.name} - รูปที่ 2`;
        
        // ตั้งค่า PhotoSwipe attributes
        image1.setAttribute('data-pswp-src', trip.gallery[0]);
        image2.setAttribute('data-pswp-src', trip.gallery[1]);
    } else {
        // ใช้รูปหลักถ้าไม่มีรูปในแกลเลอรี่พอ
        image1.src = trip.mainImage;
        image1.alt = `${trip.name} - รูปที่ 1`;
        image2.src = trip.mainImage;
        image2.alt = `${trip.name} - รูปที่ 2`;
        
        // ตั้งค่า PhotoSwipe attributes
        image1.setAttribute('data-pswp-src', trip.mainImage);
        image2.setAttribute('data-pswp-src', trip.mainImage);
    }
    
    // เพิ่ม event listeners สำหรับการคลิกภาพ
    image1.addEventListener('click', () => openGallery(image1.src));
    image2.addEventListener('click', () => openGallery(image2.src));

    // อัปเดตรายละเอียดเพิ่มเติม
    // ======================================== -->
    // 🚨 SECURITY FIX: แก้ไข XSS vulnerability
    // แทนที่ innerHTML ด้วย textContent เพื่อความปลอดภัย
    // ======================================== -->

    // ฟังก์ชันสร้าง HTML string ที่ปลอดภัย
    function createSafeTripDescription(trip) {
        return `<p>${trip.fullDescription}</p>`;
    }

    // แก้ไขการใช้ innerHTML
    document.getElementById('trip-full-description').innerHTML = createSafeTripDescription(trip);

    // อัปเดตวิดีโอ YouTube
    const videoContainer = document.getElementById('trip-video');
    if (trip.videoUrl && videoContainer) {
        videoContainer.innerHTML = `
            <iframe 
                src="${trip.videoUrl}" 
                title="วิดีโอแนะนำทริป: ${trip.name}"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
                loading="lazy">
            </iframe>
        `;
        
        // เพิ่ม class สำหรับการแสดงผลที่ดีขึ้น
        videoContainer.classList.add('trip-video-container');
    }
}

// ฟังก์ชันเปิดแกลเลอรี่ด้วย PhotoSwipe
function openGallery(imageSrc) {
    // ใช้ PhotoSwipe หรือเปิดภาพในแท็บใหม่
    if (typeof PhotoSwipe !== 'undefined') {
        // ใช้ PhotoSwipe
        const lightbox = new PhotoSwipeLightbox({
            gallery: '.trip-media-vertical',
            children: '.clickable-image',
            pswpModule: PhotoSwipe
        });
        lightbox.init();
        lightbox.open();
    } else {
        // Fallback: เปิดภาพในแท็บใหม่
        window.open(imageSrc, '_blank');
    }
}

// ฟังก์ชันตั้งค่า PhotoSwipe สำหรับภาพทริป
function setupPhotoSwipe() {
    if (typeof PhotoSwipe !== 'undefined') {
        const lightbox = new PhotoSwipeLightbox({
            gallery: '.trip-media-vertical',
            children: '.clickable-image',
            pswpModule: PhotoSwipe,
            showHideAnimationType: 'fade',
            showAnimationDuration: 300,
            hideAnimationDuration: 300,
            easing: 'ease-in-out'
        });
        
        lightbox.on('uiRegister', function() {
            lightbox.pswp.ui.registerElement({
                name: 'custom-caption',
                order: 9,
                isButton: false,
                appendTo: 'wrapper',
                html: 'Caption text',
                onInit: (el, pswp) => {
                    lightbox.pswp.on('change', () => {
                        const currSlideElement = lightbox.pswp.currSlide.data.element;
                        const captionEl = el;
                        if (currSlideElement) {
                            const captionText = currSlideElement.querySelector('img').alt;
                            captionEl.innerHTML = captionText;
                        }
                    });
                }
            });
        });
        
        lightbox.init();
    }
}

// ฟังก์ชันสร้างการ์ดทริปท่องเที่ยว
function createTripCard(trip) {
    // ตรวจสอบว่าอยู่ในหน้าไหนเพื่อกำหนด path ที่ถูกต้อง
    const isMainPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
    const imagePath = isMainPage ? 'images/logo_001.webp' : '../images/logo_001.webp';
    const tripDetailsPath = isMainPage ? 'pages/trip-details.html' : 'trip-details.html';
    const tripsPath = isMainPage ? 'pages/trips.html' : 'trips.html';
    
    return `
        <div class="card">
            <div class="card-image-container">
                <img src="${trip.mainImage}" alt="${trip.name}" class="card-img" onerror="this.src='${imagePath}'; this.alt='รูปภาพไม่สามารถโหลดได้';">
                <div class="card-overlay">
                    <a href="${tripDetailsPath}?id=${trip.id}" class="btn btn-secondary btn-overlay">ดูรายละเอียด</a>
                </div>
            </div>
            <div class="card-body">
                <h3 class="card-title">${trip.name}</h3>
                <p class="card-text">${trip.shortDescription}</p>
                <div class="trip-meta">
                    <span class="trip-price">💰 ${trip.price}</span>
                    <span class="trip-duration">⏰ ${trip.duration}</span>
                </div>
                <div class="card-actions">
                    <a href="${tripDetailsPath}?id=${trip.id}" class="btn btn-primary">ดูรายละเอียด</a>
                    <a href="${tripsPath}" class="btn btn-secondary">ดูทริปท่องเที่ยวอื่นๆ</a>
                </div>
            </div>
        </div>
    `;
}

// ฟังก์ชันโหลดทริปท่องเที่ยวทั้งหมด
function loadTripsGrid() {
    const tripsGrid = document.getElementById('trips-grid');
    
    if (tripsGrid) {
        // สร้างการ์ดทริปท่องเที่ยวทั้งหมด
        tripsGrid.innerHTML = tripsData.map(trip => createTripCard(trip)).join('');
        
        // เพิ่ม error handling สำหรับรูปภาพ
        const images = tripsGrid.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('error', function() {
                this.src = '../images/logo_001.webp';
                this.alt = 'รูปภาพไม่สามารถโหลดได้';
            });
        });
    }
}

// ฟังก์ชันโหลดทริปท่องเที่ยวแนะนำ (สำหรับหน้าแรก)
function loadRecommendedTrips() {
    const recommendedTripsGrid = document.getElementById('recommended-trips-grid');
    
    if (recommendedTripsGrid) {
        // เลือกทริปท่องเที่ยว 6 อันแรกจากข้อมูลทั้งหมด
        const recommendedTrips = tripsData.slice(0, 6);
        
        // สร้างการ์ดทริปท่องเที่ยวและแสดงผล
        recommendedTripsGrid.innerHTML = recommendedTrips.map(trip => createTripCard(trip)).join('');
        
        // เพิ่ม error handling สำหรับรูปภาพ
        const images = recommendedTripsGrid.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('error', function() {
                this.src = 'images/logo_001.webp';
                this.alt = 'รูปภาพไม่สามารถโหลดได้';
            });
        });
    }
}

// Export functions สำหรับใช้ในไฟล์อื่น
export { tripsData, createTripCard, loadTripsGrid, loadRecommendedTrips };

// ตรวจสอบ URL parameters เมื่อโหลดหน้า
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const tripId = parseInt(urlParams.get('id'));
    
    if (tripId) {
        showTripDetails(tripId);
    }
    
    // ตั้งค่า PhotoSwipe หลังจากโหลดหน้าเสร็จ
    setTimeout(() => {
        setupPhotoSwipe();
    }, 500);
});
