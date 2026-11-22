/** @type {import('tailwindcss').Config} */
module.exports = {
    blocklist: ["overline"],
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        linen: '#FBF9F5',
        linen2: '#F3EFE8',
        paper: '#FFFFFF',
        sand: '#F5F1EA',
        creamlift: '#FFFDF9',
        ink: '#1A1512',
        roast: '#4A3E36',
        stonemute: '#7A6E65',
        caption: '#9C8F85',
        brassantique: '#C28C48',
        brassbright: '#DCA764',
        terracotta: '#B94E34',
        olive: '#596048',
        espresso: '#14110F',
        espressocard: '#1C1815',
        brass: {
          DEFAULT: '#C28C48',
          deep: '#DCA764',
        },
        obsidian: '#0B0908',
        coal: '#141210',
        ember: '#1A1715',
        cream: '#F5F3EF',
        stoneish: '#A8A29E',
        faint: '#78716C',
        terra: '#C2593F',
        ochre: '#D97706',
        glass: 'rgba(255,253,249,0.85)'
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        serif2: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        dev: ['"Rozha One"', 'serif'],
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.45', transform: 'scale(0.72)' },
        },
        'float-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        marquee: 'marquee 42s linear infinite',
        'pulse-dot': 'pulse-dot 1.8s ease-in-out infinite',
        'float-soft': 'float-soft 5s ease-in-out infinite',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
