import { useState } from 'react';
import { Calendar, ArrowRight, Bell, X, CheckCircle2 } from 'lucide-react';
import { NewsItem } from '../types';
import { useWebsiteContent } from '../context/WebsiteContext';

export default function NewsSection() {
  const { content } = useWebsiteContent();
  const newsList = content.news;
  const [activeNews, setActiveNews] = useState<NewsItem | null>(null);

  return (
    <section id="news" className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-3.5 py-1 rounded-full border border-amber-300/60">
            School Bulletin
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight mt-3">
            News & Announcements
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed font-normal">
            Stay informed with the latest calendar notices, academic schedules, and school event updates.
          </p>
        </div>

        {/* 3 News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsList.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-2xl p-7 border border-slate-200/90 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Category & Date */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200/80">
                    {news.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{news.date}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg sm:text-xl font-bold text-navy-900 tracking-tight group-hover:text-amber-600 transition-colors">
                  {news.title}
                </h3>

                {/* Summary */}
                <p className="text-slate-600 text-sm mt-3 leading-relaxed font-normal">
                  {news.summary}
                </p>
              </div>

              {/* Read Announcement Button */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <button
                  onClick={() => setActiveNews(news)}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-900 hover:text-amber-600 transition-colors focus:outline-none focus-visible:underline"
                >
                  <span>READ NOTICE</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* News Detail Modal */}
      {activeNews && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                {activeNews.category}
              </span>
              <button
                onClick={() => setActiveNews(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-900 tracking-tight mt-4">
              {activeNews.title}
            </h3>

            <div className="flex items-center gap-2 text-xs text-slate-500 mt-2 font-medium">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              <span>{activeNews.date}</span>
              <span>·</span>
              <span>Divine Group of Schools, Okene</span>
            </div>

            <div className="mt-6 text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
              <p>{activeNews.fullContent}</p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                For further inquiries regarding this notice, parents may reach our administration office in Okene during regular school hours.
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveNews(null)}
                className="px-5 py-2.5 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
