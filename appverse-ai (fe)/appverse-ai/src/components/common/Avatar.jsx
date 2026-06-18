import React, { useState } from 'react';

export const Avatar = ({ src, name = 'User', size = 'md', className = '' }) => {
  const [error, setError] = useState(false);

  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
    xxl: 'w-24 h-24 text-2xl'
  };

  const getInitials = (fullName) => {
    const parts = fullName.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  return (
    <div className={`rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center font-bold tracking-wider select-none border border-slate-200 dark:border-slate-800 ${sizeClasses[size] || sizeClasses.md} ${className}`}>
      {src && !error ? (
        <img
          src={src}
          alt={name}
          onError={() => setError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center">
          {getInitials(name)}
        </div>
      )}
    </div>
  );
};

export default Avatar;
