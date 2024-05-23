"use client"
import { useContext, useEffect, useState } from "react"
import { addToWishListIcon } from "@/components/itemCard/itemCardIcons"
import { addToCartIcon } from "@/components/itemCard/itemCardIcons"
import { Cart } from "@/store/Cart"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
export default function ItemCard({ item, page, hot, categoryItem }) {

  const [addedToCart, setAddedToCart] = useState(false)
  //  <Image src={item.deal_photo} fill style={{ objectFit: 'contain' }} />

  useEffect(() => {
    if (addedToCart) {
      const timeOut = setTimeout(() => {
        setAddedToCart(false)
      }, 3000)
    }
  }, [addedToCart])

  const cartCtx = useContext(Cart)


  function addToCart(item) {
    setAddedToCart(true)
    let sameItem;
    if (item.product_asin) {
      sameItem = cartCtx.cart.some((sameItem) => sameItem.product_asin === item.product_asin)
    } else if (item.asin) {
      sameItem = cartCtx.cart.some((sameItem) => sameItem.asin === item.asin)
    }
    if (!sameItem) {
      cartCtx.setCart((prev) => {
        let updatedList = [...prev]
        updatedList.push({ ...item, quantity: 1 })
        return updatedList
      })
    } else if (sameItem) {
      cartCtx.setCart((prev) => {
        let updatedList = [...prev]
        const addedItemIndex = updatedList.findIndex((sameProduct) => sameProduct.product_asin === item.product_asin)
        updatedList[addedItemIndex].quantity += 1
        return updatedList
      })
    }

  }

  function addToWishList(item) {
    setAddedToCart(true)
    cartCtx.setWishList((prev) => {
      let updatedList = [...prev]
      updatedList.push(item)
      return updatedList
    })
  }



  if (hot && !categoryItem) {
    return (
      <div className={`flex flex-col flex-shrink-0 flex-grow-0 duration-700 ease-in-out justify-between w-1/5 p-4 border max-lg:w-1/4 max-md:w-1/3 max-sm:w-full`}
        style={{ translate: `${page * -100}%` }}>
        <div className="mb-4 relative h-60 w-full">
          {item?.deal_photo && <Image src={item.deal_photo} fill style={{ objectFit: 'contain' }} alt="Product Image" />}
        </div>

        <div className="mb-4 text-ellipsis">
          <Link href={`/${item.product_asin}`} className="line-clamp-2 font-bold hover:underline cursor-pointer max-md:text-sm">{item.deal_title}</Link>
        </div>

        <div className="flex justify-between mb-4">
          {item.deal_price.amount && <p className="text-red-600 text-lg max-lg:text-sm">{item.deal_price.amount}$</p>}
          {item.list_price.amount && <p className="text-gray-500 text-lg line-through max-lg:text-sm">{item.list_price.amount}$</p>}
        </div>

        <div className=" mb-4">
          <p className="text-gray-500 text-base">Save: {item.savings_amount.amount}$</p>
        </div>

        <div className="flex flex-row items-center justify-between" >
          <button onClick={() => addToCart(item)} className="bg-red-600 p-2 rounded-full">{addToCartIcon}</button>
          <AnimatePresence>
            {addedToCart && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-700 text-lg">Added!</motion.p>}
          </AnimatePresence>
          <button onClick={() => addToWishList(item)} className="bg-red-600 p-2 rounded-full">{addToWishListIcon}</button>
        </div>

      </div>
    )
  } else if (!hot && categoryItem) {
    return (
      <div className={`flex flex-col flex-shrink-0 flex-grow-0 duration-700 ease-in-out justify-between w-1/5 p-4 border max-lg:w-1/4 max-md:w-1/3 max-sm:w-full`}>
        <div className="mb-4 relative h-60 w-full">
          {categoryItem?.product_photo && <Image src={categoryItem.product_photo} fill style={{ objectFit: 'contain' }} />}
        </div>

        <div className="mb-4 text-ellipsis">
          <Link href={`/${categoryItem.asin}`} className="line-clamp-2 font-bold hover:underline cursor-pointer">{categoryItem?.product_title}</Link>
        </div>

        <div className="flex justify-between mb-4">
          <p className="text-red-600 text-lg">{categoryItem?.product_price}</p>
        </div>

        <div className=" mb-4">
          <p className="text-gray-500 text-base">Rating: {categoryItem?.product_star_rating} Stars</p>
        </div>

        <div className="flex flex-row items-center justify-between" >
          <button onClick={() => addToCart(categoryItem)} className="bg-red-600 p-2 rounded-full">{addToCartIcon}</button>
          <AnimatePresence>
            {addedToCart && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-700 text-lg">Added!</motion.p>}
          </AnimatePresence>
          <button onClick={() => addToWishList(categoryItem)} className="bg-red-600 p-2 rounded-full">{addToWishListIcon}</button>
        </div>

      </div>
    )
  }


}