import "./globals.css";
import { Inter } from "next/font/google";
import { UserProvider } from "@/context/UserContext";
import { ExpensesProvider } from "@/context/ExpensesContext";
import { ReviewProvider } from "@/context/ReviewContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Expensify",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/logo.jpg" />
      <body className={inter.className}>
        <UserProvider>
          <ExpensesProvider>
            <ReviewProvider>{children}</ReviewProvider>
          </ExpensesProvider>
        </UserProvider>
      </body>
    </html>
  );
}
