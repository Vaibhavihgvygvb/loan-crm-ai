import "./globals.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "Loan CRM AI",
  description:
    "AI-powered loan CRM system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}