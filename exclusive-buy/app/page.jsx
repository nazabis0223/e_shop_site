import ItemShowcase from "@/components/itemShowcase/itemShowcase"
export default function Home() {


  return (

    <div className="flex overflow-x-hidden flex-col w-full p-5">
      <div>
        <p className="font-semibold text-lg text-red-600">Today's Hot Sales</p>
      </div>

      <ItemShowcase />
    </div>

  );
}


