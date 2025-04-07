import React, { useEffect, useState } from 'react';
import { saveDrink, getAllDrinks, deleteDrink } from './indexedDB';
import IngredientsList from './IngredientsList';
import FavoriteCarousel from './FavoriteCarousel';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [selectedFavorite, setSelectedFavorite] = useState(null);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [isOpen, setIsOpen] = useState(false);  // Initially closed

  // Function to handle closing the component
  const handleClose = () => {
    setIsOpen(false);  // Close the selected favorite
  };

  // Function to handle opening the selected favorite when clicked
  const handleSelectFavorite = (favorite) => {
    setSelectedFavorite(favorite);
    setIsOpen(true);  // Open the selected favorite details
  };

  useEffect(() => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.drinks)) {
          setDrinks(data.drinks);
        } else {
          console.error("Received data is not an array");
        }
      })
      .catch((error) => console.error("Error fetching drinks:", error));
  }, []);

  useEffect(() => {

    const fetchFavorites = async () => {
      const drinks = await getAllDrinks();
      setFavorites(drinks);
    };
    fetchFavorites();
  }, [refresh]);

  const getIngredients = (drink) => {
    let ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(measure ? `${ingredient} (${measure})` : ingredient);
      }
    }
    return ingredients;
  };
  
  const handleNext = async () => {
    try {
      const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
      const data = await response.json();
  
      if (data.drinks && data.drinks.length > 0) {
        setDrinks([data.drinks[0]]);
        setSelectedDrink(data.drinks[0]);
       } else {
        console.log("No drinks found in API response.");
      }
    } catch (error) {
      console.error("Error fetching random drink:", error);
    }
  };
  
  
  const handleSave = async (drink) => {

    const ingredients = [];
    
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`${ingredient} ${measure ? `(${measure})` : ''}`);
      }
    }
   
    // Check if drink object has valid data
    if (!drink.idDrink || !drink.strDrink || !drink.strDrinkThumb) {
      console.error("Invalid drink data:", drink);
    return;
    }

    await saveDrink({

      id: drink.idDrink,
      name: drink.strDrink,
      image: drink.strDrinkThumb,
      category: drink.strCategory,
      alcoholic: drink.strAlcoholic,
      glass: drink.strGlass,
      instructions: drink.strInstructions,
      ingredients: getIngredients(drink),

    });
    setFavorites(await getAllDrinks());
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to remove ${id}?`)) return;
    await deleteDrink(id); // Remove from IndexedDB
    const updatedFavorites = await getAllDrinks(); // Refresh the list
    setFavorites(updatedFavorites); // Update state
    setSelectedFavorite(null); // Reset selected drink
    setIsOpen(false);  // Close the details view when an item is deleted

  };
 
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="gravitas-one-regular text-orange-500 mt-4 text-2xl text-center tracking-[.75rem]">Cocktail<span className='love-light-regular text-4xl'>DB</span></h1>

      <h2 className="eagle-lake-regular tracking-[.3rem] mb-4 mt-8">Available Drinks</h2>
      {/* <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6"> */}
      <div className="gap-6">

        {/* Available Drinks */}
        {drinks.map((drink) => (
          <div key={drink.idDrink} className="ml-0 flex flex-col md:flex-row gap-4 p-4 rounded-lg bg-gradient-to-b from-gray-800 via-green-600 to-green-600 bg-[length:300%_300%] animate-gradient w-full">
              <div className='flex-none w-full md:w-80 max-h-140 py-4 px-0 border border-gray-300 rounded-md'>
                <h3 className="eagle-lake-regular text-2xl text-center pt-0 py-2">{drink.strDrink}</h3>
                <div className='flex justify-center items-center'>
                  {/* Image */}
                  <img
                    src={drink.strDrinkThumb}
                    alt={drink.strDrink}
                    className="w-60 h-60 object-cover rounded-md"
                  />
                </div>
                <div className='eagle-lake-regular flex flex-col items-center justify-center '>
                  <button
                      className="mt-4 w-60 border border-gray-300 text-yellow-200 py-2 rounded-md hover:text-orange-500 bg-gradient-to-b from-gray-800 via-green-600 to-green-600 bg-[length:500%_200%] animate-gradient"
                      onClick={handleNext}
                    >
                      Next
                  </button>
                  <button
                      className="mt-2 w-60 border border-gray-300 text-yellow-200 py-2 rounded-md hover:text-orange-500 bg-gradient-to-b from-gray-800 via-green-600 to-green-600 bg-[length:500%_200%] animate-gradient"
                      onClick={() => handleSave(drink)}
                    >
                      Save
                  </button>
                </div>
              </div>
              
              {/* Drink ingredients */}
              <div className="cormorant-upright-medium p-2 ml-0 md:ml-2 flex-1 max-h-110 overflow-y-auto py-2 border border-gray-300 rounded-md bg-gradient-to-t from-green-600 via-green-200 to-green-800 bg-[length:200%_600%] animate-gradient w-full">
                <h4 className='text-gray-300'><span className='eagle-lake-regular'>ID:</span> { drink.idDrink }</h4>
                <h4 className='text-gray-300'><span className='eagle-lake-regular'>Category:</span> { drink.strCategory }</h4>
                <h4 className='text-gray-300'><span className='eagle-lake-regular'>Alcoholic:</span> { drink.strAlcoholic }</h4>
                <h4 className='text-gray-300'><span className='eagle-lake-regular'>Glass:</span> { drink.strGlass }</h4>
                <h4 className='text-gray-300'><span className='eagle-lake-regular'>Instructions:</span> { drink.strInstructions }</h4>
                {console.log("Drink Data:", drink)}    
                <h4><IngredientsList ingredients={getIngredients(drink)} /></h4>
              </div>
          </div>
        ))}
      </div>
      
      {/* Favorite */}
      <h2 className="eagle-lake-regular tracking-[.3rem] mt-8 mb-4">Favorite Drinks</h2>
      <FavoriteCarousel favorites={favorites} onSelect={handleSelectFavorite} />

      {/* Show details of the selected favorite */}
      {selectedFavorite && isOpen && (
        <div key={selectedFavorite.id} className="ml-0 flex flex-col md:flex-row gap-4 mt-8 p-4 rounded-lg bg-gradient-to-b from-gray-800 via-green-600 to-green-600 bg-[length:300%_300%] animate-gradient w-full">
        <div className='flex-none w-full md:w-80 max-h-100 p-4 border border-gray-300 rounded-md'>
          <h3 className="eagle-lake-regular text-2xl text-center pt-0 py-2">{selectedFavorite.name}</h3>
          <div className='flex justify-center items-center'>
            {/* Favorite Image */}
            <img
              src={selectedFavorite.image}
              alt={selectedFavorite.name}
              className="w-60 h-60 object-cover rounded-md"
            />
          </div>
          <div className='flex flex-col items-center justify-center'>
            <button
                className="eagle-lake-regular mt-4 w-60 border border-gray-300 text-yellow-200 py-2 rounded-md hover:text-orange-500 bg-gradient-to-b from-gray-800 via-green-600 to-green-600 bg-[length:500%_200%] animate-gradient"
                onClick={() => handleDelete(selectedFavorite.id)}
              >
                Remove
            </button>
          </div>
        </div>
        
        {/* Favorite ingredients */}
        <div className="cormorant-upright-medium p-2 ml-0 md:ml-2 flex-1 max-h-100 overflow-y-auto py-2 border border-gray-300 rounded-md bg-gradient-to-t from-green-600 via-green-200 to-green-800 bg-[length:200%_600%] animate-gradient w-full">
          <div className='flex flex-row justify-between'>
            <div>
              <h4 className='text-gray-300'><span className='eagle-lake-regular'>ID:</span> { selectedFavorite.id }</h4>
            </div>
            <div>
              <button
                  onClick={handleClose}
                  className="eagle-lake-regular w-10 mt-1 border border-gray-300 text-yellow-200 rounded-md hover:text-orange-500 bg-gradient-to-b from-gray-800 via-green-600 to-green-600 bg-[length:500%_200%] animate-gradient"
                >
                  X
              </button>
            </div>
          </div>
          <h4 className='text-gray-300'><span className='eagle-lake-regular'>Category:</span> { selectedFavorite.category }</h4>
          <h4 className='text-gray-300'><span className='eagle-lake-regular'>Alcoholic:</span> { selectedFavorite.alcoholic }</h4>
          <h4 className='text-gray-300'><span className='eagle-lake-regular'>Glass:</span> { selectedFavorite.glass }</h4>
          <h4 className='text-gray-300'><span className='eagle-lake-regular'>Instructions:</span> { selectedFavorite.instructions }</h4> 
          <h4><IngredientsList ingredients={selectedFavorite.ingredients} /></h4>
        </div>
        </div>
      )}       
    </div> 
  );
};

export default Favorites;
