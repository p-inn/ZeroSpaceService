"use client";

export default function Footer() {
  return (
    <footer className="w-full fixed bottom-0 left-0 bg-gray-700">
      <div className="w-full mx-auto px-5 h-32 flex items-center justify-center">
        <div className="flex flex-col gap-5 items-center">
          <div className="flex items-center gap-5 justify-center">
            <p className="text-gray-50 text-xs">
              © 2024. ZeroSpace. all rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-5 justify-center text-gray-50 text-xs">
            <span>CONTACT US</span>
            <span>FACEBOOK</span>
            <span>INSTAGRAM</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
