export const metadata = {
  title: 'Gestão da Direção',
  description: 'Gestão da direção - Site do SESI 242',
}


export default function RootLayout({ children }) {
  return (
    <>
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <html lang="en">
      <body>{children}</body>
    </html>
    </>
  )
}
