import React, { useRef } from 'react';
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';

const MARATHI_MONTHS = [
  'जानेवारी', 'फेब्रुवारी', 'मार्च', 'एप्रिल', 'मे', 'जून',
  'जुलै', 'ऑगस्ट', 'सप्टेंबर', 'ऑक्टोबर', 'नोव्हेंबर', 'डिसेंबर'
];

export const formatCalendarDateToMarathi = (isoDate: string): string => {
  if (!isoDate) return '';
  const parts = isoDate.split('-');
  if (parts.length === 3) {
    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    if (!isNaN(monthIndex) && monthIndex >= 0 && monthIndex < 12) {
      return `${day} ${MARATHI_MONTHS[monthIndex]} ${year}`;
    }
  }
  return isoDate;
};

export const formatTimePickerToMarathi = (timeStr: string): string => {
  if (!timeStr) return '';
  const parts = timeStr.split(':');
  if (parts.length >= 2) {
    let hours = parseInt(parts[0], 10);
    const mins = parts[1];
    let period = 'सकाळी';
    if (hours === 0) {
      hours = 12;
      period = 'मध्यरात्री';
    } else if (hours === 12) {
      period = 'दुपारी';
    } else if (hours > 12 && hours < 17) {
      hours -= 12;
      period = 'दुपारी';
    } else if (hours >= 17 && hours < 21) {
      hours -= 12;
      period = 'सायंकाळी';
    } else if (hours >= 21) {
      hours -= 12;
      period = 'रात्री';
    }
    return `${period} ${hours}:${mins}`;
  }
  return timeStr;
};

export const MANDAL_LOCATIONS = [
  'श्री धुंडिविनायक मानाचा गणपती मंदिर, ब्राह्मणशाही, वाई',
  'मुख्य उत्सव मंडप, ब्राह्मणशाही, वाई',
  'कृष्णा नदी घाट परिसर, वाई',
  'धर्मादाय सभागृह, ब्राह्मणशाही, वाई',
  'महागणपती मंदिर परिसर, वाई',
];

export const MANDAL_QUICK_TIMES = [
  'सकाळी ६:३० (काकड आरती)',
  'सकाळी ९:०० (दैनिक पूजा व दर्शन)',
  'दुपारी १२:३० (महाप्रसाद)',
  'सायं. ७:३० (महाआरती)',
  'रात्री ९:०० (सांस्कृतिक कार्यक्रम)',
];

interface CalendarDateFieldProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  placeholder?: string;
}

export function CalendarDateField({
  label = 'तारीख',
  value,
  onChange,
  required = false,
  placeholder = 'कॅलेंडरमधून तारीख निवडा',
}: CalendarDateFieldProps) {
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val) {
      onChange(formatCalendarDateToMarathi(val));
    }
  };

  const handleQuickDate = (offsetDays: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const iso = d.toISOString().split('T')[0];
    onChange(formatCalendarDateToMarathi(iso));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="block text-sm font-devanagari-sans text-dark-maroon/70 font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex items-center gap-1.5 text-[11px] text-saffron font-devanagari-sans">
          <button
            type="button"
            onClick={() => handleQuickDate(0)}
            className="hover:underline hover:text-deep-red transition-colors"
          >
            आज
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => handleQuickDate(1)}
            className="hover:underline hover:text-deep-red transition-colors"
          >
            उद्या
          </button>
        </div>
      </div>

      <div className="relative flex items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          className="w-full pl-3 pr-10 py-2 rounded-lg border border-golden/30 bg-white/50 text-dark-maroon text-sm focus:outline-none focus:border-saffron font-devanagari-sans"
        />

        {/* Calendar Picker Trigger */}
        <button
          type="button"
          onClick={() => dateInputRef.current?.showPicker ? dateInputRef.current.showPicker() : dateInputRef.current?.focus()}
          title="कॅलेंडर उघडा"
          className="absolute right-2 p-1.5 rounded-md hover:bg-golden/20 text-golden hover:text-deep-red transition-colors"
        >
          <Calendar className="w-4 h-4" />
        </button>

        {/* Hidden Native Date Input for Calendar Popup */}
        <input
          ref={dateInputRef}
          type="date"
          onChange={handleDateChange}
          tabIndex={-1}
          className="sr-only"
        />
      </div>
    </div>
  );
}

interface TimePickerFieldProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  placeholder?: string;
}

export function TimePickerField({
  label = 'वेळ',
  value,
  onChange,
  required = false,
  placeholder = 'वेळ निवडा किंवा लिहा',
}: TimePickerFieldProps) {
  const timeInputRef = useRef<HTMLInputElement>(null);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val) {
      onChange(formatTimePickerToMarathi(val));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="block text-sm font-devanagari-sans text-dark-maroon/70 font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      </div>

      <div className="relative flex items-center mb-1.5">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          className="w-full pl-3 pr-10 py-2 rounded-lg border border-golden/30 bg-white/50 text-dark-maroon text-sm focus:outline-none focus:border-saffron font-devanagari-sans"
        />

        {/* Time Picker Trigger */}
        <button
          type="button"
          onClick={() => timeInputRef.current?.showPicker ? timeInputRef.current.showPicker() : timeInputRef.current?.focus()}
          title="घड्याळ / वेळ निवडा"
          className="absolute right-2 p-1.5 rounded-md hover:bg-golden/20 text-golden hover:text-deep-red transition-colors"
        >
          <Clock className="w-4 h-4" />
        </button>

        {/* Hidden Native Time Input */}
        <input
          ref={timeInputRef}
          type="time"
          onChange={handleTimeChange}
          tabIndex={-1}
          className="sr-only"
        />
      </div>

      {/* Quick Time Suggestions */}
      <div className="flex flex-wrap gap-1">
        {MANDAL_QUICK_TIMES.slice(0, 4).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onChange(t)}
            className="text-[10px] px-2 py-0.5 rounded bg-golden/10 hover:bg-golden/25 text-dark-maroon/80 border border-golden/20 transition-colors"
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

interface LocationFieldProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export function LocationField({
  label = 'ठिकाण / पत्ता',
  value,
  onChange,
  placeholder = 'पत्ता लिहा किंवा खालील पर्यायांवर क्लिक करा',
}: LocationFieldProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="block text-sm font-devanagari-sans text-dark-maroon/70 font-medium">
          {label}
        </label>
        <span className="text-[11px] text-dark-maroon/50 font-devanagari-sans flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-golden" />
          मंडळ पत्ते पर्याय
        </span>
      </div>

      <div className="relative mb-2">
        <input
          type="text"
          list="mandal-locations-list"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-8 pr-3 py-2 rounded-lg border border-golden/30 bg-white/50 text-dark-maroon text-sm focus:outline-none focus:border-saffron font-devanagari-sans"
        />
        <MapPin className="w-4 h-4 text-golden absolute left-2.5 top-2.5 pointer-events-none" />
        <datalist id="mandal-locations-list">
          {MANDAL_LOCATIONS.map((loc) => (
            <option key={loc} value={loc} />
          ))}
        </datalist>
      </div>

      {/* Quick Clickable Suggestions */}
      <div className="space-y-1">
        <p className="text-[11px] text-dark-maroon/50 font-devanagari-sans">जलद निवडीसाठी क्लिक करा:</p>
        <div className="flex flex-wrap gap-1.5">
          {MANDAL_LOCATIONS.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => onChange(loc)}
              className={`text-[11px] text-left px-2.5 py-1 rounded-md border transition-all ${
                value === loc
                  ? 'bg-deep-red text-cream border-deep-red font-medium shadow-sm'
                  : 'bg-white/60 hover:bg-golden/15 border-golden/25 text-dark-maroon/80 hover:text-deep-red'
              }`}
            >
              📍 {loc}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
