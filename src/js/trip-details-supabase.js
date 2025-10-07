// Trip Details with Supabase Integration
// ดึงข้อมูลทริปจาก Supabase API

import { IMAGE_CONFIG } from './config.js';

// Supabase Configuration
const SUPABASE_URL = 'https://gmdvkegcejrbrobtrhfm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtZHZrZWdjZWpyYnJvYnRyaGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMzQ1NjYsImV4cCI6MjA3NDgxMDU2Nn0.n5iWM2P7G_vYs5VoIexeZ4N0ajkQtnKw8uqsCtzFZto';

// Function to fetch trips from Supabase
async function fetchTripsFromSupabase() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/trips?status=eq.published&select=*`, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch trips');
        }
        
        const trips = await response.json();
        return trips;
    } catch (error) {
        console.error('Error fetching trips:', error);
        return [];
    }
}

// Function to get trip by ID from Supabase
async function getTripById(tripId) {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/trips?id=eq.${tripId}&select=*`, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch trip');
        }
        
        const trips = await response.json();
        return trips[0] || null;
    } catch (error) {
        console.error('Error fetching trip:', error);
        return null;
    }
}

// Function to transform Supabase trip data to match existing format
function transformTripData(supabaseTrip) {
    if (!supabaseTrip) return null;
    
    return {
        id: supabaseTrip.id,
        name: supabaseTrip.title,
        shortDescription: supabaseTrip.description,
        fullDescription: supabaseTrip.content,
        price: supabaseTrip.price,
        duration: supabaseTrip.duration,
        location: supabaseTrip.location,
        capacity: "2-10 คน", // Default capacity
        schedule: "ทุกวัน 8:00-17:00", // Default schedule
        mainImage: IMAGE_CONFIG.getTripImageUrlByNumber(supabaseTrip.id, 'small', 1),
        gallery: [
            IMAGE_CONFIG.getTripImageUrlByNumber(supabaseTrip.id, 'large', 1),
            IMAGE_CONFIG.getTripImageUrlByNumber(supabaseTrip.id, 'large', 2),
            IMAGE_CONFIG.getTripImageUrlByNumber(supabaseTrip.id, 'large', 3)
        ],
        highlights: [
            "กิจกรรมที่น่าสนใจ",
            "ประสบการณ์ใหม่",
            "เรียนรู้วัฒนธรรมท้องถิ่น",
            "สัมผัสธรรมชาติ",
            "สร้างความทรงจำดีๆ"
        ],
        includes: [
            "อุปกรณ์ที่จำเป็น",
            "ไกด์ท้องถิ่น",
            "อาหารและเครื่องดื่ม",
            "ประกันอุบัติเหตุ",
            "ของที่ระลึก"
        ],
        status: supabaseTrip.status,
        createdAt: supabaseTrip.created_at,
        updatedAt: supabaseTrip.updated_at
    };
}

// Export functions for use in other modules
export { fetchTripsFromSupabase, getTripById, transformTripData };

// Legacy support - maintain existing tripsData structure
let tripsData = [];

// Initialize trips data from Supabase
async function initializeTripsData() {
    try {
        const supabaseTrips = await fetchTripsFromSupabase();
        tripsData = supabaseTrips.map(transformTripData).filter(trip => trip !== null);
        console.log('Trips data loaded from Supabase:', tripsData.length, 'trips');
    } catch (error) {
        console.error('Failed to initialize trips data:', error);
        // Fallback to empty array
        tripsData = [];
    }
}

// Initialize on module load
initializeTripsData();

// Export the tripsData for backward compatibility
export { tripsData };

// Function to get all trips
export function getAllTrips() {
    return tripsData;
}

// Function to get trip by ID
export function getTripByIdLegacy(id) {
    return tripsData.find(trip => trip.id === parseInt(id));
}

// Function to get trips by category (if needed)
export function getTripsByCategory(category) {
    return tripsData.filter(trip => trip.category === category);
}

// Function to search trips
export function searchTrips(query) {
    const lowercaseQuery = query.toLowerCase();
    return tripsData.filter(trip => 
        trip.name.toLowerCase().includes(lowercaseQuery) ||
        trip.shortDescription.toLowerCase().includes(lowercaseQuery) ||
        trip.fullDescription.toLowerCase().includes(lowercaseQuery)
    );
}

// Function to load recommended trips for homepage
export async function loadRecommendedTrips() {
    try {
        console.log('Loading recommended trips for homepage...');
        const trips = await fetchTripsFromSupabase();
        
        if (trips.length === 0) {
            console.log('No trips found, using fallback data');
            // Fallback to static data if Supabase is not available
            const fallbackTrips = [
                {
                    id: 1,
                    name: 'เที่ยวชุมชนคลองบางมด 1 วัน',
                    shortDescription: 'สัมผัสวิถีชีวิตชุมชนริมคลองบางมด',
                    price: '1,500 บาท',
                    duration: '1 วัน',
                    mainImage: '/images/trip1/large/trip1-main.webp'
                },
                {
                    id: 2,
                    name: 'ตลาดน้ำบางมด',
                    shortDescription: 'สัมผัสตลาดน้ำแบบดั้งเดิม',
                    price: '800 บาท',
                    duration: 'ครึ่งวัน',
                    mainImage: '/images/trip2/large/trip2-main.webp'
                },
                {
                    id: 3,
                    name: 'ท่องเที่ยวชุมชนคลองลัดโพธิ์',
                    shortDescription: 'สัมผัสวิถีชีวิตชุมชนริมคลองลัดโพธิ์',
                    price: '1,200 บาท',
                    duration: '1 วัน',
                    mainImage: '/images/trip3/large/trip3-main.webp'
                }
            ];
            displayRecommendedTrips(fallbackTrips);
            return;
        }
        
        // Take first 6 trips as recommended
        const recommendedTrips = trips.slice(0, 6);
        displayRecommendedTrips(recommendedTrips);
        
    } catch (error) {
        console.error('Error loading recommended trips:', error);
        // Show fallback content
        displayRecommendedTrips([]);
    }
}

// Function to display recommended trips on homepage
function displayRecommendedTrips(trips) {
    const gridContainer = document.getElementById('recommended-trips-grid');
    
    if (!gridContainer) {
        console.error('Recommended trips grid container not found');
        return;
    }
    
    if (trips.length === 0) {
        gridContainer.innerHTML = `
            <div class="no-trips-message" style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #666;">
                <p>กำลังโหลดทริปท่องเที่ยวแนะนำ...</p>
            </div>
        `;
        return;
    }
    
    gridContainer.innerHTML = trips.map(trip => `
        <div class="card">
            <div class="card-image">
                <img src="${trip.mainImage || trip.image_url || '/images/trip1/large/trip1-main.webp'}" 
                     alt="${trip.name}" 
                     loading="lazy"
                     onerror="this.src='/images/trip1/large/trip1-main.webp'">
                <div class="card-overlay">
                    <button class="btn btn-primary btn-sm" onclick="window.location.href='pages/trip-details.html?id=${trip.id}'">
                        ดูรายละเอียด
                    </button>
                </div>
            </div>
            <div class="card-content">
                <h3 class="card-title">${trip.name}</h3>
                <p class="card-description">${trip.shortDescription || trip.description || ''}</p>
                <div class="card-meta">
                    <span class="price">${trip.price || 'ราคาติดต่อ'}</span>
                    <span class="duration">${trip.duration || ''}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    console.log(`Displayed ${trips.length} recommended trips`);
}

// Function to load all trips for trips page
export async function loadTripsGrid() {
    try {
        console.log('Loading all trips for trips page...');
        const trips = await fetchTripsFromSupabase();
        
        if (trips.length === 0) {
            console.log('No trips found, using fallback data');
            // Fallback to static data if Supabase is not available
            const fallbackTrips = [
                {
                    id: 1,
                    name: 'เที่ยวชุมชนคลองบางมด 1 วัน',
                    shortDescription: 'สัมผัสวิถีชีวิตชุมชนริมคลองบางมด',
                    price: '1,500 บาท',
                    duration: '1 วัน',
                    mainImage: '/images/trip1/large/trip1-main.webp'
                },
                {
                    id: 2,
                    name: 'ตลาดน้ำบางมด',
                    shortDescription: 'สัมผัสตลาดน้ำแบบดั้งเดิม',
                    price: '800 บาท',
                    duration: 'ครึ่งวัน',
                    mainImage: '/images/trip2/large/trip2-main.webp'
                },
                {
                    id: 3,
                    name: 'ท่องเที่ยวชุมชนคลองลัดโพธิ์',
                    shortDescription: 'สัมผัสวิถีชีวิตชุมชนริมคลองลัดโพธิ์',
                    price: '1,200 บาท',
                    duration: '1 วัน',
                    mainImage: '/images/trip3/large/trip3-main.webp'
                },
                {
                    id: 4,
                    name: 'ตลาดนัดชุมชนบางมด',
                    shortDescription: 'สัมผัสตลาดนัดชุมชนบางมด',
                    price: '600 บาท',
                    duration: 'ครึ่งวัน',
                    mainImage: '/images/trip4/large/trip4-main.webp'
                },
                {
                    id: 5,
                    name: 'ท่องเที่ยวชุมชนคลองบางมด 2 วัน 1 คืน',
                    shortDescription: 'สัมผัสวิถีชีวิตชุมชนริมคลองบางมด 2 วัน 1 คืน',
                    price: '2,800 บาท',
                    duration: '2 วัน 1 คืน',
                    mainImage: '/images/trip5/large/trip5-main.webp'
                },
                {
                    id: 6,
                    name: 'ตลาดน้ำคลองลัดโพธิ์',
                    shortDescription: 'สัมผัสตลาดน้ำคลองลัดโพธิ์',
                    price: '900 บาท',
                    duration: 'ครึ่งวัน',
                    mainImage: '/images/trip6/large/trip6-main.webp'
                },
                {
                    id: 7,
                    name: 'ท่องเที่ยวชุมชนคลองบางมด ครึ่งวัน',
                    shortDescription: 'สัมผัสวิถีชีวิตชุมชนริมคลองบางมด ครึ่งวัน',
                    price: '1,000 บาท',
                    duration: 'ครึ่งวัน',
                    mainImage: '/images/trip7/large/trip7-main.webp'
                },
                {
                    id: 8,
                    name: 'ตลาดนัดชุมชนคลองลัดโพธิ์',
                    shortDescription: 'สัมผัสตลาดนัดชุมชนคลองลัดโพธิ์',
                    price: '700 บาท',
                    duration: 'ครึ่งวัน',
                    mainImage: '/images/trip8/large/trip8-main.webp'
                },
                {
                    id: 9,
                    name: 'ท่องเที่ยวชุมชนคลองบางมด 3 วัน 2 คืน',
                    shortDescription: 'สัมผัสวิถีชีวิตชุมชนริมคลองบางมด 3 วัน 2 คืน',
                    price: '4,500 บาท',
                    duration: '3 วัน 2 คืน',
                    mainImage: '/images/trip9/large/trip9-main.webp'
                },
                {
                    id: 10,
                    name: 'ตลาดน้ำคลองบางมด',
                    shortDescription: 'สัมผัสตลาดน้ำคลองบางมด',
                    price: '750 บาท',
                    duration: 'ครึ่งวัน',
                    mainImage: '/images/trip10/large/trip10-main.webp'
                },
                {
                    id: 11,
                    name: 'ท่องเที่ยวชุมชนคลองบางมด 1 วันพิเศษ',
                    shortDescription: 'สัมผัสวิถีชีวิตชุมชนริมคลองบางมด 1 วันพิเศษ',
                    price: '1,800 บาท',
                    duration: '1 วัน',
                    mainImage: '/images/trip11/large/trip11-main.webp'
                }
            ];
            displayAllTrips(fallbackTrips);
            return;
        }
        
        // Display all trips
        displayAllTrips(trips);
        
    } catch (error) {
        console.error('Error loading trips:', error);
        // Show fallback content
        displayAllTrips([]);
    }
}

// Function to display all trips on trips page
function displayAllTrips(trips) {
    const gridContainer = document.getElementById('trips-grid');
    
    if (!gridContainer) {
        console.error('Trips grid container not found');
        return;
    }
    
    if (trips.length === 0) {
        gridContainer.innerHTML = `
            <div class="no-trips-message" style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #666;">
                <p>ไม่พบทริปท่องเที่ยวในขณะนี้</p>
            </div>
        `;
        return;
    }
    
    gridContainer.innerHTML = trips.map(trip => `
        <div class="card">
            <div class="card-image">
                <img src="${trip.mainImage || trip.image_url || '/images/trip1/large/trip1-main.webp'}" 
                     alt="${trip.name}" 
                     loading="lazy"
                     onerror="this.src='/images/trip1/large/trip1-main.webp'">
                <div class="card-overlay">
                    <button class="btn btn-primary btn-sm" onclick="window.location.href='trip-details.html?id=${trip.id}'">
                        ดูรายละเอียด
                    </button>
                </div>
            </div>
            <div class="card-content">
                <h3 class="card-title">${trip.name}</h3>
                <p class="card-description">${trip.shortDescription || trip.description || ''}</p>
                <div class="card-meta">
                    <span class="price">${trip.price || 'ราคาติดต่อ'}</span>
                    <span class="duration">${trip.duration || ''}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    console.log(`Displayed ${trips.length} trips`);
}

// Function to load trip details for trip-details page
export async function loadTripDetails() {
    try {
        // Get trip ID from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const tripId = urlParams.get('id');
        
        if (!tripId) {
            console.error('No trip ID provided');
            showTripNotFound();
            return;
        }
        
        console.log('Loading trip details for ID:', tripId);
        
        // Try to fetch from Supabase first
        let trip = await getTripById(tripId);
        
        if (!trip) {
            console.log('Trip not found in Supabase, using fallback data');
            // Fallback to static data
            const fallbackTrips = [
                {
                    id: 1,
                    title: 'เที่ยวชุมชนคลองบางมด 1 วัน',
                    description: 'สัมผัสวิถีชีวิตชุมชนริมคลองบางมด',
                    content: 'ทริปท่องเที่ยวชุมชนริมคลองบางมด เรียนรู้วิถีชีวิตดั้งเดิม พร้อมกิจกรรมที่น่าสนใจมากมาย',
                    price: '1,500 บาท',
                    duration: '1 วัน',
                    location: 'คลองบางมด',
                    status: 'published',
                    image_url: '/images/trip1/large/trip1-main.webp'
                },
                {
                    id: 2,
                    title: 'ตลาดน้ำบางมด',
                    description: 'สัมผัสตลาดน้ำแบบดั้งเดิม',
                    content: 'เยี่ยมชมตลาดน้ำบางมด ตลาดน้ำที่ยังคงวิถีชีวิตดั้งเดิม พร้อมอาหารพื้นบ้านอร่อยๆ',
                    price: '800 บาท',
                    duration: 'ครึ่งวัน',
                    location: 'ตลาดน้ำบางมด',
                    status: 'published',
                    image_url: '/images/trip2/large/trip2-main.webp'
                },
                {
                    id: 3,
                    title: 'ท่องเที่ยวชุมชนคลองลัดโพธิ์',
                    description: 'สัมผัสวิถีชีวิตชุมชนริมคลองลัดโพธิ์',
                    content: 'ทริปท่องเที่ยวชุมชนริมคลองลัดโพธิ์ เรียนรู้วิถีชีวิตดั้งเดิมของชาวคลอง พร้อมกิจกรรมสนุกๆ',
                    price: '1,200 บาท',
                    duration: '1 วัน',
                    location: 'คลองลัดโพธิ์',
                    status: 'published',
                    image_url: '/images/trip3/large/trip3-main.webp'
                }
            ];
            
            trip = fallbackTrips.find(t => t.id == tripId);
        }
        
        if (!trip) {
            console.error('Trip not found');
            showTripNotFound();
            return;
        }
        
        // Display trip details
        displayTripDetails(trip);
        
    } catch (error) {
        console.error('Error loading trip details:', error);
        showTripNotFound();
    }
}

// Function to display trip details
function displayTripDetails(trip) {
    // Update page title
    document.title = `${trip.title} - Green Blue Rest Bangkok`;
    
    // Update trip title
    const titleElement = document.getElementById('trip-title');
    if (titleElement) {
        titleElement.textContent = trip.title;
    }
    
    // Update trip name
    const nameElement = document.getElementById('trip-name');
    if (nameElement) {
        nameElement.textContent = trip.title;
    }
    
    // Update trip description
    const descElement = document.getElementById('trip-description');
    if (descElement) {
        descElement.textContent = trip.description;
    }
    
    // Update trip price
    const priceElement = document.getElementById('trip-price');
    if (priceElement) {
        priceElement.textContent = trip.price;
    }
    
    // Update trip duration
    const durationElement = document.getElementById('trip-duration');
    if (durationElement) {
        durationElement.textContent = trip.duration;
    }
    
    // Update trip capacity (default)
    const capacityElement = document.getElementById('trip-capacity');
    if (capacityElement) {
        capacityElement.textContent = '2-10 คน';
    }
    
    // Update trip schedule (default)
    const scheduleElement = document.getElementById('trip-schedule');
    if (scheduleElement) {
        scheduleElement.textContent = 'ทุกวัน 8:00-17:00';
    }
    
    // Update trip full description
    const fullDescElement = document.getElementById('trip-full-description');
    if (fullDescElement) {
        fullDescElement.innerHTML = `
            <p>${trip.content}</p>
            <h4>กิจกรรมที่น่าสนใจ</h4>
            <ul>
                <li>เรียนรู้วิถีชีวิตชุมชน</li>
                <li>สัมผัสธรรมชาติริมคลอง</li>
                <li>ชิมอาหารพื้นบ้าน</li>
                <li>ทำกิจกรรมร่วมกับชาวบ้าน</li>
            </ul>
            <h4>สิ่งที่รวมในแพ็คเกจ</h4>
            <ul>
                <li>รถรับส่ง</li>
                <li>อาหารและเครื่องดื่ม</li>
                <li>ไกด์ท้องถิ่น</li>
                <li>อุปกรณ์ที่จำเป็น</li>
                <li>ประกันอุบัติเหตุ</li>
            </ul>
        `;
    }
    
    // Update trip images
    const image1Element = document.getElementById('trip-image-1');
    if (image1Element) {
        image1Element.src = trip.image_url || '/images/trip1/large/trip1-main.webp';
        image1Element.alt = trip.title;
    }
    
    const image2Element = document.getElementById('trip-image-2');
    if (image2Element) {
        image2Element.src = trip.image_url || '/images/trip1/large/trip1-main.webp';
        image2Element.alt = trip.title;
    }
    
    console.log('Trip details displayed successfully');
}

// Function to show trip not found message
function showTripNotFound() {
    const container = document.querySelector('.trip-detail-content');
    if (container) {
        container.innerHTML = `
            <div class="trip-not-found" style="text-align: center; padding: 2rem;">
                <h2>ไม่พบทริปท่องเที่ยวที่ต้องการ</h2>
                <p>ทริปท่องเที่ยวที่คุณกำลังมองหาอาจไม่พร้อมใช้งานในขณะนี้</p>
                <a href="trips.html" class="btn btn-primary">กลับไปดูทริปท่องเที่ยวทั้งหมด</a>
            </div>
        `;
    }
}
