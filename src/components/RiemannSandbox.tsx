import React, { useState, useMemo } from 'react';
import { Layers } from 'lucide-react';
import { MathTex } from './MathTex';

type RiemannMethod = 'left' | 'right' | 'midpoint' | 'trapezoid';

const RIEMANN_FUNCTIONS = [
  {
    id: 'quad',
    label: 'f(x) = -0.25x² + x + 2',
    latex: '\\int_{0}^{4} (-0.25x^2 + x + 2)\\,dx',
    a: 0,
    b: 4,
    fn: (x: number) => -0.25 * x * x + x + 2,
    exactArea: 28 / 3 // 9.3333...
  },
  {
    id: 'sine-arch',
    label: 'f(x) = 3 sin(0.75x)',
    latex: '\\int_{0}^{4} 3\\sin(0.75x)\\,dx',
    a: 0,
    b: 4,
    fn: (x: number) => 3 * Math.sin(0.75 * x),
    exactArea: 4 * (1 - Math.cos(3)) // ~ 7.95997
  },
  {
    id: 'cubic-rise',
    label: 'f(x) = 0.15x³ + 0.5',
    latex: '\\int_{0}^{4} (0.15x^3 + 0.5)\\,dx',
    a: 0,
    b: 4,
    fn: (x: number) => 0.15 * Math.pow(x, 3) + 0.5,
    exactArea: 0.15 * 64 + 2 // 11.6
  }
];

export const RiemannSandbox: React.FC<{ isDark: boolean; katexReady: boolean }> = ({
  isDark,
  katexReady
}) => {
  const [funcIdx, setFuncIdx] = useState(0);
  const [nRects, setNRects] = useState<number>(8);
  const [method, setMethod] = useState<RiemannMethod>('midpoint');

  const activeFunc = RIEMANN_FUNCTIONS[funcIdx];
  const { a, b, fn, exactArea } = activeFunc;
  const dx = (b - a) / nRects;

  // Compute rectangles and sum
  const { rects, approxArea } = useMemo(() => {
    const list: { xLeft: number; xRight: number; yLeft: number; yRight: number; height: number; sampleX: number }[] = [];
    let sum = 0;
    for (let i = 0; i < nRects; i++) {
      const xLeft = a + i * dx;
      const xRight = xLeft + dx;
      const yLeft = fn(xLeft);
      const yRight = fn(xRight);
      let sampleX = xLeft;
      let h = yLeft;
      if (method === 'right') {
        sampleX = xRight;
        h = yRight;
      } else if (method === 'midpoint') {
        sampleX = (xLeft + xRight) / 2;
        h = fn(sampleX);
      } else if (method === 'trapezoid') {
        sampleX = (xLeft + xRight) / 2;
        h = (yLeft + yRight) / 2;
      }
      sum += h * dx;
      list.push({ xLeft, xRight, yLeft, yRight, height: h, sampleX });
    }
    return { rects: list, approxArea: sum };
  }, [funcIdx, nRects, method]);

  const errorPct = Math.abs(((approxArea - exactArea) / exactArea) * 100);

  // SVG coordinates: x in [-0.4, 4.4], y in [-0.5, 4.2]
  const width = 640;
  const height = 350;
  const xMin = -0.4;
  const xMax = 4.4;
  const yMin = -0.5;
  const yMax = 4.2;

  const toSvgX = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
  const toSvgY = (y: number) => height - ((y - yMin) / (yMax - yMin)) * height;

  const curvePath = useMemo(() => {
    const pts: string[] = [];
    for (let i = 0; i <= 150; i++) {
      const x = -0.2 + (i / 150) * 4.4;
      const y = fn(x);
      pts.push(`${i === 0 ? 'M' : 'L'} ${toSvgX(x).toFixed(1)} ${toSvgY(y).toFixed(1)}`);
    }
    return pts.join(' ');
  }, [funcIdx]);

  const exactFillPath = useMemo(() => {
    const pts: string[] = [`M ${toSvgX(a).toFixed(1)} ${toSvgY(0).toFixed(1)}`];
    for (let i = 0; i <= 120; i++) {
      const x = a + (i / 120) * (b - a);
      pts.push(`L ${toSvgX(x).toFixed(1)} ${toSvgY(fn(x)).toFixed(1)}`);
    }
    pts.push(`L ${toSvgX(b).toFixed(1)} ${toSvgY(0).toFixed(1)} Z`);
    return pts.join(' ');
  }, [funcIdx]);

  return (
    <div className={`rounded-2xl border p-5 transition-all ${
      isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-stone-200 shadow-sm'
    }`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-500/15 text-violet-400 mb-2">
            <Layers className="w-3.5 h-3.5" /> Interactive Visual Sandbox 2
          </div>
          <h3 className="text-xl font-serif font-bold">Riemann Sum Integrator (<MathTex tex="n = 2 \text{ to } 100" katexReady={katexReady} />)</h3>
          <p className={`text-sm mt-0.5 ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
            Slide <MathTex tex="n" katexReady={katexReady} /> from 2 blocky rectangles up to 100 paper-thin slices to visually prove how Riemann sums become exact area.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {RIEMANN_FUNCTIONS.map((f, idx) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFuncIdx(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                funcIdx === idx
                  ? 'bg-violet-600 text-white border-violet-500 shadow-sm'
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
        <div className="lg:col-span-8">
          <div className={`rounded-xl overflow-hidden border ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
              {/* Subtle exact area shadow */}
              <path
                d={exactFillPath}
                fill={isDark ? 'rgba(139, 92, 246, 0.10)' : 'rgba(139, 92, 246, 0.08)'}
              />

              {/* Axes & Grid */}
              {[0, 1, 2, 3, 4].map((gx) => (
                <g key={`rgx-${gx}`}>
                  <line
                    x1={toSvgX(gx)}
                    y1={0}
                    x2={toSvgX(gx)}
                    y2={height}
                    stroke={isDark ? (gx === 0 ? '#475569' : '#1e293b') : (gx === 0 ? '#a8a29e' : '#e7e5e4')}
                    strokeWidth={gx === 0 ? 1.8 : 1}
                  />
                  <text
                    x={toSvgX(gx)}
                    y={toSvgY(0) + 18}
                    textAnchor="middle"
                    fontSize="11"
                    fill={isDark ? '#94a3b8' : '#57534e'}
                  >
                    x = {gx}
                  </text>
                </g>
              ))}
              {[0, 1, 2, 3, 4].map((gy) => (
                <g key={`rgy-${gy}`}>
                  <line
                    x1={0}
                    y1={toSvgY(gy)}
                    x2={width}
                    y2={toSvgY(gy)}
                    stroke={isDark ? (gy === 0 ? '#475569' : '#1e293b') : (gy === 0 ? '#a8a29e' : '#e7e5e4')}
                    strokeWidth={gy === 0 ? 1.8 : 1}
                  />
                  {gy > 0 && (
                    <text
                      x={toSvgX(0) - 8}
                      y={toSvgY(gy) + 4}
                      textAnchor="end"
                      fontSize="11"
                      fill={isDark ? '#94a3b8' : '#57534e'}
                    >
                      {gy}
                    </text>
                  )}
                </g>
              ))}

              {/* Riemann Rectangles or Trapezoids */}
              {rects.map((r, i) => {
                const x1 = toSvgX(r.xLeft);
                const x2 = toSvgX(r.xRight);
                const yBase = toSvgY(0);
                if (method === 'trapezoid') {
                  const pts = `${x1.toFixed(1)},${yBase.toFixed(1)} ${x1.toFixed(1)},${toSvgY(r.yLeft).toFixed(1)} ${x2.toFixed(1)},${toSvgY(r.yRight).toFixed(1)} ${x2.toFixed(1)},${yBase.toFixed(1)}`;
                  return (
                    <polygon
                      key={i}
                      points={pts}
                      fill={isDark ? 'rgba(139, 92, 246, 0.38)' : 'rgba(124, 58, 237, 0.28)'}
                      stroke={nRects <= 45 ? '#8b5cf6' : 'rgba(139, 92, 246, 0.5)'}
                      strokeWidth={nRects <= 30 ? '1.2' : '0.5'}
                    />
                  );
                }
                const yTop = toSvgY(Math.max(0, r.height));
                const rectH = Math.abs(yBase - toSvgY(r.height));
                return (
                  <g key={i}>
                    <rect
                      x={x1}
                      y={yTop}
                      width={Math.max(0.5, x2 - x1)}
                      height={rectH}
                      fill={isDark ? 'rgba(139, 92, 246, 0.38)' : 'rgba(124, 58, 237, 0.28)'}
                      stroke={nRects <= 45 ? '#8b5cf6' : 'rgba(139, 92, 246, 0.5)'}
                      strokeWidth={nRects <= 30 ? '1.2' : '0.5'}
                    />
                    {nRects <= 20 && (
                      <circle
                        cx={toSvgX(r.sampleX)}
                        cy={toSvgY(r.height)}
                        r="3"
                        fill="#f43f5e"
                      />
                    )}
                  </g>
                );
              })}

              {/* Exact Function Curve on top */}
              <path
                d={curvePath}
                fill="none"
                stroke={isDark ? '#f43f5e' : '#e11d48'}
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Right Controls */}
        <div className="lg:col-span-4 space-y-4">
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="slider-riemann-n" className="text-xs font-semibold uppercase tracking-wider opacity-75">
                Number of Slices (<MathTex tex="n" katexReady={katexReady} />)
              </label>
              <span className="font-mono text-base font-bold text-violet-400">n = {nRects}</span>
            </div>
            <input
              id="slider-riemann-n"
              type="range"
              min="2"
              max="100"
              step="1"
              value={nRects}
              onChange={(e) => setNRects(parseInt(e.target.value, 10))}
              className="w-full accent-violet-500 cursor-pointer"
            />
            <div className="flex justify-between gap-1 mt-2">
              {[2, 5, 12, 30, 60, 100].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setNRects(preset)}
                  className={`px-2 py-1 rounded text-[11px] font-mono border transition-all ${
                    nRects === preset
                      ? 'bg-violet-600 text-white border-violet-500'
                      : isDark
                      ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  n={preset}
                </button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-500/20">
              <div className="text-xs font-semibold uppercase tracking-wider opacity-75 mb-2">
                Approximation Rule
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {(['left', 'right', 'midpoint', 'trapezoid'] as RiemannMethod[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMethod(m)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium capitalize border transition-all ${
                      method === m
                        ? 'bg-violet-600 text-white border-violet-500'
                        : isDark
                        ? 'bg-slate-900 border-slate-800 text-slate-300'
                        : 'bg-white border-stone-200 text-stone-700'
                    }`}
                  >
                    {m} Sum
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Telemetry */}
          <div className={`p-4 rounded-xl border space-y-2.5 ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs opacity-75">Slice Width <MathTex tex="\Delta x = (b-a)/n" katexReady={katexReady} />:</span>
              <span className="font-mono text-sm font-semibold">{dx.toFixed(4)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs opacity-75">Riemann Sum Area:</span>
              <span className="font-mono text-base font-bold text-violet-400">{approxArea.toFixed(4)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs opacity-75">Exact Integral Area:</span>
              <span className="font-mono text-base font-bold text-emerald-500">{exactArea.toFixed(4)}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-500/20">
              <span className="text-xs opacity-75">Approximation Error:</span>
              <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded-full ${
                errorPct < 0.5
                  ? 'bg-emerald-500/15 text-emerald-400'
                  : errorPct < 3
                  ? 'bg-amber-500/15 text-amber-400'
                  : 'bg-rose-500/15 text-rose-400'
              }`}>
                {errorPct.toFixed(3)}%
              </span>
            </div>
            <div className="pt-2 text-center">
              <MathTex tex={activeFunc.latex} katexReady={katexReady} className="text-xs opacity-80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
