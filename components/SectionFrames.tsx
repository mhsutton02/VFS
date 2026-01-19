import React from "react";

type SectionFramesProps = {
  TOP?: React.ReactNode;
  MID?: React.ReactNode;
  FORM?: React.ReactNode;
  BUT: React.ReactNode;
  className?: string;
};

export function SectionFrames({ TOP, MID, FORM, BUT, className = "" }: SectionFramesProps) {
  // If FORM is provided, render it as a single tall frame instead of TOP+MID
  return (
    <div className={`vf-section-frames ${className}`}>
      {FORM ? (
        <div className="vf-frame vf-frame-form">{FORM}</div>
      ) : (
        <>
          <div className="vf-frame vf-frame-top">{TOP}</div>
          <div className="vf-frame vf-frame-mid">{MID}</div>
        </>
      )}
      <div className="vf-frame vf-frame-but">{BUT}</div>
    </div>
  );
}