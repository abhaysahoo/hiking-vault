import Provider from "@/components/shared/Provider";
import "../styles/globals.css";

export const metadata = {
  title: "Hiking Vault",
  description: "Tracking With Ease",
  icons: {
    icon: '/favicon.ico', // This points to the favicon in the public directory
  },
};

export default function RootLayout({ children, session }) {
  return (
    <Provider session={session}>
      <html lang="en">
        <body className="">
          {children}
        </body>
      </html>
    </Provider>
  );
}
