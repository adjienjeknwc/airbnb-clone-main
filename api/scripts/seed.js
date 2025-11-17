const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const User = require('../models/User');
const Place = require('../models/Place');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const SAMPLE_USER = {
  name: 'Demo Host',
  email: 'host@example.com',
  password: 'DemoPass123!',
  picture:
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
};

const SAMPLE_PLACES = [
  {
    title: 'Cozy Downtown Loft',
    address: '123 Market Street, San Francisco, CA',
    photos: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'A bright and airy loft located in the heart of downtown SF. Walk to coffee shops, galleries, and public transport.',
    perks: ['wifi', 'parking', 'kitchen', 'pets'],
    extraInfo: 'Self check-in available. No parties please.',
    maxGuests: 3,
    price: 180,
  },
  {
    title: 'Beachfront Escape',
    address: '88 Ocean View Rd, Malibu, CA',
    photos: [
      'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938033-375cae5f9c12?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'Wake up to panoramic ocean views in this serene Malibu getaway. Perfect for couples or small families.',
    perks: ['wifi', 'beach access', 'free parking', 'bbq'],
    extraInfo: 'Please respect quiet hours after 10pm.',
    maxGuests: 4,
    price: 320,
  },
  {
    title: 'Modern Mountain Cabin',
    address: '45 Pinecone Trail, Aspen, CO',
    photos: [
      'https://images.unsplash.com/photo-1505692794400-5e0d8c7e8328?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'Rustic charm meets modern comfort in this mountain cabin with a private hot tub and fireplace.',
    perks: ['wifi', 'hot tub', 'fireplace', 'pets'],
    extraInfo: '4WD recommended during winter months.',
    maxGuests: 6,
    price: 260,
  },
  {
    title: 'Urban Skyline Penthouse',
    address: '901 Highline Ave, New York, NY',
    photos: [
      'https://images.unsplash.com/photo-1496346651079-6ca5cb67f42f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'Floor-to-ceiling windows, designer furniture, and a wraparound terrace overlooking the NYC skyline.',
    perks: ['wifi', 'gym', 'doorman', 'workspace'],
    extraInfo: 'Complimentary continental breakfast included.',
    maxGuests: 2,
    price: 420,
  },
  {
    title: 'Desert Earthship Retreat',
    address: '7 Sand Dune Ln, Taos, NM',
    photos: [
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938060-8b60e94805fb?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'Sustainable off-grid home with passive solar heating, adobe walls, and stargazing deck.',
    perks: ['wifi', 'parking', 'kitchen', 'workspace'],
    extraInfo: 'Solar-powered. Please limit high-energy appliances.',
    maxGuests: 4,
    price: 190,
  },
  {
    title: 'Lakeview A-Frame',
    address: '210 Lake Shore Dr, Lake Tahoe, CA',
    photos: [
      'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'Classic A-frame cabin with panoramic lake views, kayaks, and a wood-burning stove.',
    perks: ['wifi', 'kayaks', 'fireplace', 'bbq'],
    extraInfo: 'Kayaks available May–September weather permitting.',
    maxGuests: 5,
    price: 240,
  },
  {
    title: 'Tropical Jungle Villa',
    address: '5 Palm Grove Way, Hana, HI',
    photos: [
      'https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'Open-air villa surrounded by lush jungle, infinity plunge pool, and outdoor rain shower.',
    perks: ['wifi', 'pool', 'beach gear', 'chef available'],
    extraInfo: 'Daily housekeeping on request.',
    maxGuests: 4,
    price: 380,
  },
  {
    title: 'Scandinavian Hygge Home',
    address: '12 Fjord Lane, Bergen, Norway',
    photos: [
      'https://images.unsplash.com/photo-1505691723491-29088b744774?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'Warm timber interiors, floor-to-ceiling glass, and a soaking tub facing the fjord.',
    perks: ['wifi', 'sauna', 'heated floors', 'workspace'],
    extraInfo: 'Snowshoes provided December–March.',
    maxGuests: 4,
    price: 270,
  },
  {
    title: 'Lisbon Alfama Hideout',
    address: '31 Rua do Salvador, Lisbon, Portugal',
    photos: [
      'https://images.unsplash.com/photo-1505691723491-29088b744774?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'Pastel-colored apartment with Juliet balconies, azulejo tiles, and record player.',
    perks: ['wifi', 'washer', 'ac', 'workspace'],
    extraInfo: 'Steps away from Fado bars and tram 28.',
    maxGuests: 3,
    price: 160,
  },
  {
    title: 'Sydney Harbour Luxe Suite',
    address: '18 Circular Quay W, Sydney, Australia',
    photos: [
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'Luxury suite with opera house views, private balcony, and curated art.',
    perks: ['wifi', 'gym', 'pool', 'concierge'],
    extraInfo: 'Airport transfer available on request.',
    maxGuests: 2,
    price: 410,
  },
];

async function seed() {
  try {
    if (!process.env.DB_URL) {
      throw new Error('DB_URL is missing in your environment configuration.');
    }

    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    let user = await User.findOne({ email: SAMPLE_USER.email });
    if (!user) {
      user = await User.create(SAMPLE_USER);
      console.log(`👤 Created demo host (${user.email})`);
    } else {
      console.log(`ℹ️ Demo host already exists (${user.email}).`);
    }

    for (const sample of SAMPLE_PLACES) {
      await Place.findOneAndUpdate(
        { title: sample.title },
        { ...sample, owner: user._id },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
    }
    console.log(`🏡 Ensured ${SAMPLE_PLACES.length} sample places exist.`);

    console.log('🎉 Seeding complete.');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();

