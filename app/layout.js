import { Inter, Roboto } from 'next/font/google';
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Optional for custom CSS variable
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'], // Specify weights, e.g., regular and bold
  variable: '--font-roboto', // Optional for custom CSS variable
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${roboto.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
