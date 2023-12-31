import Image from "next/image";
import { Inter } from "next/font/google";
import ListDonations from "@/components/ListDonations";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="max-w-xl bg-[#EBEBEB] h-screen">
      <ListDonations />
    </div>
  );
}
