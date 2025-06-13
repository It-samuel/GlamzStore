import Footer from "@/components/footer";
import Header from "@/components/ui/shared/header";
import { SessionProvider } from "next-auth/react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
        <Header />
        <main className="flex-1 wrapper">
            <SessionProvider>
              {children}
            </SessionProvider>
        </main>
        <Footer />
    </div>
  );
}
