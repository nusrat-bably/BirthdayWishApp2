# 🎂 Happy Birthday  - Interactive Birthday App

A beautiful, modern interactive birthday app with two stunning screens:
1. **Initial Screen**: Pixel-art inspired cake with handwritten messages (like image 4)
2. **Celebration Screen**: 3D modeled cake scene with photos and interactive birthday card (like image 5)

Blow out the candle to transition between screens and explore the interactive elements!

## 🌐 HTTPS Requirement Explained

**Why HTTPS is needed:**
- Modern browsers (Chrome, Firefox, Safari, Edge) require **HTTPS** (secure connection) to access your microphone
- This is a security feature to prevent malicious websites from secretly recording you
- The only exceptions are:
  - `localhost` (for local development)
  - `127.0.0.1` (also for local development)

**What this means:**
- ✅ **Works on:** `https://yourdomain.com`, `http://localhost:8000`, `http://127.0.0.1:8000`
- ❌ **Won't work on:** `http://yourdomain.com` (non-secure HTTP)

## 🚀 How to Run Locally

### Option 1: Python (Easiest)
```bash
# Navigate to the project folder
cd /Users/nusrat_bably/Desktop/Fiads'Brthday

# Start a local server
python3 -m http.server 8000

# Then open in browser:
# http://localhost:8000
```

### Option 2: Node.js (if you have it)
```bash
npx http-server -p 8000
```

### Option 3: VS Code Live Server
If you use VS Code, install the "Live Server" extension and right-click `index.html` → "Open with Live Server"

## 🎯 How to Use

1. **Open the app** in your browser (using one of the methods above)
2. **Click "Start the celebration"** button
3. **Allow microphone access** when your browser asks
4. **Blow toward your microphone** - you'll see a volume bar showing your blow strength
5. **Keep blowing** until the candle goes out and the celebration begins! 🎉

## 🔧 Troubleshooting

### "Blowing isn't working"

**Check these things:**

1. **Microphone permission:**
   - Make sure you clicked "Allow" when the browser asked for microphone access
   - Check browser settings if microphone is blocked

2. **Volume threshold:**
   - The app now shows a **volume bar** - if it's not moving, your mic might not be detecting sound
   - Try speaking or making noise to test if the mic is working
   - Blow closer to the microphone

3. **Browser compatibility:**
   - Works best in Chrome, Firefox, Edge, or Safari (latest versions)
   - Some older browsers may not support microphone access

4. **HTTPS/localhost:**
   - Make sure you're using `localhost` or `127.0.0.1` (not just opening the file directly)
   - Opening `file://` directly won't work - you need a local server

5. **Microphone settings:**
   - Check your system settings to ensure your microphone isn't muted
   - Try a different microphone if available

### Visual Feedback
The app now includes:
- **Volume bar** - Shows how hard you're blowing in real-time
- **Status messages** - Tells you to blow harder or that you're doing great
- **Error messages** - Explains what went wrong if something fails

## 📦 For Deployment

When deploying to a real website:
- You **must** use HTTPS (get an SSL certificate)
- Services like Netlify, Vercel, GitHub Pages provide free HTTPS
- The app will automatically detect if HTTPS is required and show a helpful error message

## 🎨 Features

### Initial Screen (Image 4 Style)
- ✨ Handwritten-style glowing text with "Happy Birthday Cutie :)"
- 🎂 Pixel-art inspired 3-tier cake with animated candle
- 💨 Real-time blow detection with visual volume bar
- 🖱️ Click the cake to start the celebration

### Celebration Screen (Image 5 Style)
- 🏙️ Beautiful cityscape background with animated lights
- 🎂 3D modeled multi-tier cake with strawberries and candles
- 📸 Four interactive photo frames around the cake
- 🎴 Interactive birthday card that flips and zooms
- 🎉 Continuous confetti celebration
- 🎵 Background music (add your own birthday tune!)

### Interactive Elements
- **Cake**: Click to start, then blow to extinguish candle
- **Photo Frames**: Click to see them shake and interact
- **Birthday Card**: 
  - First click: Flips the card on the table
  - Second click: Opens zoomed modal view to read the message
  - Click outside or X button to close

## 🎵 Adding Birthday Music

To add your own Happy Birthday tune:

1. Place your music file in the project folder (e.g., `birthday-song.mp3`)
2. Update `index.html` line 134-137:
```html
<audio id="backgroundMusic" loop>
  <source src="birthday-song.mp3" type="audio/mpeg">
</audio>
```

Or use an online URL:
```html
<audio id="backgroundMusic" loop>
  <source src="https://your-music-url.com/birthday.mp3" type="audio/mpeg">
</audio>
```

## 📱 Responsive Design

Works beautifully on:
- 💻 Desktop computers
- 📱 Mobile phones
- 🖥️ Tablets

Enjoy celebrating! 🎊

