export interface Movie {
  id: string;
  title: string;
  category: string;
  rating: string;
  coverImage: string;
  description: string;
  freeVideoUrl: string; // <-- เพิ่ม URL วิดีโอเวอร์ชันดูฟรี (เช่น YouTube Embed หรือ IPFS ความละเอียดธรรมดา)
  ipfsUrl: string;       // URL วิดีโอ 4K VIP
  is4K: boolean;
}

export const MOVIES: Movie[] = [
  {
    id: 'godzilla-minus-one',
    title: 'Godzilla Minus One',
    category: 'Sci-Fi / Action',
    rating: '13+',
    coverImage: 'https://m.media-amazon.com/images/M/MV5BMjc5MjllMGUtMDIwMS00ZDVkLWEzODQtM2NlMTMwMTZhNThmXkEyXkFqcGc@._V1_.jpg',
    description: 'Godzilla Minus One - Encrypted HLS Streaming Video',
    freeVideoUrl:'https://www.youtube.com/embed/8-BvAFck4Ic',
    ipfsUrl: 'https://ipfs.io/ipfs/bafybeicnr5rf5kgyeayc7b6vi2awpocc2zoahm2xwytgra66tuocxvnmrq/enc_output.m3u8', // ใส่ IPFS/Video URL 
    is4K: true,
  },
  {
    id: 'alien-covenant',
    title: 'Alien Covenant',
    category: 'Sci-Fi / Horror',
    rating: '18+',
    coverImage: 'https://m.media-amazon.com/images/S/pv-target-images/82f4ad107ecbedbd95b44b702eb4701498763fffbbafb6ca92ba94e534d3ec74.jpg',
    description: 'ยานอาณานิคม Covenant ที่นำพาผู้คนหลับใหลไปสร้างอาณานิคมใหม่ แต่ดันไปเจอสัญญาณปริศนาบนดาวดวงอื่น ซึ่งนำไปสู่หายนะจากเอเลี่ยนสุดโหดน้ำมือของแอนดรอยด์สติเฟื่องอย่าง David',
    freeVideoUrl:'https://www.youtube.com/embed/oQNy0xv1hxg',
    ipfsUrl: 'https://ipfs.io/ipfs/bafybeiaxtvr335mckbsbdxqbpkyoenxshsqriqjkdslyw6rlkjou6divry/enc_output.m3u8',
    is4K: true,
  },
  {
    id: 'bleach-hellverse',
    title: 'Bleach: hellverse',
    category: 'Anime / Action',
    rating: '13+',
    coverImage: 'https://m.media-amazon.com/images/M/MV5BNDg1NzFhYjctNDY4MC00ODY5LWJlMzQtYTRhNzZjMjBmODI1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    description: 'นรกภูมิเพื่อช่วยเหลือ ยูซุ น้องสาวที่ถูกกลุ่มคนบาปลักพาตัวไปโดยได้รับความช่วยเหลือจาก โคคุโตะ ชายปริศนาเพื่อขัดขวางแผนการทำลายประตูนรกและปลดปล่อยเหล่าวิญญาณบาป',
    freeVideoUrl:'https://www.youtube.com/embed/Dj_BfTIW9u0',
    ipfsUrl: 'https://ipfs.io/ipfs/bafybeidcr7nwzox45rgasdb2txslfmw2vlh33zjwzqeqc5os2lxz2c4wxm/enc_output.m3u8',
    is4K: true,
  },
  {
    id: 'the-odyssey',
    title: 'The Odyssey',
    category: 'Adventure / Action',
    rating: '13+',
    coverImage: 'https://www.blackstonepublishing.com/cdn/shop/files/103a-Rectangle-cover.jpg?v=1781298078',
    description: 'การเดินทางกลับบ้านของโอดิสเซียส การเผชิญหน้ากับสัตว์ประหลาด และการทวงคืนบัลลังก์',
    freeVideoUrl:'https://www.youtube.com/embed/Osim0hE0Tgo',
    ipfsUrl: 'https://ipfs.io/ipfs/bafybeihgfcyx25d5zq6jx5ity3zx5n2uwof7xltqbkjku4xp4wvbw4tj7a/enc_output.m3u8',
    is4K: true,
  },
];