import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import HeartIcon from "../assets/icons/heart.svg";
import HeartFullIcon from "../assets/icons/heart_full.svg";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState, wishlistState } from "../atoms/userAtom";
import {
  addWishlistItem,
  getWishlistItems,
  setWishlistItems,
} from "../api/firebase";

interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  image: string;
  options: string[];
}

export default function ProductsDtail() {
  const location = useLocation();
  const { product } = location.state as { product: Product };
  const { description, image, price, options } = product;
  const [selected, setSelected] = useState<string | undefined>(
    options && options[0]
  );
  const user = useRecoilValue(userState);
  const setWishlist = useSetRecoilState(wishlistState);
  const wishlist = useRecoilValue(wishlistState);
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  const handleWishlist = async () => {
    if (user) {
      if (isInWishlist) {
        const updatedWishlist = wishlist.filter(
          (item) => item.id !== product.id
        );
        setWishlist(updatedWishlist);
        setWishlistItems(user.uid, updatedWishlist);
      } else {
        await addWishlistItem(user.uid, product);
        const updatedWishlist = await getWishlistItems(user.uid);
        setWishlist(updatedWishlist);
      }
    }
  };

  return (
    <div className="h-[1000px] min-h-screen w-[600px]">
      <img className="w-[600px] h-[450px]" src={image} alt={description} />
      <div className="flex m-[30px] gap-[20px]">
        <div className="w-[100px] h-[100px] bg-[#BEBEBE]"></div>
        <div className="w-[100px] h-[100px] bg-[#BEBEBE]"></div>
      </div>
      <div className="flex gap-[460px] text-lg text-left ml-[30px] mt-[25px]">
        <p className="">구매가</p>
        <div className="cursor-pointer" onClick={handleWishlist}>
          <img
            className="w-[30px] h-[30px]"
            src={isInWishlist ? HeartFullIcon : HeartIcon}
            alt="likeButton"
          />
        </div>
      </div>
      <p className="text-2xl font-bold text-left ml-[30px]">{`${price} 원`}</p>
      <h1 className="text-lg text-left ml-[30px] mt-[15px]">{description}</h1>
      <div className="w-full flex flex-col">
        <select
          className="p-3 m-7 border-2 border-brand rounded-md outline-none bg-[#EEE]"
          id="select"
          onChange={handleSelect}
          value={selected}
        >
          {options &&
            options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
        </select>
      </div>
      <p className="border border-[#D9D9D9] w-[550px] m-auto"></p>
      <div className="flex justify-center gap-[50px] mt-[30px]">
        <button className="w-[250px] py-3 bg-[#D34D4D] text-[#fff] border border-[#D34D4D] rounded-md hover:bg-[#fff] hover:text-[#D34D4D] duration-200">
          장바구니 담기
        </button>
        <button className="w-[250px] py-3 bg-[#8F5BBD] text-[#fff] border border-[#8F5BBD] rounded-md hover:bg-[#fff] hover:text-[#8F5BBD] duration-200">
          바로구매
        </button>
      </div>
    </div>
  );
}
