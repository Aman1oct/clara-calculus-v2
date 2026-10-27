import React, { useState, useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import { MathTex } from './MathTex';

function factorial(n: number): number {
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

export const TaylorSandbox: React.FC<{ isDark: boolean; katexReady: boolean }> = ({
  isDark,
  katexReady
}) => {
  const [targetFn, setTargetFn] = useState<'sin' | 'cos' | 'exp'>('sin');
  const [numTerms, setNumTerms] = useState<number>(3);
  const [probeX, setProbeX] = useState<number>(2.2);

  // Compute polynomial evaluation and symbolic string
  const { evalPoly, evalExact, formulaLatex, degree } = useMemo(() => {
    if (targetFn === 'sin') {
      const deg = 2 * numTerms - 1;
      const poly = (x: number) => {
        let sum = 0;
        for (let k = 0; k < numTerms; k++) {
          const p = 2 * k + 1;
          const sign = k % 2 === 0 ? 1 : -1;
          sum += sign * (Math.pow(x, p) / factorial(p));
        }
        return sum;
      };
      const termsLatex: string[] = [];
      for (let k = 0; k < numTerms; k++) {
        const p = 2 * k + 1;
        const sign = k === 0 ? '' : k % 2 === 0 ? ' + ' : ' - ';
        if (p === 1) termsLatex.push('x');
        else termsLatex.push(`${sign}\\frac{x^{${p}}}{${p}!}`);
      }
      return {
        evalPoly: poly,
        evalExact: (x: number) => Math.sin(x),
        formulaLatex: `P_{${deg}}(x) = ${termsLatex.join('')}`,
        degree: deg
      };
    } else if (targetFn === 'cos') {
      const deg = 2 * (numTerms - 1);
      const poly = (x: number) => {
        let sum = 0;
        for (let k = 0; k < numTerms; k++) {
          const p = 2 * k;
          const sign = k % 2 === 0 ? 1 : -1;
          sum += sign * (Math.pow(x, p) / factorial(p));
        }
        return sum;
      };
      const termsLatex: string[] = [];
      for (let k = 0; k < numTerms; k++) {
        const p = 2 * k;
        const sign = k === 0 ? '' : k % 2 === 0 ? ' + ' : ' - ';
        if (p === 0) termsLatex.push('1');
        else termsLatex.push(`${sign}\\frac{x^{${p}}}{${p}!}`);
      }
      return {
        evalPoly: poly,
        evalExact: (x: number) => Math.cos(x),
        formulaLatex: `P_{${deg}}(x) = ${termsLatex.join('')}`,
        degree: deg
      };
    } else {
      const deg = numTerms - 1;
      const poly = (x: number) => {
        let sum = 0;
        for (let k = 0; k < numTerms; k++) {
          sum += Math.pow(x, k) / factorial(k);
        }
        return sum;
      };
      const termsLatex: string[] = [];
      for (let k = 0; k < numTerms; k++) {
        if (k === 0) termsLatex.push('1');
        else if (k === 1) termsLatex.push(' + x');
        else termsLatex.push(` + \\frac{x^{${k}}}{${k}!}`);
      }
      return {
        evalPoly: poly,
        evalExact: (x: number) => Math.exp(x),
        formulaLatex: `P_{${deg}}(x) = ${termsLatex.join('')}`,
        degree: deg
      };
    }
  }, [targetFn, numTerms]);

  const width = 640;
  const height = 340;
  const xMin = -6.5;
  const xMax = 6.5;
  const yMin = targetFn === 'exp' ? -1.5 : -2.6;
  const yMax = targetFn === 'exp' ? 5.5 : 2.6;

  const toSvgX = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
  const toSvgY = (y: number) => height - ((y - yMin) / (yMax - yMin)) * height;

  const exactPath = useMemo(() => {
    const pts: string[] = [];
    for (let i = 0; i <= 200; i++) {
      const x = xMin + (i / 200) * (xMax - xMin);
      const y = evalExact(x);
      const clampedY = Math.max(yMin - 2, Math.min(yMax + 2, y));
      pts.push(`${i === 0 ? 'M' : 'L'} ${toSvgX(x).toFixed(1)} ${toSvgY(clampedY).toFixed(1)}`);
    }
    return pts.join(' ');
  }, [evalExact, yMin, yMax]);

  const polyPath = useMemo(() => {
    const pts: string[] = [];
    for (let i = 0; i <= 200; i++) {
      const x = xMin + (i / 200) * (xMax - xMin);
      const y = evalPoly(x);
      const clampedY = Math.max(yMin - 3, Math.min(yMax + 3, y));
      pts.push(`${i === 0 ? 'M' : 'L'} ${toSvgX(x).toFixed(1)} ${toSvgY(clampedY).toFixed(1)}`);
    }
    return pts.join(' ');
  }, [evalPoly, yMin, yMax]);

  const exactVal = evalExact(probeX);
  const polyVal = evalPoly(probeX);
  const absError = Math.abs(exactVal - polyVal);

  return (
    <div className={`rounded-2xl border p-5 transition-all ${
      isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-stone-200 shadow-sm'
    }`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Visual Sandbox 3
          </div>
          <h3 className="text-xl font-serif font-bold">Taylor & Maclaurin Series Approximator</h3>
          <p className={`text-sm mt-0.5 ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
            Add polynomial terms one by one to watch a simple power series wrap tightly around <MathTex tex="\sin(x)" katexReady={katexReady} />, <MathTex tex="\cos(x)" katexReady={katexReady} />, or <MathTex tex="e^x" katexReady={katexReady} />.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {[
            { id: 'sin', label: 'sin(x) (Odd Powers)' },
            { id: 'cos', label: 'cos(x) (Even Powers)' },
            { id: 'exp', label: 'eˣ (All Powers)' }
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTargetFn(t.id as 'sin' | 'cos' | 'exp')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                targetFn === t.id
                  ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                  : isDark
                  ? 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                  : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200/70'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Live Polynomial Expansion Banner */}
      <div className={`mb-4 px-4 py-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
        isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-stone-50 border-stone-200'
      }`}>
        <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">
          Maclaurin Polynomial ({numTerms} {numTerms === 1 ? 'Term' : 'Terms'}, Degree {degree}):
        </div>
        <div className="overflow-x-auto">
          <MathTex tex={formulaLatex} katexReady={katexReady} className="text-sm font-medium" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-8">
          <div className={`rounded-xl overflow-hidden border ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
              {/* Grid */}
              {[-6, -4, -2, 0, 2, 4, 6].map((gx) => (
                <g key={`tgx-${gx}`}>
                  <line
                    x1={toSvgX(gx)}
                    y1={0}
                    x2={toSvgX(gx)}
                    y2={height}
                    stroke={isDark ? (gx === 0 ? '#475569' : '#1e293b') : (gx === 0 ? '#a8a29e' : '#e7e5e4')}
                    strokeWidth={gx === 0 ? 1.8 : 1}
                  />
                  {gx !== 0 && (
                    <text
                      x={toSvgX(gx)}
                      y={toSvgY(0) + 15}
                      textAnchor="middle"
                      fontSize="11"
                      fill={isDark ? '#64748b' : '#78716c'}
                    >
                      {gx}
                    </text>
                  )}
                </g>
              ))}
              {[-2, -1, 0, 1, 2, 3, 4].map((gy) =>
                gy >= yMin && gy <= yMax ? (
                  <g key={`tgy-${gy}`}>
                    <line
                      x1={0}
                      y1={toSvgY(gy)}
                      x2={width}
                      y2={toSvgY(gy)}
                      stroke={isDark ? (gy === 0 ? '#475569' : '#1e293b') : (gy === 0 ? '#a8a29e' : '#e7e5e4')}
                      strokeWidth={gy === 0 ? 1.8 : 1}
                    />
                  </g>
                ) : null
              )}

              {/* True Function Curve */}
              <path
                d={exactPath}
                fill="none"
                stroke={isDark ? '#38bdf8' : '#0284c7'}
                strokeWidth="3.5"
                opacity="0.75"
              />

              {/* Taylor Polynomial Approximation */}
              <path
                d={polyPath}
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2.8"
                strokeDasharray="7 4"
              />

              {/* Center of Expansion x = 0 */}
              <circle
                cx={toSvgX(0)}
                cy={toSvgY(evalExact(0))}
                r="5"
                fill="#10b981"
              />

              {/* Probe Comparison Line */}
              <line
                x1={toSvgX(probeX)}
                y1={toSvgY(exactVal)}
                x2={toSvgX(probeX)}
                y2={toSvgY(Math.max(yMin, Math.min(yMax, polyVal)))}
                stroke="#f59e0b"
                strokeWidth="2"
              />
              <circle cx={toSvgX(probeX)} cy={toSvgY(exactVal)} r="5.5" fill="#38bdf8" />
              <circle
                cx={toSvgX(probeX)}
                cy={toSvgY(Math.max(yMin, Math.min(yMax, polyVal)))}
                r="5.5"
                fill="#f43f5e"
              />
            </svg>
            <div className={`px-4 py-2 text-xs border-t flex flex-wrap items-center justify-between gap-2 ${
              isDark ? 'bg-slate-900/90 border-slate-800 text-slate-400' : 'bg-stone-100/80 border-stone-200 text-stone-600'
            }`}>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-sky-400 inline-block" /> Exact Curve
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-rose-500 inline-block" /> Taylor Polynomial <MathTex tex={`P_{${degree}}(x)`} katexReady={katexReady} />
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Anchor Point (x = 0)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="slider-taylor-terms" className="text-xs font-semibold uppercase tracking-wider opacity-75">
                Polynomial Terms
              </label>
              <span className="font-mono text-sm font-bold text-rose-400">
                {numTerms} {numTerms === 1 ? 'Term' : 'Terms'} (Deg {degree})
              </span>
            </div>
            <input
              id="slider-taylor-terms"
              type="range"
              min="1"
              max="8"
              step="1"
              value={numTerms}
              onChange={(e) => setNumTerms(parseInt(e.target.value, 10))}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <div className="flex justify-between gap-1 mt-2">
              {[1, 2, 3, 4, 6, 8].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setNumTerms(t)}
                  className={`px-2 py-1 rounded text-[11px] font-mono border ${
                    numTerms === t
                      ? 'bg-rose-600 text-white border-rose-500'
                      : isDark
                      ? 'bg-slate-900 border-slate-800 text-slate-400'
                      : 'bg-white border-stone-200 text-stone-600'
                  }`}
                >
                  {t}T
                </button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-500/20">
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="slider-taylor-probe" className="text-xs font-semibold opacity-75">
                  Test Point <MathTex tex="x" katexReady={katexReady} /> Inspector
                </label>
                <span className="font-mono text-xs text-amber-400">x = {probeX.toFixed(2)}</span>
              </div>
              <input
                id="slider-taylor-probe"
                type="range"
                min="-5.0"
                max="5.0"
                step="0.1"
                value={probeX}
                onChange={(e) => setProbeX(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          <div className={`p-4 rounded-xl border space-y-2.5 ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs opacity-75">True Value at x = {probeX.toFixed(1)}:</span>
              <span className="font-mono text-sm font-bold text-sky-400">{exactVal.toFixed(5)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs opacity-75">Taylor Value <MathTex tex={`P_{${degree}}(${probeX.toFixed(1)})`} katexReady={katexReady} />:</span>
              <span className="font-mono text-sm font-bold text-rose-400">{polyVal.toFixed(5)}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-500/20">
              <span className="text-xs opacity-75">Absolute Gap <MathTex tex="|f(x) - P(x)|" katexReady={katexReady} />:</span>
              <span className="font-mono text-xs font-bold text-amber-400">
                {absError < 0.00001 ? '< 0.00001 (Spot On!)' : absError.toFixed(5)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
