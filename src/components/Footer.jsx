import React from "react";
import { footerLinks } from "../constants";

const Footer = () => {
  return (
    <footer className="py-5 sm:px-10 px-5">
      <div className="screen-max-w">
        <div className="">
          <p className="font-semibold text-xs text-gray">
            More ways to shop:{" "}
            <span className="underline text-blue"> Find an Apple Store </span>{" "}
            or <span className="underline text-blue"> Other retailer </span>{" "}
            near you.
          </p>

          <p className="font-semibold text-xs text-gray">Or call 09145869343</p>
        </div>

        <div className="bg-neutral-700 my-5 h-[1px] w-full" />

        <div className="flex md:flex-row flex-col md:items-center justify-between">
          <p className="font-semibold text-sm text-gray">
            Copyright @ 2024 Apple Inc. All Rights Reserved.
          </p>
          <div className="flex">
            {footerLinks.map((item, idx) => (
              <p key={item} className="text-sm text-gray font-semibold">
                {item + " "}
                {idx !== footerLinks.length - 1 && (
                  <span className="mx-2"> | </span>
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
