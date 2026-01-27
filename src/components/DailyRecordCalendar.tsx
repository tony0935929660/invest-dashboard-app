'use client';

import { DailyRecord } from '@/types/investment';
import { useState } from 'react';

interface DailyRecordCalendarProps {
  records: DailyRecord[];
  onDateSelect?: (date: Date) => void;
}

export default function DailyRecordCalendar({ records, onDateSelect }: DailyRecordCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // 生成當月日期
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];
    
    // 填充月初空白
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // 填充實際日期
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  // 檢查某日是否有紀錄
  const hasRecord = (date: Date | null) => {
    if (!date) return false;
    return records.some(record => 
      record.date.toDateString() === date.toDateString()
    );
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <div className="text-xs">
      {/* 月份導航 */}
      <div className="flex justify-between items-center mb-1.5 px-0.5">
        <button
          onClick={previousMonth}
          className="w-5 h-5 flex items-center justify-center rounded hover:bg-slate-700/50 transition-colors text-slate-400 hover:text-slate-200 text-[10px]"
        >
          ◀
        </button>
        <h4 className="text-[10px] font-semibold text-slate-200">
          {currentMonth.getFullYear()}.{(currentMonth.getMonth() + 1).toString().padStart(2, '0')}
        </h4>
        <button
          onClick={nextMonth}
          className="w-5 h-5 flex items-center justify-center rounded hover:bg-slate-700/50 transition-colors text-slate-400 hover:text-slate-200 text-[10px]"
        >
          ▶
        </button>
      </div>

      {/* 星期標題 */}
      <div className="grid grid-cols-7 gap-0.5 mb-0.5">
        <div className="text-center text-[9px] font-medium text-slate-500 h-4 flex items-center justify-center">日</div>
        <div className="text-center text-[9px] font-medium text-slate-500 h-4 flex items-center justify-center">一</div>
        <div className="text-center text-[9px] font-medium text-slate-500 h-4 flex items-center justify-center">二</div>
        <div className="text-center text-[9px] font-medium text-slate-500 h-4 flex items-center justify-center">三</div>
        <div className="text-center text-[9px] font-medium text-slate-500 h-4 flex items-center justify-center">四</div>
        <div className="text-center text-[9px] font-medium text-slate-500 h-4 flex items-center justify-center">五</div>
        <div className="text-center text-[9px] font-medium text-slate-500 h-4 flex items-center justify-center">六</div>
      </div>

      {/* 日期格子 */}
      <div className="grid grid-cols-7 gap-0.5">
        {days.map((date, index) => {
          return (
            <div
              key={index}
              onClick={() => date && handleDateClick(date)}
              className={`
                h-6 flex items-center justify-center rounded cursor-pointer transition-all text-[10px] font-medium relative
                ${!date ? 'invisible' : ''}
                ${isSelected(date) ? 'bg-indigo-600 text-white' : ''}
                ${!isSelected(date) && isToday(date) ? 'bg-indigo-500/30 text-indigo-200' : ''}
                ${!isSelected(date) && !isToday(date) && hasRecord(date) ? 'bg-slate-700/80 text-slate-200' : ''}
                ${!isSelected(date) && !isToday(date) && !hasRecord(date) ? 'text-slate-400 hover:bg-slate-700/50' : ''}
                ${!isSelected(date) && hasRecord(date) ? 'hover:bg-slate-600' : ''}
              `}
            >
              {date && (
                <>
                  <span>{date.getDate()}</span>
                  {hasRecord(date) && !isSelected(date) && (
                    <div className="absolute bottom-0.5 w-0.5 h-0.5 bg-emerald-400 rounded-full"></div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
