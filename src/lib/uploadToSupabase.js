import { supabase } from './supabaseClient';
import imageCompression from 'browser-image-compression';

export async function uploadToSupabase(file) {
  // 1) Compress (optional but recommended)
  const compressed = await imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1000,
    useWebWorker: true,
  });

  // 2) Unique path
  const ext = compressed.name.split('.').pop() || 'jpg';
  const path = `lostfound/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

  // 3) Upload to bucket
  const { error: uploadError } = await supabase.storage
    .from('lostfound')          // 👈 bucket name
    .upload(path, compressed, { upsert: false, contentType: compressed.type });

  if (uploadError) throw uploadError;

  // 4) Get public URL (for PUBLIC bucket)
  const { data } = supabase.storage.from('lostfound').getPublicUrl(path);
  return data.publicUrl;        // ← ye URL Firestore me save karna hai
}
