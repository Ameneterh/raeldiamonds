import { assets } from "../assets/assets";

export default function SubscriptionComponent() {
  return (
    <div className="mt-4 md:mt-20 mb-10 px-4 w-full max-w-4xl mx-auto p-4 md:p-10 opacity-80 backdrop-blur-md">
      <div className="flex flex-col items-center">
        <img
          src={assets.image}
          width={60}
          className="mb-5 -mt-[45px] md:-mt-[70px]"
        />
        <h1 className="uppercase text-2xl text-center prata-regular mb-3 text-black font-extrabold">
          Newsletter <span className="text-gray-400">Subscription</span>
        </h1>
        <p className="font-extralight text-sm text-center w-full max-w-md mx-auto text-gray-900">
          Subscribe for latest updates, promotions and exclusives offers from
          us; never miss out on our latest products and offers. We promise not
          to spam you with unnecessary emails.
        </p>

        <div className="flex items-center justify-between gap-1 mt-4 md:mt-10 w-full max-w-xl bg-gray-200 rounded-full p-1">
          <input
            type="text"
            placeholder="Enter your email"
            className="flex-1 w-full text-black font-extralight p-1 outline-none border-none ring-0 focus:outline-none focus:border-none px-1 md:px-4 rounded-full"
          />
          <button className="text-sm bg-red-800 text-white font-semibold hover:opacity-85 px-4 rounded-full my-0 hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer">
            SUBSCRIBE
          </button>
        </div>
      </div>
    </div>
  );
}
