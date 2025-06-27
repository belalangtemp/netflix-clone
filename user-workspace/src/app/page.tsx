'use client';

import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import ContentRow from '@/components/ContentRow';
import { categories } from '@/data/movies';
import Image from 'next/image';

export default function Home() {
  return (
    <Layout>
      <div className="relative">
        {/* Hero Section */}
        <div className="relative w-full h-[70vh] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=1920&h=1080&q=80"
            alt="Hero Background"
            width={1920}
            height={1080}
            className="absolute top-0 left-0 w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 to-transparent" />
          
          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 fade-in">
              Film, acara TV tak terbatas, dan lebih banyak lagi
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 fade-in" style={{ animationDelay: '0.2s' }}>
              Tonton di mana pun. Batalkan kapan pun.
            </p>
            <div className="flex gap-4 fade-in" style={{ animationDelay: '0.4s' }}>
              <Button className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6">
                Mulai Menonton
              </Button>
              <Button variant="outline" className="text-white text-lg px-8 py-6">
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>
        </div>

        {/* Content Rows */}
        <div className="relative z-20 px-4 md:px-16 mt-8 pb-16 space-y-8">
          {categories.map((category) => (
            <ContentRow
              key={category.id}
              title={category.title}
              movies={category.movies}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
