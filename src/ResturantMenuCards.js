import { useDispatch } from "react-redux";
import { addItem } from "./utils/cartSlice";

const RestaurantMenuCards = (props) => {
  const { name, price, defaultPrice, description, imageId } =
    props.items.card.info;

  const dispatch1 = useDispatch();

  // // this function get trriggere without even cicking the event  when our on Click is onclick={handleItem(props.items.card.info)}
  //called automatiically as soon html parse is done using arrow function we can solve the issue
  // function handleItem() {
  //   alert("Button clicked!");
  // }
  const handleItem = (item) => {
    dispatch1(addItem(item));
  };
  return (
    <div className="border-b-2 border-gray-400 flex flex-row  justify-between items-center">
      <div className="w-9/12">
        <div className="py-2  flex flex-col">
          <span>{name}</span>
          <span>
            Rs.
            {price / 100 || defaultPrice / 100}
          </span>
        </div>
        <p className="text-xs">{description}</p>
      </div>
      <div className="w-3/12 p-4">
        <div className="absolute">
          <button
            className="p-2  mx-14 rounded-lg bg-white shadow-lg "
            onClick={() => handleItem(props.items.card.info)}
          >
            Add +
          </button>
        </div>
        <img
          className="w-full"
          src={
            "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
            imageId
          }
          alt="burger"
        />
      </div>
    </div>
  );
};

export default RestaurantMenuCards;
