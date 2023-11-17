import Image from "next/image";
import { Inter } from "next/font/google";
import DonationDetail from "@/components/DonationDetail";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="max-w-xl bg-[#EBEBEB] h-screen">
      <DonationDetail />
    </div>
  );
}
