import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { googleApiKey, googleBaseUrl } from "../utils";
import { useBookStore } from "../store/bookStore";
import RecommendedBooks from "../components/recommended";

const placeholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect fill='%23333' width='100%25' height='100%25'/%3E%3Ctext fill='%23fff' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20'%3ENo Image%3C/text%3E%3C/svg%3E";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { bookmarks, toggleBookmark } = useBookStore();
  const isBookmarked = bookmarks.some((b) => b.id === book?.id);

  console.log("Book", book);
  console.log("Bokmarks", bookmarks);
  //   console.log("Bokmarks is bookmarked", isBookmarked);

  const handleBookMark = () => {
    toggleBookmark(book);
  };

  useEffect(() => {
    if (!id) return;
    const fetchBookById = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${googleBaseUrl}/volumes/${encodeURIComponent(id)}${
            googleApiKey ? `?key=${googleApiKey}` : ""
          }`
        );
        const data = res.data;
        setBook(data);

        const imageLinks = data?.volumeInfo?.imageLinks || {};
        const imgs = [];
        ["thumbnail", "smallThumbnail"].forEach((k) => {
          if (imageLinks[k]) imgs.push(imageLinks[k]);
        });
        const unique = Array.from(new Set(imgs));
        setImages(unique.length ? unique : [placeholder]);
        setActiveIndex(0);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch book. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookById();
  }, [id]);

  const goPrev = () =>
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setActiveIndex((i) => (i + 1) % images.length);
  const goTo = (idx) => setActiveIndex(idx);

  if (loading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-white">
        Loading book...
      </div>
    );
  if (error)
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-400">
        {error}
      </div>
    );
  if (!book)
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400">
        No book found.
      </div>
    );

  const info = book.volumeInfo || {};
  const {
    title,
    authors = [],
    description,
    averageRating,
    ratingsCount,
    categories = [],
    publishedDate,
    pageCount,
  } = info;

  return (
    <div className="bg-black min-h-[100vh] px-3 md:px-0 py-7">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Image slider */}
          <div className="md:col-span-1">
            <div className="relative bg-gray-900 rounded-lg overflow-hidden">
              <img
                src={images[activeIndex]}
                alt={title}
                className="w-full h-96 md:h-[520px] object-contain bg-black"
              />
              {/* arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    aria-label="previous"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button
                    onClick={goNext}
                    aria-label="next"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                  >
                    <ArrowRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* thumbnails */}
            {images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {images.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => goTo(idx)}
                    className={`flex-shrink-0 border rounded-md overflow-hidden p-0 ${
                      activeIndex === idx ? "ring-2 ring-blue-600" : ""
                    }`}
                  >
                    <img
                      src={src}
                      alt={`thumb-${idx}`}
                      className="w-20 h-28 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="md:col-span-2 flex flex-col">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {title}
                </h1>
                {authors.length > 0 && (
                  <p className="text-gray-300 mt-1">by {authors.join(", ")}</p>
                )}
                <div className="flex items-center gap-3 mt-3">
                  {averageRating ? (
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">{averageRating} / 5</div>
                      <div className="text-sm text-gray-400">
                        ({ratingsCount || 0} ratings)
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-400">No ratings</div>
                  )}

                  {categories.length > 0 && (
                    <div className="text-sm text-gray-400">
                      • {categories.join(", ")}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="text-sm text-gray-400">{publishedDate}</div>
                <div className="text-sm text-gray-400">
                  {pageCount ? `${pageCount} pages` : ""}
                </div>

                {/* wishlist button (optional) */}
                <button
                  onClick={handleBookMark}
                  className="mt-2 bg-blue-700 text-white px-3 py-2 rounded-md flex items-center gap-2"
                >
                  <Heart size={18} fill={isBookmarked ? "white" : "none"} />
                  <span>{isBookmarked ? "Remove" : "Wishlist"}</span>
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6 prose prose-invert max-w-none text-sm md:text-base">
              {/* Google Books descriptions sometimes contain HTML — render safely */}
              {description ? (
                <div
                  dangerouslySetInnerHTML={{ __html: description }}
                  className="text-gray-200 leading-relaxed"
                />
              ) : (
                <p className="text-gray-400">
                  No description available for this book.
                </p>
              )}
            </div>

            {/* Additional info block */}
            <div className="mt-6 text-sm text-gray-300 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="font-medium">Publisher</div>
                <div className="text-gray-400">
                  {info.publisher || "Unknown"}
                </div>
              </div>
              <div>
                <div className="font-medium">Language</div>
                <div className="text-gray-400">{info.language || "—"}</div>
              </div>
              <div>
                <div className="font-medium">ISBNs</div>
                <div className="text-gray-400">
                  {(info.industryIdentifiers || [])
                    .map((iden) => `${iden.type}: ${iden.identifier}`)
                    .join(", ") || "—"}
                </div>
              </div>
              <div>
                <div className="font-medium">Categories</div>
                <div className="text-gray-400">
                  {categories.join(", ") || "—"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RecommendedBooks category={book?.volumeInfo?.categories[0]} />
    </div>
  );
}
