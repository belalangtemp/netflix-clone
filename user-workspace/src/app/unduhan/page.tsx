'use client';

import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { downloadService } from '@/lib/downloadService';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';

interface DownloadedMovie {
  id: number;
  title: string;
  imageUrl: string;
  downloadedAt: string;
  status: string;
}

export default function Downloads() {
  const [downloads, setDownloads] = useState<DownloadedMovie[]>([]);

  useEffect(() => {
    loadDownloads();
  }, []);

  const loadDownloads = async () => {
    try {
      const downloadedMovies = await downloadService.getDownloadedMovies();
      setDownloads(downloadedMovies as DownloadedMovie[]);
    } catch (error) {
      console.error('Error loading downloads:', error);
    }
  };

  const handleRemoveDownload = async (movieId: number) => {
    try {
      await downloadService.removeDownload(movieId);
      setDownloads(downloads.filter(movie => movie.id !== movieId));
    } catch (error) {
      console.error('Error removing download:', error);
    }
  };

  return (
    <Layout>
      <div className="px-4 md:px-16 py-6">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-8">Unduhan Saya</h1>
        
        {downloads.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-gray-400">
              Belum ada konten yang diunduh
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Film dan acara TV yang Anda unduh akan muncul di sini
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {downloads.map((movie) => (
              <div
                key={movie.id}
                className="bg-zinc-800 rounded-lg overflow-hidden group"
              >
                <div className="relative aspect-video">
                  <Image
                    src={movie.imageUrl}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="text-white font-medium mb-2">{movie.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Diunduh pada {new Date(movie.downloadedAt).toLocaleDateString('id-ID')}
                  </p>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full"
                    onClick={() => handleRemoveDownload(movie.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Hapus Unduhan
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
