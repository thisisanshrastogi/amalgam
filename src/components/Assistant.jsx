import React, { useEffect, useRef } from 'react';
import { createScope } from 'animejs';
import { fadeUpOnScroll, timelineOnScroll } from '../utils/animations';

export default function Assistant() {
  const root = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    scope.current = createScope({ root: root.current }).add(() => {
      // Left column: text stagger
      fadeUpOnScroll('.asst-text', root.current, { staggerMs: 110, translateY: 24 });
      fadeUpOnScroll('.asst-list-item', root.current, { staggerMs: 100, delay: 350, translateY: 16 });
      fadeUpOnScroll('.asst-note', root.current, { delay: 650, translateY: 12 });

      // Right panel: sequential chat timeline
      timelineOnScroll(root.current, (tl) => {
        tl
          .add('.asst-phone', {
            opacity: [0, 1], translateY: [30, 0], scale: [0.96, 1], duration: 400, ease: 'outExpo',
          }, '+=50')
          // User 1
          .add('.asst-msg-1', {
            opacity: [0, 1], translateY: [15, 0], duration: 250, ease: 'outExpo',
          }, '-=100')
          // AI 1 Thinking
          .add('.asst-thinking-1', {
            opacity: [0, 1], duration: 150, ease: 'outExpo',
          }, '+=100')
          // AI 1 Thinking Out
          .add('.asst-thinking-1', {
            opacity: [1, 0], duration: 150, ease: 'inExpo',
          }, '+=500')
          // AI 1 Responds
          .add('.asst-msg-2', {
            opacity: [0, 1], translateY: [10, 0], duration: 250, ease: 'outExpo',
          }, '-=100')
          
          // User 2
          .add('.asst-msg-3', {
            opacity: [0, 1], translateY: [15, 0], duration: 250, ease: 'outExpo',
          }, '+=300')
          // AI 2 Thinking
          .add('.asst-thinking-2', {
            opacity: [0, 1], duration: 150, ease: 'outExpo',
          }, '+=100')
          // AI 2 Thinking Out
          .add('.asst-thinking-2', {
            opacity: [1, 0], duration: 150, ease: 'inExpo',
          }, '+=600')
          // AI 2 Responds
          .add('.asst-msg-4', {
            opacity: [0, 1], translateY: [10, 0], duration: 250, ease: 'outExpo',
          }, '-=100');
      });
    });
    return () => scope.current.revert();
  }, []);

  return (
    <section ref={root} id="assistant" className="py-32 px-8 bg-paper">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div>

          <h2 className="asst-text opacity-0 font-serif text-5xl leading-tight mb-8 text-ink">
            An assistant that has actually read your statements.
          </h2>
          <p className="asst-text opacity-0 text-muted text-lg leading-relaxed mb-10">
            Ask questions in plain English and get answers powered by your actual transaction data. No guessing, just facts.
          </p>
          <ul className="space-y-6 mb-10 text-[15px] text-muted leading-relaxed">
            <li className="asst-list-item opacity-0 flex gap-4">
              <div className="w-6 h-6 rounded-full bg-ink/10 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-ink"></div>
              </div>
              <div>
                <strong className="text-ink">It reads statements.</strong> Parses PDFs automatically.
              </div>
            </li>
            <li className="asst-list-item opacity-0 flex gap-4">
              <div className="w-6 h-6 rounded-full bg-ink/10 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-ink"></div>
              </div>
              <div>
                <strong className="text-ink">It audits on request.</strong> Deep scans for hidden fees.
              </div>
            </li>
            <li className="asst-list-item opacity-0 flex gap-4">
              <div className="w-6 h-6 rounded-full bg-ink/10 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-ink"></div>
              </div>
              <div>
                <strong className="text-ink">It does the arithmetic.</strong> Payoff timelines and minimum payments.
              </div>
            </li>
          </ul>
          <div className="asst-note opacity-0 bg-ink/5 rounded-3xl border border-ink/10 p-6 text-sm">
            <span className="font-bold text-ink block mb-2">Two Boundaries</span>
            <p className="text-muted leading-relaxed">It only works on your money, and it never guesses when missing data.</p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-10 bg-ink/10 blur-[60px] -z-10 rounded-full"></div>
          <div className="asst-phone opacity-0 bg-ink rounded-[40px] p-8 shadow-2xl h-[600px] flex flex-col w-full max-w-md mx-auto relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-accent rounded-md flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-sm"></div>
                </div>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Amalgamic Assistant</h4>
                <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold mt-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-highlight animate-pulse"></span>
                  Active • Reading Statements
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 text-[15px] mb-20 scrollbar-hide">
              <div className="asst-msg-1 opacity-0 bg-white/10 text-white chat-bubble-user p-4 self-end max-w-[80%] ml-auto rounded-3xl rounded-tr-sm">
                Why is this month's statement higher?
              </div>
              
              <div className="relative max-w-[85%]">
                <div className="asst-thinking-1 opacity-0 absolute top-0 left-0 bg-white/5 text-white/50 p-4 rounded-3xl rounded-tl-sm flex gap-1.5 items-center h-[56px] w-[64px] justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{animationDelay: '0ms'}}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{animationDelay: '150ms'}}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{animationDelay: '300ms'}}></span>
                </div>
                <div className="asst-msg-2 opacity-0 bg-accent text-white chat-bubble-ai p-4 self-start rounded-3xl rounded-tl-sm shadow-lg">
                  Your spending increased by $420, driven by a $200 airline fee (I can dispute this) and a $180 spike in dining.
                </div>
              </div>

              <div className="asst-msg-3 opacity-0 bg-white/10 text-white chat-bubble-user p-4 self-end max-w-[80%] ml-auto mt-4 rounded-3xl rounded-tr-sm">
                If I only pay the minimum, how long until it's clear?
              </div>
              
              <div className="relative max-w-[85%]">
                <div className="asst-thinking-2 opacity-0 absolute top-0 left-0 bg-white/5 text-white/50 p-4 rounded-3xl rounded-tl-sm flex gap-1.5 items-center h-[56px] w-[64px] justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{animationDelay: '0ms'}}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{animationDelay: '150ms'}}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{animationDelay: '300ms'}}></span>
                </div>
                <div className="asst-msg-4 opacity-0 bg-accent text-white chat-bubble-ai p-4 self-start rounded-3xl rounded-tl-sm shadow-lg">
                  It will take 11 years and cost you <strong className="text-surface font-bold underline">$4,120 in interest</strong>.
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/5 border border-white/10 rounded-full px-5 py-3.5 flex items-center justify-between">
                <span className="text-white/40 text-sm italic">Ask anything about your money...</span>
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
