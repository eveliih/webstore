import { useLocation } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function BreadcrumbExample() {
  const location = useLocation();
  let pathnames = location.pathname.split('/').filter(x => x);

  pathnames = pathnames.slice(0, pathnames.length - 1);

  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/">Products</Breadcrumb.Item>
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

export default BreadcrumbExample;