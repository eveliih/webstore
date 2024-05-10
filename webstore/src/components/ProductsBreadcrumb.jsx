import { useLocation } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function ProductsBreadcrumb() {
  const location = useLocation();
  let pathnames = location.pathname.split('/').filter(x => x);

  pathnames = pathnames.slice(0, pathnames.length - 1);

  return (
    <Breadcrumb className='custom-breadcrumb'>
      <Breadcrumb.Item  href="/">Products</Breadcrumb.Item>
      {pathnames.map((value, index) => {
        const url = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <Breadcrumb.Item href={isLast ? null : url} key={url}>
            {value}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}

export default ProductsBreadcrumb;