import Header from "./Header";
import Footer from "./Footer";
import "./globals.css";

export const metadata = {
  title: {
    default: "サイトのタイトル",
    template: `%s | サイトのタイトル`,
  },
  description: "サイトのディスクリプション",
  openGraph: {
    title: "og:title",
    description: "og:description",
    url: "og:url",
    siteName: "og:site_name",
    type: "website",
    images: "og:image",
  },
  twitter: {
    card: "summary",
    title: "twitter:title",
    description: "twitter:description",
    images: "twitter:image:src",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
