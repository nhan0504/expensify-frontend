import "./globals.css";
import { Inter } from "next/font/google";
import { UserProvider } from "@/context/UserContext";
import { ExpensesProvider } from "@/context/ExpensesContext";

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
      <body className={inter.className}>
        <UserProvider>
          <ExpensesProvider>{children}</ExpensesProvider>
        </UserProvider>
      </body>
    </html>
  );
}
