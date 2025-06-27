'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Info, Check } from 'lucide-react';
import { downloadService } from '@/lib/downloadService';
import { useToast } from '@/components/ui/use-toast';

interface MovieCardProps {
  id: number;
  title: string;
  imageUrl: string;
}

const MovieCard = ({ id, title, imageUrl }: MovieCardProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await downloadService.downloadMovie({ id, title, imageUrl });
      setIsDownloaded(true);
      toast({
        title: "Unduhan Berhasil",
        description: `${title} telah berhasil diunduh`,
        duration: 3000,
      });
    } catch (error) {
      console.error('Error downloading:', error);
      toast({
        title: "Gagal Mengunduh",
        description: "Terjadi kesalahan saat mengunduh konten",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card className="relative w-[180px] h-[270px] md:w-[260px] md:h-[390px] overflow-hidden bg-zinc-900 transition-all group">
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          width={800}
          height={450}
          className="absolute top-0 left-0 w-full h-full object-cover transition-all group-hover:opacity-50"
        />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all group-hover:opacity-100">
          <div className="flex gap-2">
            <Button 
              size="icon" 
              variant="secondary"
              className="h-10 w-10 rounded-full bg-white/20 hover:bg-white/30"
              onClick={handleDownload}
              disabled={isDownloading || isDownloaded}
            >
              {isDownloading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : isDownloaded ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <Download className="h-5 w-5" />
              )}
            </Button>
            <Button 
              size="icon" 
              variant="secondary"
              className="h-10 w-10 rounded-full bg-white/20 hover:bg-white/30"
            >
              <Info className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <h3 className="text-sm font-medium text-white line-clamp-1">{title}</h3>
      </div>
    </Card>
  );
};

export default MovieCard;
