'use client';

import { useState } from 'react';
import { mockWeeklyReviews } from '@/lib/investmentMockData';

export default function WeeklyReviewPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center py-10">
      <div className="w-full max-w-2xl bg-slate-800/50 backdrop-blur rounded-lg shadow-lg p-6 border border-slate-700/50">
        <h1 className="text-lg font-bold text-white mb-4">每週回顧</h1>
        <div className="space-y-3">
          {mockWeeklyReviews.map((review, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={review.id} className="bg-slate-700/50 rounded-lg border border-slate-600/50 shadow p-3">
                <button
                  className="w-full flex items-center justify-between focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-200">
                      {review.weekStart.toLocaleDateString()} ~ {review.weekEnd.toLocaleDateString()}
                    </span>
                  </div>
                  <span className={`ml-2 text-xs text-slate-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}>▶</span>
                </button>
                {isOpen && (
                  <div className="mt-3 border-t border-slate-600 pt-3">
                    <section className="mb-2">
                      <h2 className="text-xs font-semibold text-indigo-300 mb-1">本週做得好的決策</h2>
                      <ul className="list-disc pl-5 text-slate-200 text-xs space-y-0.5">
                        {review.goodDecisions.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </section>
                    <section className="mb-2">
                      <h2 className="text-xs font-semibold text-rose-300 mb-1">本週失誤</h2>
                      <ul className="list-disc pl-5 text-slate-200 text-xs space-y-0.5">
                        {review.mistakes.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </section>
                    <section className="mb-2">
                      <h2 className="text-xs font-semibold text-amber-300 mb-1">本週學到的教訓</h2>
                      <ul className="list-disc pl-5 text-slate-200 text-xs space-y-0.5">
                        {review.lessonsLearned.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </section>
                    <section>
                      <h2 className="text-xs font-semibold text-emerald-300 mb-1">下週重點</h2>
                      <ul className="list-disc pl-5 text-slate-200 text-xs space-y-0.5">
                        {review.nextWeekFocus.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </section>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
