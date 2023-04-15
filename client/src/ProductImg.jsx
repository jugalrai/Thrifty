const ProductImg = ({ product, index = 0, className = null }) => {
  if (!product.photos?.length) {
    return "";
  }

  if (!className) {
    className = "object-cover";
  }

  return (
    <img
      src={"http://localhost:5001/uploads/" + product.photos[index]}
      alt="photos"
      className="w-full h-full object-cover"
    />
  );
};

export default ProductImg;
