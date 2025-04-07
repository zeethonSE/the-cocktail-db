const IngredientsList = ({ ingredients }) => {
  if (!ingredients || ingredients.length === 0) {
    return <p>No ingredients available</p>;
  }

  return (
    <div>
        <span className="eagle-lake-regular">Ingredients:</span>
        <div className="ml-12">
            <ul>
              {ingredients.map((item, index) => (
                <li className="list-disc text-gray-300" key={index}>{item}</li>
              ))}
            </ul>
        </div>
      </div>
  );
};

export default IngredientsList;
