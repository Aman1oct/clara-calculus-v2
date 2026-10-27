import { CurriculumModule } from '../types';

export const CURRICULUM_MODULES: CurriculumModule[] = [
  {
    id: 'foundations',
    number: 1,
    title: 'Foundations (Pre-Calculus)',
    shortTitle: '1. Foundations',
    badgeTitle: 'Slope Detective',
    tagline: 'How inputs transform into outputs and how graphs tell stories of motion.',
    eli5Summary:
      'Before we measure how fast the universe spins, we need a clear language for machines (functions), steepness (slopes), and curve shapes.',
    accentColor: 'from-amber-500 to-orange-500',
    linkedSandbox: 'derivative',
    concepts: [
      {
        id: 'functions',
        title: 'Functions: The Universe’s Vending Machines',
        subtitle: 'Domain, Range, Composition & Piecewise Rules',
        eli5Sentence:
          'A function is like a reliable smoothie machine: drop in a strawberry (input x), and it always blends the exact same strawberry smoothie (output f(x)).',
        intuitionParagraph:
          'In mathematics, a function f(x) is a deterministic rule that assigns every valid input x from its Domain (what you are allowed to feed into the machine) to exactly one output y in its Range (what can come out). Calculus studies what happens when we nudge that input x by a tiny amount h and watch how the output f(x + h) responds.',
        deepDiveDetails: [
          'Natural Domain Checklist: Start with all real numbers (-∞, ∞), then exclude (1) any x that makes a denominator equal 0, (2) any x that makes the inside of an even root (like √u) negative, and (3) any x that makes the inside of a logarithm ln(u) zero or negative.',
          'Function Composition f(g(x)): Evaluated from the inside out. First compute the output of the inner machine u = g(x), then feed that number directly into the outer machine f(u). Order matters: f(g(x)) is almost never equal to g(f(x))!',
          'Graph Transformations: Adding outside f(x) + c shifts the curve UP by c; adding inside f(x + c) shifts the curve LEFT by c; multiplying outside a·f(x) stretches vertically by a.'
        ],
        realWorldApplication:
          'In computer graphics and Pixar animation, every character movement is a composite function mapping timestamp t → joint angle θ(t) → 3D pixel coordinates (x, y, z).',
        keyFormula: 'y = f(x), \\quad (f \\circ g)(x) = f(g(x)), \\quad \\text{Domain}(f) = \\{x \\in \\mathbb{R} : f(x) \\text{ is real & finite}\\}',
        formulaLabel: 'Function Mapping & Composition Rule',
        visualAnalogy:
          'Think of x as the time on a stopwatch and f(x) as your altitude on a roller coaster. At any single instant on the clock, you can only be at one altitude—never two places at once!',
        commonPitfall:
          'Confusing f(x + h) with f(x) + h. Remember: f(x + h) means you replace every single x inside the formula with the entire parenthesized bundle (x + h) before expanding.',
        keyTakeaways: [
          'Every input x produces exactly one output f(x) (passes the Vertical Line Test).',
          'Domain restrictions usually come from dividing by zero, even roots of negatives, or logarithms of non-positives.',
          'Composite functions f(g(x)) chain two machines together: the output of g becomes the input to f.'
        ]
      },
      {
        id: 'slopes-rates',
        title: 'Slopes, Secant Lines & Average Rate of Change',
        subtitle: 'Measuring Steepness Between Two Moments in Time',
        eli5Sentence:
          'Slope is simply a number that tells you how many steps up or down you take for every single step you walk forward.',
        intuitionParagraph:
          'When a straight ramp climbs steadily, its steepness is "rise over run" (Δy / Δx). On a curved graph, the steepness changes from moment to moment. However, we can always draw a straight line—called a secant line—connecting two points (x, f(x)) and (x + h, f(x + h)) to measure the Average Rate of Change over that window of width h.',
        deepDiveDetails: [
          'Point-Slope Form of a Line: The most useful line equation in calculus is y - y_0 = m(x - x_0), or y = y_0 + m(x - x_0). All you need is one anchor point (x_0, y_0) and a slope m!',
          'The Difference Quotient: Writing x_2 = x + h turns the slope formula (f(x_2) - f(x_1))/(x_2 - x_1) into (f(x + h) - f(x))/h. Simplifying this fraction until the h in the denominator cancels is the #1 algebraic skill in Calculus 1.',
          'Units of Rate of Change: The units of slope are always (Units of y) per (Unit of x)—for example, meters per second (velocity) or dollars per item (marginal cost).'
        ],
        realWorldApplication:
          'Highway average-speed cameras record the timestamp when your car passes Gate A and Gate B 10 miles apart, using the secant slope Δdistance / Δtime to compute your average speed.',
        keyFormula: 'm_{\\text{sec}} = \\frac{\\Delta y}{\\Delta x} = \\frac{f(x_2) - f(x_1)}{x_2 - x_1} = \\frac{f(x + h) - f(x)}{h}',
        formulaLabel: 'Average Rate of Change (Difference Quotient)',
        visualAnalogy:
          'If you drive 120 miles in 2 hours, your average speed is 60 mph—even if you stopped at a red light and later hit 75 mph on the open highway.',
        commonPitfall:
          'Forgetting to distribute the minus sign across all terms of f(x) when computing f(x + h) - f(x). Always wrap f(x) in parentheses!',
        keyTakeaways: [
          'Positive slope means climbing upward left-to-right; negative slope means descending.',
          'A horizontal flat line has a slope of 0; a vertical cliff has an undefined slope (division by zero).',
          'Point-slope form y = f(x_0) + m(x - x_0) lets you write any tangent or secant line in 5 seconds.'
        ]
      },
      {
        id: 'graph-behavior',
        title: 'Graph Behavior, Concavity & Turning Points',
        subtitle: 'Reading Curves Like a Motion Storyboard',
        eli5Sentence:
          'A graph’s curve tells you not only whether a value is rising or falling, but whether that rise is speeding up like a rocket or leveling off like a hiker nearing a summit.',
        intuitionParagraph:
          'Functions can be increasing (going uphill as x increases), decreasing (going downhill), or stationary at peaks (local maxima) and valleys (local minima). Beyond direction, curves have concavity: "Concave Up" bends upward like a cereal bowl (the slope itself is increasing), while "Concave Down" bends downward like an umbrella (the slope is decreasing).',
        deepDiveDetails: [
          'Increasing vs. Decreasing: f is Increasing on an interval if f(x_2) > f(x_1) whenever x_2 > x_1 (positive slope). f is Decreasing if f(x_2) < f(x_1) (negative slope).',
          'Four Curvature Combinations: (1) Increasing & Concave Up: rising faster and faster (exponential growth); (2) Increasing & Concave Down: rising but leveling off (logarithmic growth); (3) Decreasing & Concave Up: falling but flattening out; (4) Decreasing & Concave Down: falling steeper and steeper.',
          'Symmetry Shortcuts: Even functions satisfy f(-x) = f(x) (mirror symmetry across y-axis, like x^2 and cos x). Odd functions satisfy f(-x) = -f(x) (180° rotational symmetry around the origin, like x^3 and sin x).'
        ],
        realWorldApplication:
          'Epidemiologists watch for the "inflection point" on an infection curve—the exact day the curve switches from Concave Up (accelerating spread) to Concave Down (decelerating spread).',
        keyFormula: '\\text{Even: } f(-x) = f(x) \\quad | \\quad \\text{Odd: } f(-x) = -f(x) \\quad | \\quad \\text{Inflection: Concavity Switches Sign}',
        formulaLabel: 'Symmetry & Curvature Signatures',
        visualAnalogy:
          'Walking up a bowl-shaped hill gets steeper with every step (concave up). Walking up a dome-shaped hill levels off as you near the summit (concave down).',
        commonPitfall:
          'Assuming "concave up" means the function is always increasing. The left half of y = x^2 is decreasing (going downhill), yet it is still concave up!',
        keyTakeaways: [
          'Local maxima (peaks) and local minima (valleys) occur where the curve transitions between rising and falling.',
          'An inflection point is the exact spot where a curve switches from a cup (concave up) to an umbrella (concave down).',
          'Recognizing even and odd symmetry cuts integration and graphing work in half.'
        ]
      },
      {
        id: 'exp-log-trig-foundations',
        title: 'Exponentials, Logarithms & Radians on the Unit Circle',
        subtitle: 'The Transcendental Toolkit of Calculus',
        eli5Sentence:
          'Exponentials count repeated doubling, logarithms ask "how many doublings did that take?", and radians measure angles by the actual distance you walk around a circle of radius 1.',
        intuitionParagraph:
          'Algebraic polynomials are only half the story. Nature’s favorite growth curve is e^x (where Euler’s number e ≈ 2.71828 is the unique base whose slope at x = 0 is exactly 1), and its inverse is the natural logarithm ln(x). For periodic waves, calculus ALWAYS measures angles in radians (where 360° = 2π radians) because only in radians does the small-angle ratio sin(θ)/θ equal 1!',
        deepDiveDetails: [
          'Three Logarithm Laws That Simplify Calculus: (1) Product-to-Sum: ln(A·B) = ln(A) + ln(B); (2) Quotient-to-Difference: ln(A/B) = ln(A) - ln(B); (3) Power Pull-Down: ln(A^k) = k·ln(A). Expanding logs BEFORE differentiating turns messy fractions into effortless sums!',
          'Inverse Relationship: e^{ln(x)} = x (for x > 0) and ln(e^x) = x (for all x). Also ln(1) = 0 and ln(e) = 1.',
          'Unit Circle Anchor Angles: At θ = 0: (cos, sin) = (1, 0); at θ = π/6 (30°): (√3/2, 1/2); at θ = π/4 (45°): (√2/2, √2/2); at θ = π/3 (60°): (1/2, √3/2); at θ = π/2 (90°): (0, 1).'
        ],
        realWorldApplication:
          'Carbon-14 dating, musical pitch frequencies, decibel sound scales, and AC electrical grids all run on e^x, ln(x), and radian-based sin(ωt) waves.',
        keyFormula: '\\ln(A \\cdot B) = \\ln A + \\ln B, \\quad \\ln\\left(\\frac{A}{B}\\right) = \\ln A - \\ln B, \\quad \\ln(A^k) = k\\ln A, \\quad \\theta_{\\text{rad}} = \\frac{\\text{Arc Length } s}{\\text{Radius } r}',
        formulaLabel: 'Logarithm Expansion Laws & Radian Definition',
        visualAnalogy:
          'If e^x is a time-lapse video of a lily pad doubling across a pond, ln(x) is the rewind button that tells you what day the pond reached size x.',
        commonPitfall:
          'Inventing fake log rules like ln(A + B) = ln(A) + ln(B). There is NO shortcut for the logarithm of a sum—only products, quotients, and powers!',
        keyTakeaways: [
          'Always set your calculator and brain to Radians in calculus: d/dx[sin(x)] = cos(x) is ONLY true when x is in radians.',
          'Use log laws to split complicated products and roots BEFORE taking derivatives.',
          'Remember the unit circle identity cos^2(θ) + sin^2(θ) = 1—it simplifies hundreds of calculus problems.'
        ]
      }
    ],
    workedExamples: [
      {
        id: 'ex-foundations-1',
        title: 'Computing the Difference Quotient for a Quadratic Curve',
        difficulty: 'Core',
        problemStatement: 'Find and completely simplify the difference quotient for the function below on the interval from x to x + h:',
        problemMath: 'f(x) = 3x^2 - 2x + 5, \\quad \\frac{f(x + h) - f(x)}{h}',
        realWorldContext: 'Models the average velocity of an accelerating drone between time x and time x + h seconds.',
        steps: [
          {
            stepNumber: 1,
            math: 'f(x + h) = 3(x + h)^2 - 2(x + h) + 5',
            plainEnglish: 'Everywhere you see x in the original recipe, replace it with the bundle (x + h) inside parentheses.',
            strategyTip: 'Never just tack "+ h" onto the end of f(x); substitute (x + h) into every x slot.'
          },
          {
            stepNumber: 2,
            math: 'f(x + h) = 3(x^2 + 2xh + h^2) - 2x - 2h + 5 = 3x^2 + 6xh + 3h^2 - 2x - 2h + 5',
            plainEnglish: 'FOIL out (x + h)^2 = x^2 + 2xh + h^2 carefully and distribute the 3 and -2.',
            strategyTip: 'Watch out for the middle term 2xh when squaring a binomial!'
          },
          {
            stepNumber: 3,
            math: 'f(x + h) - f(x) = (3x^2 + 6xh + 3h^2 - 2x - 2h + 5) - (3x^2 - 2x + 5) = 6xh + 3h^2 - 2h',
            plainEnglish: 'Subtract the original function f(x). Notice how every term WITHOUT an h cancels out cleanly!',
            strategyTip: 'Built-in self-check: in any polynomial difference quotient, every term without h MUST cancel out at this step.'
          },
          {
            stepNumber: 4,
            math: '\\frac{f(x + h) - f(x)}{h} = \\frac{h(6x + 3h - 2)}{h} = 6x + 3h - 2',
            plainEnglish: 'Factor out h from the numerator and cancel it with the denominator h (valid since h != 0).',
            strategyTip: 'Notice that if we let h shrink to 0 right now, 6x + 3(0) - 2 gives 6x - 2—the exact derivative!'
          }
        ],
        finalAnswer: '6x + 3h - 2'
      },
      {
        id: 'ex-foundations-2',
        title: 'Finding Average Speed of a Rising Weather Balloon',
        difficulty: 'Warm-Up',
        problemStatement: 'A weather balloon’s altitude in meters after t seconds is given by h(t) = t^3 - 4t + 10. Find its average vertical speed between t = 1 s and t = 3 s.',
        problemMath: 'v_{\\text{avg}} = \\frac{h(3) - h(1)}{3 - 1}',
        realWorldContext: 'Meteorologists track average ascent rate between telemetry pings.',
        steps: [
          {
            stepNumber: 1,
            math: 'h(1) = (1)^3 - 4(1) + 10 = 1 - 4 + 10 = 7\\text{ meters}',
            plainEnglish: 'Plug in the starting time t = 1 second to find the balloon’s starting altitude.',
            strategyTip: 'Evaluate endpoints separately first to prevent arithmetic sign errors.'
          },
          {
            stepNumber: 2,
            math: 'h(3) = (3)^3 - 4(3) + 10 = 27 - 12 + 10 = 25\\text{ meters}',
            plainEnglish: 'Plug in the ending time t = 3 seconds to find the balloon’s ending altitude.',
            strategyTip: 'Remember 3^3 = 3 * 3 * 3 = 27.'
          },
          {
            stepNumber: 3,
            math: 'v_{\\text{avg}} = \\frac{25 - 7}{3 - 1} = \\frac{18}{2} = 9\\text{ m/s}',
            plainEnglish: 'Divide total altitude gained (18 meters) by total time elapsed (2 seconds).',
            strategyTip: 'Always attach physical units (meters per second) to rate-of-change word problems.'
          }
        ],
        finalAnswer: '9\\text{ m/s}'
      },
      {
        id: 'ex-foundations-3',
        title: 'Finding the Exact Domain of a Radical-Fraction Function',
        difficulty: 'Core',
        problemStatement: 'Find the largest possible real domain (in interval notation) for the function:',
        problemMath: 'f(x) = \\frac{\\sqrt{2x + 6}}{x - 4}',
        realWorldContext: 'Determining valid operating pressures where physical square-root flow equations remain real and finite.',
        steps: [
          {
            stepNumber: 1,
            math: '2x + 6 \\geq 0 \\implies 2x \\geq -6 \\implies x \\geq -3',
            plainEnglish: 'Requirement 1 (Square Root): The expression inside an even root cannot be negative, so set 2x + 6 >= 0.',
            strategyTip: 'Square roots in the numerator ARE allowed to equal 0, so use >= (greater than or equal to).'
          },
          {
            stepNumber: 2,
            math: 'x - 4 \\neq 0 \\implies x \\neq 4',
            plainEnglish: 'Requirement 2 (Denominator): Division by zero is undefined, so x cannot equal 4.',
            strategyTip: 'Check whether the forbidden denominator value (x = 4) falls inside the interval x >= -3. It does!'
          },
          {
            stepNumber: 3,
            math: '\\text{Domain} = [-3, 4) \\cup (4, \\infty)',
            plainEnglish: 'Start at -3 (with a square bracket since -3 is included), hop over 4 using open parentheses, and continue to infinity.',
            strategyTip: 'Square bracket [ means "included"; round parenthesis ( means "excluded".'
          }
        ],
        finalAnswer: '[-3, 4) \\cup (4, \\infty)'
      },
      {
        id: 'ex-foundations-4',
        title: 'Decomposing a Nested Function for the Chain Rule',
        difficulty: 'Warm-Up',
        problemStatement: 'Write the composite function H(x) below as an outer function f(u) and an inner function u = g(x), and also compute f(g(2)):',
        problemMath: 'H(x) = \\sqrt{x^3 + 1}',
        realWorldContext: 'Learning to spot "inside" vs. "outside" functions is the #1 prerequisite for mastering the Chain Rule and u-Substitution.',
        steps: [
          {
            stepNumber: 1,
            math: 'u = g(x) = x^3 + 1',
            plainEnglish: 'Ask: "If I plugged in x = 2, what would I calculate FIRST?" You would compute 2^3 + 1 first, so x^3 + 1 is the inner function g(x).',
            strategyTip: 'The inner function u = g(x) is whatever lives inside parentheses, under a radical, or in an exponent.'
          },
          {
            stepNumber: 2,
            math: 'f(u) = \\sqrt{u} = u^{1/2}',
            plainEnglish: 'Once the inside is bundled as u, the outer shell is simply taking the square root of u.',
            strategyTip: 'Rewriting roots as fractional exponents (u^{1/2}) prepares you for the Power Rule in Module 3.'
          },
          {
            stepNumber: 3,
            math: 'g(2) = 2^3 + 1 = 9 \\implies f(g(2)) = f(9) = \\sqrt{9} = 3',
            plainEnglish: 'Evaluate from the inside out: plug 2 into g to get 9, then plug 9 into f to get 3.',
            strategyTip: 'Always work from the innermost parentheses outward.'
          }
        ],
        finalAnswer: 'g(x) = x^3 + 1,\\; f(u) = \\sqrt{u},\\; H(2) = 3'
      },
      {
        id: 'ex-foundations-5',
        title: 'Difference Quotient for a Fraction (Rational Function)',
        difficulty: 'Challenge',
        problemStatement: 'Compute and simplify the difference quotient (f(x+h) - f(x)) / h for the reciprocal function:',
        problemMath: 'f(x) = \\frac{4}{x}',
        realWorldContext: 'Models how gas pressure P(V) = 4/V changes when cylinder volume V expands by h liters (Boyle’s Law).',
        steps: [
          {
            stepNumber: 1,
            math: '\\frac{f(x+h) - f(x)}{h} = \\frac{\\frac{4}{x+h} - \\frac{4}{x}}{h}',
            plainEnglish: 'Substitute f(x+h) = 4/(x+h) and f(x) = 4/x into the difference quotient template.',
            strategyTip: 'When fractions live inside a larger fraction, find the common denominator of the small fractions first.'
          },
          {
            stepNumber: 2,
            math: '\\frac{4}{x+h} - \\frac{4}{x} = \\frac{4x - 4(x+h)}{x(x+h)} = \\frac{4x - 4x - 4h}{x(x+h)} = \\frac{-4h}{x(x+h)}',
            plainEnglish: 'Combine the two top fractions over the common denominator x(x+h) and distribute -4.',
            strategyTip: 'Notice how 4x - 4x cancels, leaving only -4h on top!'
          },
          {
            stepNumber: 3,
            math: '\\frac{-4h}{x(x+h)} \\cdot \\frac{1}{h} = \\frac{-4}{x(x+h)}',
            plainEnglish: 'Dividing by h is the same as multiplying by 1/h. Cancel the h on top and bottom!',
            strategyTip: 'As h -> 0, this approaches -4 / x^2—confirming the derivative of 4/x!'
          }
        ],
        finalAnswer: '-\\frac{4}{x(x+h)}'
      }
    ],
    quiz: [
      {
        id: 'q-found-1',
        question: 'If f(x) = x^2 + 4x, what is the exact expression for f(x + h)?',
        options: [
          'x^2 + 4x + h',
          '(x + h)^2 + 4(x + h)',
          'x^2 + h^2 + 4x + 4h',
          '2x + 4 + h'
        ],
        correctIndex: 1,
        explanation: 'Function notation f(x + h) substitutes the entire quantity (x + h) wherever x appears in the rule: (x + h)^2 + 4(x + h).'
      },
      {
        id: 'q-found-2',
        question: 'When a curve is shaped like a cereal bowl that holds water, yet you are currently walking down its left side, how do we describe it?',
        options: [
          'Decreasing and Concave Up',
          'Decreasing and Concave Down',
          'Increasing and Concave Up',
          'Stationary and Inflecting'
        ],
        correctIndex: 0,
        explanation: 'Walking downhill left-to-right means the function is Decreasing, while the bowl shape that bends upward means its slope is becoming less negative (Concave Up).'
      },
      {
        id: 'q-found-3',
        question: 'Using logarithm laws, how can you expand ln( (x^3 * e^x) / sqrt(x + 1) ) before differentiating?',
        options: [
          '3 ln(x) + x - (1/2) ln(x + 1)',
          '3x / sqrt(x + 1)',
          'ln(x^3) * ln(e^x) - ln(sqrt(x + 1))',
          '3 ln(x) + e^x + 2 ln(x + 1)'
        ],
        correctIndex: 0,
        explanation: 'Products become sums, quotients become differences, and exponents pull down in front: ln(x^3) + ln(e^x) - ln((x+1)^{1/2}) = 3 ln(x) + x - (1/2) ln(x + 1).'
      },
      {
        id: 'q-found-4',
        question: 'What is the natural domain of f(x) = ln(x - 2) / (x - 5)?',
        options: [
          '(2, 5) U (5, infinity)',
          '[2, 5) U (5, infinity)',
          'All real numbers except x = 5',
          '(0, infinity)'
        ],
        correctIndex: 0,
        explanation: 'A logarithm requires a strictly positive input (x - 2 > 0 => x > 2, open parenthesis), and the denominator forbids x = 5, giving (2, 5) U (5, infinity).'
      }
    ]
  },
  {
    id: 'limits',
    number: 2,
    title: 'Limits & Continuity',
    shortTitle: '2. Limits & Continuity',
    badgeTitle: 'Infinity Tamer',
    tagline: 'The art of getting infinitely close without ever needing to touch.',
    eli5Summary:
      'A limit asks where a trail is leading as you walk toward a spot—even if the bridge at that exact spot is washed out.',
    accentColor: 'from-sky-500 to-indigo-500',
    linkedSandbox: 'limit',
    concepts: [
      {
        id: 'zooming-in-limit',
        title: 'The "Zooming In" Concept & Two-Sided Limits',
        subtitle: 'Approaching a Target from Left and Right',
        eli5Sentence:
          'A limit is the height your finger points to when you trace a graph from both the left and the right toward a specific x-value, regardless of what happens at the exact dot.',
        intuitionParagraph:
          'Sometimes plugging a number directly into a formula causes a 0/0 explosion—like (x^2 - 4)/(x - 2) at x = 2. A limit bypasses the explosion by asking: as x creeps closer and closer to 2 (1.9, 1.99, 1.999 from the left, and 2.1, 2.01, 2.001 from the right), what number does f(x) squeeze toward? If both sides agree on the same destination L, the limit exists!',
        deepDiveDetails: [
          'The 3-Step Limit Attack Plan: (Step 1) Try Direct Substitution first—plug in x = a. If you get a normal number, you’re done! (Step 2) If you get 0/0 ("Indeterminate Hole"), simplify algebraically by factoring, multiplying by the radical conjugate, or combining fractions, then cancel the (x - a) factor. (Step 3) If you get (Non-Zero)/0 (like 5/0), there is a Vertical Asymptote—check the sign on left and right for +∞ or -∞.',
          'Epsilon-Delta (ε-δ) Intuition: Saying lim_{x->a} f(x) = L means: tell me how close (ε) you want the output f(x) to stay near target L, and I can give you a microscopic horizontal window (δ) around a that guarantees f(x) stays inside your target zone!'
        ],
        realWorldApplication:
          'Digital audio and video codecs repair dropped packets (missing data holes) by computing the limit from neighboring samples on the left and right.',
        keyFormula: '\\lim_{x \\to a} f(x) = L \\iff \\lim_{x \\to a^-} f(x) = L \\text{ and } \\lim_{x \\to a^+} f(x) = L',
        formulaLabel: 'Existence of a Two-Sided Limit',
        visualAnalogy:
          'Imagine two friends walking toward the same café from opposite ends of a street. Even if the café door is locked when they arrive, they still meet at the exact same address.',
        commonPitfall:
          'Thinking lim_{x->a} f(x) requires f(a) to be defined. A graph can have an open hole at x = a (or a displaced dot floating higher up) and still have a crystal-clear limit!',
        keyTakeaways: [
          'Left-hand limit (x -> a^-) and right-hand limit (x -> a^+) must match for the two-sided limit to exist.',
          'Zooming in 1000x on any smooth curve makes it look like a straight line (Local Linearity).',
          'If direct substitution gives 0/0, factor, rationalize with the conjugate, or simplify to cancel the troublemaker term.'
        ]
      },
      {
        id: 'continuity-asymptotes',
        title: 'Continuity, Infinity & Asymptotes',
        subtitle: 'Unbroken Curves, End Behavior & The Intermediate Value Theorem',
        eli5Sentence:
          'A function is continuous if you can draw its entire graph from left to right without ever lifting your pencil off the paper.',
        intuitionParagraph:
          'Mathematically, continuity at x = a means three things hold simultaneously: (1) f(a) is defined (there is a solid dot), (2) lim_{x->a} f(x) exists (left and right paths meet), and (3) the dot sits right where the paths meet: lim_{x->a} f(x) = f(a). When a denominator shrinks to zero while the numerator stays non-zero, the graph shoots toward infinity (Vertical Asymptote). When x grows to ±∞ and f(x) settles toward a flat height L, we get a Horizontal Asymptote.',
        deepDiveDetails: [
          'Horizontal Asymptotes via Degree Comparison (for P(x)/Q(x) as x -> ±∞): (Case 1: Bottom-Heavy, deg P < deg Q) Limit is 0 (y = 0). (Case 2: Balanced Degrees, deg P = deg Q) Limit is the ratio of leading coefficients! (Case 3: Top-Heavy, deg P > deg Q) Limit grows to ±∞ (no horizontal asymptote).',
          'Growth Speed Hierarchy as x -> ∞: From slowest to fastest: ln(x) << x^p (polynomials) << e^x (exponentials) << x! << x^x. In any limit as x -> ∞, faster-growing families dominate!',
          'Intermediate Value Theorem (IVT): If f is continuous on [a, b] and f(a) and f(b) have opposite signs (one negative, one positive), then f(c) = 0 MUST have at least one root c inside (a, b).'
        ],
        realWorldApplication:
          'Pharmacokinetics uses horizontal asymptotes to model steady-state medication concentration in a patient’s bloodstream over repeated daily doses.',
        keyFormula: '\\text{Continuous at } a \\iff \\lim_{x \\to a} f(x) = f(a) \\quad | \\quad \\lim_{x \\to \\infty} \\frac{a_n x^n + \\dots}{b_n x^n + \\dots} = \\frac{a_n}{b_n}',
        formulaLabel: 'Continuity Bridge & End-Behavior Dominance',
        visualAnalogy:
          'An asymptote is like a runway guide laser: a jet flies closer and closer alongside the beam for miles, aligning with it.',
        commonPitfall:
          'Assuming a function can never cross a horizontal asymptote. Graphs can cross horizontal asymptotes near the middle; horizontal asymptotes only govern far-end behavior as x -> ±∞.',
        keyTakeaways: [
          'Three types of discontinuities: Removable (a single hole), Jump (a step break), and Infinite (vertical asymptote).',
          'For rational functions as x -> ∞, only the highest powers of x on top and bottom matter.',
          'The Intermediate Value Theorem guarantees a continuous curve hits every height between f(a) and f(b).'
        ]
      },
      {
        id: 'squeeze-and-trig-limits',
        title: 'The Squeeze Theorem & Fundamental Trig Limits',
        subtitle: 'Trapping Wild Oscillations Between Two Friendly Guards',
        eli5Sentence:
          'If you walk down a hallway handcuffed between two guards who both walk through the exact same doorway, you are forced to go through that doorway too!',
        intuitionParagraph:
          'Some functions—like x^2 * sin(1/x) as x -> 0—wiggle infinitely fast near 0, so direct substitution fails because sin(1/0) oscillates wildly between -1 and +1. However, since -1 <= sin(1/x) <= 1 is always trapped, multiplying by x^2 traps our function between -x^2 and +x^2. Because both -x^2 and +x^2 head to 0 as x -> 0, the Squeeze (Sandwich) Theorem proves x^2 * sin(1/x) must also go to 0!',
        deepDiveDetails: [
          'How to Set Up Any Squeeze Theorem Proof: Start with the universal bound -1 <= sin(anything) <= 1 or -1 <= cos(anything) <= 1. Multiply all three parts by the outer envelope (like x^2), then take the limit of the left guard and right guard.',
          'Geometric Proof of lim_{x->0} sin(x)/x = 1: On the unit circle, a tiny sector of angle x (in radians) is sandwiched between an inner triangle of area (1/2)sin(x)cos(x) and an outer tangent triangle of area (1/2)tan(x), squeezing sin(x)/x between cos(x) and 1/cos(x) -> 1!'
        ],
        realWorldApplication:
          'Damped mechanical shock absorbers in cars follow e^{-kt} cos(ωt)—squeezed between ±e^{-kt} so vibrations decay smoothly to zero.',
        keyFormula: 'g(x) \\leq f(x) \\leq h(x) \\text{ and } \\lim_{x \\to a} g(x) = \\lim_{x \\to a} h(x) = L \\implies \\lim_{x \\to a} f(x) = L',
        formulaLabel: 'The Squeeze (Sandwich) Theorem',
        visualAnalogy:
          'Two slices of bread (g(x) and h(x)) pinched together at the crust force the cheese in the middle (f(x)) to the exact same pinch point.',
        commonPitfall:
          'Trying to say "lim_{x->0} x^2 * sin(1/x) = 0 * sin(∞) = 0". Because sin(1/x) has no limit of its own as x -> 0, you cannot split the product—you must invoke the Squeeze Theorem!',
        keyTakeaways: [
          'Use the Squeeze Theorem whenever you see a bounded wave (sin or cos) multiplied by a factor shrinking to 0.',
          'Memorize the twin trig limits: lim_{u->0} sin(u)/u = 1 and lim_{u->0} (1 - cos(u))/u = 0.',
          'For expressions like sin(5x)/(3x) as x -> 0, match the angle by multiplying top and bottom to get 5/3.'
        ]
      },
      {
        id: 'lhopitals-rule',
        title: 'L’Hôpital’s Rule: The Indeterminate Tie-Breaker',
        subtitle: 'Resolving 0/0, ∞/∞, 0·∞, and 1^∞ Tug-of-Wars',
        eli5Sentence:
          'When both the top and bottom of a fraction race toward zero (or both race toward infinity), we compare their speeds (derivatives) to see who wins the tug-of-war.',
        intuitionParagraph:
          'An expression like 0/0 or ∞/∞ is called an indeterminate form because the numerator and denominator pull in opposite directions. Guillaume de l’Hôpital popularized Johann Bernoulli’s brilliant shortcut: take the derivative of the top and the derivative of the bottom separately, then re-evaluate the limit!',
        deepDiveDetails: [
          'Converting Disguised Indeterminate Forms: (1) Product 0 · ∞: Rewrite f·g as f / (1/g) or g / (1/f) to turn it into 0/0 or ∞/∞. (2) Exponential powers 1^∞, 0^0, ∞^0: Take the natural log y = f(x)^{g(x)} => ln(y) = g(x)·ln(f(x)), evaluate the limit L of ln(y) using L’Hôpital’s Rule, and finish with e^L!'
        ],
        realWorldApplication:
          'Used in physics to prove that relativistic kinetic energy reduces to Newton’s classical (1/2)mv^2 in the low-speed limit v/c -> 0.',
        keyFormula: '\\text{If } \\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\frac{0}{0} \\text{ or } \\frac{\\pm\\infty}{\\pm\\infty}, \\text{ then } \\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f\'(x)}{g\'(x)}',
        formulaLabel: 'L’Hôpital’s Rule',
        visualAnalogy:
          'If two runners start at the same line (0/0), the ratio of their distances a split second after the starter pistol fires is simply the ratio of their starting speeds!',
        commonPitfall:
          'Applying the Quotient Rule instead of taking the derivative of numerator and denominator separately—or using L’Hôpital’s Rule when the limit is NOT 0/0 or ∞/∞.',
        keyTakeaways: [
          'ALWAYS check that direct substitution gives 0/0 or ∞/∞ before invoking L’Hôpital’s Rule.',
          'Differentiate top alone and bottom alone: f\'(x) / g\'(x).',
          'Can be applied repeatedly if the new ratio is still 0/0 or ∞/∞.'
        ]
      }
    ],
    workedExamples: [
      {
        id: 'ex-limits-1',
        title: 'Healing a Removable Hole by Factoring',
        difficulty: 'Warm-Up',
        problemStatement: 'Evaluate the limit below where direct substitution produces 0/0:',
        problemMath: '\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}',
        realWorldContext: 'Calculating instantaneous state at a singular timestamp where raw sensor division by zero would crash.',
        steps: [
          {
            stepNumber: 1,
            math: '\\frac{(3)^2 - 9}{3 - 3} = \\frac{0}{0}\\text{ (Indeterminate Form)}',
            plainEnglish: 'Plug in x = 3 first. Getting 0/0 tells us there is a hidden common factor (a removable hole) waiting to be canceled.',
            strategyTip: '0/0 is a green light meaning (x - 3) is a factor of both top and bottom!'
          },
          {
            stepNumber: 2,
            math: '\\lim_{x \\to 3} \\frac{(x - 3)(x + 3)}{x - 3}',
            plainEnglish: 'Factor the numerator x^2 - 9 as a difference of squares: (x - 3)(x + 3).',
            strategyTip: 'Recall a^2 - b^2 = (a - b)(a + b).'
          },
          {
            stepNumber: 3,
            math: '\\lim_{x \\to 3} (x + 3) = 3 + 3 = 6',
            plainEnglish: 'Since x approaches 3 without equaling 3, (x - 3) is non-zero and cancels out! Now plug 3 into (x + 3).',
            strategyTip: 'Drop the "lim" notation the exact moment you plug in x = 3.'
          }
        ],
        finalAnswer: '6'
      },
      {
        id: 'ex-limits-2',
        title: 'Rationalizing a Square Root Limit with the Conjugate',
        difficulty: 'Core',
        problemStatement: 'Evaluate the limit containing a square root by multiplying by the conjugate:',
        problemMath: '\\lim_{x \\to 0} \\frac{\\sqrt{x + 4} - 2}{x}',
        realWorldContext: 'Finds the instantaneous sensitivity of a pendulum period T ~ sqrt(L) near length L = 4.',
        steps: [
          {
            stepNumber: 1,
            math: '\\frac{\\sqrt{0 + 4} - 2}{0} = \\frac{2 - 2}{0} = \\frac{0}{0}',
            plainEnglish: 'Direct substitution gives 0/0. Because there is a square root minus a number, our secret weapon is the Conjugate!',
            strategyTip: 'Whenever you see (sqrt(A) - B) giving 0/0, multiply top and bottom by (sqrt(A) + B).'
          },
          {
            stepNumber: 2,
            math: '\\lim_{x \\to 0} \\frac{(\\sqrt{x + 4} - 2)(\\sqrt{x + 4} + 2)}{x(\\sqrt{x + 4} + 2)} = \\lim_{x \\to 0} \\frac{(x + 4) - 4}{x(\\sqrt{x + 4} + 2)}',
            plainEnglish: 'Multiply numerator and denominator by (sqrt(x+4) + 2). On top, (a - b)(a + b) = a^2 - b^2 cleanly removes the square root!',
            strategyTip: 'Do NOT expand the denominator—leave x factored outside so it is ready to cancel!'
          },
          {
            stepNumber: 3,
            math: '\\lim_{x \\to 0} \\frac{x}{x(\\sqrt{x + 4} + 2)} = \\lim_{x \\to 0} \\frac{1}{\\sqrt{x + 4} + 2}',
            plainEnglish: 'Simplify (x + 4) - 4 to x on top, then cancel x from top and bottom.',
            strategyTip: 'Canceling x leaves a 1 in the numerator.'
          },
          {
            stepNumber: 4,
            math: '\\frac{1}{\\sqrt{0 + 4} + 2} = \\frac{1}{2 + 2} = \\frac{1}{4}',
            plainEnglish: 'Now substitute x = 0 safely with zero division-by-zero trouble!',
            strategyTip: 'Both radical terms in the denominator evaluate to 2, adding up to 4.'
          }
        ],
        finalAnswer: '\\frac{1}{4}'
      },
      {
        id: 'ex-limits-3',
        title: 'Using L’Hôpital’s Rule Twice on an Exponential Limit',
        difficulty: 'Core',
        problemStatement: 'Evaluate the classic second-order limit using L’Hôpital’s Rule:',
        problemMath: '\\lim_{x \\to 0} \\frac{e^{2x} - 1 - 2x}{x^2}',
        realWorldContext: 'Measures the second-order curvature error when approximating exponential growth by a straight tangent line.',
        steps: [
          {
            stepNumber: 1,
            math: '\\frac{e^{0} - 1 - 0}{0^2} = \\frac{1 - 1}{0} = \\frac{0}{0}',
            plainEnglish: 'Verify that plugging in x = 0 yields the 0/0 indeterminate form. Permission granted to use L’Hôpital’s Rule!',
            strategyTip: 'Always show the 0/0 check on exams to earn full method marks.'
          },
          {
            stepNumber: 2,
            math: '\\lim_{x \\to 0} \\frac{\\frac{d}{dx}(e^{2x} - 1 - 2x)}{\\frac{d}{dx}(x^2)} = \\lim_{x \\to 0} \\frac{2e^{2x} - 2}{2x}',
            plainEnglish: 'Take the derivative of the numerator (2e^{2x} - 2) and denominator (2x) separately. Plugging in 0 gives (2 - 2)/0 = 0/0 again!',
            strategyTip: 'Remember the Chain Rule on e^{2x}: its derivative is 2e^{2x}.'
          },
          {
            stepNumber: 3,
            math: '\\lim_{x \\to 0} \\frac{4e^{2x}}{2} = \\frac{4e^0}{2} = \\frac{4(1)}{2} = 2',
            plainEnglish: 'Apply L’Hôpital’s Rule a second time! Differentiate top (4e^{2x}) and bottom (2), then substitute x = 0.',
            strategyTip: 'Once the denominator is a non-zero constant (2), the indeterminate form is completely resolved!'
          }
        ],
        finalAnswer: '2'
      },
      {
        id: 'ex-limits-4',
        title: 'Making a Piecewise Function Continuous Everywhere',
        difficulty: 'Core',
        problemStatement: 'Find the exact value of the constant k that makes the piecewise function f(x) continuous at x = 2:',
        problemMath: 'f(x) = \\begin{cases} kx^2 + 3x, & x < 2 \\\\ 5x + k, & x \\geq 2 \\end{cases}',
        realWorldContext: 'Engineers spline two railway track segments together at x = 2 so trains experience no sudden jump.',
        steps: [
          {
            stepNumber: 1,
            math: '\\lim_{x \\to 2^-} f(x) = \\lim_{x \\to 2^-} (kx^2 + 3x) = k(2)^2 + 3(2) = 4k + 6',
            plainEnglish: 'Evaluate the left-hand limit as x approaches 2 from below (using the x < 2 formula).',
            strategyTip: 'Even though x < 2 is a strict inequality, the limit still plugs x = 2 into the left branch.'
          },
          {
            stepNumber: 2,
            math: '\\lim_{x \\to 2^+} f(x) = f(2) = 5(2) + k = 10 + k',
            plainEnglish: 'Evaluate the right-hand limit and function value at x = 2 (using the x >= 2 formula).',
            strategyTip: 'Both branches are polynomials, so they are automatically continuous on their own interiors.'
          },
          {
            stepNumber: 3,
            math: '4k + 6 = 10 + k \\implies 3k = 4 \\implies k = \\frac{4}{3}',
            plainEnglish: 'Set the left-hand limit equal to the right-hand limit so the two branches meet seamlessly, and solve for k!',
            strategyTip: 'Plug k = 4/3 back into both sides to verify: 4(4/3) + 6 = 34/3 and 10 + 4/3 = 34/3. Match!'
          }
        ],
        finalAnswer: 'k = \\frac{4}{3}'
      },
      {
        id: 'ex-limits-5',
        title: 'Horizontal Asymptote of a Radical Function at ±Infinity',
        difficulty: 'Challenge',
        problemStatement: 'Find the horizontal asymptotes as x -> +∞ and as x -> -∞ for:',
        problemMath: 'f(x) = \\frac{6x - 1}{\\sqrt{4x^2 + 9}}',
        realWorldContext: 'Relativistic velocity formula v/c = p / sqrt(m^2 c^2 + p^2) approaching +c or -c at extreme momentum.',
        steps: [
          {
            stepNumber: 1,
            math: '\\sqrt{4x^2 + 9} = \\sqrt{x^2\\left(4 + \\frac{9}{x^2}\\right)} = |x|\\sqrt{4 + \\frac{9}{x^2}}',
            plainEnglish: 'Factor x^2 out of the square root. Crucial algebra fact: sqrt(x^2) is |x| (absolute value of x), NOT just x!',
            strategyTip: 'For x > 0 (x -> +∞), |x| = +x. For x < 0 (x -> -∞), |x| = -x!'
          },
          {
            stepNumber: 2,
            math: '\\lim_{x \\to +\\infty} \\frac{x(6 - 1/x)}{+x\\sqrt{4 + 9/x^2}} = \\frac{6 - 0}{\\sqrt{4 + 0}} = \\frac{6}{2} = 3',
            plainEnglish: 'For x -> +∞, replace |x| with +x, cancel x, and let 1/x -> 0 to get y = 3.',
            strategyTip: 'Any constant divided by x or x^2 vanishes to 0 as x -> ±∞.'
          },
          {
            stepNumber: 3,
            math: '\\lim_{x \\to -\\infty} \\frac{x(6 - 1/x)}{-x\\sqrt{4 + 9/x^2}} = \\frac{6}{-\\sqrt{4}} = -3',
            plainEnglish: 'For x -> -∞, replace |x| with -x, cancel x, and get y = -3. This function has TWO distinct horizontal asymptotes!',
            strategyTip: 'Functions with sqrt(x^2) in the denominator are famous for having opposite asymptotes at +∞ and -∞.'
          }
        ],
        finalAnswer: 'y = 3 \\text{ (as } x \\to +\\infty\\text{)} \\quad \\text{and} \\quad y = -3 \\text{ (as } x \\to -\\infty\\text{)}'
      }
    ],
    quiz: [
      {
        id: 'q-lim-1',
        question: 'What is required BEFORE you are allowed to apply L’Hôpital’s Rule to lim_{x->a} f(x)/g(x)?',
        options: [
          'f(x) and g(x) must both be polynomials',
          'Direct substitution must yield an indeterminate form like 0/0 or infinity/infinity',
          'The denominator g(a) must equal 1',
          'You must apply the Quotient Rule first'
        ],
        correctIndex: 1,
        explanation: 'L’Hôpital’s Rule only applies to indeterminate ratios (0/0 or +-infinity/+-infinity). Using it on a non-indeterminate fraction gives a wrong answer!'
      },
      {
        id: 'q-lim-2',
        question: 'As x approaches infinity, what is the horizontal asymptote of f(x) = (4x^3 + 5x) / (2x^3 - 7)?',
        options: ['y = 0', 'y = 4', 'y = 2', 'No horizontal asymptote'],
        correctIndex: 2,
        explanation: 'Because the highest power of x is x^3 in both numerator and denominator, the limit as x -> infinity is the ratio of their leading coefficients: 4 / 2 = 2.'
      },
      {
        id: 'q-lim-3',
        question: 'What is the value of the trigonometric limit lim_{x -> 0} sin(7x) / (2x)?',
        options: ['1', '0', '7 / 2', '2 / 7'],
        correctIndex: 2,
        explanation: 'Since sin(7x) / (7x) -> 1 as x -> 0, rewriting sin(7x)/(2x) as (7/2) * [sin(7x)/(7x)] gives (7/2) * 1 = 7/2.'
      },
      {
        id: 'q-lim-4',
        question: 'If f(x) is continuous on [1, 5] with f(1) = -3 and f(5) = 8, which theorem guarantees there is at least one c in (1, 5) where f(c) = 0?',
        options: [
          'Intermediate Value Theorem (IVT)',
          'Squeeze Theorem',
          'L’Hôpital’s Rule',
          'Power Rule'
        ],
        correctIndex: 0,
        explanation: 'The Intermediate Value Theorem guarantees that a continuous function on [a, b] takes on every intermediate height between f(a) = -3 and f(b) = 8, including y = 0.'
      }
    ]
  },
  {
    id: 'derivatives',
    number: 3,
    title: 'Differential Calculus (Derivatives)',
    shortTitle: '3. Derivatives',
    badgeTitle: 'Derivative Architect',
    tagline: 'Capturing the exact speed of change in a single frozen microsecond.',
    eli5Summary:
      'A derivative is your car’s speedometer: it tells you how fast your value is changing at this exact instant, which is the slope of the line kissing the curve.',
    accentColor: 'from-emerald-500 to-teal-500',
    linkedSandbox: 'derivative',
    concepts: [
      {
        id: 'instantaneous-speed-tangent',
        title: 'Instantaneous Speed, Differentiability & The Tangent Line',
        subtitle: 'When Two Points Melt Into One & Local Linear Approximation',
        eli5Sentence:
          'If you slide two points on a curve closer and closer until the gap between them shrinks to zero, the line connecting them becomes a tangent line that grazes the curve at a single instant.',
        intuitionParagraph:
          'How can you have speed in a frozen photograph where zero time passes? By taking the limit of average speed over a tiny time window h as h -> 0! The resulting value f\'(x) is the Derivative: both the instantaneous rate of change of f(x) and the exact slope of the tangent line at x. Even better, near x = a, the tangent line L(x) = f(a) + f\'(a)(x - a) acts as a super-accurate flat stand-in for the curve!',
        deepDiveDetails: [
          'Three Places Where a Derivative Fails to Exist: (1) A sharp corner or cusp (like y = |x| at x = 0, where left slope is -1 and right slope is +1); (2) A vertical tangent line (like y = x^{1/3} at x = 0, where slope is infinite); (3) Any discontinuity (jump, hole, or asymptote).',
          'Linearization (Tangent Line Approximation): To estimate a tough number like sqrt(4.1) without a calculator, anchor at a = 4 where f(4) = 2 and f\'(4) = 1/(2*sqrt(4)) = 1/4. Then L(4.1) = 2 + (1/4)(4.1 - 4) = 2.025 (actual value: 2.02485!).',
          'Physics Hierarchy of Motion: Position s(t) -> First Derivative is Velocity v(t) = s\'(t) -> Second Derivative is Acceleration a(t) = v\'(t) = s\'\'(t).'
        ],
        realWorldApplication:
          'Flight autopilot systems linearize nonlinear aerodynamic equations around the plane’s current altitude and airspeed every millisecond using L(x) = f(a) + f\'(a)(x - a).',
        keyFormula: 'f\'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}, \\quad L(x) = f(a) + f\'(a)(x - a)',
        formulaLabel: 'Derivative Definition & Tangent Line Linearization',
        visualAnalogy:
          'Spin a sparkler in a dark room in a circle. If a spark flies off at any instant, it travels in a straight line tangent to the circle at the exact moment it lets go.',
        commonPitfall:
          'Confusing the derivative value f\'(a) (which is a single slope number) with the tangent line equation y = f(a) + f\'(a)(x - a).',
        keyTakeaways: [
          'f\'(x) > 0 means f is rising; f\'(x) < 0 means f is falling; f\'(x) = 0 means a horizontal tangent.',
          'A function is NOT differentiable at sharp corners (like |x| at 0), vertical tangents, or breaks.',
          'Differentiability always implies Continuity, but Continuity does not guarantee Differentiability.'
        ]
      },
      {
        id: 'core-derivative-rules',
        title: 'The Big Four Rules: Power, Product, Quotient & Chain',
        subtitle: 'Fast-Track Shortcuts for Every Algebraic & Transcendental Expression',
        eli5Sentence:
          'Instead of solving a long limit every time, derivative rules let you dismantle complex formulas like LEGO bricks—layer by layer.',
        intuitionParagraph:
          'Once mathematicians proved the limit definition for basic building blocks, they discovered four universal patterns: the Power Rule brings the exponent down and subtracts one; the Product Rule takes turns differentiating each factor; the Quotient Rule follows "low d-high minus high d-low over low-squared"; and the Chain Rule peels nested functions from the outside shell to the inside core.',
        deepDiveDetails: [
          'Why the Product Rule Has Two Terms: Imagine a rectangle of width u and height v. When width grows by du and height grows by dv, the new area strip comes from TWO edges: u·dv (top strip) plus v·du (side strip)!',
          'Chain Rule in Leibniz Notation: dy/dx = (dy/du) · (du/dx). Think of gear ratios on a bicycle: if the front pedal turns the middle gear 3x faster (du/dx = 3) and the middle gear turns the back wheel 2x faster (dy/du = 2), the back wheel spins 3 · 2 = 6x faster!',
          'Logarithmic Differentiation: For variable-to-variable powers like y = x^x, neither Power Rule nor Exponential Rule works alone. Take ln of both sides first: ln(y) = x·ln(x), then differentiate implicitly!'
        ],
        realWorldApplication:
          'Every modern AI and deep-learning model (like GPT and image generators) learns via Backpropagation—which is literally just the Chain Rule applied across layers of neurons!',
        keyFormula: '\\text{Chain: } \\frac{d}{dx}[f(g(x))] = f\'(g(x))g\'(x) \\quad | \\quad \\text{Product: } (fg)\' = f\'g + fg\' \\quad | \\quad \\text{Quotient: } \\left(\\frac{f}{g}\\right)\' = \\frac{gf\' - fg\'}{g^2}',
        formulaLabel: 'Chain, Product & Quotient Rules',
        visualAnalogy:
          'The Chain Rule is like unwrapping a Russian nesting doll: you open the outer doll first (keeping the inner doll intact inside), then multiply by the derivative of the inner doll.',
        commonPitfall:
          'Assuming the derivative of f(x)·g(x) is simply f\'(x)·g\'(x). Never multiply derivatives directly—always use f\'g + fg\'!',
        keyTakeaways: [
          'Power Rule works for negative and fractional exponents too: sqrt(x) = x^{1/2} -> (1/2)x^{-1/2}.',
          'Product Rule: (fg)\' = f\'g + fg\' ("first d-second plus second d-first").',
          'Quotient Rule: (f/g)\' = (g f\' - f g\') / g^2 ("low d-high minus high d-low, over the square of what’s below").'
        ]
      },
      {
        id: 'implicit-and-related-rates',
        title: 'Implicit Differentiation & Related Rates',
        subtitle: 'Untangling Coupled Variables and Linked Real-Time Motion',
        eli5Sentence:
          'When two quantities are connected—like the radius and area of an expanding ripple in a pond—knowing how fast one grows automatically tells you how fast the other grows.',
        intuitionParagraph:
          'Sometimes x and y are woven together in an equation like a circle x^2 + y^2 = 25 where solving for y is messy. Implicit Differentiation treats y as a hidden function y(x), differentiating both sides with respect to x and attaching dy/dx via the Chain Rule whenever we differentiate a y-term. In Related Rates word problems, both x(t) and y(t) change over time t, so we differentiate the geometric equation with respect to time t!',
        deepDiveDetails: [
          '4-Step Recipe for Implicit Differentiation: (1) Differentiate both sides with respect to x, multiplying by dy/dx every time you differentiate a y term; (2) Move all terms containing dy/dx to the left side and all other terms to the right; (3) Factor out dy/dx; (4) Divide to isolate dy/dx.',
          '5-Step Recipe for Related Rates: (1) Draw a sketch and label variables that change with time t; (2) Write the master geometric equation (Pythagorean theorem a^2 + b^2 = c^2, circle A = πr^2, cone V = (1/3)πr^2h, or similar triangles); (3) Differentiate both sides with respect to time t BEFORE plugging in "snapshot" numbers; (4) Plug in known rates and snapshot values; (5) Solve for the target rate!'
        ],
        realWorldApplication:
          'Air traffic control radar tracks the distance R(t) and angle θ(t) of an approaching aircraft, using related rates to compute its true ground speed dx/dt.',
        keyFormula: '\\frac{d}{dx}[y^n] = n y^{n-1} \\frac{dy}{dx}, \\quad \\frac{d}{dt}[\\pi r^2] = 2\\pi r \\frac{dr}{dt}',
        formulaLabel: 'Implicit & Related-Rates Chain Rule',
        visualAnalogy:
          'Imagine a ladder sliding down a wall: the top slides down (dy/dt < 0) while the bottom slides out (dx/dt > 0), locked together by x^2 + y^2 = L^2.',
        commonPitfall:
          'Plugging the snapshot numbers (like "when the radius is 5 cm") into the geometry formula BEFORE taking the derivative! If you plug in 5 too early, π(5)^2 becomes a constant and its derivative turns into 0!',
        keyTakeaways: [
          'Never substitute changing "instantaneous snapshot" numbers until AFTER you have differentiated with respect to time t.',
          'For products like x·y in implicit differentiation, don’t forget the Product Rule: d/dx[xy] = (1)y + x(dy/dx).',
          'Horizontal tangents on an implicit curve occur where the numerator of dy/dx is 0; vertical tangents occur where the denominator is 0.'
        ]
      },
      {
        id: 'implicit-and-optimization',
        title: 'Real-World Optimization & The Mean Value Theorem',
        subtitle: 'Finding Peaks, Valleys, and Guaranteed Instantaneous Speeds',
        eli5Sentence:
          'At the very top of a mountain peak or the very bottom of a valley, the ground beneath your feet is momentarily flat (slope equals zero).',
        intuitionParagraph:
          'How do engineers design a soda can that holds 355 mL using the least aluminum, or airlines price tickets to maximize revenue? By writing an Objective Function to maximize or minimize, using a Constraint Equation to eliminate extra variables, and setting the derivative f\'(x) = 0 to find critical points! Meanwhile, the Mean Value Theorem (MVT) proves that on any smooth road trip, your speedometer must match your average trip speed at least once.',
        deepDiveDetails: [
          'First Derivative Test for Local Extrema: At a critical point f\'(c) = 0, if f\' changes sign from (+) to (-), the curve went uphill then downhill -> Local Maximum! If f\' changes from (-) to (+), it went downhill then uphill -> Local Minimum!',
          'Second Derivative Test: If f\'(c) = 0 and f\'\'(c) < 0 (concave down umbrella), then c is a Local Maximum. If f\'(c) = 0 and f\'\'(c) > 0 (concave up bowl), then c is a Local Minimum.',
          'Extreme Value Theorem (Closed Interval [a, b]): To find the Absolute Max/Min on a closed interval [a, b], evaluate f(x) at (1) all critical points inside (a, b) AND (2) both endpoints x = a and x = b. Biggest output wins!'
        ],
        realWorldApplication:
          'Snell’s Law of light refraction in eyeglasses and fiber-optic cables comes directly from Fermat’s Principle: light chooses the path that minimizes travel time (dt/dx = 0)!',
        keyFormula: '\\text{Critical Points: } f\'(c) = 0 \\quad | \\quad \\text{Mean Value Theorem: } f\'(c) = \\frac{f(b) - f(a)}{b - a}',
        formulaLabel: 'Optimization Condition & Mean Value Theorem',
        visualAnalogy:
          'Toss a ball straight up: on the way up its velocity is positive, on the way down its velocity is negative, and at the exact highest apex its velocity is 0.',
        commonPitfall:
          'Finding where f\'(x) = 0 and forgetting to verify whether it’s actually a maximum or a minimum (or forgetting to check endpoints on a closed interval).',
        keyTakeaways: [
          'In optimization, always identify two equations: the Objective (what you want to maximize/minimize) and the Constraint (what is fixed).',
          'Second Derivative Test: f\'(c) = 0 with f\'\'(c) < 0 -> Peak (Max); f\'\'(c) > 0 -> Valley (Min).',
          'Mean Value Theorem requires f to be continuous on [a, b] and differentiable on (a, b).'
        ]
      }
    ],
    workedExamples: [
      {
        id: 'ex-deriv-1',
        title: 'Mastering the Chain Rule + Product Rule Combo',
        difficulty: 'Core',
        problemStatement: 'Find the derivative dy/dx of the function below:',
        problemMath: 'f(x) = x^2 \\cdot \\sin(3x^4 + 1)',
        realWorldContext: 'Models a radio wave whose amplitude grows quadratically while its phase frequency accelerates.',
        steps: [
          {
            stepNumber: 1,
            math: 'u = x^2, \\quad v = \\sin(3x^4 + 1) \\implies f\'(x) = u\'v + uv\'',
            plainEnglish: 'Recognize that the outer structure is two expressions multiplied together, so start with the Product Rule.',
            strategyTip: 'Look at the outermost operation first: here x^2 is multiplied by sin(3x^4 + 1).'
          },
          {
            stepNumber: 2,
            math: 'u\' = \\frac{d}{dx}(x^2) = 2x',
            plainEnglish: 'Use the Power Rule on the first factor x^2: bring down the 2 and reduce the power to 1.',
            strategyTip: 'Keep u\' and v\' organized on scratch paper before assembling.'
          },
          {
            stepNumber: 3,
            math: 'v\' = \\cos(3x^4 + 1) \\cdot \\frac{d}{dx}(3x^4 + 1) = \\cos(3x^4 + 1) \\cdot 12x^3',
            plainEnglish: 'Use the Chain Rule on sin(3x^4 + 1): outer derivative is cos(inside), multiplied by the inner derivative 12x^3.',
            strategyTip: 'Never change the angle inside cos(...) when differentiating the outer trig function!'
          },
          {
            stepNumber: 4,
            math: 'f\'(x) = 2x\\sin(3x^4 + 1) + 12x^5\\cos(3x^4 + 1)',
            plainEnglish: 'Assemble u\'v + uv\' and combine x^2 * 12x^3 into 12x^5 for a clean final expression.',
            strategyTip: 'Multiply polynomial coefficients and powers in front of the trig function so it isn’t confused with the angle.'
          }
        ],
        finalAnswer: '2x\\sin(3x^4 + 1) + 12x^5\\cos(3x^4 + 1)'
      },
      {
        id: 'ex-deriv-2',
        title: 'Quotient Rule + Simplification on a Rational Curve',
        difficulty: 'Warm-Up',
        problemStatement: 'Differentiate the rational function and simplify the numerator:',
        problemMath: 'f(x) = \\frac{3x - 5}{x^2 + 1}',
        realWorldContext: 'Models the concentration of a reactant in a chemical reactor over time.',
        steps: [
          {
            stepNumber: 1,
            math: '\\text{High } f = 3x - 5 \\implies f\' = 3 \\quad | \\quad \\text{Low } g = x^2 + 1 \\implies g\' = 2x',
            plainEnglish: 'Label the numerator ("High") and denominator ("Low") and write down each of their derivatives.',
            strategyTip: 'Writing f, f\', g, g\' in a 2x2 box prevents swapping the subtraction order in the Quotient Rule.'
          },
          {
            stepNumber: 2,
            math: 'f\'(x) = \\frac{(x^2 + 1)(3) - (3x - 5)(2x)}{(x^2 + 1)^2}',
            plainEnglish: 'Apply "Low d-High minus High d-Low, all over the square of what’s below."',
            strategyTip: 'Never expand the denominator (x^2 + 1)^2—factored denominators are much cleaner for finding critical points!'
          },
          {
            stepNumber: 3,
            math: 'f\'(x) = \\frac{3x^2 + 3 - (6x^2 - 10x)}{(x^2 + 1)^2} = \\frac{-3x^2 + 10x + 3}{(x^2 + 1)^2}',
            plainEnglish: 'Expand the top and distribute the negative sign across -(6x^2 - 10x) to get -3x^2 + 10x + 3.',
            strategyTip: 'Distributing the minus sign turn -(-10x) into +10x!'
          }
        ],
        finalAnswer: '\\frac{-3x^2 + 10x + 3}{(x^2 + 1)^2}'
      },
      {
        id: 'ex-deriv-3',
        title: 'Implicit Differentiation: Tangent Line to a Folium Curve',
        difficulty: 'Core',
        problemStatement: 'Find dy/dx by implicit differentiation and compute the slope of the tangent line at the point (2, 1) on the curve:',
        problemMath: 'x^3 + x^2 y - 2y^3 = 10',
        realWorldContext: 'Thermodynamic state equations PV^gamma + aV = b couple pressure and volume implicitly.',
        steps: [
          {
            stepNumber: 1,
            math: '\\frac{d}{dx}(x^3) + \\frac{d}{dx}(x^2 y) - \\frac{d}{dx}(2y^3) = \\frac{d}{dx}(10)',
            plainEnglish: 'Differentiate every term on both sides with respect to x. Remember that x^2 * y requires the Product Rule!',
            strategyTip: 'The derivative of the constant 10 on the right-hand side is 0 (a classic place people forget to differentiate!).'
          },
          {
            stepNumber: 2,
            math: '3x^2 + \\left(2xy + x^2 \\frac{dy}{dx}\\right) - 6y^2 \\frac{dy}{dx} = 0',
            plainEnglish: 'For x^2 y, Product Rule gives (2x)(y) + (x^2)(dy/dx). For -2y^3, Chain Rule gives -6y^2 (dy/dx).',
            strategyTip: 'Every time you differentiate y, attach dy/dx.'
          },
          {
            stepNumber: 3,
            math: '(x^2 - 6y^2)\\frac{dy}{dx} = -3x^2 - 2xy \\implies \\frac{dy}{dx} = \\frac{-3x^2 - 2xy}{x^2 - 6y^2}',
            plainEnglish: 'Group the dy/dx terms on the left, move everything else to the right, and divide by (x^2 - 6y^2).',
            strategyTip: 'You can also multiply top and bottom by -1 to write (3x^2 + 2xy) / (6y^2 - x^2).'
          },
          {
            stepNumber: 4,
            math: '\\left.\\frac{dy}{dx}\\right|_{(2,1)} = \\frac{-3(2)^2 - 2(2)(1)}{(2)^2 - 6(1)^2} = \\frac{-12 - 4}{4 - 6} = \\frac{-16}{-2} = 8',
            plainEnglish: 'Plug x = 2 and y = 1 into dy/dx to get the exact tangent slope m = 8.',
            strategyTip: 'The tangent line equation at (2, 1) is therefore y - 1 = 8(x - 2), or y = 8x - 15.'
          }
        ],
        finalAnswer: '\\frac{dy}{dx} = \\frac{3x^2 + 2xy}{6y^2 - x^2}, \\quad m_{(2,1)} = 8'
      },
      {
        id: 'ex-deriv-4',
        title: 'Related Rates: A Sliding Ladder Against a Wall',
        difficulty: 'Core',
        problemStatement: 'A 10-meter ladder leans against a vertical wall. If the bottom of the ladder slides away from the wall at dx/dt = 1.5 m/s, how fast is the top of the ladder sliding down the wall when the bottom is x = 6 meters from the wall?',
        problemMath: 'x^2 + y^2 = 10^2 = 100',
        realWorldContext: 'Robotics and mechanical linkages use related rates to translate linear actuator speed into joint velocity.',
        steps: [
          {
            stepNumber: 1,
            math: 'x^2 + y^2 = 100 \\implies \\text{When } x = 6:\\; 6^2 + y^2 = 100 \\implies y = \\sqrt{64} = 8\\text{ m}',
            plainEnglish: 'Write the Pythagorean relationship linking horizontal distance x and vertical height y, and find y = 8 m at the snapshot x = 6 m.',
            strategyTip: '6-8-10 is a 3-4-5 right triangle scaled by 2! Keep x and y as variables until AFTER differentiating.'
          },
          {
            stepNumber: 2,
            math: '\\frac{d}{dt}(x^2 + y^2) = \\frac{d}{dt}(100) \\implies 2x\\frac{dx}{dt} + 2y\\frac{dy}{dt} = 0',
            plainEnglish: 'Differentiate both sides with respect to time t. Because the ladder’s length (10 m) never changes, d/dt(100) = 0!',
            strategyTip: 'Divide the whole equation by 2 to simplify to x(dx/dt) + y(dy/dt) = 0.'
          },
          {
            stepNumber: 3,
            math: '(6)(1.5) + (8)\\frac{dy}{dt} = 0 \\implies 9 + 8\\frac{dy}{dt} = 0 \\implies \\frac{dy}{dt} = -\\frac{9}{8} = -1.125\\text{ m/s}',
            plainEnglish: 'Substitute the snapshot values x = 6, y = 8, and dx/dt = 1.5, then solve for dy/dt.',
            strategyTip: 'The negative sign (-1.125 m/s) makes physical sense because the height y is decreasing as the ladder slides down!'
          }
        ],
        finalAnswer: '-1.125\\text{ m/s} \\; (\\text{sliding down at } 1.125\\text{ m/s})'
      },
      {
        id: 'ex-deriv-5',
        title: 'Real-World Optimization: Maximizing Garden Area',
        difficulty: 'Challenge',
        problemStatement: 'Clara has 100 meters of fencing to enclose a rectangular garden along a stone wall (so only 3 sides need fencing). What dimensions maximize the garden’s area?',
        problemMath: '\\text{Maximize } A = x \\cdot y \\quad \\text{subject to } 2x + y = 100',
        realWorldContext: 'Classic architectural & engineering resource optimization problem.',
        steps: [
          {
            stepNumber: 1,
            math: 'y = 100 - 2x \\implies A(x) = x(100 - 2x) = 100x - 2x^2',
            plainEnglish: 'Solve the fencing constraint for y so we can write Area A(x) using a single variable x.',
            strategyTip: 'Always use the Constraint equation to eliminate one variable from the Objective equation.'
          },
          {
            stepNumber: 2,
            math: 'A\'(x) = \\frac{d}{dx}(100x - 2x^2) = 100 - 4x',
            plainEnglish: 'Take the derivative of the Area function to find its instantaneous rate of change with respect to width x.',
            strategyTip: 'At the maximum area, adding a tiny bit more width neither increases nor decreases area (slope = 0).'
          },
          {
            stepNumber: 3,
            math: '100 - 4x = 0 \\implies 4x = 100 \\implies x = 25\\text{ m}',
            plainEnglish: 'Set the derivative equal to zero to locate the peak of the area parabola.',
            strategyTip: 'Check domain: 0 < x < 50, so x = 25 m is well inside the valid range.'
          },
          {
            stepNumber: 4,
            math: 'A\'\'(x) = -4 < 0 \\implies \\text{Maximum! } y = 100 - 2(25) = 50\\text{ m}, \\quad A_{\\max} = 1250\\text{ m}^2',
            plainEnglish: 'Confirm it is a maximum by the Second Derivative Test (A\'\' = -4 < 0), then compute length y = 50 m and max area 1250 m^2.',
            strategyTip: 'Notice a universal pattern: for a 3-sided fence against a wall, the long side parallel to the wall is always twice the short side!'
          }
        ],
        finalAnswer: '25\\text{ m} \\times 50\\text{ m} \\; (\\text{Max Area } = 1250\\text{ m}^2)'
      }
    ],
    quiz: [
      {
        id: 'q-deriv-1',
        question: 'What is the derivative of f(x) = e^{5x} with respect to x?',
        options: ['e^{5x}', '5x e^{5x-1}', '5e^{5x}', 'e^5'],
        correctIndex: 2,
        explanation: 'By the Chain Rule, the derivative of e^{u} is e^{u} * u\'. Since u = 5x and u\' = 5, we get 5e^{5x}.'
      },
      {
        id: 'q-deriv-2',
        question: 'Using Implicit Differentiation on x^2 + y^2 = 25, what is dy/dx?',
        options: ['-x / y', '2x / 2y', '-2x', '25 - x / y'],
        correctIndex: 0,
        explanation: 'Differentiating both sides gives 2x + 2y(dy/dx) = 0. Subtract 2x and divide by 2y to get dy/dx = -x/y.'
      },
      {
        id: 'q-deriv-3',
        question: 'If f\'(c) = 0 and the second derivative at c is f\'\'(c) = -9, what does the Second Derivative Test tell us about x = c?',
        options: [
          'f has a Local Maximum at x = c',
          'f has a Local Minimum at x = c',
          'f has an Inflection Point at x = c',
          'The test is inconclusive'
        ],
        correctIndex: 0,
        explanation: 'Because f\'\'(c) = -9 < 0, the graph is Concave Down (shaped like an umbrella) at its flat tangent, making x = c a Local Maximum peak!'
      },
      {
        id: 'q-deriv-4',
        question: 'A particle’s position is s(t) = t^3 - 6t^2 + 9t. At what time(s) t is the particle momentarily at rest (velocity = 0)?',
        options: [
          't = 1 and t = 3',
          't = 2 only',
          't = 0 and t = 3',
          't = 3 and t = 6'
        ],
        correctIndex: 0,
        explanation: 'Velocity is v(t) = s\'(t) = 3t^2 - 12t + 9 = 3(t - 1)(t - 3). Setting v(t) = 0 yields t = 1 and t = 3.'
      }
    ]
  },
  {
    id: 'integrals',
    number: 4,
    title: 'Integral Calculus (Integrals)',
    shortTitle: '4. Integrals',
    badgeTitle: 'Area Alchemist',
    tagline: 'Adding up infinitely many paper-thin slices to measure total accumulation.',
    eli5Summary:
      'If a derivative slices a loaf of bread into thin sheets to see how fast it changes, an integral glues all those thin slices back together to find the whole loaf.',
    accentColor: 'from-violet-500 to-purple-600',
    linkedSandbox: 'riemann',
    concepts: [
      {
        id: 'riemann-sums-area',
        title: 'Area Under the Curve & Riemann Sums',
        subtitle: 'Approximating Curved Shapes with Simple Rectangles',
        eli5Sentence:
          'To find the area under a wavy curve, pack the space with narrow vertical rectangles—as you make the rectangles thinner and thinner, the jagged staircase melts into the exact smooth area.',
        intuitionParagraph:
          'We know how to find the area of a rectangle: height times width. Bernhard Riemann formalized how to measure any curved region from x = a to x = b: slice the base into n equal pieces of width Δx = (b - a)/n, use the curve height f(x_i^*) at each slice, and sum them up. Taking the limit as n -> ∞ turns the Greek sigma sum Σ into the graceful elongated S of the definite integral ∫!',
        deepDiveDetails: [
          'Overestimate vs. Underestimate Rules: On an INCREASING curve, Left-endpoint rectangles sit under the curve (Underestimate) and Right-endpoint rectangles stick out above (Overestimate). On a CONCAVE UP curve, Trapezoids sit slightly above the curve (Overestimate) while Midpoint rectangles slightly underestimate!',
          'Trapezoidal Rule Formula: T_n = (Δx / 2) · [f(x_0) + 2f(x_1) + 2f(x_2) + ... + 2f(x_{n-1}) + f(x_n)], which is also the exact average of the Left and Right Riemann sums: T_n = (L_n + R_n)/2.',
          'Net Signed Area vs. Total Area: ∫_a^b f(x) dx treats area below the x-axis as negative. If a question asks for Total Distance Traveled (rather than Net Displacement), integrate |v(t)| by splitting at where v(t) = 0!'
        ],
        realWorldApplication:
          'Smart electric meters sample your home’s power draw P(t) in kilowatts every few seconds and compute a Riemann sum ∑ P(t_i) Δt to bill your monthly kilowatt-hours (kWh).',
        keyFormula: '\\int_{a}^{b} f(x)\\,dx = \\lim_{n \\to \\infty} \\sum_{i=1}^{n} f(x_i^*)\\,\\Delta x \\quad \\text{where } \\Delta x = \\frac{b - a}{n}',
        formulaLabel: 'Riemann Sum to Definite Integral',
        visualAnalogy:
          'Building a curved LEGO sculpture: with giant 2x4 bricks it looks blocky, but with millions of microscopic bricks it looks completely smooth.',
        commonPitfall:
          'Forgetting that "area under the curve" in calculus is signed area: regions above the x-axis count as positive (+), while regions below the x-axis count as negative (-).',
        keyTakeaways: [
          'Midpoint and Trapezoidal sums converge much faster than Left or Right endpoint sums.',
          'Integrating velocity v(t) over time gives total net displacement (how far you moved).',
          'Even at n = 50 rectangles, the approximation error is often less than 1%!'
        ]
      },
      {
        id: 'fundamental-theorem',
        title: 'The Fundamental Theorem of Calculus (FTC)',
        subtitle: 'The Secret Bridge Connecting Derivatives and Integrals',
        eli5Sentence:
          'Derivatives (rates of change) and integrals (total accumulation) are exact opposites that undo each other, just like multiplication and division.',
        intuitionParagraph:
          'For centuries, finding areas and finding tangent slopes seemed like completely unrelated puzzles. Isaac Newton and Gottfried Wilhelm Leibniz proved they are inverse operations! Part 1 says the derivative of an area-accumulation function gives back the original curve. Part 2 gives us a magical shortcut: to compute the exact area under f(x) from a to b, find an antiderivative F(x) whose derivative is f(x), and simply subtract F(b) - F(a)!',
        deepDiveDetails: [
          'FTC Part 1 with the Chain Rule (Leibniz Rule): What if the upper limit is a function g(x) instead of just x? Plug g(x) into the integrand AND multiply by g\'(x): d/dx [ ∫_a^{g(x)} f(t) dt ] = f(g(x)) · g\'(x)!',
          'Net Change Theorem: F(b) = F(a) + ∫_a^b F\'(t) dt. In plain English: Ending Amount = Starting Amount + Total Accumulated Change from a to b.',
          'Average Value of a Function: The average height of f(x) over [a, b] is f_{avg} = [1 / (b - a)] ∫_a^b f(x) dx (Area divided by Width).'
        ],
        realWorldApplication:
          'Inertial navigation systems on submarines integrate accelerometer readings a(t) twice over time to track exact velocity and ocean position without GPS.',
        keyFormula: '\\text{FTC 1: } \\frac{d}{dx}\\int_{a}^{g(x)} f(t)\\,dt = f(g(x))g\'(x) \\quad | \\quad \\text{FTC 2: } \\int_{a}^{b} f(x)\\,dx = F(b) - F(a)',
        formulaLabel: 'The Fundamental Theorem of Calculus (with Chain Rule)',
        visualAnalogy:
          'To know how much water flowed into a bathtub between 2:00 PM and 2:30 PM, you don’t need to count every drop—just check the water level at 2:30 PM minus the level at 2:00 PM!',
        commonPitfall:
          'Forgetting the "+ C" (constant of integration) on indefinite integrals! Because the derivative of any constant is 0, x^2 + 5 and x^2 - 12 both have the derivative 2x.',
        keyTakeaways: [
          'Indefinite integral ∫ f(x) dx = F(x) + C represents a family of parallel antiderivative curves.',
          'Definite integral ∫_a^b f(x) dx = F(b) - F(a) produces a single concrete number (the net signed area).',
          'Power Rule in Reverse: ∫ x^n dx = x^{n+1}/(n+1) + C (for n != -1), and ∫ (1/x) dx = ln|x| + C.'
        ]
      },
      {
        id: 'u-sub-and-parts',
        title: 'u-Substitution, Integration by Parts & Partial Fractions',
        subtitle: 'Unwinding the Chain Rule, Product Rule, and Rational Fractions',
        eli5Sentence:
          'u-Substitution is the Chain Rule played in reverse, Integration by Parts is the Product Rule played in reverse, and Partial Fractions un-adds common denominators.',
        intuitionParagraph:
          'When an integral contains an inner function and its derivative sitting right outside (like 2x · cos(x^2)), we bundle the inside as u = x^2 and replace 2x dx with du. When two unrelated functions are multiplied together (like x · e^x or x · sin(x)), Integration by Parts trades a hard integral for a simpler one by shifting the derivative from u onto dv. And when integrating a rational fraction whose denominator factors, Partial Fractions splits it into simple 1/(x - r) pieces that integrate to natural logs!',
        deepDiveDetails: [
          'Changing Limits in Definite u-Substitution: For ∫_{x=a}^{x=b} f(g(x))g\'(x) dx, once you pick u = g(x), immediately convert the lower limit to u_1 = g(a) and upper limit to u_2 = g(b). Then evaluate F(u_2) - F(u_1) directly without ever needing to substitute x back!',
          'Tabular Integration by Parts: For integrals like ∫ x^3 e^{2x} dx that require repeated Integration by Parts, list derivatives of u = x^3 down the left column (x^3, 3x^2, 6x, 6, 0), antiderivatives of dv = e^{2x} down the right column, and multiply diagonally with alternating (+, -, +, -) signs!',
          'Partial Fraction Decomposition: To integrate (5x - 3)/((x - 1)(x + 3)), set it equal to A/(x - 1) + B/(x + 3), clear denominators to get 5x - 3 = A(x + 3) + B(x - 1), and plug in the roots x = 1 and x = -3 ("Heaviside Cover-Up Trick") to solve for A and B in seconds!'
        ],
        realWorldApplication:
          'Signal processing (Fourier Transforms) uses Integration by Parts to decompose audio waveforms into pure musical frequencies.',
        keyFormula: '\\text{u-Sub: } \\int_{a}^{b} f(g(x))g\'(x)\\,dx = \\int_{g(a)}^{g(b)} f(u)\\,du \\quad | \\quad \\text{Parts: } \\int u\\,dv = uv - \\int v\\,du',
        formulaLabel: 'u-Substitution & Integration by Parts',
        visualAnalogy:
          'u-Substitution is like packing a messy pile of clothes into a single labeled suitcase "u", carrying it effortlessly through customs (integrating), and unpacking at the end.',
        commonPitfall:
          'In definite integrals with u-substitution, plugging the original x-limits into the u-antiderivative without either converting the limits to u or substituting x back first.',
        keyTakeaways: [
          'Use the LIATE priority rule to choose u in Integration by Parts: Logarithmic, Inverse trig, Algebraic (x^n), Trig, Exponential.',
          'In u-substitution, always look for an inside function whose derivative is a constant multiple of the remaining factor.',
          'You can always check ANY integral answer by taking its derivative to see if you get the integrand back!'
        ]
      },
      {
        id: 'area-between-curves-and-volumes',
        title: 'Area Between Curves & Volumes of Revolution (Disks/Washers)',
        subtitle: 'Turning 2D Flat Regions into 3D Vases, Bowls, and Rocket Nose Cones',
        eli5Sentence:
          'Spinning a flat 2D curve around an axis sweeps out a 3D solid, and adding up the circular cross-section coins (πr² thickness) gives its exact 3D volume!',
        intuitionParagraph:
          'What if we want the area trapped between two curves y_top = f(x) and y_bot = g(x)? We simply integrate (Top Curve minus Bottom Curve): ∫_a^b [f(x) - g(x)] dx! Even better, if we spin a curve y = f(x) around the x-axis like clay on a potter’s wheel, each thin slice of width dx sweeps out a solid circular coin (Disk) of radius R = f(x) and area πR^2. Integrating π[f(x)]^2 dx adds up all the coins to find the exact 3D volume!',
        deepDiveDetails: [
          'Disk Method (No Hole in the Middle): When the region touches the axis of rotation flush, each slice is a solid coin of area A(x) = π [R(x)]^2, so Volume = ∫_a^b π [R(x)]^2 dx.',
          'Washer Method (Hollow Hole in the Middle): When spinning a gap between two curves around an axis, subtract the inner hole area from the outer disk area: A(x) = π ([R_outer(x)]^2 - [r_inner(x)]^2). Warning: Square each radius SEPARATELY—never do (R - r)^2!'
        ],
        realWorldApplication:
          'Aerospace engineers compute the exact fuel tank volume and nose-cone drag profile of rockets by revolving parabolic curves around the central fuselage axis.',
        keyFormula: '\\text{Area} = \\int_{a}^{b} (y_{\\text{top}} - y_{\\text{bot}})\\,dx, \\quad \\text{Volume (Washer)} = \\pi \\int_{a}^{b} \\left([R_{\\text{outer}}(x)]^2 - [r_{\\text{inner}}(x)]^2\\right)\\,dx',
        formulaLabel: 'Area Between Curves & Washer Volume Formula',
        visualAnalogy:
          'A roll of quarters is just a cylinder built by stacking flat circular coins of volume π r^2 · (thickness dx).',
        commonPitfall:
          'Writing π(R_outer - r_inner)^2 instead of π(R_outer^2 - r_inner^2) in the Washer Method. Always take (Big Circle Area) minus (Little Circle Area)!',
        keyTakeaways: [
          'For Area Between Curves, set f(x) = g(x) first to find the intersection limits x = a and x = b.',
          'Top minus Bottom (∫ (y_top - y_bot) dx) or Right minus Left (∫ (x_right - x_left) dy) ALWAYS gives a positive area.',
          'For Volumes of Revolution, draw one sample slice perpendicular to the axis of rotation to identify R_outer and r_inner.'
        ]
      }
    ],
    workedExamples: [
      {
        id: 'ex-int-1',
        title: 'Definite Integral via the Fundamental Theorem of Calculus',
        difficulty: 'Warm-Up',
        problemStatement: 'Compute the exact area under the curve f(x) = 3x^2 + 4x from x = 1 to x = 3:',
        problemMath: '\\int_{1}^{3} (3x^2 + 4x)\\,dx',
        realWorldContext: 'Calculating total electrical charge (Coulombs) delivered by a time-varying current I(t) = 3t^2 + 4t.',
        steps: [
          {
            stepNumber: 1,
            math: 'F(x) = 3\\left(\\frac{x^3}{3}\\right) + 4\\left(\\frac{x^2}{2}\\right) = x^3 + 2x^2',
            plainEnglish: 'Find the antiderivative F(x) using the Reverse Power Rule: add 1 to each exponent and divide by the new exponent.',
            strategyTip: 'Quick check: differentiate x^3 + 2x^2 in your head -> 3x^2 + 4x. It matches!'
          },
          {
            stepNumber: 2,
            math: 'F(3) = (3)^3 + 2(3)^2 = 27 + 18 = 45',
            plainEnglish: 'Evaluate the antiderivative at the upper boundary b = 3.',
            strategyTip: 'Plug in the top limit FIRST.'
          },
          {
            stepNumber: 3,
            math: 'F(1) = (1)^3 + 2(1)^2 = 1 + 2 = 3',
            plainEnglish: 'Evaluate the antiderivative at the lower boundary a = 1.',
            strategyTip: 'Always evaluate the lower limit even when it looks simple.'
          },
          {
            stepNumber: 4,
            math: 'F(3) - F(1) = 45 - 3 = 42',
            plainEnglish: 'Subtract F(1) from F(3) by the Fundamental Theorem of Calculus Part 2.',
            strategyTip: 'Definite integrals need no "+ C" because C cancels in (F(b) + C) - (F(a) + C).'
          }
        ],
        finalAnswer: '42'
      },
      {
        id: 'ex-int-2',
        title: 'Definite Integral with u-Substitution (Changing Limits)',
        difficulty: 'Core',
        problemStatement: 'Evaluate the definite integral by u-substitution and transforming the limits of integration:',
        problemMath: '\\int_{0}^{2} 6x(x^2 + 1)^2\\,dx',
        realWorldContext: 'Computing total work done compressing a nonlinear stiffening spring from x = 0 to x = 2 meters.',
        steps: [
          {
            stepNumber: 1,
            math: 'u = x^2 + 1 \\implies du = 2x\\,dx \\implies 6x\\,dx = 3(2x\\,dx) = 3\\,du',
            plainEnglish: 'Pick the inner expression u = x^2 + 1. Its derivative is du = 2x dx, so the outer 6x dx becomes 3 du.',
            strategyTip: 'Factor 6x dx as 3 · (2x dx) so you see the exact du piece.'
          },
          {
            stepNumber: 2,
            math: '\\text{Lower Limit: } x = 0 \\implies u = 0^2 + 1 = 1 \\quad | \\quad \\text{Upper Limit: } x = 2 \\implies u = 2^2 + 1 = 5',
            plainEnglish: 'Convert the old x-boundaries [0, 2] into new u-boundaries [1, 5] using u = x^2 + 1.',
            strategyTip: 'Changing limits to u means you NEVER have to substitute x back at the end!'
          },
          {
            stepNumber: 3,
            math: '\\int_{u=1}^{u=5} 3u^2\\,du = \\left[ u^3 \\right]_{1}^{5} = 5^3 - 1^3 = 125 - 1 = 124',
            plainEnglish: 'Integrate 3u^2 to u^3 and evaluate directly from u = 1 to u = 5!',
            strategyTip: 'Look how clean [u^3]_1^5 is compared to expanding (x^2 + 1)^2 by hand.'
          }
        ],
        finalAnswer: '124'
      },
      {
        id: 'ex-int-3',
        title: 'Solving an Integral by Parts (LIATE Rule)',
        difficulty: 'Core',
        problemStatement: 'Find the indefinite integral of x multiplied by e^x:',
        problemMath: '\\int x e^x\\,dx',
        realWorldContext: 'Appears when calculating the expected value (center of mass) of exponential probability distributions.',
        steps: [
          {
            stepNumber: 1,
            math: 'u = x \\implies du = dx \\quad | \\quad dv = e^x\\,dx \\implies v = e^x',
            plainEnglish: 'By LIATE, choose the Algebraic term u = x (which simplifies when differentiated!) and dv = e^x dx.',
            strategyTip: 'In LIATE, Algebraic (x) comes before Exponential (e^x), so u = x.'
          },
          {
            stepNumber: 2,
            math: '\\int x e^x\\,dx = u v - \\int v\\,du = x e^x - \\int e^x\\,dx',
            plainEnglish: 'Apply the Integration by Parts formula uv - ∫ v du. Notice how the new integral has no x in front!',
            strategyTip: 'The whole goal of Integration by Parts is trading ∫ u dv for a simpler ∫ v du.'
          },
          {
            stepNumber: 3,
            math: 'x e^x - e^x + C = e^x(x - 1) + C',
            plainEnglish: 'Integrate e^x (which is just e^x), factor out e^x, and add the constant of integration + C.',
            strategyTip: 'Check by Product Rule: d/dx[e^x(x - 1)] = e^x(x - 1) + e^x(1) = x e^x!'
          }
        ],
        finalAnswer: 'e^x(x - 1) + C'
      },
      {
        id: 'ex-int-4',
        title: 'Area Enclosed Between a Line and a Parabola',
        difficulty: 'Core',
        problemStatement: 'Find the exact area of the region enclosed between the line y = x + 2 and the parabola y = x^2:',
        problemMath: 'A = \\int_{a}^{b} (y_{\\text{top}} - y_{\\text{bot}})\\,dx',
        realWorldContext: 'Civil engineers calculate the cross-sectional area of a parabolic drainage channel beneath a flat bridge deck.',
        steps: [
          {
            stepNumber: 1,
            math: 'x^2 = x + 2 \\implies x^2 - x - 2 = 0 \\implies (x - 2)(x + 1) = 0 \\implies x = -1, \\; x = 2',
            plainEnglish: 'Set the two equations equal to find where the curves intersect: x = -1 and x = 2 are our integration limits!',
            strategyTip: 'When limits aren’t given in an "area enclosed" problem, set the curves equal to solve for the intersection points.'
          },
          {
            stepNumber: 2,
            math: '\\text{Test } x = 0:\\; y_{\\text{line}} = 2 > y_{\\text{parabola}} = 0 \\implies A = \\int_{-1}^{2} (x + 2 - x^2)\\,dx',
            plainEnglish: 'Pick a test point inside (-1, 2), such as x = 0, to see which curve is on top. The line (2) is above the parabola (0)!',
            strategyTip: 'Always do (Top - Bottom) so the integrand is positive across the interval.'
          },
          {
            stepNumber: 3,
            math: '\\left[ \\frac{x^2}{2} + 2x - \\frac{x^3}{3} \\right]_{-1}^{2} = \\left(2 + 4 - \\frac{8}{3}\\right) - \\left(\\frac{1}{2} - 2 + \\frac{1}{3}\\right) = \\frac{10}{3} - \\left(-\\frac{7}{6}\\right) = \\frac{27}{6} = \\frac{9}{2}',
            plainEnglish: 'Find the antiderivative, evaluate at x = 2 and x = -1, and subtract to get 9/2 = 4.5 square units.',
            strategyTip: 'Watch negative signs when cubing (-1)^3 = -1 in the lower limit!'
          }
        ],
        finalAnswer: '\\frac{9}{2} = 4.5'
      },
      {
        id: 'ex-int-5',
        title: 'Integration by Partial Fraction Decomposition',
        difficulty: 'Challenge',
        problemStatement: 'Evaluate the indefinite integral by splitting the rational fraction into partial fractions:',
        problemMath: '\\int \\frac{5x - 3}{(x - 1)(x + 3)}\\,dx',
        realWorldContext: 'Solves logistic population growth equations dP/dt = kP(M - P) in ecology and epidemiology.',
        steps: [
          {
            stepNumber: 1,
            math: '\\frac{5x - 3}{(x - 1)(x + 3)} = \\frac{A}{x - 1} + \\frac{B}{x + 3} \\implies 5x - 3 = A(x + 3) + B(x - 1)',
            plainEnglish: 'Split the fraction into A/(x - 1) + B/(x + 3) and multiply both sides by (x - 1)(x + 3) to clear denominators.',
            strategyTip: 'Each distinct linear factor (x - r) in the denominator gets its own constant numerator.'
          },
          {
            stepNumber: 2,
            math: '\\text{Set } x = 1:\\; 5(1) - 3 = A(4) + 0 \\implies 2 = 4A \\implies A = \\frac{1}{2}',
            plainEnglish: 'Plug in the root x = 1 to zero out the B term and solve for A = 1/2.',
            strategyTip: 'This "Heaviside Cover-Up" substitution is much faster than solving a system of linear equations!'
          },
          {
            stepNumber: 3,
            math: '\\text{Set } x = -3:\\; 5(-3) - 3 = 0 + B(-4) \\implies -18 = -4B \\implies B = \\frac{9}{2}',
            plainEnglish: 'Plug in the second root x = -3 to zero out the A term and solve for B = 9/2.',
            strategyTip: 'Double-check signs: -15 - 3 = -18, divided by -4 gives +9/2.'
          },
          {
            stepNumber: 4,
            math: '\\int \\left(\\frac{1/2}{x - 1} + \\frac{9/2}{x + 3}\\right)dx = \\frac{1}{2}\\ln|x - 1| + \\frac{9}{2}\\ln|x + 3| + C',
            plainEnglish: 'Integrate each simple 1/(x - r) term directly into a natural logarithm!',
            strategyTip: 'Always include absolute value bars inside ln|x - r|.'
          }
        ],
        finalAnswer: '\\frac{1}{2}\\ln|x - 1| + \\frac{9}{2}\\ln|x + 3| + C'
      }
    ],
    quiz: [
      {
        id: 'q-int-1',
        question: 'If you want to evaluate int 2x * cos(x^2) dx using u-substitution, what should you choose for u?',
        options: ['u = 2x', 'u = cos(x^2)', 'u = x^2', 'u = x'],
        correctIndex: 2,
        explanation: 'Choosing u = x^2 makes du = 2x dx, which matches the outer factor 2x dx and turns the integral into simply int cos(u) du = sin(u) + C = sin(x^2) + C.'
      },
      {
        id: 'q-int-2',
        question: 'By the Fundamental Theorem of Calculus Part 1, what is d/dx [ int_0^x sqrt(t^3 + 1) dt ]?',
        options: [
          'sqrt(x^3 + 1)',
          '(2/3)(x^3 + 1)^{3/2}',
          '3x^2 / (2 sqrt(x^3 + 1))',
          'sqrt(x^3 + 1) - 1'
        ],
        correctIndex: 0,
        explanation: 'Taking the derivative with respect to the upper limit x immediately undoes the integral, returning the integrand evaluated at x: sqrt(x^3 + 1).'
      },
      {
        id: 'q-int-3',
        question: 'When using Integration by Parts (int u dv = uv - int v du) on int x * ln(x) dx, what should you pick for u according to the LIATE rule?',
        options: [
          'u = ln(x) and dv = x dx',
          'u = x and dv = ln(x) dx',
          'u = x ln(x) and dv = dx',
          'u = 1/x and dv = x^2 dx'
        ],
        correctIndex: 0,
        explanation: 'In LIATE, Logarithmic (L) comes first before Algebraic (A). Choosing u = ln(x) makes du = (1/x) dx and v = x^2/2, turning int v du into the easy integral int (x/2) dx!'
      },
      {
        id: 'q-int-4',
        question: 'What integral gives the 3D volume formed by revolving y = sqrt(x) from x = 0 to x = 4 around the x-axis (Disk Method)?',
        options: [
          'pi * int_0^4 (sqrt(x))^2 dx = pi * int_0^4 x dx = 8 pi',
          'int_0^4 sqrt(x) dx = 16/3',
          '2 pi * int_0^4 sqrt(x) dx',
          'pi * (int_0^4 sqrt(x) dx)^2'
        ],
        correctIndex: 0,
        explanation: 'By the Disk Method, each circular slice has radius R(x) = sqrt(x) and area pi * [R(x)]^2 = pi * x. Integrating pi * x from 0 to 4 gives pi * [x^2/2]_0^4 = 8 pi.'
      }
    ]
  },
  {
    id: 'multivariable',
    number: 5,
    title: 'Advanced & Multivariable Calculus',
    shortTitle: '5. Advanced & 3D',
    badgeTitle: 'Multivariable Master',
    tagline: 'Infinite polynomial DNA, differential equations, and 3D vector fields.',
    eli5Summary:
      'Now we step from a 2D sheet of paper into the real 3D world—approximating curves with polynomials, solving equations of motion, and climbing 3D mountain landscapes.',
    accentColor: 'from-rose-500 to-pink-600',
    linkedSandbox: 'taylor',
    concepts: [
      {
        id: 'odes-and-taylor',
        title: 'Differential Equations (ODEs) & Taylor / Maclaurin Series',
        subtitle: 'Laws of Nature and Infinite Polynomial DNA',
        eli5Sentence:
          'A differential equation describes how something changes based on how much of it currently exists, while a Taylor Series rebuilds any curvy function out of simple powers of x.',
        intuitionParagraph:
          'Nature rarely hands us a formula y(t) directly; instead, physics and biology give us Ordinary Differential Equations (ODEs) like dy/dt = k·y (population growth or radioactive decay). Meanwhile, Brook Taylor showed that if you match a function’s height, slope, concavity, and higher derivatives at a single point x = a, you can forge an infinite polynomial—a Taylor Series (or Maclaurin Series when a = 0)—that mimics sin(x), cos(x), or e^x with breathtaking accuracy!',
        deepDiveDetails: [
          'Solving Separable ODEs in 3 Steps: Given dy/dx = g(x)·h(y), (1) Separate variables: divide by h(y) and multiply by dx to get (1/h(y)) dy = g(x) dx; (2) Integrate both sides: ∫ (1/h(y)) dy = ∫ g(x) dx + C; (3) Apply the initial condition y(x_0) = y_0 to find C and solve for y.',
          'Why the n! Factorial Is in Taylor’s Formula: When you take the n-th derivative of (x - a)^n, the Power Rule brings down n · (n-1) · (n-2) · ... · 1 = n!. Dividing by n! in the Taylor coefficient f^{(n)}(a)/n! cancels that factorial so the polynomial’s n-th derivative at x = a equals f^{(n)}(a) on the nose!',
          'Creating New Series from Old Ones: Instead of taking 10 derivatives of e^{-x^2}, just plug (-x^2) into the known Maclaurin series for e^u = 1 + u + u^2/2! + u^3/3! + ... to get 1 - x^2 + x^4/2! - x^6/3! + ... in 5 seconds!'
        ],
        realWorldApplication:
          'Every time your phone or laptop calculates sin(x), cos(x), e^x, or ln(1+x), its CPU hardware actually evaluates a truncated Taylor/polynomial approximation!',
        keyFormula: 'f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x - a)^n = f(a) + f\'(a)(x-a) + \\frac{f\'\'(a)}{2!}(x-a)^2 + \\dots',
        formulaLabel: 'Taylor Series Expansion',
        visualAnalogy:
          'A Taylor series is like a master sculptor cloning a statue: Term 0 matches the height, Term 1 matches the tilt, Term 2 matches the bend, and adding more terms hugs the curve further and further out.',
        commonPitfall:
          'Forgetting the factorial n! in the denominator (remember 0! = 1, 1! = 1, 2! = 2, 3! = 6, 4! = 24, 5! = 120) which keeps higher-degree terms tamed.',
        keyTakeaways: [
          'Separable ODE dy/dx = g(x)h(y) is solved by moving all y’s to one side: ∫ (1/h(y)) dy = ∫ g(x) dx.',
          'Maclaurin Series for e^x = 1 + x + x^2/2! + x^3/3! + ... (all powers!), sin(x) uses odd powers, cos(x) uses even powers.',
          'Substituting into a known Maclaurin series is 10x faster than differentiating from scratch.'
        ]
      },
      {
        id: 'partials-and-multiple-integrals',
        title: 'Partial Derivatives, Tangent Planes & Double / Triple Integrals',
        subtitle: 'Slicing 3D Mountains and Measuring 3D Volumes',
        eli5Sentence:
          'A partial derivative measures how steep a mountain is when you walk strictly East-West while pretending North-South is frozen still.',
        intuitionParagraph:
          'When a surface height z = f(x, y) depends on two inputs (like latitude x and longitude y), we take Partial Derivatives: ∂f/∂x treats y like a plain constant number, while ∂f/∂y treats x like a constant. Together they define the 3D Tangent Plane z = f(a,b) + f_x(a,b)(x-a) + f_y(a,b)(y-b). Conversely, a Double Integral slices a 3D mountain into thin vertical pillars dx dy to compute total 3D volume under the surface, and a Triple Integral sums tiny 3D cubes dx dy dz to find the mass of a solid object!',
        deepDiveDetails: [
          'Multivariable Chain Rule: If z = f(x(t), y(t)) depends on a path (x(t), y(t)), then dz/dt = (∂f/∂x)(dx/dt) + (∂f/∂y)(dy/dt)—total rate of change is the sum of each coordinate’s contribution!',
          'Switching Order of Integration (Fubini’s Theorem): Some integrals like ∫_0^1 ∫_y^1 e^{x^2} dx dy cannot be integrated with respect to x first! Sketch the 2D triangle 0 <= y <= x <= 1 and swap to ∫_0^1 ∫_0^x e^{x^2} dy dx = ∫_0^1 x e^{x^2} dx, which solves easily via u-sub!',
          'Polar & Spherical Jacobians: In 2D Polar coordinates (x = r cos θ, y = r sin θ), tiny area element dA = dx dy becomes r dr dθ. In 3D Cylindrical it is r dz dr dθ, and in 3D Spherical it is ρ^2 sin(φ) dρ dφ dθ.'
        ],
        realWorldApplication:
          'Weather forecasting models solve partial differential equations (Navier-Stokes) across 3D latitude, longitude, and altitude grids every hour.',
        keyFormula: 'z_{\\text{tan}} = f(a,b) + f_x(a,b)(x-a) + f_y(a,b)(y-b) \\quad | \\quad \\iint_{R} f(x,y)\\,dA = \\iint f(r\\cos\\theta, r\\sin\\theta)\\,r\\,dr\\,d\\theta',
        formulaLabel: '3D Tangent Plane & Polar Double Integral',
        visualAnalogy:
          'Slicing a loaf of cinnamon bread parallel to the front crust shows the x-cross-section; slicing parallel to the side crust shows the y-cross-section.',
        commonPitfall:
          'When taking ∂/∂x of x^2 · y^3 + y^5, forgetting that y^5 has NO x in it—so its x-partial derivative is completely 0!',
        keyTakeaways: [
          'Clairaut’s Theorem: For smooth functions, mixed partials are equal: f_{xy} = f_{yx} (order of slicing doesn’t matter!).',
          'In iterated double integrals, work from the innermost integral outward, matching each variable to its limits.',
          'Polar coordinates (r, θ) with dA = r dr dθ make circular double integrals effortless.'
        ]
      },
      {
        id: 'lagrange-multipliers-3d-opt',
        title: '3D Optimization: Critical Points & Lagrange Multipliers',
        subtitle: 'Peaks, Valleys, Saddle Points, and Constrained Mountain Trails',
        eli5Sentence:
          'If you hike along a fixed trail on a mountainside, the highest point you reach on the trail is the spot where the trail runs parallel to the mountain’s elevation contour lines.',
        intuitionParagraph:
          'To find unconstrained peaks and valleys on a 3D surface z = f(x, y), we set both partial derivatives to zero (∂f/∂x = 0 and ∂f/∂y = 0) and use the Second Partials Discriminant D = f_{xx}f_{yy} - (f_{xy})^2 to distinguish true peaks/valleys from horse-saddle points! And if we must maximize f(x, y) while staying on a fixed constraint curve g(x, y) = c (like a fixed budget), Joseph-Louis Lagrange showed that at the optimum, their gradient vectors point in the exact same (or opposite) direction: ∇f = λ ∇g!',
        deepDiveDetails: [
          'The 3D Hessian Discriminant Test at (a, b) where ∇f = <0, 0>: Compute D = f_{xx}f_{yy} - (f_{xy})^2. (1) If D > 0 and f_{xx} > 0 -> Local Minimum (3D bowl); (2) If D > 0 and f_{xx} < 0 -> Local Maximum (3D dome); (3) If D < 0 -> Saddle Point (curves up in one direction, down in another, like a Pringles chip!).',
          'Lagrange Multipliers System: Solve the 3 equations ∂f/∂x = λ(∂g/∂x), ∂f/∂y = λ(∂g/∂y), and g(x, y) = c simultaneously. The multiplier λ tells you the "shadow price": how much the maximum output increases per 1-unit increase in budget c!'
        ],
        realWorldApplication:
          'Economics and portfolio optimization use Lagrange Multipliers to maximize investment return f(x, y) subject to a fixed risk or capital budget g(x, y) = c.',
        keyFormula: '\\text{Lagrange: } \\nabla f(x,y) = \\lambda \\nabla g(x,y) \\text{ with } g(x,y) = c \\quad | \\quad D = f_{xx}f_{yy} - (f_{xy})^2',
        formulaLabel: 'Lagrange Multipliers & 3D Saddle Discriminant',
        visualAnalogy:
          'A mountain pass (Saddle Point) is the lowest point between two mountain peaks (concave up East-West) yet the highest point along the trail crossing the pass (concave down North-South)!',
        commonPitfall:
          'Assuming f_x = 0 and f_y = 0 automatically means a max or min in 3D. Always check D = f_{xx}f_{yy} - (f_{xy})^2 because saddle points (D < 0) are super common!',
        keyTakeaways: [
          'Unconstrained 3D extrema require ∇f = <0, 0> and D > 0.',
          'If D < 0 at a critical point, the surface is shaped like a saddle (neither max nor min).',
          'Constrained optimization with g(x, y) = c is solved cleanly with ∇f = λ ∇g.'
        ]
      },
      {
        id: 'vector-calculus',
        title: 'Vector Calculus: Gradient, Divergence, Curl & Big Theorems',
        subtitle: 'The Compass of Steepest Ascent, Sources, Whirlpools, and Boundary Bridges',
        eli5Sentence:
          'The Gradient points straight uphill on a mountain, Divergence measures whether fluid is expanding out of a spot like a faucet, and Curl measures whether fluid is spinning like a tiny paddlewheel.',
        intuitionParagraph:
          'Vector calculus is the language of electromagnetism, aerodynamics, and machine learning (Gradient Descent!). Packing all partial derivatives into a single vector gives the Gradient ∇f, which always points in the direction of steepest increase. For a vector flow field F = <P, Q, R>, Divergence (∇ · F) is a scalar measuring net outflow per unit volume, and Curl (∇ × F) is a vector measuring rotational swirl.',
        deepDiveDetails: [
          'Directional Derivative Formula: To find the slope of z = f(x, y) when walking in the direction of a unit vector u = <u_1, u_2>, take the dot product D_u f = ∇f · u = ||∇f|| cos(θ). This proves slope is maximized when θ = 0° (walking along +∇f)!',
          'The Grand Unification (FTC in 2D and 3D): Every major theorem in Vector Calculus—Green’s Theorem, Stokes’ Theorem, and the Divergence (Gauss’s) Theorem—says the exact same philosophical thing as the Fundamental Theorem of Calculus: integrating a derivative (Curl or Divergence) over the INSIDE of a region equals integrating the original field along the BOUNDARY!'
        ],
        realWorldApplication:
          'James Clerk Maxwell unified electricity, magnetism, and light into four succinct Divergence and Curl equations—leading directly to radio, Wi-Fi, and fiber optics.',
        keyFormula: '\\text{Div } \\vec{F} = \\nabla \\cdot \\vec{F} = \\frac{\\partial P}{\\partial x} + \\frac{\\partial Q}{\\partial y} + \\frac{\\partial R}{\\partial z} \\quad | \\quad \\oint_{\\partial D} (P\\,dx + Q\\,dy) = \\iint_{D} \\left(\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}\\right)dA',
        formulaLabel: 'Divergence & Green’s Theorem',
        visualAnalogy:
          'Drop a tiny leaf in a stream: the stream velocity carries it (Vector Field), if water bubbles up from an underground spring the leaf spreads apart (positive Divergence), and if it spins in place there is non-zero Curl!',
        commonPitfall:
          'Confusing the output types: Gradient turns a scalar function into a vector; Divergence turns a vector field into a scalar; Curl turns a vector field into another vector field.',
        keyTakeaways: [
          'AI neural networks train by walking in the opposite direction of the Gradient (-∇L) to minimize error!',
          'Divergence = 0 means an incompressible fluid (like water: whatever flows in must flow out).',
          'Curl = 0 means a conservative (irrotational) field where work is path-independent.'
        ]
      }
    ],
    workedExamples: [
      {
        id: 'ex-multi-1',
        title: 'Computing Partial Derivatives & The Gradient Vector',
        difficulty: 'Warm-Up',
        problemStatement: 'Find the partial derivatives and the gradient vector nabla f at the point (1, 2) for the surface:',
        problemMath: 'f(x, y) = 3x^2 y + y^3 - 4x',
        realWorldContext: 'Finding the direction of steepest temperature increase on a heated metal plate.',
        steps: [
          {
            stepNumber: 1,
            math: '\\frac{\\partial f}{\\partial x} = 6xy + 0 - 4 = 6xy - 4',
            plainEnglish: 'Differentiate with respect to x while freezing y as a constant. Note that y^3 has no x, so its x-derivative is 0.',
            strategyTip: 'Circle the variable you are differentiating with respect to so you treat all other letters like constant numbers.'
          },
          {
            stepNumber: 2,
            math: '\\frac{\\partial f}{\\partial y} = 3x^2(1) + 3y^2 - 0 = 3x^2 + 3y^2',
            plainEnglish: 'Differentiate with respect to y while freezing x as a constant. Here 4x has no y, so its y-derivative is 0.',
            strategyTip: 'In 3x^2 y, 3x^2 acts like a constant coefficient in front of y^1.'
          },
          {
            stepNumber: 3,
            math: '\\nabla f(1, 2) = \\langle 6(1)(2) - 4,\\; 3(1)^2 + 3(2)^2 \\rangle = \\langle 8, 15 \\rangle',
            plainEnglish: 'Plug x = 1, y = 2 into both partial derivatives to form the Gradient compass vector <8, 15>.',
            strategyTip: 'The gradient vector <8, 15> lives in the 2D xy-plane and points toward the steepest uphill climb.'
          },
          {
            stepNumber: 4,
            math: '\\|\\nabla f(1, 2)\\| = \\sqrt{8^2 + 15^2} = \\sqrt{64 + 225} = \\sqrt{289} = 17',
            plainEnglish: 'The magnitude of the gradient vector (17) tells us the maximum possible uphill slope at (1, 2)!',
            strategyTip: '8-15-17 is a Pythagorean triple!'
          }
        ],
        finalAnswer: '\\nabla f(1, 2) = \\langle 8, 15 \\rangle \\; (\\text{Max Slope } = 17)'
      },
      {
        id: 'ex-multi-2',
        title: 'Solving a Separable Differential Equation (ODE) with Initial Value',
        difficulty: 'Core',
        problemStatement: 'Find the particular solution y(x) to the first-order separable differential equation:',
        problemMath: '\\frac{dy}{dx} = 6x^2 y, \\quad y(0) = 5',
        realWorldContext: 'Models population or capital growth where the proportional growth rate accelerates over time.',
        steps: [
          {
            stepNumber: 1,
            math: '\\frac{1}{y}\\,dy = 6x^2\\,dx',
            plainEnglish: 'Separate the variables: divide both sides by y and multiply both sides by dx so all y’s are on the left and all x’s are on the right.',
            strategyTip: 'Never add or subtract to separate variables—always multiply or divide!'
          },
          {
            stepNumber: 2,
            math: '\\int \\frac{1}{y}\\,dy = \\int 6x^2\\,dx \\implies \\ln|y| = 2x^3 + C_1',
            plainEnglish: 'Integrate both sides independently: 1/y integrates to ln|y|, and 6x^2 integrates to 2x^3 + C_1.',
            strategyTip: 'You only need one constant + C_1 on the right side.'
          },
          {
            stepNumber: 3,
            math: 'y = e^{2x^3 + C_1} = e^{C_1} e^{2x^3} = A e^{2x^3}',
            plainEnglish: 'Exponentiate both sides (base e) to undo ln|y|, and rename the positive/negative constant ±e^{C_1} as a single multiplier A.',
            strategyTip: 'By exponent laws, e^{2x^3 + C_1} = e^{C_1} · e^{2x^3} = A e^{2x^3}.'
          },
          {
            stepNumber: 4,
            math: 'y(0) = 5 \\implies A e^{2(0)^3} = 5 \\implies A(1) = 5 \\implies y(x) = 5e^{2x^3}',
            plainEnglish: 'Plug in the initial condition x = 0, y = 5 to find A = 5 and write the complete particular solution!',
            strategyTip: 'Remember e^0 = 1, so A is simply the starting value y(0) = 5.'
          }
        ],
        finalAnswer: 'y(x) = 5e^{2x^3}'
      },
      {
        id: 'ex-multi-3',
        title: 'Building a Degree-4 Taylor Polynomial Around x = 0',
        difficulty: 'Core',
        problemStatement: 'Find the 4th-degree Maclaurin polynomial P_4(x) for the function f(x) = cos(2x) and use it to estimate cos(0.2):',
        problemMath: 'f(x) = \\cos(2x) \\approx P_4(x) \\text{ near } x = 0',
        realWorldContext: 'Embedded flight controllers compute trig functions using fast 3-term polynomials.',
        steps: [
          {
            stepNumber: 1,
            math: '\\cos(u) = 1 - \\frac{u^2}{2!} + \\frac{u^4}{4!} - \\dots',
            plainEnglish: 'Start with the known Maclaurin template for cos(u), which uses alternating even powers of u.',
            strategyTip: 'Substituting u = 2x into the known cos(u) series is much faster than taking 4 derivatives by hand!'
          },
          {
            stepNumber: 2,
            math: 'P_4(x) = 1 - \\frac{(2x)^2}{2!} + \\frac{(2x)^4}{4!} = 1 - \\frac{4x^2}{2} + \\frac{16x^4}{24} = 1 - 2x^2 + \\frac{2}{3}x^4',
            plainEnglish: 'Substitute u = 2x into each term up to degree 4, remembering to raise the coefficient 2 to the power as well: (2x)^2 = 4x^2 and (2x)^4 = 16x^4.',
            strategyTip: 'Always put (2x) in parentheses so the exponent applies to both 2 and x!'
          },
          {
            stepNumber: 3,
            math: '\\cos(0.2) = f(0.1) \\approx P_4(0.1) = 1 - 2(0.1)^2 + \\frac{2}{3}(0.1)^4 = 1 - 0.02 + 0.0000667 = 0.9800667',
            plainEnglish: 'To estimate cos(0.2), plug x = 0.1 into P_4(x). The true value of cos(0.2) is 0.98006658—accurate to 7 decimal places!',
            strategyTip: 'Notice how rapidly the terms shrink when x = 0.1 is close to the center a = 0.'
          }
        ],
        finalAnswer: 'P_4(x) = 1 - 2x^2 + \\frac{2}{3}x^4, \\quad P_4(0.1) \\approx 0.980067'
      },
      {
        id: 'ex-multi-4',
        title: 'Evaluating a Double Integral Over a Circular Disk (Polar Coordinates)',
        difficulty: 'Core',
        problemStatement: 'Evaluate the double integral over the upper half-disk D where x^2 + y^2 <= 9 and y >= 0:',
        problemMath: '\\iint_{D} e^{x^2 + y^2}\\,dA',
        realWorldContext: 'Integrating Gaussian laser beam intensity across a semicircular optical aperture of radius 3.',
        steps: [
          {
            stepNumber: 1,
            math: 'x^2 + y^2 = r^2, \\quad dA = r\\,dr\\,d\\theta, \\quad 0 \\leq r \\leq 3, \\quad 0 \\leq \\theta \\leq \\pi',
            plainEnglish: 'Convert to Polar Coordinates! A circle of radius 3 in the upper half-plane (y >= 0) spans radius r from 0 to 3 and angle θ from 0 to π.',
            strategyTip: 'Seeing x^2 + y^2 inside an integrand is the #1 signal to switch to Polar Coordinates—because the extra Jacobian r from dA = r dr dθ unlocks u-substitution!'
          },
          {
            stepNumber: 2,
            math: '\\int_{0}^{\\pi} \\int_{0}^{3} e^{r^2} \\cdot r\\,dr\\,d\\theta = \\int_{0}^{\\pi} \\left[ \\frac{1}{2}e^{r^2} \\right]_{r=0}^{r=3} d\\theta = \\int_{0}^{\\pi} \\frac{1}{2}(e^9 - e^0)\\,d\\theta',
            plainEnglish: 'Integrate the inner r-integral using u = r^2 (du = 2r dr), which gives (1/2)e^{r^2} evaluated from 0 to 3.',
            strategyTip: 'Don’t forget e^0 = 1 at the lower limit r = 0!'
          },
          {
            stepNumber: 3,
            math: '\\frac{1}{2}(e^9 - 1) \\int_{0}^{\\pi} d\\theta = \\frac{\\pi}{2}(e^9 - 1)',
            plainEnglish: 'Multiply the constant radial result by the angular span π to finish.',
            strategyTip: 'In Cartesian coordinates, ∫ e^{x^2} dx is impossible in elementary terms—Polar Coordinates saved the day!'
          }
        ],
        finalAnswer: '\\frac{\\pi}{2}(e^9 - 1)'
      },
      {
        id: 'ex-multi-5',
        title: 'Constrained Optimization with Lagrange Multipliers',
        difficulty: 'Challenge',
        problemStatement: 'Use Lagrange Multipliers to find the maximum value of f(x, y) = 4x + 3y on the circle constraint x^2 + y^2 = 25:',
        problemMath: '\\nabla f = \\lambda \\nabla g \\quad \\text{where } g(x, y) = x^2 + y^2 = 25',
        realWorldContext: 'Finding the point on a circular orbit of radius 5 that maximizes solar radiation exposure.',
        steps: [
          {
            stepNumber: 1,
            math: '\\nabla f = \\langle 4, 3 \\rangle, \\quad \\nabla g = \\langle 2x, 2y \\rangle \\implies \\langle 4, 3 \\rangle = \\lambda \\langle 2x, 2y \\rangle',
            plainEnglish: 'Compute the gradient vectors of the objective f and constraint g, and set ∇f = λ ∇g.',
            strategyTip: 'At the extreme points on the circle, the level line of 4x + 3y is tangent to the circle, so their normal vectors (gradients) are parallel!'
          },
          {
            stepNumber: 2,
            math: '4 = 2\\lambda x \\text{ and } 3 = 2\\lambda y \\implies x = \\frac{2}{\\lambda}, \\quad y = \\frac{3}{2\\lambda} \\implies y = \\frac{3}{4}x',
            plainEnglish: 'Express x and y in terms of λ (or divide the two equations) to discover the clean linear ratio y = (3/4)x.',
            strategyTip: 'Eliminating λ early by writing y in terms of x makes substituting into the constraint equation super fast.'
          },
          {
            stepNumber: 3,
            math: 'x^2 + \\left(\\frac{3}{4}x\\right)^2 = 25 \\implies \\frac{25}{16}x^2 = 25 \\implies x^2 = 16 \\implies x = \\pm 4',
            plainEnglish: 'Substitute y = (3/4)x into the circle constraint x^2 + y^2 = 25 and solve for x = ±4.',
            strategyTip: 'Since y = (3/4)x, x = 4 gives (4, 3) and x = -4 gives (-4, -3).'
          },
          {
            stepNumber: 4,
            math: 'f(4, 3) = 4(4) + 3(3) = 16 + 9 = 25 \\text{ (Max)}, \\quad f(-4, -3) = -25 \\text{ (Min)}',
            plainEnglish: 'Evaluate f(x, y) at both candidate points: the maximum value is 25 at (4, 3)!',
            strategyTip: 'Notice that 4(4) + 3(3) = 25 is also the dot product <4, 3> · <4, 3> = ||<4, 3>|| · 5 = 5 · 5 = 25.'
          }
        ],
        finalAnswer: '\\text{Max Value } = 25 \\text{ at } (4, 3)'
      }
    ],
    quiz: [
      {
        id: 'q-multi-1',
        question: 'In the Maclaurin series for sin(x) = x - x^3/3! + x^5/5! - ..., why are there only odd powers of x?',
        options: [
          'Because sin(x) is an odd function (symmetric about the origin) and all its even derivatives at x = 0 equal 0',
          'Because even numbers do not have factorials',
          'Because sin(0) = 1',
          'Because L’Hôpital’s Rule cancels the even powers'
        ],
        correctIndex: 0,
        explanation: 'At x = 0, sin(0) = 0, -sin(0) = 0, etc. Every even derivative of sin(x) evaluates to 0 at the origin, leaving only odd powers x, x^3/3!, x^5/5!, ...!'
      },
      {
        id: 'q-multi-2',
        question: 'If you are standing on a 3D hillside z = f(x, y) and want to walk in the direction where altitude drops the fastest, which way do you step?',
        options: [
          'In the direction of the Gradient +nabla f',
          'In the direction of the Negative Gradient -nabla f',
          'Along the contour line where nabla f = 0',
          'In the direction of the Curl'
        ],
        correctIndex: 1,
        explanation: 'Since +nabla f always points in the direction of steepest ascent (uphill), the exact opposite direction -nabla f points in the direction of steepest descent (downhill).'
      },
      {
        id: 'q-multi-3',
        question: 'When converting a double integral iint f(x, y) dx dy over a circular region into Polar Coordinates (r, theta), what does the area element dA = dx dy become?',
        options: [
          'r dr dtheta',
          'dr dtheta',
          'r^2 dr dtheta',
          'cos(theta) dr dtheta'
        ],
        correctIndex: 0,
        explanation: 'A polar sector patch at radius r has arc-width r * dtheta and radial thickness dr, so its area is dA = r dr dtheta (never forget the Jacobian factor r!).'
      },
      {
        id: 'q-multi-4',
        question: 'For a vector fluid velocity field F(x, y, z), what does it physically mean if Div(F) = nabla . F = 0 everywhere?',
        options: [
          'The fluid is incompressible (no net sources or sinks; whatever flows into a box flows out)',
          'The fluid is completely stationary (velocity = 0)',
          'The fluid has zero rotational swirl',
          'The fluid flows only in the z-direction'
        ],
        correctIndex: 0,
        explanation: 'Divergence measures net outward expansion per unit volume. Div(F) = 0 means the flow is incompressible—having no sources or sinks.'
      }
    ]
  }
];
