import { supabase } from './supabase';

/**
 * Compresses an image file client-side, converts it to WebP format,
 * and scales it down so it is only a few kilobytes (KB).
 */
export async function compressImageToWebP(
  file: File,
  maxWidth: number = 1600,
  maxHeight: number = 1200,
  quality: number = 0.8
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate proportional dimensions
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Canvas context not available'));
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP format with specified quality
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('WebP compression failed'));
            }
          },
          'image/webp',
          quality
        );
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

/**
 * Uploads a compressed WebP file directly to Supabase storage bucket 'media'.
 * Returns the clean, short public CDN URL.
 */
export async function uploadMedia(file: File, folder: string = 'packages'): Promise<string> {
  try {
    // 1. Compress image to WebP (typically 30KB - 90KB)
    const compressedBlob = await compressImageToWebP(file);

    // 2. Generate a clean, unique file path
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const cleanName = file.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase().substring(0, 20);
    const filePath = `${folder}/${timestamp}_${random}_${cleanName}.webp`;

    // 3. Upload binary directly to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, compressedBlob, {
        contentType: 'image/webp',
        cacheControl: '31536000',
        upsert: false,
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      throw uploadError;
    }

    // 4. Retrieve public URL
    const { data: publicUrlData } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error('Upload error in uploadMedia:', err);
    throw err;
  }
}
