/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily:{
				italianno: ['Italianno', 'cursive'],
				inria: ['Inria Serif', 'serif'],
			},
			boxShadow: {
				'custom': '6px 5px 6px 1px rgba(130, 229, 181, 0.5), 2px 2px 4px 6px rgba(130, 229, 181, 0.5)'
			},
		},
	},
	plugins: [],
};
