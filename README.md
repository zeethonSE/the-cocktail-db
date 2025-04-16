# 🍸 The Cocktail DB

A beautiful, responsive for discovering and saving your favorite cocktail recipes — built with **React**, **Tailwind CSS**.

---

## 🔥 Live Demo

🌐 [Go view on Web](https://zeethonse.github.io/the-cocktail-db/)

---

## 🧠 Features

- 🔍 **Randomly Pick Cocktails** by name
- ❤️ **Favorite Drinks** stored locally using **IndexedDB**
- 🗑️ **Remove favorites** anytime
- 📁 **Image caching** via IndexedDB
- 📱 **Mobile-ready UI** with Tailwind CSS

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS + Animations
- **Data Source**: [TheCocktailDB API](https://www.thecocktaildb.com/api.php)
- **Storage**: IndexedDB (for favorites + images)

---

## 🚀 How to Run Locally

```bash
# Clone the repo
git clone https://github.com/zeethonSE/the-cocktail-db.git
cd the-cocktail-db/frontend

# Install dependencies
npm install

# Start development server
npm run dev

📦 Build for Production
npm run build

📁 Folder Structure
the-cocktail-db/
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   └── ui/
    │   └── indexedDB.js
    ├── package.json
    ├── README.md
    └── vite.config.js

💾 Offline Storage
Favorite drinks (IDs, names, images) are stored in IndexedDB

Drink images are also cached locally, so they appear offline

No backend or server-side database is used

✨ Credits
TheCocktailDB for their open API

Icons & animations from Heroicons and Framer Motion

🙋‍♂️ Author
Sai Sai
💼 Web Developer
📧 zeethon0@gmail.com
🔗 [LinkedIn](https://linkedin.com/in/ssaiwd25)

📄 License
This project is open source and available under the [MIT License.](MIT-LICENSE)