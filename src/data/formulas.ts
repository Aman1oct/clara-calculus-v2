import { FormulaItem } from '../types';

export const FORMULA_VAULT: FormulaItem[] = [
  // LIMITS
  {
    id: 'f-lim-1',
    name: 'Limit Definition of the Derivative',
    category: 'Limits',
    latex: 'f\'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}',
    plainEnglish: 'Shrinks the horizontal gap h between two points to zero so the secant slope becomes the exact tangent slope.',
    whenToUse: 'When asked to find a derivative "from first principles" or "using the limit definition."',
    tags: ['derivative', 'difference quotient', 'first principles', 'secant']
  },
  {
    id: 'f-lim-2',
    name: 'Fundamental Trigonometric Limit (Sine)',
    category: 'Limits',
    latex: '\\lim_{x \\to 0} \\frac{\\sin(x)}{x} = 1',
    plainEnglish: 'For tiny angles in radians, sin(x) and x are nearly identical, so their ratio approaches 1.',
    whenToUse: 'Evaluating trig limits near 0 or proving that the derivative of sin(x) is cos(x).',
    tags: ['trig', 'sine', 'small angle', 'zero']
  },
  {
    id: 'f-lim-3',
    name: 'Fundamental Trigonometric Limit (Cosine)',
    category: 'Limits',
    latex: '\\lim_{x \\to 0} \\frac{1 - \\cos(x)}{x} = 0 \\quad \\text{and} \\quad \\lim_{x \\to 0} \\frac{1 - \\cos(x)}{x^2} = \\frac{1}{2}',
    plainEnglish: 'Near x = 0, cos(x) flattens like 1 - x^2/2, so 1 - cos(x) shrinks much faster than x.',
    whenToUse: 'Simplifying trig limits where 1 - cos(x) appears in the numerator.',
    tags: ['trig', 'cosine', 'zero']
  },
  {
    id: 'f-lim-4',
    name: 'Limit Definition of Euler’s Number e',
    category: 'Limits',
    latex: '\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n = e \\approx 2.71828',
    plainEnglish: 'Compounding 100% interest infinitely many times a year converges to Euler’s constant e.',
    whenToUse: 'Continuous compound growth and resolving 1^infinity indeterminate limit forms.',
    tags: ['euler', 'exponential', 'infinity', 'compound']
  },
  {
    id: 'f-lim-5',
    name: 'L’Hôpital’s Rule (0/0 or ∞/∞)',
    category: 'Limits',
    latex: '\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f\'(x)}{g\'(x)}',
    plainEnglish: 'When top and bottom both hit 0 or both hit infinity, compare their rates of change instead.',
    whenToUse: 'Strictly when direct substitution yields 0/0 or +-infinity/+-infinity.',
    tags: ['lhopital', 'indeterminate', 'ratio']
  },
  {
    id: 'f-lim-6',
    name: 'Continuity Condition at a Point',
    category: 'Limits',
    latex: '\\lim_{x \\to a^-} f(x) = \\lim_{x \\to a^+} f(x) = f(a)',
    plainEnglish: 'A curve has no break at x = a if the left path, right path, and solid dot all meet at the same height.',
    whenToUse: 'Finding unknown constants k that make a piecewise function continuous everywhere.',
    tags: ['continuity', 'piecewise', 'two-sided']
  },

  // DERIVATIVES
  {
    id: 'f-der-1',
    name: 'Power Rule',
    category: 'Derivatives',
    latex: '\\frac{d}{dx}\\left[x^n\\right] = n x^{n-1}',
    plainEnglish: 'Bring the exponent down in front as a multiplier, then subtract 1 from the exponent.',
    whenToUse: 'Polynomials, roots (x^{1/2}), and reciprocal powers (1/x^3 = x^{-3}).',
    tags: ['power', 'polynomial', 'exponent']
  },
  {
    id: 'f-der-2',
    name: 'Product Rule',
    category: 'Derivatives',
    latex: '\\frac{d}{dx}\\left[f(x)g(x)\\right] = f\'(x)g(x) + f(x)g\'(x)',
    plainEnglish: 'Derivative of the first times the second, plus the first times the derivative of the second.',
    whenToUse: 'Whenever two variable expressions are multiplied together (like x^2 * sin(x)).',
    tags: ['product', 'multiply']
  },
  {
    id: 'f-der-3',
    name: 'Quotient Rule',
    category: 'Derivatives',
    latex: '\\frac{d}{dx}\\left[\\frac{f(x)}{g(x)}\\right] = \\frac{g(x)f\'(x) - f(x)g\'(x)}{[g(x)]^2}',
    plainEnglish: '"Low d-High minus High d-Low, all over the square of what’s below."',
    whenToUse: 'Differentiating a fraction with x in both numerator and denominator.',
    tags: ['quotient', 'fraction', 'division']
  },
  {
    id: 'f-der-4',
    name: 'Chain Rule',
    category: 'Derivatives',
    latex: '\\frac{d}{dx}\\left[f(g(x))\\right] = f\'(g(x)) \\cdot g\'(x)',
    plainEnglish: 'Differentiate the outer shell (leaving the inside untouched), then multiply by the derivative of the inside.',
    whenToUse: 'Nested composite functions like sin(x^2), (3x + 1)^5, or e^{-x^2}.',
    tags: ['chain', 'composite', 'nested']
  },
  {
    id: 'f-der-5',
    name: 'Exponential & Natural Log Derivatives',
    category: 'Derivatives',
    latex: '\\frac{d}{dx}[e^x] = e^x, \\quad \\frac{d}{dx}[a^x] = a^x \\ln(a), \\quad \\frac{d}{dx}[\\ln|x|] = \\frac{1}{x}',
    plainEnglish: 'e^x is its own derivative! And the natural log ln(x) changes at a rate of 1/x.',
    whenToUse: 'Growth/decay models, logarithms, and logarithmic differentiation.',
    tags: ['exponential', 'logarithm', 'ln', 'euler']
  },
  {
    id: 'f-der-6',
    name: 'Six Trigonometric Derivatives',
    category: 'Derivatives',
    latex: '(\\sin x)\' = \\cos x, \\; (\\cos x)\' = -\\sin x, \\; (\\tan x)\' = \\sec^2 x, \\; (\\sec x)\' = \\sec x \\tan x',
    plainEnglish: 'All "co-" trig functions (cos, cot, csc) produce a negative sign when differentiated!',
    whenToUse: 'Waves, oscillations, angles, and harmonic motion problems.',
    tags: ['trig', 'sine', 'cosine', 'tangent', 'secant']
  },
  {
    id: 'f-der-7',
    name: 'Inverse Trigonometric Derivatives',
    category: 'Derivatives',
    latex: '(\\arcsin x)\' = \\frac{1}{\\sqrt{1-x^2}}, \\quad (\\arccos x)\' = -\\frac{1}{\\sqrt{1-x^2}}, \\quad (\\arctan x)\' = \\frac{1}{1+x^2}',
    plainEnglish: 'Inverse trig functions turn angles back into algebraic ratios without any trig functions left!',
    whenToUse: 'Viewing-angle optimization and recognizing antiderivatives of 1/(1+x^2).',
    tags: ['inverse trig', 'arctan', 'arcsin']
  },

  // INTEGRALS
  {
    id: 'f-int-1',
    name: 'Reverse Power Rule for Integrals',
    category: 'Integrals',
    latex: '\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)',
    plainEnglish: 'Add 1 to the exponent, then divide by the brand-new exponent (and don’t forget + C!).',
    whenToUse: 'Integrating any polynomial term, root, or negative power except 1/x.',
    tags: ['power rule', 'antiderivative', 'polynomial']
  },
  {
    id: 'f-int-2',
    name: 'Reciprocal & Exponential Integrals',
    category: 'Integrals',
    latex: '\\int \\frac{1}{x}\\,dx = \\ln|x| + C, \\quad \\int e^{kx}\\,dx = \\frac{1}{k}e^{kx} + C',
    plainEnglish: '1/x fills the n = -1 gap by integrating to ln|x|, while e^{kx} divides by the constant k.',
    whenToUse: 'Rational functions and exponential accumulation.',
    tags: ['ln', 'reciprocal', 'exponential']
  },
  {
    id: 'f-int-3',
    name: 'Fundamental Theorem of Calculus (Part 1 & Part 2)',
    category: 'Integrals',
    latex: '\\frac{d}{dx}\\int_{a}^{x} f(t)\\,dt = f(x) \\quad \\text{and} \\quad \\int_{a}^{b} f(x)\\,dx = F(b) - F(a)',
    plainEnglish: 'Differentiation and integration undo each other; definite area equals ending antiderivative minus starting antiderivative.',
    whenToUse: 'Evaluating any definite integral or differentiating an integral with variable limits.',
    tags: ['ftc', 'fundamental theorem', 'definite integral']
  },
  {
    id: 'f-int-4',
    name: 'u-Substitution (Reverse Chain Rule)',
    category: 'Integrals',
    latex: '\\int f(g(x))\\,g\'(x)\\,dx = \\int f(u)\\,du \\quad \\text{where } u = g(x)',
    plainEnglish: 'Replace an inner expression g(x) with u whenever its derivative g\'(x) dx is waiting outside.',
    whenToUse: 'Integrals with composite functions like int 2x e^{x^2} dx or int tan(x) dx.',
    tags: ['u-sub', 'substitution', 'chain rule']
  },
  {
    id: 'f-int-5',
    name: 'Integration by Parts (Reverse Product Rule)',
    category: 'Integrals',
    latex: '\\int u\\,dv = u v - \\int v\\,du',
    plainEnglish: 'Trades a product integral int u dv for uv minus a simpler integral int v du (use LIATE to pick u).',
    whenToUse: 'Products of different function families like int x e^x dx, int x cos(x) dx, or int ln(x) dx.',
    tags: ['parts', 'liate', 'product']
  },
  {
    id: 'f-int-6',
    name: 'Core Trigonometric Integrals',
    category: 'Integrals',
    latex: '\\int \\sin x\\,dx = -\\cos x + C, \\quad \\int \\cos x\\,dx = \\sin x + C, \\quad \\int \\sec^2 x\\,dx = \\tan x + C',
    plainEnglish: 'Reverses the basic trig derivatives—watch the minus sign when integrating sin(x)!',
    whenToUse: 'Integrating periodic waveforms and trigonometric expressions.',
    tags: ['trig', 'sine', 'cosine', 'secant']
  },

  // SERIES
  {
    id: 'f-ser-1',
    name: 'Taylor & Maclaurin Series Formula',
    category: 'Series',
    latex: 'f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x - a)^n',
    plainEnglish: 'Builds an infinite polynomial around x = a whose derivatives match f(x) of every order.',
    whenToUse: 'Approximating transcendental functions with polynomials (Maclaurin sets a = 0).',
    tags: ['taylor', 'maclaurin', 'polynomial', 'series']
  },
  {
    id: 'f-ser-2',
    name: 'Maclaurin Series for e^x',
    category: 'Series',
    latex: 'e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!} = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\frac{x^4}{4!} + \\dots \\quad (\\text{all } x)',
    plainEnglish: 'Includes every whole power of x divided by its factorial; converges for every real number x.',
    whenToUse: 'Series expansions, limits, and proving Euler’s identity e^{i theta} = cos(theta) + i sin(theta).',
    tags: ['maclaurin', 'exponential', 'euler']
  },
  {
    id: 'f-ser-3',
    name: 'Maclaurin Series for sin(x) and cos(x)',
    category: 'Series',
    latex: '\\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\dots \\quad | \\quad \\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\dots',
    plainEnglish: 'sin(x) alternates through odd powers of x; cos(x) alternates through even powers of x.',
    whenToUse: 'Small-angle physics approximations and oscillating series.',
    tags: ['maclaurin', 'sine', 'cosine', 'alternating']
  },
  {
    id: 'f-ser-4',
    name: 'Geometric Series Sum',
    category: 'Series',
    latex: '\\sum_{n=0}^{\\infty} a r^n = \\frac{a}{1 - r} \\quad \\text{for } |r| < 1',
    plainEnglish: 'When each term is multiplied by a fixed ratio r smaller than 1 in magnitude, the infinite sum equals First Term / (1 - Ratio).',
    whenToUse: 'Repeating decimals, financial perpetuities, and building power series from 1/(1 - x).',
    tags: ['geometric', 'convergence', 'ratio']
  },

  // TRIG IDENTITIES
  {
    id: 'f-trig-1',
    name: 'Pythagorean Trigonometric Identities',
    category: 'Trig Identities',
    latex: '\\sin^2 x + \\cos^2 x = 1, \\quad 1 + \\tan^2 x = \\sec^2 x, \\quad 1 + \\cot^2 x = \\csc^2 x',
    plainEnglish: 'The unit circle’s x^2 + y^2 = 1 rewritten in trig language—essential for trig substitution!',
    whenToUse: 'Simplifying trig integrals and eliminating square roots like sqrt(1 - x^2).',
    tags: ['pythagorean', 'unit circle', 'trig sub']
  },
  {
    id: 'f-trig-2',
    name: 'Double-Angle Identities',
    category: 'Trig Identities',
    latex: '\\sin(2x) = 2\\sin x\\cos x, \\quad \\cos(2x) = \\cos^2 x - \\sin^2 x = 2\\cos^2 x - 1 = 1 - 2\\sin^2 x',
    plainEnglish: 'Relates twice an angle (2x) back to single angles (x).',
    whenToUse: 'Simplifying products like sin(x)cos(x) and solving trigonometric equations.',
    tags: ['double angle', 'sine', 'cosine']
  },
  {
    id: 'f-trig-3',
    name: 'Power-Reducing Identities (Integral Lifesavers)',
    category: 'Trig Identities',
    latex: '\\sin^2 x = \\frac{1 - \\cos(2x)}{2}, \\quad \\cos^2 x = \\frac{1 + \\cos(2x)}{2}',
    plainEnglish: 'Turns squared trig functions (which are tough to integrate) into first-power cos(2x) (which is easy!).',
    whenToUse: 'Whenever you need to integrate int sin^2(x) dx or int cos^2(x) dx.',
    tags: ['power reducing', 'half angle', 'integrals']
  },

  // MULTIVARIABLE & VECTOR
  {
    id: 'f-vec-1',
    name: 'Gradient Vector & Directional Derivative',
    category: 'Multivariable & Vector',
    latex: '\\nabla f = \\left\\langle \\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y}, \\frac{\\partial f}{\\partial z} \\right\\rangle, \\quad D_{\\hat{u}}f = \\nabla f \\cdot \\hat{u}',
    plainEnglish: 'Packs all partial slopes into a compass pointing straight uphill; dotting with unit vector u gives the slope in direction u.',
    whenToUse: 'Finding direction of steepest ascent, tangent planes, and directional rates of change.',
    tags: ['gradient', 'directional derivative', 'partial']
  },
  {
    id: 'f-vec-2',
    name: 'Divergence & Curl of a Vector Field',
    category: 'Multivariable & Vector',
    latex: '\\text{div } \\vec{F} = \\nabla \\cdot \\vec{F} = \\frac{\\partial P}{\\partial x} + \\frac{\\partial Q}{\\partial y} + \\frac{\\partial R}{\\partial z}, \\quad \\text{curl } \\vec{F} = \\nabla \\times \\vec{F}',
    plainEnglish: 'Divergence measures net outward expansion (scalar); Curl measures local rotational spin (vector).',
    whenToUse: 'Fluid flow, Maxwell’s equations, Green’s Theorem, Stokes’ Theorem, and Divergence Theorem.',
    tags: ['divergence', 'curl', 'vector field', 'flux']
  },
  {
    id: 'f-vec-3',
    name: 'Double Integral in Polar Coordinates',
    category: 'Multivariable & Vector',
    latex: '\\iint_{R} f(x, y)\\,dA = \\int_{\\alpha}^{\\beta} \\int_{r_1}^{r_2} f(r\\cos\\theta, r\\sin\\theta)\\,r\\,dr\\,d\\theta',
    plainEnglish: 'Converts circular regions from (x, y) to radius r and angle theta—never forget the extra Jacobian factor r!',
    whenToUse: 'Integrating over disks, rings, sectors, or functions containing x^2 + y^2.',
    tags: ['polar', 'double integral', 'jacobian', 'circle']
  }
];
