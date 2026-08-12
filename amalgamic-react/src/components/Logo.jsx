import React from 'react';

export default function Logo({ invert = false, markOnly = false }) {
  return (
    <span className={`logo ${invert ? "logo--invert" : ""} ${markOnly ? "logo--mark-only" : ""}`}>
      <span className="logo-mark" aria-hidden="true" />
      {!markOnly && "Amalgamic"}
    </span>
  );
}
