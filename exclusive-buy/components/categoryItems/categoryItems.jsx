import { useEffect, useState } from "react"
import { fetchByCategory } from "../../utils/dataManagement"
import ItemCard from "../itemCard/itemCard"
export default function CategoryItems({ category }) {

  const [categoryData, setCategoryData] = useState()

  useEffect(() => {
    async function fetchData() {
      const data = await fetchByCategory(category)
      console.log(category)
      setCategoryData(data)
    }

    fetchData()
  }, [category])



  return (
    <div className="flex flex-row flex-wrap gap-x-4 gap-y-4 justify-center items-start">
      {categoryData?.map((item) => <ItemCard categoryItem={item} />)}
    </div>
  )
}