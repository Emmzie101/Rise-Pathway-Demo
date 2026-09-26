import React, { useState } from 'react';

interface RwefLogoProps {
  variant?: 'full' | 'mark' | 'with-rise';
  className?: string;
  theme?: 'dark-on-light' | 'light-on-dark';
  size?: 'sm' | 'md' | 'lg';
}

export const RwefLogo: React.FC<RwefLogoProps> = ({
  variant = 'full',
  className = '',
  theme = 'dark-on-light',
  size = 'md',
}) => {
  const [imgFailed, setImgFailed] = useState(false);
  const isDark = theme === 'light-on-dark';
  const brandGreen = '#0B6B3A';
  const iconColor = isDark ? '#F3C623' : brandGreen;
  const primaryTextColor = isDark ? '#FFFFFF' : brandGreen;
  const secondaryTextColor = isDark ? '#E6F5EC' : brandGreen;

  const heights = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
  };

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base sm:text-lg',
    lg: 'text-xl sm:text-2xl',
  };

  const subtextSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px] sm:text-xs',
    lg: 'text-xs sm:text-sm',
  };

  // If dark-on-light and full logo requested, use the exact logo image asset directly
  if (!isDark && variant !== 'mark' && !imgFailed) {
    return (
      <div className={`inline-flex items-center gap-2 select-none ${className}`}>
        <img
          src="/rwef-logo.png"
          alt="Reboot Wellbeing and Empowerment Foundation"
          referrerPolicy="no-referrer"
          onError={(e) => {
            if (!e.currentTarget.src.includes('images')) {
              e.currentTarget.src = '/images/rwef-logo.png';
            } else {
              setImgFailed(true);
            }
          }}
          className={`${heights[size]} w-auto object-contain shrink-0`}
        />
        {variant === 'with-rise' && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-[#F3C623] text-[#074524] shadow-xs shrink-0">
            RISE
          </span>
        )}
      </div>
    );
  }

  // Exact vector reconstruction matching the official logo graphic with serif typography
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official circular swirl reboot mark */}
      <div className={`relative shrink-0 ${iconSizes[size]} flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          {/* Circular swirl arc */}
          <path
            d="M 52 90 C 26 90 10 72 10 48 C 10 24 30 8 54 8 C 78 8 92 24 92 48 C 92 68 76 80 60 80 C 44 80 36 68 36 54 C 36 44 44 38 52 38 C 58 38 64 42 66 48"
            stroke={iconColor}
            strokeWidth="9.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Arrowhead pointing diagonally northeast (↗) */}
          <path
            d="M 52 32 L 72 44 L 56 58"
            stroke={iconColor}
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {variant !== 'mark' && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-center gap-2">
            <span
              className={`font-bold tracking-tight ${primaryTextColor} ${textSizes[size]}`}
              style={{ fontFamily: "Georgia, 'Times New Roman', Garamond, serif" }}
            >
              Reboot Wellbeing
            </span>
            {variant === 'with-rise' && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-[#F3C623] text-[#074524] shadow-xs">
                RISE
              </span>
            )}
          </div>
          <span
            className={`font-normal tracking-wide ${secondaryTextColor} ${subtextSizes[size]} mt-0.5 opacity-90`}
            style={{ fontFamily: "Georgia, 'Times New Roman', Garamond, serif" }}
          >
            and Empowerment Foundation
          </span>
        </div>
      )}
    </div>
  );
};
