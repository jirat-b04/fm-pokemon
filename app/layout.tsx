import type { Metadata } from "next";
import "./globals.css";
import { ApolloProviders } from "./providers";

export const metadata: Metadata = {
  title: "Pokemon",
  description: "Search Pokemon by name",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-atmosphere min-h-screen">
        <ApolloProviders>{children}</ApolloProviders>
      </body>
    </html>
  );
}
