import "../styles/globals.css";

export const metadata = {
  title: "Hiking Vault",
  description: "Tracking With Ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        {children}
      </body>
    </html>
  );
}
