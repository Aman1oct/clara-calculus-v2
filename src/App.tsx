import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Sparkles,
  Compass,
  Sliders,
  Bookmark,
  Search,
  Sun,
  Moon,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Copy,
  Check,
  Pin,
  Award,
  Zap,
  HelpCircle,
  Eye,
  GraduationCap,
  X
} from 'lucide-react';
import { ModuleId, MainView, FormulaCategory } from './types';
import { CURRICULUM_MODULES } from './data/curriculum';
import { FORMULA_VAULT } from './data/formulas';
import { MathTex } from './components/MathTex';
import { DerivativeSandbox } from './components/DerivativeSandbox';
import { RiemannSandbox } from './components/RiemannSandbox';
import { TaylorSandbox } from './components/TaylorSandbox';
import { LimitAndGradientBonusSandbox } from './components/LimitAndGradientBonusSandbox';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [activeView, setActiveView] = useState<MainView>('curriculum');
  const [activeModuleId, setActiveModuleId] = useState<ModuleId>('foundations');
  const [sidebarSearch, setSidebarSearch] = useState<string>('');
  const [katexReady, setKatexReady] = useState<boolean>(false);

  // Study Board & Mastery state
  const [pinnedFormulaIds, setPinnedFormulaIds] = useState<string[]>([
    'f-lim-1',
    'f-der-4',
    'f-int-3',
    'f-ser-1'
  ]);
  const [completedModules, setCompletedModules] = useState<ModuleId[]>(['foundations']);
  const [expandedExamples, setExpandedExamples] = useState<Record<string, boolean>>({
    'ex-foundations-1': true,
    'ex-limits-1': true,
    'ex-deriv-1': true,
    'ex-int-1': true,
    'ex-multi-1': true
  });
  const [revealedSteps, setRevealedSteps] = useState<Record<string, number>>({});
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  // Formula Vault Filters
  const [vaultQuery, setVaultQuery] = useState<string>('');
  const [vaultCategory, setVaultCategory] = useState<FormulaCategory | 'All'>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dynamically load KaTeX and Google Fonts on mount
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href =
      'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap';
    document.head.appendChild(fontLink);

    const katexCss = document.createElement('link');
    katexCss.rel = 'stylesheet';
    katexCss.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
    document.head.appendChild(katexCss);

    const katexScript = document.createElement('script');
    katexScript.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
    katexScript.async = true;
    katexScript.onload = () => setKatexReady(true);
    document.head.appendChild(katexScript);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2600);
  };

  const copyTextToClipboard = (text: string, id: string, label: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(() => {
          const ta = document.createElement('textarea');
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        });
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
    } catch {
      // Fallback handled silently
    }
    setCopiedId(id);
    showToast(`Copied "${label}" to clipboard!`);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const togglePinFormula = (id: string, name: string) => {
    setPinnedFormulaIds((prev) => {
      if (prev.includes(id)) {
        showToast(`Removed "${name}" from Clara’s Study Board`);
        return prev.filter((item) => item !== id);
      } else {
        showToast(`Pinned "${name}" to Clara’s Study Board!`);
        return [...prev, id];
      }
    });
  };

  const toggleModuleComplete = (id: ModuleId, title: string) => {
    setCompletedModules((prev) => {
      if (prev.includes(id)) {
        return prev.filter((m) => m !== id);
      } else {
        showToast(`Mastery Badge Unlocked for ${title}!`);
        return [...prev, id];
      }
    });
  };

  const activeModule = useMemo(
    () => CURRICULUM_MODULES.find((m) => m.id === activeModuleId) || CURRICULUM_MODULES[0],
    [activeModuleId]
  );

  // Filter modules/concepts by sidebar search
  const filteredModules = useMemo(() => {
    const q = sidebarSearch.trim().toLowerCase();
    if (!q) return CURRICULUM_MODULES;
    return CURRICULUM_MODULES.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.tagline.toLowerCase().includes(q) ||
        m.concepts.some(
          (c) =>
            c.title.toLowerCase().includes(q) ||
            c.eli5Sentence.toLowerCase().includes(q) ||
            c.intuitionParagraph.toLowerCase().includes(q)
        )
    );
  }, [sidebarSearch]);

  // Filter Master Formula Vault
  const filteredFormulas = useMemo(() => {
    const q = vaultQuery.trim().toLowerCase();
    return FORMULA_VAULT.filter((f) => {
      const matchesCat = vaultCategory === 'All' || f.category === vaultCategory;
      const matchesQuery =
        !q ||
        f.name.toLowerCase().includes(q) ||
        f.plainEnglish.toLowerCase().includes(q) ||
        f.whenToUse.toLowerCase().includes(q) ||
        f.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [vaultQuery, vaultCategory]);

  const pinnedFormulas = useMemo(
    () => FORMULA_VAULT.filter((f) => pinnedFormulaIds.includes(f.id)),
    [pinnedFormulaIds]
  );

  const progressPercentage = Math.round((completedModules.length / CURRICULUM_MODULES.length) * 100);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans ${
        isDark
          ? 'bg-[#0B0F19] text-slate-100'
          : 'bg-[#FAF7F2] text-stone-900'
      }`}
    >
      {/* Subtle Ambient Radial Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            isDark ? 'bg-indigo-600' : 'bg-amber-300'
          }`}
        />
        <div
          className={`absolute top-1/2 -left-40 w-96 h-96 rounded-full blur-3xl opacity-15 ${
            isDark ? 'bg-emerald-600' : 'bg-sky-300'
          }`}
        />
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl border bg-emerald-600 text-white border-emerald-400 text-sm font-medium">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-1 opacity-80 hover:opacity-100"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Navigation Header */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors ${
          isDark
            ? 'bg-[#0B0F19]/85 border-slate-800/80'
            : 'bg-[#FAF7F2]/85 border-stone-200/90'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Brand Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-emerald-500 flex items-center justify-center text-white shadow-md">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-lg sm:text-xl font-bold tracking-tight">
                  Calculus Made Easy for Clara
                </h1>
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <Sparkles className="w-3 h-3" /> Interactive Edition
                </span>
              </div>
              <p className={`text-xs hidden sm:block ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                Intuition-First Mastery • Pre-Calculus to Vector Calculus
              </p>
            </div>
          </div>

          {/* Primary View Switcher Tabs */}
          <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1">
            {[
              { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
              { id: 'sandboxes', label: 'Interactive Labs (5)', icon: Sliders },
              { id: 'vault', label: `Formula Vault (${FORMULA_VAULT.length})`, icon: Compass },
              { id: 'studyboard', label: `Study Board (${pinnedFormulaIds.length})`, icon: Bookmark }
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeView === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveView(tab.id as MainView)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                    active
                      ? isDark
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-stone-900 text-stone-50 shadow-sm'
                      : isDark
                      ? 'text-slate-300 hover:bg-slate-800/70'
                      : 'text-stone-600 hover:bg-stone-200/70'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Progress Pill & Dark/Warm Ivory Toggle */}
          <div className="flex items-center gap-2">
            <div
              className={`hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200'
              }`}
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Clara’s Mastery:</span>
              <span className="font-mono font-bold text-emerald-500">{progressPercentage}%</span>
            </div>

            <button
              type="button"
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-medium ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-amber-300 hover:bg-slate-800'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
              title={isDark ? 'Switch to Warm Ivory Light Mode' : 'Switch to Sleek Dark Mode'}
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4" />
                  <span className="hidden sm:inline">Warm Ivory</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4" />
                  <span className="hidden sm:inline">Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* ================================================================
            VIEW 1: CURRICULUM (SIDEBAR + INTERACTIVE LESSONS + EXAMPLES)
           ================================================================ */}
        {activeView === 'curriculum' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Sticky Sidebar Navigation */}
            <aside className="lg:col-span-3 lg:sticky lg:top-22 space-y-4">
              {/* Search & Filter Box */}
              <div
                className={`p-4 rounded-2xl border backdrop-blur-md ${
                  isDark ? 'bg-slate-900/75 border-slate-800' : 'bg-white/90 border-stone-200 shadow-sm'
                }`}
              >
                <div className="relative mb-3">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                  <input
                    type="text"
                    value={sidebarSearch}
                    onChange={(e) => setSidebarSearch(e.target.value)}
                    placeholder="Filter topics (e.g. Chain Rule)..."
                    className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs border outline-none transition-all ${
                      isDark
                        ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500'
                        : 'bg-stone-50 border-stone-200 text-stone-900 focus:border-stone-500'
                    }`}
                  />
                </div>

                <div className="text-[11px] font-semibold uppercase tracking-wider opacity-60 mb-2 px-1">
                  Learning Path (5 Modules)
                </div>

                <div className="space-y-1.5">
                  {filteredModules.map((mod) => {
                    const isSelected = mod.id === activeModuleId;
                    const isDone = completedModules.includes(mod.id);
                    return (
                      <button
                        key={mod.id}
                        type="button"
                        onClick={() => setActiveModuleId(mod.id)}
                        className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start justify-between gap-2 ${
                          isSelected
                            ? isDark
                              ? 'bg-indigo-600/20 border-indigo-500/60 text-white'
                              : 'bg-stone-900 text-white border-stone-900'
                            : isDark
                            ? 'bg-slate-950/40 border-slate-800/70 text-slate-300 hover:bg-slate-800/50'
                            : 'bg-stone-50/70 border-stone-200/80 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold">{mod.shortTitle}</div>
                          <div className="text-[11px] opacity-75 line-clamp-1 mt-0.5">
                            {mod.badgeTitle}
                          </div>
                        </div>
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isDone ? 'text-emerald-400' : 'opacity-25'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Progress Bar & Badges */}
                <div className="mt-4 pt-4 border-t border-slate-500/20">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold">Course Progress</span>
                    <span className="font-mono font-bold text-emerald-500">
                      {completedModules.length}/{CURRICULUM_MODULES.length} Modules
                    </span>
                  </div>
                  <div className={`w-full h-2 rounded-full overflow-hidden ${
                    isDark ? 'bg-slate-800' : 'bg-stone-200'
                  }`}>
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {CURRICULUM_MODULES.map((m) => {
                      const unlocked = completedModules.includes(m.id);
                      return (
                        <span
                          key={m.id}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium border ${
                            unlocked
                              ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                              : 'opacity-40 border-transparent'
                          }`}
                        >
                          <Award className="w-3 h-3" /> {m.badgeTitle}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Quick Study Board Preview Card */}
              <div
                className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-slate-900/75 border-slate-800' : 'bg-white/90 border-stone-200 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold flex items-center gap-1.5">
                    <Pin className="w-3.5 h-3.5 text-amber-400" /> Clara’s Study Board
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveView('studyboard')}
                    className="text-[11px] text-indigo-400 hover:underline"
                  >
                    Open All ({pinnedFormulaIds.length})
                  </button>
                </div>
                <div className="space-y-2">
                  {pinnedFormulas.slice(0, 3).map((pf) => (
                    <div
                      key={pf.id}
                      className={`p-2 rounded-lg border text-xs ${
                        isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-stone-50 border-stone-200'
                      }`}
                    >
                      <div className="font-medium text-[11px] opacity-80 mb-1">{pf.name}</div>
                      <MathTex tex={pf.latex} katexReady={katexReady} className="text-xs" />
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main Module Lesson Feed */}
            <main className="lg:col-span-9 space-y-6">
              {/* Module Hero Banner */}
              <div
                className={`rounded-2xl border p-6 relative overflow-hidden ${
                  isDark ? 'bg-slate-900/85 border-slate-800' : 'bg-white border-stone-200 shadow-sm'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-400 mb-2">
                      Module {activeModule.number} of 5 • Badge: {activeModule.badgeTitle}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
                      {activeModule.title}
                    </h2>
                    <p className={`text-sm mt-1 ${isDark ? 'text-slate-300' : 'text-stone-600'}`}>
                      {activeModule.tagline}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleModuleComplete(activeModule.id, activeModule.title)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all shrink-0 ${
                      completedModules.includes(activeModule.id)
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                        : isDark
                        ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                        : 'bg-stone-100 text-stone-800 border-stone-300 hover:bg-stone-200'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {completedModules.includes(activeModule.id) ? 'Module Mastered!' : 'Mark Module Mastered'}
                  </button>
                </div>

                {/* Big ELI5 Callout Box */}
                <div
                  className={`mt-5 p-4 rounded-xl border-l-4 border-amber-500 ${
                    isDark ? 'bg-amber-500/10 text-amber-100' : 'bg-amber-50/90 text-stone-800'
                  }`}
                >
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-500 mb-1">
                    Explain Like I’m 5 — The Big Picture
                  </div>
                  <p className="text-sm sm:text-base font-medium leading-relaxed">
                    “{activeModule.eli5Summary}”
                  </p>
                </div>
              </div>

              {/* Concept Cards (Every concept begins with a crystal-clear everyday sentence) */}
              <div className="space-y-5">
                {activeModule.concepts.map((concept, idx) => (
                  <div
                    key={concept.id}
                    className={`rounded-2xl border p-6 transition-all ${
                      isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-stone-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                        Concept {activeModule.number}.{idx + 1} • {concept.subtitle}
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-bold mb-3">{concept.title}</h3>

                    {/* Mandatory Single Everyday Sentence First */}
                    <div
                      className={`p-3.5 rounded-xl border mb-4 flex items-start gap-3 ${
                        isDark
                          ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                          : 'bg-emerald-50/80 border-emerald-200 text-stone-800'
                      }`}
                    >
                      <Sparkles className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-500 block mb-0.5">
                          Plain-English First Sentence:
                        </span>
                        <p className="text-sm font-semibold leading-relaxed">
                          {concept.eli5Sentence}
                        </p>
                      </div>
                    </div>

                    {/* Deep Intuition Paragraph */}
                    <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>
                      {concept.intuitionParagraph}
                    </p>

                    {/* Detailed Deep-Dive Breakdown Bullet List */}
                    {concept.deepDiveDetails && concept.deepDiveDetails.length > 0 && (
                      <div
                        className={`p-4 rounded-xl border mb-4 space-y-2.5 ${
                          isDark ? 'bg-slate-950/60 border-slate-800/90' : 'bg-stone-50/90 border-stone-200'
                        }`}
                      >
                        <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" /> Deep-Dive Mathematical Breakdown & Mechanics
                        </div>
                        <ul className="space-y-2">
                          {concept.deepDiveDetails.map((detail, dIdx) => (
                            <li
                              key={dIdx}
                              className={`text-xs leading-relaxed flex items-start gap-2 ${
                                isDark ? 'text-slate-300' : 'text-stone-700'
                              }`}
                            >
                              <span className="font-mono font-bold text-indigo-400 shrink-0 mt-0.5">
                                {dIdx + 1}.
                              </span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Real-World Application Callout */}
                    {concept.realWorldApplication && (
                      <div
                        className={`px-3.5 py-2.5 rounded-xl border mb-4 text-xs flex items-start gap-2.5 ${
                          isDark
                            ? 'bg-amber-500/10 border-amber-500/25 text-amber-200'
                            : 'bg-amber-50/80 border-amber-200 text-stone-800'
                        }`}
                      >
                        <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-400">Where This Powers the Real World: </strong>
                          {concept.realWorldApplication}
                        </div>
                      </div>
                    )}

                    {/* Textbook Math Formula Box */}
                    <div
                      className={`p-4 rounded-xl border mb-4 ${
                        isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-stone-50 border-stone-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs opacity-70 mb-1">
                        <span>{concept.formulaLabel}</span>
                        <button
                          type="button"
                          onClick={() => copyTextToClipboard(concept.keyFormula, concept.id, concept.formulaLabel)}
                          className="inline-flex items-center gap-1 hover:text-indigo-400"
                        >
                          {copiedId === concept.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedId === concept.id ? 'Copied' : 'Copy LaTeX'}</span>
                        </button>
                      </div>
                      <MathTex tex={concept.keyFormula} block katexReady={katexReady} />
                    </div>

                    {/* Visual Analogy & Pitfall Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      <div
                        className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                          isDark ? 'bg-indigo-950/25 border-indigo-500/25' : 'bg-indigo-50/60 border-indigo-200/70'
                        }`}
                      >
                        <div className="font-bold text-indigo-400 mb-1 flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5" /> Real-World Mental Picture
                        </div>
                        {concept.visualAnalogy}
                      </div>
                      <div
                        className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                          isDark ? 'bg-rose-950/25 border-rose-500/25' : 'bg-rose-50/60 border-rose-200/70'
                        }`}
                      >
                        <div className="font-bold text-rose-400 mb-1 flex items-center gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5" /> Classic Exam Trap to Avoid
                        </div>
                        {concept.commonPitfall}
                      </div>
                    </div>

                    {/* Key Takeaways */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-500/15">
                      {concept.keyTakeaways.map((tk, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className={isDark ? 'text-slate-300' : 'text-stone-700'}>{tk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Embedded Module Interactive Visual Sandbox */}
              <div>
                {(activeModule.id === 'foundations' || activeModule.id === 'derivatives') && (
                  <DerivativeSandbox isDark={isDark} katexReady={katexReady} />
                )}
                {activeModule.id === 'limits' && (
                  <LimitAndGradientBonusSandbox mode="limit" isDark={isDark} katexReady={katexReady} />
                )}
                {activeModule.id === 'integrals' && (
                  <RiemannSandbox isDark={isDark} katexReady={katexReady} />
                )}
                {activeModule.id === 'multivariable' && (
                  <div className="space-y-6">
                    <TaylorSandbox isDark={isDark} katexReady={katexReady} />
                    <LimitAndGradientBonusSandbox mode="gradient" isDark={isDark} katexReady={katexReady} />
                  </div>
                )}
              </div>

              {/* Step-by-Step Worked Examples Accordion Section */}
              <div
                className={`rounded-2xl border p-6 ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-stone-200 shadow-sm'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 mb-1">
                      <Sparkles className="w-3.5 h-3.5" /> {activeModule.workedExamples.length} Detailed Problems in {activeModule.shortTitle}
                    </div>
                    <h3 className="text-xl font-serif font-bold">
                      Step-by-Step Worked Examples (Math + Plain-English + Strategy Tips)
                    </h3>
                    <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                      Every example includes the real-world engineering context, step-by-step algebra, plain-English translation, and a pro strategy tip.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        const next: Record<string, boolean> = { ...expandedExamples };
                        activeModule.workedExamples.forEach((ex) => {
                          next[ex.id] = true;
                        });
                        setExpandedExamples(next);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        isDark
                          ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300 hover:bg-indigo-600/30'
                          : 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'
                      }`}
                    >
                      Expand All ({activeModule.workedExamples.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const next: Record<string, boolean> = { ...expandedExamples };
                        activeModule.workedExamples.forEach((ex) => {
                          next[ex.id] = false;
                        });
                        setExpandedExamples(next);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                        isDark
                          ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                          : 'bg-stone-100 border-stone-200 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      Collapse All
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {activeModule.workedExamples.map((ex) => {
                    const isOpen = !!expandedExamples[ex.id];
                    const visibleCount = revealedSteps[ex.id] ?? ex.steps.length;

                    return (
                      <div
                        key={ex.id}
                        className={`rounded-xl border overflow-hidden transition-all ${
                          isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-stone-50 border-stone-200'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedExamples((prev) => ({ ...prev, [ex.id]: !prev[ex.id] }))
                          }
                          className="w-full p-4 text-left flex items-center justify-between gap-3 hover:opacity-90"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  ex.difficulty === 'Warm-Up'
                                    ? 'bg-emerald-500/15 text-emerald-400'
                                    : ex.difficulty === 'Core'
                                    ? 'bg-indigo-500/15 text-indigo-400'
                                    : 'bg-rose-500/15 text-rose-400'
                                }`}
                              >
                                {ex.difficulty}
                              </span>
                              <span className="font-bold text-sm sm:text-base">{ex.title}</span>
                            </div>
                            <p className="text-xs opacity-75">{ex.problemStatement}</p>
                          </div>
                          {isOpen ? (
                            <ChevronDown className="w-5 h-5 shrink-0 opacity-70" />
                          ) : (
                            <ChevronRight className="w-5 h-5 shrink-0 opacity-70" />
                          )}
                        </button>

                        {isOpen && (
                          <div className="px-4 pb-4 pt-2 border-t border-slate-500/20 space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                              <div className="space-y-1">
                                <div className="text-[11px] font-semibold text-indigo-400 uppercase">
                                  Problem to Solve:
                                </div>
                                <MathTex tex={ex.problemMath} katexReady={katexReady} className="text-base font-bold" />
                                <div className="text-[11px] opacity-80 italic">
                                  Context: {ex.realWorldContext}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setRevealedSteps((prev) => ({
                                      ...prev,
                                      [ex.id]: visibleCount < ex.steps.length ? visibleCount + 1 : 1
                                    }))
                                  }
                                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-600 text-white hover:bg-indigo-500"
                                >
                                  {visibleCount < ex.steps.length
                                    ? `Reveal Next Step (${visibleCount}/${ex.steps.length})`
                                    : 'Step-by-Step Replay (1/' + ex.steps.length + ')'}
                                </button>
                                {visibleCount < ex.steps.length && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setRevealedSteps((prev) => ({ ...prev, [ex.id]: ex.steps.length }))
                                    }
                                    className="px-2.5 py-1 rounded-lg text-xs font-medium border border-indigo-500/40 text-indigo-400"
                                  >
                                    Show All
                                  </button>
                                )}
                              </div>
                            </div>

                            <div className="space-y-2.5">
                              {ex.steps.slice(0, visibleCount).map((st) => (
                                <div
                                  key={st.stepNumber}
                                  className={`p-3.5 rounded-xl border grid grid-cols-1 md:grid-cols-12 gap-3 items-center ${
                                    isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200'
                                  }`}
                                >
                                  <div className="md:col-span-7 flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                                      {st.stepNumber}
                                    </span>
                                    <div className="overflow-x-auto">
                                      <MathTex tex={st.math} katexReady={katexReady} className="text-sm" />
                                    </div>
                                  </div>
                                  <div className="md:col-span-5 text-xs leading-relaxed pl-3 border-l-2 border-emerald-500/50 space-y-1.5">
                                    <div>
                                      <span className="font-bold text-emerald-500 block mb-0.5">
                                        Plain English:
                                      </span>
                                      <span className="opacity-95">{st.plainEnglish}</span>
                                    </div>
                                    {st.strategyTip && (
                                      <div className={`p-2 rounded-lg text-[11px] ${
                                        isDark ? 'bg-indigo-500/10 text-indigo-300' : 'bg-indigo-50 text-indigo-900'
                                      }`}>
                                        <strong className="text-indigo-400">Pro Strategy Tip: </strong>
                                        {st.strategyTip}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between">
                              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                                Final Simplified Answer:
                              </span>
                              <MathTex
                                tex={ex.finalAnswer}
                                katexReady={katexReady}
                                className="text-base font-bold text-emerald-400"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Interactive Concept Check Quiz */}
              <div
                className={`rounded-2xl border p-6 ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-stone-200 shadow-sm'
                }`}
              >
                <h3 className="text-xl font-serif font-bold mb-1">
                  Quick Mastery Check: {activeModule.shortTitle}
                </h3>
                <p className={`text-xs mb-4 ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                  Test your intuition! Select an answer for instant plain-English feedback.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeModule.quiz.map((q, qIdx) => {
                    const selected = quizAnswers[q.id];
                    const isAnswered = selected !== undefined;
                    const isCorrect = selected === q.correctIndex;

                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-xl border flex flex-col justify-between ${
                          isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-stone-50 border-stone-200'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-mono text-indigo-400 mb-1">
                            Checkpoint Question {qIdx + 1}
                          </div>
                          <p className="text-sm font-semibold mb-3">{q.question}</p>
                          <div className="space-y-2">
                            {q.options.map((opt, oIdx) => {
                              const pickedThis = selected === oIdx;
                              const isRightOpt = oIdx === q.correctIndex;
                              let btnStyle = isDark
                                ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                                : 'bg-white border-stone-200 hover:border-stone-300';
                              if (isAnswered) {
                                if (isRightOpt) {
                                  btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-semibold';
                                } else if (pickedThis) {
                                  btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-400';
                                }
                              }
                              return (
                                <button
                                  key={oIdx}
                                  type="button"
                                  onClick={() => setQuizAnswers((prev) => ({ ...prev, [q.id]: oIdx }))}
                                  className={`w-full text-left px-3 py-2 rounded-lg border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                                >
                                  <span>{opt}</span>
                                  {isAnswered && isRightOpt && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {isAnswered && (
                          <div
                            className={`mt-3 p-2.5 rounded-lg text-xs ${
                              isCorrect
                                ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                                : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                            }`}
                          >
                            <strong>{isCorrect ? 'Spot on! ' : 'Not quite: '}</strong>
                            {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </main>
          </div>
        )}

        {/* ================================================================
            VIEW 2: ALL INTERACTIVE VISUAL SANDBOXES LAB
           ================================================================ */}
        {activeView === 'sandboxes' && (
          <div className="space-y-8">
            <div
              className={`rounded-2xl border p-6 ${
                isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-stone-200 shadow-sm'
              }`}
            >
              <h2 className="text-2xl sm:text-3xl font-serif font-bold">
                Clara’s Interactive Calculus Visual Laboratory
              </h2>
              <p className={`text-sm mt-1 ${isDark ? 'text-slate-300' : 'text-stone-600'}`}>
                Touch, drag, and slide every parameter below to see derivatives, integrals, Taylor series, limits, and 3D gradients come alive in real time.
              </p>
            </div>

            <DerivativeSandbox isDark={isDark} katexReady={katexReady} />
            <RiemannSandbox isDark={isDark} katexReady={katexReady} />
            <TaylorSandbox isDark={isDark} katexReady={katexReady} />

            <div className="grid grid-cols-1 gap-6">
              <LimitAndGradientBonusSandbox mode="limit" isDark={isDark} katexReady={katexReady} />
              <LimitAndGradientBonusSandbox mode="gradient" isDark={isDark} katexReady={katexReady} />
            </div>
          </div>
        )}

        {/* ================================================================
            VIEW 3: MASTER FORMULA VAULT
           ================================================================ */}
        {activeView === 'vault' && (
          <div className="space-y-6">
            <div
              className={`rounded-2xl border p-6 ${
                isDark ? 'bg-slate-900/85 border-slate-800' : 'bg-white border-stone-200 shadow-sm'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold">
                    Master Formula Vault
                  </h2>
                  <p className={`text-sm mt-1 ${isDark ? 'text-slate-300' : 'text-stone-600'}`}>
                    Searchable, filterable reference of every essential calculus identity—complete with plain-English translations, copy-to-clipboard, and one-click pinning to Clara’s Study Board.
                  </p>
                </div>

                {/* Search Input */}
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" />
                  <input
                    type="text"
                    value={vaultQuery}
                    onChange={(e) => setVaultQuery(e.target.value)}
                    placeholder="Search formulas (e.g. Chain, L'Hopital, Polar)..."
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm border outline-none ${
                      isDark
                        ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500'
                        : 'bg-stone-50 border-stone-200 text-stone-900 focus:border-stone-500'
                    }`}
                  />
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-500/20">
                {(
                  [
                    'All',
                    'Limits',
                    'Derivatives',
                    'Integrals',
                    'Series',
                    'Trig Identities',
                    'Multivariable & Vector'
                  ] as const
                ).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setVaultCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                      vaultCategory === cat
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                        : isDark
                        ? 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                        : 'bg-stone-100 border-stone-200 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Formula Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredFormulas.map((item) => {
                const isPinned = pinnedFormulaIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                      isDark ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700' : 'bg-white border-stone-200 shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-400">
                            {item.category}
                          </span>
                          <h3 className="text-base font-serif font-bold mt-1.5">{item.name}</h3>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => togglePinFormula(item.id, item.name)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center gap-1 transition-all ${
                              isPinned
                                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                                : isDark
                                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                                : 'bg-stone-100 border-stone-200 text-stone-700'
                            }`}
                            title="Pin or unpin formula on Clara's Study Board"
                          >
                            <Pin className="w-3.5 h-3.5" />
                            <span>{isPinned ? 'Pinned' : 'Pin'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => copyTextToClipboard(item.latex, item.id, item.name)}
                            className={`p-1.5 rounded-lg border text-xs transition-all ${
                              isDark
                                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                                : 'bg-stone-100 border-stone-200 text-stone-700'
                            }`}
                            title="Copy LaTeX formula"
                          >
                            {copiedId === item.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div
                        className={`my-3 p-3.5 rounded-xl border overflow-x-auto ${
                          isDark ? 'bg-slate-950 border-slate-800/90' : 'bg-stone-50 border-stone-200'
                        }`}
                      >
                        <MathTex tex={item.latex} katexReady={katexReady} className="text-sm sm:text-base" />
                      </div>

                      <p className={`text-xs leading-relaxed mb-2 ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>
                        <strong className="text-emerald-400">Plain English: </strong>
                        {item.plainEnglish}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-500/15 flex items-center justify-between text-[11px] opacity-75">
                      <span>
                        <strong>When to use:</strong> {item.whenToUse}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================================================================
            VIEW 4: CLARA'S PINNED STUDY BOARD
           ================================================================ */}
        {activeView === 'studyboard' && (
          <div className="space-y-6">
            <div
              className={`rounded-2xl border p-6 ${
                isDark ? 'bg-slate-900/85 border-slate-800' : 'bg-white border-stone-200 shadow-sm'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold flex items-center gap-2">
                    <Bookmark className="w-6 h-6 text-amber-400" /> Clara’s Pinned Study Board
                  </h2>
                  <p className={`text-sm mt-1 ${isDark ? 'text-slate-300' : 'text-stone-600'}`}>
                    Your custom exam-day cheat sheet! Pin or unpin any formula from the Master Formula Vault to curate your personal review board.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveView('vault')}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 self-start"
                >
                  + Browse Formula Vault
                </button>
              </div>
            </div>

            {pinnedFormulas.length === 0 ? (
              <div
                className={`rounded-2xl border p-12 text-center ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-stone-200'
                }`}
              >
                <Pin className="w-8 h-8 mx-auto mb-2 text-amber-400 opacity-60" />
                <h3 className="text-lg font-serif font-bold">Your Study Board is Empty</h3>
                <p className="text-xs opacity-75 mt-1 mb-4">
                  Head over to the Master Formula Vault and click "Pin" on any formula you want to keep handy!
                </p>
                <button
                  type="button"
                  onClick={() => setActiveView('vault')}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white"
                >
                  Explore Formula Vault
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pinnedFormulas.map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-2xl border p-5 ${
                      isDark ? 'bg-slate-900/85 border-amber-500/30' : 'bg-white border-amber-300 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500/15 text-amber-400">
                        {item.category}
                      </span>
                      <button
                        type="button"
                        onClick={() => togglePinFormula(item.id, item.name)}
                        className="text-xs text-rose-400 hover:underline"
                      >
                        Remove Pin
                      </button>
                    </div>
                    <h3 className="text-base font-serif font-bold mb-2">{item.name}</h3>
                    <div
                      className={`p-3 rounded-xl border mb-3 overflow-x-auto ${
                        isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-stone-200'
                      }`}
                    >
                      <MathTex tex={item.latex} katexReady={katexReady} />
                    </div>
                    <p className="text-xs opacity-85">{item.plainEnglish}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
