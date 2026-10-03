
# 🎂 BirthdayWishApp2

A custom interactive birthday surprise website designed as a romantic, playful, and cinematic one-page celebration experience. The app starts with a glowing candle scene, tracks the user's breath through the microphone, and transitions into a full celebration room with animated confetti, a memory album, a handwritten birthday letter, a gift box reveal, and themed decorative artwork.

This project is entirely front-end based and runs as a static website with no build tool or package installation required.

## Overview

The app is built around a two-act experience:

1. Initial screen: a mysterious birthday setup with a glowing candle, celebratory text, and microphone-based blowing interaction.
2. Celebration screen: a decorative room scene with balloons, garlands, a centered cake, a memory book, a birthday card, and multiple pop-up story moments.

Once the candle is lit and the user blows toward the microphone, the app detects the sound intensity and, after sustained blowing, transitions to the full celebration interface.

## Features implemented

### 1. Interactive candle and initiation flow
- A stylized cake sits at the center of the opening screen.
- Clicking or pressing Enter/Space on the cake triggers the birthday sequence.
- A candle flame appears and the app starts ambient celebration motion.
- A hidden message appears encouraging the user to blow toward the microphone.
- Background music starts automatically when allowed by the browser.

### 2. Microphone-based blow detection
- The app uses the Web Audio API and `getUserMedia()` to access the microphone.
- It samples audio in real time and computes a volume level from the microphone input.
- A live volume bar and status text show the strength of the blow.
- The project detects sustained blowing and waits for a hold threshold before revealing the celebration scene.
- It gracefully handles missing permissions or blocked microphone access with an error message.

### 3. Transition from intro to celebration scene
- When the blow threshold is reached, the intro fades out.
- The celebration screen slides in with full visual presentation.
- The confetti system continues in the background during the reveal.
- The microphone stream stops after the celebration begins to reduce unnecessary audio access.

### 4. Confetti animation system
- A full-screen canvas layer is used for particle effects.
- Confetti bursts are fired from the center of the screen when the candle is lit.
- A rain-like confetti effect continues during the celebration.
- Objects fall naturally with motion, tilt, and color variation.

### 5. Detailed birthday room scene
- The celebration view contains a layered art composition with:
  - balloons,
  - a top garland,
  - a giant bow,
  - wall text reading “Happy Birthday”,
  - photo cards and memory elements,
  - a center cake,
  - candelabra decor,
  - a basket cluster,
  - gift box and greeting card elements.
- The design uses layered gradients, shadows, textures, and decorative props to create a handmade crafted feeling.

### 6. Memory album / photo gallery
- A memory book graphic is placed in the celebration room.
- Clicking it opens a modal album grid.
- The album dynamically loads a collection of local images from the `photo/` folder.
- There are 40 photo assets included in the project, all displayed in a gallery layout.
- Images fall back to a placeholder if any file is missing.

### 7. Personalized handwritten letter modal
- A 3D letter card sits on the table scene and opens a large message modal.
- The message contains a custom birthday note with playful, affectionate wording and personal references.
- The modal displays on top of a blurred dark overlay and includes a close button.
- A decorative left-side panel adds a dreamy personal note aesthetic.

### 8. Gift box interaction
- A plaid gift box sits in the room and can be clicked to open.
- When opened, a popup card reveals a themed illustration area with a cat, duck, hen, and popper art.
- A speech bubble contains a custom note.
- The popup closes via the close button or background overlay.

### 9. Decorative character art and visuals
- A party cat appears when the candle is lit.
- Small sparkle and glowing star accents surround the cake and the room.
- Scroll-like textures, ribbon details, and custom CSS shapes are heavily used to make the page feel handcrafted.
- The layout includes a soft ambient glow behind the page.

### 10. Responsive design
- The project is designed for desktop and mobile screens.
- The layout adapts for smaller screens by stacking content, resizing props, and adjusting ingredient proportions.
- The app retains the birthday experience across multiple viewport sizes.

### 11. Accessibility and usability details
- The interactive cake is keyboard accessible.
- Click targets and interactive states are visually enhanced.
- The site uses semantic structure for the screens and interactive elements.
- Microphone-related failure states are displayed clearly in the UI.

## Tech stack

This project uses the following technologies:

- HTML5 for page structure and content
- CSS3 for visual design, animations, layered art, responsive layout, and modal styling
- JavaScript (ES6+) for interactivity, audio capture, animation logic, and UI behavior
- Web Audio API for microphone input and volume sensing
- Canvas API for confetti effects
- Google Fonts for custom typography
- Local media assets including JPG images, GIFs, and a custom MP3 audio file

### Front-end stack summary
- Static web app
- No framework dependency
- No package manager required
- No build step required

## Project structure

```text
BirthdayWishApp2/
├── index.html              # Main page layout and all birthday scene markup
├── style.css               # Visual design, animations, modals, and responsive styling
├── script.js               # App logic for candle interaction, mic detection, confetti, and modals
├── hbb.mp3                 # Background music used in the birthday experience
├── README.md               # Project documentation
├── photo/                  # Birthday memory assets and decorative images
│   ├── 1.jpeg ... 40.jpeg
│   ├── yaseen-transparent.gif
│   └── ...
└── .git/                   # Version control metadata
```

## How to run locally

Because the microphone feature requires browser permission and secure access, you should run the project via a local web server.

### Option 1: Python

```bash
<<<<<<< HEAD
cd /Users/nusrat_bably/Desktop/BirthdayWishApp2
=======
# Navigate to the project folder
cd /Users/nusrat_bably/Desktop/Fiads'Brthday

# Start a local server
>>>>>>> d163f62b411d4b5a4971214984a924955226a664
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

### Option 2: VS Code Live Server
- Install the Live Server extension.
- Open the folder in VS Code.
- Right-click `index.html` and choose “Open with Live Server”.

## HTTPS / browser requirement

The microphone functionality is restricted by browser security rules:

- HTTPS is required on deployed websites
- `localhost` and `127.0.0.1` are allowed for local testing
- Opening the file directly with `file://` may block microphone access

This is why running through a local server is recommended.

## Customization points

You can personalize the project by editing:

- `index.html` for text content, birthday note, image sources, and structure
- `script.js` for timing, thresholds, audio behavior, and animation logic
- `style.css` for palette, spacing, typography, and art styling
- `photo/` for replacing the gallery and decorative images
- `hbb.mp3` for your preferred background music

### Example customizations
- Change the name “Fiaddd” in the title and message text
- Replace the memory photos in the album
- Replace the audio file with another birthday song
- Adjust blow threshold and animation timing in `script.js`

## Browser compatibility

This app works best in modern browsers such as:

- Chrome
- Edge
- Firefox
- Safari (latest versions)

## Notes

This is a polished static birthday webpage rather than a framework app. It emphasizes visual storytelling, sound interaction, and gift-like surprise moments rather than backend logic or database architecture.

## Project summary

The completed project is a fully interactive birthday surprise page that combines custom CSS art, animated confetti, photo memories, a microphone-based blow mechanic, a handwritten love note, gift-box reveal, and a celebration room with layered scenes. It is designed to feel personal, festive, and memorable while remaining lightweight and easy to run locally.
