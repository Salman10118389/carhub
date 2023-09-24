"use client";
import { CardCar, ShowMore } from '@/components';
import CustomFilter from '@/components/CustomFilter';
import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import { fuels, manufacturers, yearsOfProduction } from '@/constants';
import { FilterProps, HomeProps } from '@/types';
import { fetchCars } from '@/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';


export default async function Home(){// untuk versi 16{ searchParams }: HomeProps) {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  // filter state
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState("2022");

  // Pagination State
  const [limit, setLimit]  =useState(10);

  // function to fetch Cars
  const getCars = async () => {
    setLoading(true);
    try {
      const result = await fetchCars(
        {
          manufacturer: manufacturer,
          year: year,
          fuel: fuel,
          limit: limit,
          model: model,

        }
      );
      setAllCars(result);
    }catch (err) {
      console.log("error");
    } finally {
      setLoading(false)
    }    
  }
  // Make a listener for manufacturer, model, fuel, & year
  useEffect(() => {
    // Function to re-get the Cars
    getCars();
  }, [manufacturer, model, fuel, year]);

  // Untuk Versi 16
  // const allCars = await fetchCars({
  //   manufacturer: searchParams.manufacturer || "",
  //   year: searchParams.year || 2022,
  //   fuel: searchParams.fuel || "",
  //   limit: searchParams.limit || 10,
  //   model: searchParams.model || "",
  // });

  console.log();
  console.log(allCars);
  
  const isEmptyData = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  return (
    <main className="overflow-hidden">        
      <Hero />
      <div className="mt-12 padding-x padding-y" id = "discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">
            Car Catalogue
          </h1>
          <p>Explore the Cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar setManufacturer = { setManufacturer }
          setModel = { setModel }/>

          <div className="home__filter-container">
            <CustomFilter title ="fuel" options={fuels} setFilter = { setFuel }/>
            <CustomFilter title ="year"  options={yearsOfProduction} setFilter = { setYear }/>
          </div>
        </div>  

        {
          allCars.length > 0 ? (
            <section>
              <div className="home__cars-wrapper">
                {
                  allCars?.map((car) => (
                    <CardCar car = {car}/>
                  ))
                }
              </div>

              {loading && (
                <div className="mt-16 w-full flex-center">
                  <Image
                    src = "/loader.svg"
                    alt="Loading"
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
              )}
              <ShowMore
                pageNumber = {limit/10}
                isNext = {limit > allCars.length}
                setLimit = { setLimit }
              />
            </section>
          ): (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">
                Ooops, No Results
              </h2>
              <p>
              Untuk Versi 16  {/* {allCars?.message} */}
              </p>
            </div>
          )
        }       
      </div>
    </main>    
  )
}
