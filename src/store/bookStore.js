import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useBookStore = create(
  persist(
    (set, get) => ({
      bookmarks: [],

      toggleBookmark: (book) => {
        const current = get().bookmarks;
        const exists = current.some((b) => b.id === book.id);

        if (!exists) {
          const updated = [...current, book];
          set({ bookmarks: updated });
        } else {
          const updated = current.filter((b) => b.id !== book.id);
          set({ bookmarks: updated });
        }
      },
    }),

    {
      name: "bookverse-bookmarks",
      getStorage: createJSONStorage(() => localStorage),
    }
  )
);
