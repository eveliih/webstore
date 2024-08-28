import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";
import Breadcrumb from "react-bootstrap/Breadcrumb";

function ProductsBreadcrumb() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let pathnames = location.pathname.split("/").filter((x) => x);

  pathnames = pathnames.slice(0, pathnames.length - 1);

  const handleNavigate = (url, index) => {
    if (index === 0) {
      dispatch(setFilter(""));
    } else if (index === 1) {
      dispatch(setFilter(pathnames[0]));
    }
    navigate(url);
  };

  return (
    <Breadcrumb className="custom-breadcrumb">
      <Breadcrumb.Item onClick={() => handleNavigate("/", 0)}>
        Products
      </Breadcrumb.Item>
      {pathnames.map((value, index) => {
        const url = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <Breadcrumb.Item
            onClick={() => !isLast && handleNavigate(url, index + 1)}
            key={url}
          >
            {value}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}

export default ProductsBreadcrumb;
