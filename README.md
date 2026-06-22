# Vyacheslav — AI Product Manager Portfolio

A kinetic typography portfolio with advanced text animations showcasing AI product management work.

## Design Features

- **Kinetic Typography**: Character-by-character reveal animations, glitch effects, scroll-triggered motion
- **Pure Monochrome**: Black text on white background
- **Monospace Type**: Courier New/Monaco for technical aesthetic
- **Single-Page Scroll**: Hero → About → Work → Contact
- **Advanced Animations**: Staggered character reveals, fade-up effects, glitch hover states

## File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # Monochrome styles + animation keyframes
├── script.js           # Kinetic typography engine
└── README.md          # This file
```

## Animation Features

### Hero Title
- Text splits into individual characters on load
- Staggered reveal animation (30ms per character)
- Line-by-line cascade effect
- Subtitle fades in after title completes

### Scroll Animations
- Fade-in effects for section titles
- Fade-up effects for content paragraphs
- Intersection Observer triggers animations at 15% visibility
- Custom delays via `data-delay` attributes

### Glitch Effect
- Email link glitches on hover
- Skew and clip-path animations
- Pseudo-element layering for multi-dimensional effect

### Optional Enhancements
The JavaScript includes commented-out code for:
- Custom cursor that follows mouse
- Text scramble/decode effect for section titles
- Additional experimental interactions

Uncomment these sections in [script.js](script.js) to enable.

## Customization Guide

### 1. Update Personal Information

**In [index.html](index.html):**

- **Line 6**: Update page title (currently "Vyacheslav — AI Product Manager")
- **Lines 20-24**: Update hero statement
  ```html
  <h1 class="hero-title" data-animate="kinetic">
      <span class="line">Your statement line 1</span>
      <span class="line">Your statement line 2</span>
      <span class="line">Your statement line 3</span>
      <span class="line">Your statement line 4</span>
  </h1>
  ```
  **Important**: Keep the `<span class="line">` structure for animations to work

- **Line 26**: Update role/title
- **Lines 34-36**: Update About section bio
- **Line 123**: Update email address
  ```html
  <a href="mailto:your.email@example.com" class="email-link" data-animate="glitch">your.email@example.com</a>
  ```

### 2. Add Your Work Projects

The work section is currently empty (line 47 shows "Projects coming soon").

**To add a project**, replace the empty message with:

```html
<article class="project">
    <div class="project-meta">
        <span class="project-year">2025</span>
        <span class="project-type">AI Product</span>
    </div>
    <h3 class="project-title" data-animate="fade-up">Project Title</h3>
    <p class="project-description" data-animate="fade-up" data-delay="100">
        Project description. What problem did you solve?
        What was your approach? What were the results?
    </p>
    <img src="images/project.jpg" alt="Project screenshot" class="project-image">
</article>
```

**Add CSS for project images** in [styles.css](styles.css):
```css
.project-image {
    width: 100%;
    height: auto;
    border: 1px solid var(--black);
    margin-top: 40px;
}
```

### 3. Animation Timing Adjustments

**To change animation speeds**, edit [styles.css](styles.css):

```css
/* Character reveal speed (currently 0.8s) */
@keyframes charReveal {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
.hero-title .line .char.animate {
    animation: charReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    /* Change 0.8s to your preferred duration */
}
```

**To change stagger timing**, edit [script.js](script.js) line 28:
```javascript
const totalDelay = (lineIndex * 100) + (charIndex * 30);
// Change 30 to adjust per-character delay (milliseconds)
```

### 4. Enable Optional Features

**Custom Cursor**: Uncomment lines 104-118 in [script.js](script.js)

**Text Scramble Effect**: Uncomment lines 127-192 in [script.js](script.js)

Then add CSS for custom cursor to [styles.css](styles.css):
```css
.custom-cursor {
    width: 20px;
    height: 20px;
    border: 1px solid var(--black);
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: width 0.2s, height 0.2s;
}

.custom-cursor.hover {
    width: 40px;
    height: 40px;
}
```

### 5. Disable Animations

To turn off all animations and return to static design:

**Option A**: Comment out the `script.js` include in [index.html](index.html):
```html
<!-- <script src="script.js"></script> -->
```

**Option B**: Add this to [styles.css](styles.css):
```css
* {
    animation: none !important;
    transition: none !important;
}

[data-animate] {
    opacity: 1 !important;
    transform: none !important;
}
```

## Adding Images

1. Create `images` folder: `mkdir images`
2. Add optimized images (JPG/PNG, under 500KB each)
3. Reference in HTML: `<img src="images/filename.jpg" alt="Description">`

**Image optimization tips:**
- Width: 1800px max
- Format: JPG for photos, PNG for screenshots
- Compression: 80-85% quality
- Use tools like [TinyPNG](https://tinypng.com) or [Squoosh](https://squoosh.app)

## Deployment

### GitHub Pages (Free)

1. Create repository on GitHub
2. Upload all files
3. Settings → Pages → Source: main branch
4. Live at `https://username.github.io/repo-name`

### Netlify (Free)

1. Sign up at [netlify.com](https://netlify.com)
2. Drag folder to Netlify drop zone
3. Instant deployment
4. Optional: Add custom domain

### Vercel (Free)

1. Sign up at [vercel.com](https://vercel.com)
2. Import repository or drag files
3. Auto-deploy on every commit

## Performance

- **No frameworks**: Pure vanilla JavaScript
- **Lightweight**: ~5KB total CSS/JS (gzipped)
- **Smooth 60fps**: Hardware-accelerated transforms
- **Accessibility**: Respects `prefers-reduced-motion`

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

**Note**: Animations use modern CSS (clip-path, transforms) and ES6 JavaScript. Works in all browsers from 2020+.

## Accessibility

- **Reduced Motion**: Automatically disables animations if user prefers reduced motion
- **Semantic HTML**: Proper heading hierarchy, landmarks
- **Keyboard Navigation**: All interactive elements focusable
- **High Contrast**: Pure black on white ensures WCAG AAA compliance
- **Screen Readers**: Content remains accessible without JavaScript

## Tips for Best Results

1. **Keep hero text concise**: 3-4 lines, 3-7 words per line works best
2. **Use high-quality images**: Blurry images ruin the refined aesthetic
3. **Test on mobile**: Animations scale but test on real devices
4. **Proofread carefully**: Typos are more visible with kinetic typography
5. **Don't overload**: 3-5 projects max for focused impact

## Troubleshooting

**Animations not running:**
- Check browser console (F12) for JavaScript errors
- Ensure all files are in same directory
- Verify `data-animate` attributes are present

**Text looks broken:**
- Check that hero title uses `<span class="line">` structure
- Ensure quotes/special characters are properly escaped

**Slow performance:**
- Reduce number of animated characters
- Optimize images
- Disable optional features (cursor, scramble)

**Email glitch not working:**
- Verify `data-animate="glitch"` attribute exists
- Check that email link has inline position: relative in CSS

## Customization Philosophy

This portfolio is designed to be:
- **Minimal**: Remove features before adding them
- **Focused**: Your work is the hero, not the website
- **Intentional**: Every animation has purpose
- **Fast**: Performance is a feature

The kinetic typography creates energy and movement while maintaining brutalist restraint. Don't add color, gradients, or decorative elements. Let the motion and your work do the talking.

---

**Built by Claude Code for Vyacheslav**
Kinetic typography meets minimal brutalism.
