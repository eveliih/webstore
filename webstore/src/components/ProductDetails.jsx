import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const CreateProductDetails = () => {
  const { id } = useParams();
  const product = useSelector(state => state.products.find(product => product.id === Number(id)));
  

  if (product === undefined) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: {product.price}</p>
      <p>Ingredients: {product.ingredients}</p>
      <p>Origin: {product.origin}</p>
      <img id="productDetailsImage" src={product.image.url} alt={product.name} />
    </div>
  );
}

export default CreateProductDetails;