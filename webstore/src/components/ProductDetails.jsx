import { useSelector } from 'react-redux';


const CreateProductDetails =() =>{
const selectedProductId = useSelector(state => state.selectedProduct);
const product = useSelector(state => state.products.find(product => product.id === selectedProductId));


  return(
    <div>
      <h1>{product.name}</h1>
      <p>{}</p>
      <p>{product.price}</p>
      <img id= "productDetailsImage" src={product.image.url} alt={product.name} />
    </div>
  );
}

export default CreateProductDetails;
