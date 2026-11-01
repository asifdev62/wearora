import type { Metadata } from "next";
import ProfileView from "../components/ProfileView";

export const metadata: Metadata = {
  title: "My Account",
  description: "Your Wearora cart, wishlist and order history.",
  robots: { index: false, follow: false },
};

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A88B72]">
            Wearora
          </p>
          <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#352B24] sm:text-4xl">
            My Account
          </h1>
        </div>

        <ProfileView />
      </div>
    </main>
  );
}
