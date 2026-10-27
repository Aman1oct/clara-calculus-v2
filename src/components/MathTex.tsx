import React, { useMemo } from 'react';

declare global {
  interface Window {
    katex?: {
      renderToString: (tex: string, options?: { displayMode?: boolean; throwOnError?: boolean }) => string;
    };
  }
}

function parseBalancedBraces(str: string, startIndex: number): [string, number] {
  if (str[startIndex] !== '{') return ['', startIndex];
  let depth = 0;
  let content = '';
  for (let i = startIndex; i < str.length; i++) {
    if (str[i] === '{') {
      depth++;
      if (depth > 1) content += str[i];
    } else if (str[i] === '}') {
      depth--;
      if (depth === 0) return [content, i + 1];
      content += str[i];
    } else {
      content += str[i];
    }
  }
  return [content, str.length];
}

function convertLatexToRichHtml(tex: string): string {
  let s = tex.trim().replace(/&/g, ' ');

  // Handle \frac{a}{b} recursively
  let safety = 0;
  while (s.includes('\\frac{') && safety < 25) {
    safety++;
    const idx = s.indexOf('\\frac{');
    const [num, afterNum] = parseBalancedBraces(s, idx + 5);
    if (s[afterNum] === '{') {
      const [den, afterDen] = parseBalancedBraces(s, afterNum);
      const replacement = `<span class="inline-flex flex-col items-center align-middle mx-1 text-[0.92em] leading-tight"><span class="border-b border-current px-1 pb-0.5">${convertLatexToRichHtml(num)}</span><span class="px-1 pt-0.5">${convertLatexToRichHtml(den)}</span></span>`;
      s = s.slice(0, idx) + replacement + s.slice(afterDen);
    } else {
      break;
    }
  }

  // Handle \sqrt{a}
  safety = 0;
  while (s.includes('\\sqrt{') && safety < 15) {
    safety++;
    const idx = s.indexOf('\\sqrt{');
    const [inner, afterInner] = parseBalancedBraces(s, idx + 5);
    const replacement = `<span class="inline-flex items-baseline">&radic;<span class="border-t border-current px-0.5">${convertLatexToRichHtml(inner)}</span></span>`;
    s = s.slice(0, idx) + replacement + s.slice(afterInner);
  }

  // Handle \vec{a} and \hat{a}
  s = s.replace(/\\vec\{([^}]+)\}/g, '<span class=" italic font-semibold">$1&#8407;</span>');
  s = s.replace(/\\hat\{([^}]+)\}/g, '<span class="italic font-semibold">$1&#770;</span>');
  s = s.replace(/\\text\{([^}]+)\}/g, '<span class="font-sans not-italic text-[0.9em]">$1</span>');
  s = s.replace(/\\mathbf\{([^}]+)\}/g, '<strong class="font-bold not-italic">$1</strong>');

  // Limits, integrals, sums with subscripts/superscripts
  s = s.replace(
    /\\lim_\{([^}]+)\}/g,
    '<span class="inline-flex flex-col items-center align-middle mx-1 leading-none"><span class="not-italic font-serif">lim</span><span class="text-[0.7em] opacity-85 mt-0.5">$1</span></span>'
  );
  s = s.replace(
    /\\sum_\{([^}]+)\}\^\{([^}]+)\}/g,
    '<span class="inline-flex flex-col items-center align-middle mx-1 leading-none"><span class="text-[0.68em] opacity-85">$2</span><span class="text-[1.25em] not-italic">&Sigma;</span><span class="text-[0.68em] opacity-85">$1</span></span>'
  );
  s = s.replace(
    /\\int_\{([^}]+)\}\^\{([^}]+)\}/g,
    '<span class="inline-flex items-center align-middle mx-0.5"><span class="text-[1.35em] not-italic font-serif">&int;</span><span class="inline-flex flex-col text-[0.68em] leading-tight -ml-0.5"><span>$2</span><span class="mt-1">$1</span></span></span>'
  );
  s = s.replace(/\\iint_\{([^}]+)\}/g, '<span class="text-[1.25em] not-italic font-serif">&Int;</span><sub>$1</sub>');
  s = s.replace(/\\iiint_\{([^}]+)\}/g, '<span class="text-[1.25em] not-italic font-serif">&tint;</span><sub>$1</sub>');
  s = s.replace(/\\int/g, '<span class="text-[1.25em] not-italic font-serif mx-0.5">&int;</span>');

  // Superscripts & Subscripts
  s = s.replace(/\^\{([^}]+)\}/g, '<sup>$1</sup>');
  s = s.replace(/\^([0-9a-zA-Z+-])/g, '<sup>$1</sup>');
  s = s.replace(/_\{([^}]+)\}/g, '<sub>$1</sub>');
  s = s.replace(/_([0-9a-zA-Z])/g, '<sub>$1</sub>');

  // Standard mathematical symbols
  const replacements: [RegExp, string][] = [
    [/\\to\b/g, ' &rarr; '],
    [/\\rightarrow\b/g, ' &rarr; '],
    [/\\implies\b/g, ' &rArr; '],
    [/\\langle\b/g, '&lang;'],
    [/\\rangle\b/g, '&rang;'],
    [/\\\|/g, '&#8214;'],
    [/\\in\b/g, ' &isin; '],
    [/\\iff\b/g, ' &hArr; '],
    [/\\infty\b/g, '&infin;'],
    [/\\partial\b/g, '&part;'],
    [/\\nabla\b/g, '&nabla;'],
    [/\\Delta\b/g, '&Delta;'],
    [/\\delta\b/g, '&delta;'],
    [/\\epsilon\b/g, '&epsilon;'],
    [/\\theta\b/g, '&theta;'],
    [/\\pi\b/g, '&pi;'],
    [/\\lambda\b/g, '&lambda;'],
    [/\\sigma\b/g, '&sigma;'],
    [/\\alpha\b/g, '&alpha;'],
    [/\\beta\b/g, '&beta;'],
    [/\\gamma\b/g, '&gamma;'],
    [/\\omega\b/g, '&omega;'],
    [/\\cdot\b/g, ' &middot; '],
    [/\\times\b/g, ' &times; '],
    [/\\pm\b/g, ' &plusmn; '],
    [/\\approx\b/g, ' &approx; '],
    [/\\neq\b/g, ' &ne; '],
    [/\\leq\b/g, ' &le; '],
    [/\\geq\b/g, ' &ge; '],
    [/\\le\b/g, ' &le; '],
    [/\\ge\b/g, ' &ge; '],
    [/\\sin\b/g, '<span class="not-italic font-serif">sin</span>'],
    [/\\cos\b/g, '<span class="not-italic font-serif">cos</span>'],
    [/\\tan\b/g, '<span class="not-italic font-serif">tan</span>'],
    [/\\sec\b/g, '<span class="not-italic font-serif">sec</span>'],
    [/\\csc\b/g, '<span class="not-italic font-serif">csc</span>'],
    [/\\cot\b/g, '<span class="not-italic font-serif">cot</span>'],
    [/\\arcsin\b/g, '<span class="not-italic font-serif">arcsin</span>'],
    [/\\arccos\b/g, '<span class="not-italic font-serif">arccos</span>'],
    [/\\arctan\b/g, '<span class="not-italic font-serif">arctan</span>'],
    [/\\ln\b/g, '<span class="not-italic font-serif">ln</span>'],
    [/\\log\b/g, '<span class="not-italic font-serif">log</span>'],
    [/\\left\(/g, '('],
    [/\\right\)/g, ')'],
    [/\\left\[/g, '['],
    [/\\right\]/g, ']'],
    [/\\left\|/g, '|'],
    [/\\right\|/g, '|'],
    [/\\,/g, '&thinsp;'],
    [/\\;/g, '&ensp;'],
    [/\\quad\b/g, '&emsp;'],
    [/\\dots\b/g, '&hellip;'],
    [/\\cdots\b/g, '&ctdot;']
  ];

  for (const [regex, rep] of replacements) {
    s = s.replace(regex, rep);
  }

  return s;
}

export const MathTex: React.FC<{
  tex: string;
  block?: boolean;
  className?: string;
  katexReady?: boolean;
}> = ({ tex, block = false, className = '', katexReady = false }) => {
  const renderedHtml = useMemo(() => {
    if (typeof window !== 'undefined' && window.katex) {
      try {
        return window.katex.renderToString(tex, {
          displayMode: block,
          throwOnError: false
        });
      } catch {
        return convertLatexToRichHtml(tex);
      }
    }
    return convertLatexToRichHtml(tex);
  }, [tex, block, katexReady]);

  if (block) {
    return (
      <div
        className={`my-2 overflow-x-auto py-1.5 font-serif text-[1.06rem] tracking-wide ${className}`}
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
      />
    );
  }

  return (
    <span
      className={`inline-block font-serif tracking-wide ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};
