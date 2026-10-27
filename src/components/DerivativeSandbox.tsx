import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Activity, Pause, Play } from 'lucide-react';
import { MathTex } from './MathTex';

const DERIVATIVE_FUNCTIONS = [
  {
    id: 'cubic',
    label: 'f(x) = 0.25x³ - 0.75x',
    latex: 'f(x) = \\frac{1}{4}x^3 - \\frac{3}{4}x',
    derivLatex: 'f\'(x) = \\frac{3}{4}x^2 - \\frac{3}{4}',
    fn: (x: number) => 0.25 * Math.pow(x, 3) - 0.75 * x,
    dfn: (x: number) => 0.75 * Math.pow(x, 2) - 0.75,
    description: 'A smooth cubic wave with a local peak at x = -1 and a local valley at x = +1.'
  },
  {
    id: 'sine',
    label: 'f(x) = 2 sin(x)',
    latex: 'f(x) = 2\\sin(x)',
    derivLatex: 'f\'(x) = 2\\cos(x)',
    fn: (x: number) => 2 * Math.sin(x),
    dfn: (x: number) => 2 * Math.cos(x),
    description: 'A classic harmonic wave whose slope oscillates gently between -2 and +2.'
  },
  {
    id: 'parabola',
    label: 'f(x) = 0.4x² - 1.5',
    latex: 'f(x) = 0.4x^2 - 1.5',
    derivLatex: 'f\'(x) = 0.8x',
    fn: (x: number) => 0.4 * x * x - 1.5,
    dfn: (x: number) => 0.8 * x,
    description: 'A symmetric bowl where the slope grows linearly as you walk from left to right.'
  },
  {
    id: 'exp',
    label: 'f(x) = e^(0.45x) - 1.5',
    latex: 'f(x) = e^{0.45x} - 1.5',
    derivLatex: 'f\'(x) = 0.45e^{0.45x}',
    fn: (x: number) => Math.exp(0.45 * x) - 1.5,
    dfn: (x: number) => 0.45 * Math.exp(0.45 * x),
    description: 'Exponential growth where the slope is always positive and accelerates rapidly.'
  }
];

export const DerivativeSandbox: React.FC<{ isDark: boolean; katexReady: boolean }> = ({
  isDark,
  katexReady
}) => {
  const [funcIdx, setFuncIdx] = useState(0);
  const [x0, setX0] = useState<number>(1.35);
  const [showSecant, setShowSecant] = useState<boolean>(true);
  const [deltaX, setDeltaX] = useState<number>(1.2);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const activeFunc = DERIVATIVE_FUNCTIONS[funcIdx];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setX0((prev) => {
        const next = prev + 0.04;
        return next > 3.2 ? -3.2 : Number(next.toFixed(2));
      });
    }, 40);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Coordinate mapping: x in [-4, 4], y in [-3.5, 3.5] -> SVG 640x360
  const width = 640;
  const height = 360;
  const xMin = -4;
  const xMax = 4;
  const yMin = -3.5;
  const yMax = 3.5;

  const toSvgX = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
  const toSvgY = (y: number) => height - ((y - yMin) / (yMax - yMin)) * height;
  const fromSvgX = (px: number) => xMin + (px / width) * (xMax - xMin);

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * width;
    const clampedX = Math.max(-3.4, Math.min(3.4, fromSvgX(relX)));
    setX0(Number(clampedX.toFixed(2)));
  };

  const y0 = activeFunc.fn(x0);
  const slope = activeFunc.dfn(x0);
  const angleDeg = (Math.atan(slope) * 180) / Math.PI;

  // Secant point
  const x1 = x0 + deltaX;
  const y1 = activeFunc.fn(x1);
  const secantSlope = Math.abs(deltaX) > 0.001 ? (y1 - y0) / deltaX : slope;

  // Curve path
  const curvePath = useMemo(() => {
    const pts: string[] = [];
    for (let i = 0; i <= 160; i++) {
      const x = xMin + (i / 160) * (xMax - xMin);
      const y = activeFunc.fn(x);
      pts.push(`${i === 0 ? 'M' : 'L'} ${toSvgX(x).toFixed(1)} ${toSvgY(y).toFixed(1)}`);
    }
    return pts.join(' ');
  }, [funcIdx]);

  // Tangent line endpoints across [-4, 4]
  const tanXStart = -4;
  const tanYStart = y0 + slope * (tanXStart - x0);
  const tanXEnd = 4;
  const tanYEnd = y0 + slope * (tanXEnd - x0);

  // Secant line endpoints
  const secYStart = y0 + secantSlope * (tanXStart - x0);
  const secYEnd = y0 + secantSlope * (tanXEnd - x0);

  const slopeState =
    Math.abs(slope) < 0.08
      ? { label: 'Stationary (Flat Peak/Valley)', color: 'text-amber-500 bg-amber-500/10 border-amber-500/30' }
      : slope > 0
      ? { label: 'Increasing (Climbing Uphill)', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30' }
      : { label: 'Decreasing (Going Downhill)', color: 'text-rose-500 bg-rose-500/10 border-rose-500/30' };

  const intercept = y0 - slope * x0;
  const interceptStr = intercept >= 0 ? `+ ${intercept.toFixed(2)}` : `- ${Math.abs(intercept).toFixed(2)}`;

  return (
    <div className={`rounded-2xl border p-5 transition-all ${
      isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-stone-200 shadow-sm'
    }`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-500 mb-2">
            <Activity className="w-3.5 h-3.5" /> Interactive Visual Sandbox 1
          </div>
          <h3 className="text-xl font-serif font-bold">Derivative & Tangent Line Explorer</h3>
          <p className={`text-sm mt-0.5 ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
            Drag the point directly on the curve or slide <MathTex tex="x_0" katexReady={katexReady} /> to watch how the tangent line’s steepness measures instantaneous speed.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {DERIVATIVE_FUNCTIONS.map((f, idx) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFuncIdx(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                funcIdx === idx
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                  : isDark
                  ? 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                  : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200/70'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* SVG Interactive Graph */}
        <div className="lg:col-span-8">
          <div className={`relative rounded-xl overflow-hidden border select-none ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <svg
              ref={svgRef}
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-auto cursor-ew-resize touch-none"
              onPointerDown={(e) => {
                setIsDragging(true);
                const rect = e.currentTarget.getBoundingClientRect();
                const relX = ((e.clientX - rect.left) / rect.width) * width;
                const clampedX = Math.max(-3.4, Math.min(3.4, fromSvgX(relX)));
                setX0(Number(clampedX.toFixed(2)));
              }}
              onPointerMove={handlePointerMove}
              onPointerUp={() => setIsDragging(false)}
              onPointerLeave={() => setIsDragging(false)}
            >
              {/* Grid lines */}
              {[-3, -2, -1, 0, 1, 2, 3].map((gx) => (
                <g key={`gx-${gx}`}>
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
                      y={toSvgY(0) + 16}
                      textAnchor="middle"
                      fontSize="11"
                      fill={isDark ? '#64748b' : '#78716c'}
                    >
                      {gx}
                    </text>
                  )}
                </g>
              ))}
              {[-3, -2, -1, 0, 1, 2, 3].map((gy) => (
                <g key={`gy-${gy}`}>
                  <line
                    x1={0}
                    y1={toSvgY(gy)}
                    x2={width}
                    y2={toSvgY(gy)}
                    stroke={isDark ? (gy === 0 ? '#475569' : '#1e293b') : (gy === 0 ? '#a8a29e' : '#e7e5e4')}
                    strokeWidth={gy === 0 ? 1.8 : 1}
                  />
                  {gy !== 0 && (
                    <text
                      x={toSvgX(0) - 10}
                      y={toSvgY(gy) + 4}
                      textAnchor="end"
                      fontSize="11"
                      fill={isDark ? '#64748b' : '#78716c'}
                    >
                      {gy}
                    </text>
                  )}
                </g>
              ))}

              {/* Main Function Curve */}
              <path
                d={curvePath}
                fill="none"
                stroke={isDark ? '#38bdf8' : '#0284c7'}
                strokeWidth="3.2"
                strokeLinecap="round"
              />

              {/* Optional Secant Line & Rise/Run Triangle */}
              {showSecant && (
                <g>
                  <line
                    x1={toSvgX(tanXStart)}
                    y1={toSvgY(secYStart)}
                    x2={toSvgX(tanXEnd)}
                    y2={toSvgY(secYEnd)}
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    opacity="0.85"
                  />
                  {/* Delta x and Delta y right triangle */}
                  <line
                    x1={toSvgX(x0)}
                    y1={toSvgY(y0)}
                    x2={toSvgX(x1)}
                    y2={toSvgY(y0)}
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <line
                    x1={toSvgX(x1)}
                    y1={toSvgY(y0)}
                    x2={toSvgX(x1)}
                    y2={toSvgY(y1)}
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <circle
                    cx={toSvgX(x1)}
                    cy={toSvgY(y1)}
                    r="5.5"
                    fill="#f59e0b"
                    stroke={isDark ? '#0f172a' : '#ffffff'}
                    strokeWidth="2"
                  />
                </g>
              )}

              {/* Exact Tangent Line */}
              <line
                x1={toSvgX(tanXStart)}
                y1={toSvgY(tanYStart)}
                x2={toSvgX(tanXEnd)}
                y2={toSvgY(tanYEnd)}
                stroke="#10b981"
                strokeWidth="2.8"
              />

              {/* Vertical guide from x-axis to point */}
              <line
                x1={toSvgX(x0)}
                y1={toSvgY(0)}
                x2={toSvgX(x0)}
                y2={toSvgY(y0)}
                stroke="#10b981"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.7"
              />

              {/* Active Point (x0, y0) */}
              <circle
                cx={toSvgX(x0)}
                cy={toSvgY(y0)}
                r="8"
                fill="#10b981"
                stroke={isDark ? '#0f172a' : '#ffffff'}
                strokeWidth="2.5"
              />
              <text
                x={toSvgX(x0) + 12}
                y={toSvgY(y0) - 12}
                fontSize="12"
                fontWeight="700"
                fill="#10b981"
              >
                ({x0.toFixed(2)}, {y0.toFixed(2)}) | m = {slope.toFixed(2)}
              </text>
            </svg>

            <div className={`px-4 py-2.5 text-xs border-t flex flex-wrap items-center justify-between gap-2 ${
              isDark ? 'bg-slate-900/90 border-slate-800 text-slate-400' : 'bg-stone-100/80 border-stone-200 text-stone-600'
            }`}>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-sky-500 inline-block" /> Function <MathTex tex="f(x)" katexReady={katexReady} />
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-emerald-500 inline-block" /> Tangent Line (Slope <MathTex tex="f'(x_0)" katexReady={katexReady} />)
                </span>
                {showSecant && (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-amber-500 inline-block" /> Secant Line (<MathTex tex={`\\Delta x = ${deltaX.toFixed(2)}`} katexReady={katexReady} />)
                  </span>
                )}
              </div>
              <span className="font-medium">Tip: Click or drag anywhere on the graph!</span>
            </div>
          </div>
        </div>

        {/* Controls & Live Telemetry Panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="slider-deriv-x0" className="text-xs font-semibold uppercase tracking-wider opacity-75">
                Position <MathTex tex="x_0" katexReady={katexReady} /> Slider
              </label>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-emerald-500">x₀ = {x0.toFixed(2)}</span>
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 ${
                    isPlaying
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                      : isDark
                      ? 'bg-slate-800 border-slate-700 text-slate-300'
                      : 'bg-white border-stone-300 text-stone-700'
                  }`}
                  title={isPlaying ? 'Pause animation' : 'Animate point along curve'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {isPlaying ? 'Pause' : 'Sweep'}
                </button>
              </div>
            </div>
            <input
              id="slider-deriv-x0"
              type="range"
              min="-3.2"
              max="3.2"
              step="0.01"
              value={x0}
              onChange={(e) => setX0(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] opacity-60 mt-1">
              <span>-3.2</span>
              <button
                type="button"
                onClick={() => setX0(-1)}
                className="underline hover:text-emerald-500"
              >
                x = -1
              </button>
              <button
                type="button"
                onClick={() => setX0(0)}
                className="underline hover:text-emerald-500"
              >
                x = 0
              </button>
              <button
                type="button"
                onClick={() => setX0(1)}
                className="underline hover:text-emerald-500"
              >
                x = +1
              </button>
              <span>+3.2</span>
            </div>

            {/* Secant Gap Slider */}
            <div className="mt-4 pt-3 border-t border-slate-500/20">
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="slider-deriv-dx" className="text-xs font-semibold flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showSecant}
                    onChange={(e) => setShowSecant(e.target.checked)}
                    className="rounded accent-amber-500"
                  />
                  Show Secant Gap <MathTex tex="\Delta x \to 0" katexReady={katexReady} />
                </label>
                <span className="font-mono text-xs text-amber-500">Δx = {deltaX.toFixed(2)}</span>
              </div>
              {showSecant && (
                <>
                  <input
                    id="slider-deriv-dx"
                    type="range"
                    min="0.02"
                    max="2.0"
                    step="0.02"
                    value={deltaX}
                    onChange={(e) => setDeltaX(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <p className="text-[11px] opacity-75 mt-1">
                    Slide <MathTex tex="\Delta x" katexReady={katexReady} /> toward 0.02 to watch the dashed orange secant line melt into the solid green tangent line!
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Live Readout Cards */}
          <div className={`p-4 rounded-xl border space-y-3 ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs opacity-75">Instantaneous Slope <MathTex tex="f'(x_0)" katexReady={katexReady} />:</span>
              <span className="font-mono text-lg font-bold text-emerald-500">{slope.toFixed(3)}</span>
            </div>
            {showSecant && (
              <div className="flex items-center justify-between">
                <span className="text-xs opacity-75">Secant Slope <MathTex tex="\Delta y / \Delta x" katexReady={katexReady} />:</span>
                <span className="font-mono text-sm font-semibold text-amber-500">{secantSlope.toFixed(3)}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-xs opacity-75">Tangent Angle <MathTex tex="\theta" katexReady={katexReady} />:</span>
              <span className="font-mono text-sm">{angleDeg.toFixed(1)}°</span>
            </div>
            <div className={`px-3 py-1.5 rounded-lg border text-xs font-medium text-center ${slopeState.color}`}>
              {slopeState.label}
            </div>
            <div className="pt-2 border-t border-slate-500/20 text-xs space-y-1">
              <div className="opacity-70">Live Tangent Line Equation:</div>
              <div className="font-mono text-sm font-semibold">
                y = {slope.toFixed(2)}x {interceptStr}
              </div>
              <div className="opacity-70 pt-1">Symbolic Derivative Rule:</div>
              <MathTex tex={activeFunc.derivLatex} katexReady={katexReady} className="text-sm text-sky-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
