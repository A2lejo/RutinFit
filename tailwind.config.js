/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily:{
				italianno: ['Italianno', 'cursive'],
				inria: ['Inria Serif', 'serif'],
			},
			boxShadow: {
				'custom': '0 4px 6px -1px rgba(130, 229, 181, 0.5), 0 2px 4px -1px rgba(130, 229, 181, 0.5)',
			},
		},
	},
	plugins: [],
};
