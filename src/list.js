import React from "react";
import classnames from "classnames";
// you should import `lodash` as a whole module
import lodash from "lodash";
import axios from "axios";

const ITEMS_API_URL =
  "https://62ef438b8d7bc7c2eb7713d7.mockapi.io/api/UsersList";
const DEBOUNCE_DELAY = 500;

// the exported component can be either a function or a class

const fetchData = (query, callback) => {
  console.log("Inside fetch");
  axios.get(`${ITEMS_API_URL}`).then((res) => callback(res));
};

const debounceFn = lodash.debounce((query, callback) => {
  console.log("Inside debounce");
  fetchData(query, callback);
}, DEBOUNCE_DELAY);

export default function Autocomplete() {
  const [queryStr, setQueryStr] = React.useState([]);
  const [list, setList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    console.log("inside useEffect");
    debounceFn(queryStr, (res) => {
      console.log("Inside callback", res.data[0].data);
      setList(res.data[0].data);
      setIsLoading(false);
    });
  }, [queryStr]);

  const handleChange = (e) => {
    setIsLoading(true);
    setQueryStr(e.target.value);
    console.log("inside change");
  };

  const handleClick = (val) => {
    console.log(val);
  };

  let controlClass = classnames({
    control: true,
    "is-loading": isLoading
  });

  return (
    <div className="wrapper">
      <div className={controlClass}>
        <input
          type="text"
          className="input"
          value={queryStr}
          onChange={(e) => handleChange(e)}
        />
      </div>
      {!isLoading && (
        <div className="list is-hoverable">
          {list.length > 0 &&
            list.map((val, i) => {
              return (
                <a
                  key={i}
                  className="list-item"
                  onClick={() => handleClick(val)}
                >
                  {val}
                </a>
              );
            })}
        </div>
      )}
    </div>
  );
}
