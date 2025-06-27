class DownloadService {
  private dbName = 'netflixCloneDB';
  private dbVersion = 1;
  private storeName = 'downloads';

  async initDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => reject(request.error);
      
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'id' });
        }
      };
    });
  }

  async downloadMovie(movie: { id: number; title: string; imageUrl: string }) {
    try {
      const db = await this.initDB();
      const transaction = db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);

      // Simulate downloading by adding metadata
      const downloadedMovie = {
        ...movie,
        downloadedAt: new Date().toISOString(),
        status: 'completed',
      };

      return new Promise((resolve, reject) => {
        const request = store.put(downloadedMovie);
        
        request.onsuccess = () => {
          resolve(downloadedMovie);
          // Notify user of successful download
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Unduhan Selesai', {
              body: `${movie.title} telah berhasil diunduh`,
            });
          }
        };
        
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error downloading movie:', error);
      throw error;
    }
  }

  async getDownloadedMovies() {
    try {
      const db = await this.initDB();
      const transaction = db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);

      return new Promise((resolve, reject) => {
        const request = store.getAll();
        
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error getting downloaded movies:', error);
      throw error;
    }
  }

  async removeDownload(movieId: number) {
    try {
      const db = await this.initDB();
      const transaction = db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);

      return new Promise((resolve, reject) => {
        const request = store.delete(movieId);
        
        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error removing download:', error);
      throw error;
    }
  }
}

export const downloadService = new DownloadService();
