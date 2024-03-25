function createProductDetails(product){
  return(
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <img src={product.image.url} alt={product.name} />
    </div>
  );
}

export default createProductDetails;