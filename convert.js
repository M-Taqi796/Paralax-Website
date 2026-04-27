import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = './public/BusAnimation';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

async function convert() {
  for (const f of files) {
    const input = path.join(dir, f);
    const output = path.join(dir, f.replace('.png', '.webp'));
    await sharp(input).webp({ quality: 80 }).toFile(output);
    console.log(`Converted ${f}`);
    fs.unlinkSync(input); // delete original
  }
}
convert();
