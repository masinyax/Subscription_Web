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
    id: 'cyberpunk-edgerunners',
    title: 'Cyberpunk: Edgerunners 4K',
    category: 'Anime / Sci-Fi',
    rating: '18+',
    coverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=60',
    description: 'การดิ้นรนในเมืองกลางคืนสุดล้ำของเด็กหนุ่มที่ยอมแลกทุกอย่างเพื่อเอาชีวิตรอด',
    freeVideoUrl:'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0',
    ipfsUrl: 'https://gateway.pinata.cloud/ipfs/bafybeicng45426...', // ใส่ IPFS/Video URL 
    is4K: true,
  },
  {
    id: 'web3-future-doc',
    title: 'Inside Web3 & Decentralized Future',
    category: 'Documentary',
    rating: '13+',
    coverImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=60',
    description: 'เจาะลึกเบื้องหลังระบบ Blockchain, Smart Contract และ IPFS ที่จะเปลี่ยนโลกอินเทอร์เน็ต',
    freeVideoUrl:'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0',
    ipfsUrl: 'https://gateway.pinata.cloud/ipfs/bafybeicng45426...',
    is4K: true,
  },
  {
    id: 'anime-fantasy-quest',
    title: 'The Sovereign: Final Journey',
    category: 'Anime / Fantasy',
    rating: 'General',
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=60',
    description: 'การเดินทางของอัศวินรุ่นสุดท้ายเพื่อคืนความสงบสุขให้กับอาณาจักร',
    freeVideoUrl:'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0',
    ipfsUrl: 'https://gateway.pinata.cloud/ipfs/bafybeicng45426...',
    is4K: true,
  },
  {
    id: 'neon-city-lights',
    title: 'Neon Odyssey 2099',
    category: 'Sci-Fi / Action',
    rating: '15+',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=60',
    description: 'เรื่องราวของแฮกเกอร์สายมืดกับการเปิดโปงแผนการร้ายขององค์กรยักษ์ใหญ่',
    freeVideoUrl:'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0',
    ipfsUrl: 'https://gateway.pinata.cloud/ipfs/bafybeicng45426...',
    is4K: true,
  },
  {
    id: 'Minion',
    title: 'Minion',
    category: 'Anime / Sci-Fi',
    rating: '18+',
    coverImage: 'https://qszzyxdqhuzadkdfjwfj.supabase.co/storage/v1/object/public/movie-posters/1782784714786-tb7rwos4j6.webp',
    description: 'การดิ้นรนในเมืองกลางคืนสุดล้ำของเด็กหนุ่มที่ยอมแลกทุกอย่างเพื่อเอาชีวิตรอด',
    freeVideoUrl:'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0',
    ipfsUrl: 'https://gateway.pinata.cloud/ipfs/bafybeicng45426...', // ใส่ IPFS/Video URL 
    is4K: true,
  },
  {
    id: 'Avatar',
    title: 'Avatar',
    category: 'Documentary',
    rating: '13+',
    coverImage: 'https://www.housesamyan.com/assets/uploads/movie/poster_web_path/20251110183824_F25E1FBA-B6C2-4682-8D21-3B2B6A2F0149.jpg',
    description: 'เจาะลึกเบื้องหลังระบบ Blockchain, Smart Contract และ IPFS ที่จะเปลี่ยนโลกอินเทอร์เน็ต',
    freeVideoUrl:'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0',
    ipfsUrl: 'https://gateway.pinata.cloud/ipfs/bafybeicng45426...',
    is4K: true,
  },
  {
    id: 'Wicked for god',
    title: 'Wicked for god',
    category: 'Anime / Fantasy',
    rating: 'General',
    coverImage: 'https://www.housesamyan.com/assets/uploads/movie/poster_web_path/20251104144811_EBD3B405-AC11-49BF-BC5A-5CE35F4CAEFF.jpg',
    description: 'การเดินทางของอัศวินรุ่นสุดท้ายเพื่อคืนความสงบสุขให้กับอาณาจักร',
    freeVideoUrl:'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0',
    ipfsUrl: 'https://gateway.pinata.cloud/ipfs/bafybeicng45426...',
    is4K: true,
  },
  {
    id: 'Moana movie',
    title: 'Moana Movie',
    category: 'Sci-Fi / Action',
    rating: '15+',
    coverImage: 'https://qszzyxdqhuzadkdfjwfj.supabase.co/storage/v1/object/public/movie-posters/1783414032999-bbsy3cwzjra.webp',
    description: 'เรื่องราวของแฮกเกอร์สายมืดกับการเปิดโปงแผนการร้ายขององค์กรยักษ์ใหญ่',
    freeVideoUrl:'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0',
    ipfsUrl: 'https://gateway.pinata.cloud/ipfs/bafybeicng45426...',
    is4K: true,
  },
];