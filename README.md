# 🎁 Interactive Birthday Website Template

A beautifully animated, cinematic, single-page web experience designed to be a personalized digital birthday gift or appreciation timeline for a friend or loved one. 

## ✨ Features
* **Cinematic Landing:** A dark, immersive theme featuring a beautifully styled, floating gift box.
* **Interactive Reveal:** Tap to open the gift box, triggering a smooth "party popper" confetti burst and seamlessly starting the background audio.
* **Story-Driven Timeline:** A smooth, scrollable timeline of photos paired with dedicated text containers for personalized memories and notes.
* **Responsive Design:** Looks gorgeous and scales perfectly on both desktop and mobile devices.

## 🛠️ Tech Stack
* **React:** UI Framework
* **Vite:** Blazing fast build tool
* **Framer Motion:** For smooth fades, reveals, and timeline transitions
* **Canvas Confetti:** For the interactive party popper effect

## 🚀 How to Customize and Run Locally

**1. Clone the repository:**
```bash
git clone [https://github.com/shreyam29/interactive-birthday-template.git](https://github.com/shreyam29/interactive-birthday-template.git)
cd interactive-birthday-template

**2. Install dependencies:**
run :- npm install

**3. Add Your Personal Assets:**
Drop your photos into the public/ folder and name them 1.jpg, 2.jpg, etc.

Drop your background music into the public/ folder and name it music1.mp3 (and music2.mp3 for the finale, if you have two tracks).

**4. Add Your Personal notes:**
Open src/App.jsx in your code editor.

Look for the  CUSTOMIZATION SECTION comments near the top.

Replace the placeholder text inside the code with your own personal notes, memories, and signatures.

**5. Start the local server:**
To start the server run :-  npm run dev


Deployment
This project is fully static and optimized for zero-config deployments.

Vercel: Simply import the GitHub repository into Vercel, leave all default Vite build settings as they are, and click "Deploy."

Netlify: Drag and drop the built dist folder into Netlify Drop, or link your GitHub repo for continuous deployment.

License
This project is open-source and available under the MIT License.