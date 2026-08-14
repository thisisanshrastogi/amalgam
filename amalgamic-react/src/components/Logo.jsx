import React from 'react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 bg-highlight   rounded-md flex items-center justify-center">
        <div className="w-2 h-2 bg-black rounded-sm"></div>
      </div>
      <span className="font-bold text-xl tracking-tight text-brand">Amalgamic</span>
    </div>
  );
}
