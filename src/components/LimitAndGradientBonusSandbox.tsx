import React, { useState } from 'react';
import { Compass } from 'lucide-react';
import { MathTex } from './MathTex';

export const LimitAndGradientBonusSandbox: React.FC<{
  mode: 'limit' | 'gradient';
  isDark: boolean;
  katexReady: boolean;
}> = ({ mode, isDark, katexReady }) => {
  // Limit state: f(x) = (x^2 - 4)/(x - 2) near x = 2
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [approachOffset, setApproachOffset] = useState<number>(0.25);

  // Gradient state: f(x, y) = -(0.3x^2 + 0.3y^2) + 4 (Mountain peak)
  const [gx, setGx] = useState<number>(1.2);
  const [gy, setGy] = useState<number>(-1.0);

  if (mode === 'limit') {
    const xLeft = 2 - approachOffset / zoomLevel;
    const xRight = 2 + approachOffset / zoomLevel;
    const yLeft = xLeft + 2; // Since (x^2 - 4)/(x - 2) = x + 2 for x != 2
    const yRight = xRight + 2;

    return (
      <div className={`rounded-2xl border p-5 transition-all ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-stone-200 shadow-sm'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-500/15 text-sky-400 mb-1">
              <Compass className="w-3.5 h-3.5" /> Interactive Limit Microscope
            </div>
            <h3 className="text-lg font-serif font-bold">
              Zooming In Around a Removable Hole: <MathTex tex="f(x) = \frac{x^2 - 4}{x - 2}" katexReady={katexReady} /> as <MathTex tex="x \to 2" katexReady={katexReady} />
            </h3>
          </div>
          <div className="font-mono text-xs px-3 py-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
            Magnification: {zoomLevel}x
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Zoom Magnification (<MathTex tex="1\times \text{ to } 100\times" katexReady={katexReady} />)</span>
                <span className="font-mono font-bold text-sky-400">{zoomLevel}x</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={zoomLevel}
                onChange={(e) => setZoomLevel(parseInt(e.target.value, 10))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Step Distance from <MathTex tex="x = 2" katexReady={katexReady} /></span>
                <span className="font-mono text-amber-400">±{(approachOffset / zoomLevel).toFixed(4)}</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="1.0"
                step="0.05"
                value={approachOffset}
                onChange={(e) => setApproachOffset(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          <div className={`p-4 rounded-xl border grid grid-cols-3 gap-2 text-center ${
            isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <div className="p-2 rounded-lg bg-sky-500/10">
              <div className="text-[11px] opacity-70">From Left (<MathTex tex="x \to 2^-" katexReady={katexReady} />)</div>
              <div className="font-mono text-xs mt-1">x = {xLeft.toFixed(4)}</div>
              <div className="font-mono text-sm font-bold text-sky-400 mt-0.5">f(x) = {yLeft.toFixed(4)}</div>
            </div>
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <div className="text-[11px] opacity-70">At Exact Spot</div>
              <div className="font-mono text-xs mt-1">x = 2.0000</div>
              <div className="font-mono text-xs font-bold text-amber-400 mt-1">0/0 (Hole)</div>
              <div className="text-[10px] text-emerald-400 font-semibold">Limit L = 4</div>
            </div>
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <div className="text-[11px] opacity-70">From Right (<MathTex tex="x \to 2^+" katexReady={katexReady} />)</div>
              <div className="font-mono text-xs mt-1">x = {xRight.toFixed(4)}</div>
              <div className="font-mono text-sm font-bold text-emerald-400 mt-0.5">f(x) = {yRight.toFixed(4)}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Gradient explorer for z = 4 - 0.5*(x^2 + y^2) -> grad f = <-x, -y>
  const zHeight = 4 - 0.5 * (gx * gx + gy * gy);
  const dfdx = -gx;
  const dfdy = -gy;
  const gradMag = Math.sqrt(dfdx * dfdx + dfdy * dfdy);

  return (
    <div className={`rounded-2xl border p-5 transition-all ${
      isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-stone-200 shadow-sm'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-400 mb-1">
            <Compass className="w-3.5 h-3.5" /> 3D Mountain Contour & Gradient Compass
          </div>
          <h3 className="text-lg font-serif font-bold">
            Surface <MathTex tex="f(x,y) = 4 - 0.5(x^2 + y^2)" katexReady={katexReady} /> & Steepest Ascent <MathTex tex="\nabla f = \langle -x, -y \rangle" katexReady={katexReady} />
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>East-West Coordinate (<MathTex tex="x" katexReady={katexReady} />)</span>
              <span className="font-mono font-bold text-rose-400">x = {gx.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="-2.0"
              max="2.0"
              step="0.1"
              value={gx}
              onChange={(e) => setGx(parseFloat(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>North-South Coordinate (<MathTex tex="y" katexReady={katexReady} />)</span>
              <span className="font-mono font-bold text-sky-400">y = {gy.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="-2.0"
              max="2.0"
              step="0.1"
              value={gy}
              onChange={(e) => setGy(parseFloat(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer"
            />
          </div>
        </div>

        <div className={`p-4 rounded-xl border grid grid-cols-2 gap-3 ${
          isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-stone-50 border-stone-200'
        }`}>
          <div>
            <div className="text-xs opacity-70">Mountain Altitude <MathTex tex="f(x,y)" katexReady={katexReady} /></div>
            <div className="font-mono text-base font-bold text-emerald-400">{zHeight.toFixed(2)} m</div>
          </div>
          <div>
            <div className="text-xs opacity-70">Gradient Vector <MathTex tex="\nabla f" katexReady={katexReady} /></div>
            <div className="font-mono text-base font-bold text-rose-400">
              &lt;{dfdx.toFixed(1)}, {dfdy.toFixed(1)}&gt;
            </div>
          </div>
          <div className="col-span-2 pt-2 border-t border-slate-500/20 text-xs flex justify-between">
            <span>Steepest Uphill Slope <MathTex tex="\|\nabla f\|" katexReady={katexReady} />:</span>
            <span className="font-mono font-bold">{gradMag.toFixed(3)} (points straight toward summit (0,0)!)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
