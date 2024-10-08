import { Inter } from "next/font/google";
import "./globals.css";
import { MyRecipesContextProvider } from "../../myRecipesContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      <body className="m-0 p-0" >
      <MyRecipesContextProvider>

        {children}
      </MyRecipesContextProvider>
        </body>
    </html>
   
  );
}
