/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { RESTAURANTS_DATA, Restaurant } from './data/restaurants';
import { Header } from './components/Header';
import { DirectoryView } from './components/DirectoryView';
import { RouletteView } from './components/RouletteView';
import { NeighborhoodMapView } from './components/NeighborhoodMapView';
import { DetailModal } from './components/DetailModal';
import { QuickRouletteModal } from './components/QuickRouletteModal';
import { SubmitModal } from './components/SubmitModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { Footer } from './components/Footer';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'directory' | 'roulette' | 'map'>('directory');
  
  // Persistence with localStorage
  const [restaurants, setRestaurants] = useState<Restaurant[]>(() => {
    try {
      const saved = localStorage.getItem('jungnang_restaurants_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return RESTAURANTS_DATA;
  });

  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('jungnang_bookmarks_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [1, 2]; // initial sample bookmarks
  });

  // Modals state
  const [detailRestaurant, setDetailRestaurant] = useState<Restaurant | null>(null);
  const [quickRouletteOpen, setQuickRouletteOpen] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [bookmarksDrawerOpen, setBookmarksDrawerOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('jungnang_restaurants_v1', JSON.stringify(restaurants));
    } catch {
      // ignore
    }
  }, [restaurants]);

  useEffect(() => {
    try {
      localStorage.setItem('jungnang_bookmarks_v1', JSON.stringify(bookmarkedIds));
    } catch {
      // ignore
    }
  }, [bookmarkedIds]);

  const toggleBookmark = (restaurant: Restaurant) => {
    setBookmarkedIds((prev) => {
      if (prev.includes(restaurant.id)) {
        return prev.filter((id) => id !== restaurant.id);
      } else {
        return [...prev, restaurant.id];
      }
    });
  };

  const isBookmarked = (id: number) => bookmarkedIds.includes(id);

  const handleAddNewRestaurant = (newR: Restaurant) => {
    setRestaurants((prev) => [newR, ...prev]);
  };

  const handleSelectDongFromFooter = (_dong: string) => {
    setCurrentTab('map');
  };

  const bookmarkedRestaurants = restaurants.filter((r) => bookmarkedIds.includes(r.id));

  return (
    <div className="bg-[#fff8f3] text-[#1e1b17] min-h-screen flex flex-col font-sans selection:bg-[#ffd167] selection:text-[#251a00]">
      {/* Fixed Sticky Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSubmit={() => setSubmitModalOpen(true)}
        onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
        bookmarkCount={bookmarkedIds.length}
      />

      {/* Main Content Area */}
      <main className="w-full pt-20 flex-1 flex flex-col">
        {currentTab === 'directory' && (
          <DirectoryView
            restaurants={restaurants}
            onOpenDetail={(r) => setDetailRestaurant(r)}
            onOpenQuickRoulette={() => setQuickRouletteOpen(true)}
            onOpenSubmit={() => setSubmitModalOpen(true)}
            onGoToRoulette={() => {
              setCurrentTab('roulette');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isBookmarked={isBookmarked}
            onToggleBookmark={toggleBookmark}
          />
        )}

        {currentTab === 'roulette' && (
          <RouletteView
            allRestaurants={restaurants}
            onBackToDirectory={() => {
              setCurrentTab('directory');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenDetailById={(id) => {
              const r = restaurants.find((item) => item.id === id);
              if (r) setDetailRestaurant(r);
            }}
            isBookmarked={isBookmarked}
            onToggleBookmark={toggleBookmark}
          />
        )}

        {currentTab === 'map' && (
          <NeighborhoodMapView
            restaurants={restaurants}
            onOpenDetail={(r) => setDetailRestaurant(r)}
            onGoToDirectoryWithDong={(_dong) => {
              setCurrentTab('directory');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onSelectDong={handleSelectDongFromFooter} />

      {/* Modal 1: Restaurant Full Detail Modal */}
      <DetailModal
        restaurant={detailRestaurant}
        onClose={() => setDetailRestaurant(null)}
        isBookmarked={detailRestaurant ? isBookmarked(detailRestaurant.id) : false}
        onToggleBookmark={() => {
          if (detailRestaurant) toggleBookmark(detailRestaurant);
        }}
      />

      {/* Modal 2: Quick Roulette Modal (Image 1 pop-up) */}
      <QuickRouletteModal
        isOpen={quickRouletteOpen}
        onClose={() => setQuickRouletteOpen(false)}
        restaurants={restaurants}
        onOpenDetail={(r) => setDetailRestaurant(r)}
      />

      {/* Modal 3: Submit New Local Gem Form Modal */}
      <SubmitModal
        isOpen={submitModalOpen}
        onClose={() => setSubmitModalOpen(false)}
        onSubmitRestaurant={handleAddNewRestaurant}
      />

      {/* Drawer: Bookmarked Favorites */}
      <BookmarksDrawer
        isOpen={bookmarksDrawerOpen}
        onClose={() => setBookmarksDrawerOpen(false)}
        bookmarks={bookmarkedRestaurants}
        onOpenDetail={(r) => setDetailRestaurant(r)}
        onRemoveBookmark={(id) => setBookmarkedIds((prev) => prev.filter((item) => item !== id))}
      />
    </div>
  );
}
