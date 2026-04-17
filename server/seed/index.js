const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Service = require('../models/Service');
const Hairstyle = require('../models/Hairstyle');

const services = [
  { name: 'Classic Haircut', description: 'Precision cut tailored to your face shape and style.', price: 35, duration: 45, category: 'haircut' },
  { name: 'Kids Haircut', description: 'Fun and gentle haircuts for children under 12.', price: 25, duration: 30, category: 'haircut' },
  { name: 'Blowout & Style', description: 'Professional blow-dry with styling for any occasion.', price: 45, duration: 45, category: 'styling' },
  { name: 'Updo / Special Occasion', description: 'Elegant updos for weddings, proms, and events.', price: 85, duration: 90, category: 'styling' },
  { name: 'Full Color', description: 'All-over single color application.', price: 95, duration: 120, category: 'coloring' },
  { name: 'Highlights (Partial)', description: 'Face-framing highlights for a natural sun-kissed look.', price: 75, duration: 90, category: 'coloring' },
  { name: 'Balayage', description: 'Hand-painted highlights for seamless, natural dimension.', price: 145, duration: 150, category: 'coloring' },
  { name: 'Deep Conditioning Treatment', description: 'Intensive moisture and repair treatment for damaged hair.', price: 40, duration: 45, category: 'treatment' },
  { name: 'Keratin Smoothing', description: 'Long-lasting frizz reduction and shine treatment.', price: 200, duration: 180, category: 'treatment' },
  { name: 'Glamour Package', description: 'Includes cut, full color, and blowout styling.', price: 165, duration: 210, category: 'package' },
  { name: 'Bridal Package', description: 'Updo, hair treatment, and trial session included.', price: 250, duration: 240, category: 'package' },
  { name: 'Refresh & Revive', description: 'Trim, deep conditioning, and blowout bundle.', price: 110, duration: 135, category: 'package' },
];

const hairstyles = [
  { title: 'Layered Bob', description: 'A timeless layered bob with soft movement.', imageUrl: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600', category: 'short', tags: ['bob', 'layers', 'classic'], isFeatured: true },
  { title: 'Pixie Cut', description: 'Bold and chic ultra-short pixie style.', imageUrl: 'https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=600', category: 'short', tags: ['pixie', 'bold'] },
  { title: 'Shoulder-Length Waves', description: 'Effortless beachy waves at shoulder length.', imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600', category: 'medium', tags: ['waves', 'beach', 'natural'], isFeatured: true },
  { title: 'Blunt Lob', description: 'Clean, straight-cut long bob for a polished look.', imageUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600', category: 'medium', tags: ['lob', 'blunt', 'polished'] },
  { title: 'Long Layers', description: 'Flowing long hair with face-framing layers.', imageUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600', category: 'long', tags: ['long', 'layers', 'feminine'], isFeatured: true },
  { title: 'Sleek Straight', description: 'Pin-straight, glossy long hair.', imageUrl: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=600', category: 'long', tags: ['straight', 'sleek'] },
  { title: 'Defined Curls', description: 'Bouncy, defined natural curl pattern.', imageUrl: 'https://images.unsplash.com/photo-1626954079673-f2c3a4b70dc8?w=600', category: 'curly', tags: ['curly', 'natural', 'volume'], isFeatured: true },
  { title: 'Balayage Brunette', description: 'Warm caramel balayage on brunette base.', imageUrl: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600', category: 'color', tags: ['balayage', 'brunette', 'warm'], isFeatured: true },
  { title: 'Platinum Blonde', description: 'Icy platinum blonde for a striking statement.', imageUrl: 'https://images.unsplash.com/photo-1604004555489-723a93d6ce74?w=600', category: 'color', tags: ['blonde', 'platinum', 'bold'] },
  { title: 'Classic Updo', description: 'Elegant updo perfect for formal occasions.', imageUrl: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600', category: 'updo', tags: ['updo', 'formal', 'elegant'], isFeatured: true },
  { title: 'Braided Crown', description: 'Romantic braided crown with loose tendrils.', imageUrl: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600', category: 'updo', tags: ['braid', 'crown', 'romantic'] },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/salon');
  await Service.deleteMany({});
  await Hairstyle.deleteMany({});
  await Service.insertMany(services);
  await Hairstyle.insertMany(hairstyles);
  console.log('Seeded services and hairstyles');
  process.exit(0);
}

seed().catch((err) => { console.error(err); process.exit(1); });
