import { useParams} from 'react-router-dom'


function CreateProductDetails(){
 
  const id = useParams().id
  console.log(id);
  return(
    <div>
      {/* <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <img src={product.image.url} alt={product.name} /> */}
    </div>
  );
}

export default CreateProductDetails;
