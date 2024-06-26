import { useEffect, useState } from "react";
import ResturantCard from "./ResturantCard";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import Shimmer from "./Shimmer";

const Body = () => {
  const [listofRestaurants, setListofRestaurants] = useState([]);
  const [filteredlistofRestaurants, setFilteredlistofRestaurants] = useState(
    []
  );
  const [searchInput, setSearchInput] = useState([]);
  console.log("listofRestaurants", listofRestaurants);

  //custome hooks
  const checkOnline = useOnlineStatus();

  useEffect(() => {
    console.log("hii");
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.516357&lng=73.815334&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();
    //optional chaining
    const typeofreturant =
      "type.googleapis.com/swiggy.presentation.food.v2.FavouriteRestaurantInfoWithStyle";
    const data1 = json?.data?.cards?.map((item) => {
      if (
        item?.card?.card?.gridElements?.infoWithStyle["@type"] ===
        typeofreturant
      ) {
        return item.card.card.gridElements.infoWithStyle;
      }
    });
    const data2 = data1.filter((value) => value !== undefined);
    setListofRestaurants(data2[0]?.restaurants);
    setFilteredlistofRestaurants(data2[0]?.restaurants);
  };
  if (checkOnline === false) return <h1>Looks Like You are offline...</h1>;
  if (listofRestaurants.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="body-container">
      <div className="search-input">
        <input
          type="search"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <button
          onClick={() => {
            const filterData = listofRestaurants.filter((res) => {
              return res.info.name
                .toLowerCase()
                .includes(searchInput.toLowerCase());
            });
            setListofRestaurants(filterData);
            setFilteredlistofRestaurants(filterData);
          }}
        >
          Search
        </button>
      </div>
      <div className="grid  grid-cols-1  md:grid-cols-2 lg:grid-cols-4 lg:gap-4 justify-items-center ">
        {filteredlistofRestaurants &&
          filteredlistofRestaurants.map((resturant) => (
            <Link to={"/resturant/" + resturant.info.id}>
              <ResturantCard Key={resturant.info.id} resturant={resturant} />
            </Link>
          ))}
      </div>
    </div>
  );
};
export default Body;
