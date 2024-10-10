export const matchesFilter = (product, filter) => {
  return (
    filter === "" ||
    product.productCategory.name.toLowerCase() === filter.toLowerCase() ||
    product.name.toLowerCase().includes(filter.toLowerCase())
  );
};
