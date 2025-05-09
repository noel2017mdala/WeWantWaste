# WeWantWaste Skip Selection Page Redesign

This project is a front-end redesign challenge, focused on the **skip selection** page. The goal was to enhance the UI/UX, maintain functionality, and ensure responsiveness across desktop and mobile views.

## 🚀 Live Demo

[Click here to view the demo](https://we-want-waste-orpin.vercel.app/)

## 📸 Original vs Redesigned

- **Original Page**: Accessible after selecting a postcode and waste type at [wewantwaste.co.uk](https://wewantwaste.co.uk)
- **Redesigned Page**: Focuses on cleaner layout, better readability, and modular code using React + TailwindCSS.

---

## 🛠 Tech Stack

- **React**
- **TypeScript**
- **Tailwind CSS**
- **Axios** (for API calls)

---

## 📦 Project Structure

src/
│
├── components/ # Reusable UI components
├── pages/ # Page-level components
├── types/ # TypeScript interfaces and types
├── services/ # API calls and related helpers
└── assets/ # Images and icons

---

## ⚙️ Getting Started

Clone the repository:

```bash
git clone https://github.com/noel2017mdala/WeWantWaste.git
cd WeWantWaste

```

npm install

# or

yarn install

npm run dev

# or

yarn dev

## 🌐 API Integration

## The page dynamically fetches skips data using the following API:

GET https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft

💡 Design Improvements
Improved visual hierarchy and spacing

Added skip tags like "Allowed on Road" and "Heavy Waste"

Responsive grid layout for mobile and desktop

Used TailwindCSS for scalable design consistency

Code is modular and organized for scalability

🙌 Author
Abel Noel M'dala

[LinkedIn](https://www.linkedin.com/in/abel-mdala/) • [GitHub](https://github.com/noel2017mdala/)
