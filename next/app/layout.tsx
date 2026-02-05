export const metadata = {
  title: 'Musinsa API',
  description: 'Search and recommendation API'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
