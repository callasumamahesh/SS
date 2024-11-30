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
  title: "Smart Save",
  description: "This will show your Expenses and your current savings.By this website you have a clear idea about your expenses and savings.",
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
