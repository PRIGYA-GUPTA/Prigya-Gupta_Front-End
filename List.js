import React, { useState, useEffect, memo, useCallback } from "react";
import PropTypes from "prop-types";

// Single List Item
const WrappedSingleListItem = ({ index, isSelected, onClickHandler, text }) => {
  const handleClick = () => {
    onClickHandler(index);
  };
  //The handleClick function is defined within the component using an arrow function.
  // This function is called when the user clicks on the list item. When called,
  //it invokes the onClickHandler function passed as a prop to the component
  //and passes the index prop as an argument.
  // Passing the index as an argument to the onClickHandler function is necessary because it allows
  // the parent component (WrappedListComponent) to know which item was clicked.

  return (
    <li
      style={{ backgroundColor: isSelected ? "green" : "red" }}
      onClick={handleClick}
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(null); // here I have passed the initial value as selectedIndex
  // null this means that initially no item has been selected, When an item is clicked, the handleClick function
  //is called and updates the value of selectedIndex to the index of the clicked item.

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = useCallback(
    (index) => {
      setSelectedIndex(index);
    },
    [setSelectedIndex]
  ); //The reason for using useCallback here is to improve the performance of the component.
  // Without useCallback, a new instance of the handleClick function would be created on every render
  //of the WrappedListComponent. This would cause all child components (SingleListItem)
  //to re-render as well, even if their props haven’t changed.

  return (
    <ul style={{ textAlign: "left" }}>
      {items &&
        items.map((item, index) => (
          <SingleListItem
            key={index}
            onClickHandler={handleClick}
            text={item.text}
            index={index}
            isSelected={index === selectedIndex}
          />
        ))}
    </ul>
  );
}; //The condition items && is used to check if the items
// prop is true i.e. if there is any value in items or not, before calling the map function on it.
//This is necessary because the map function can only be called on arrays,
//and if items is null or undefined, calling map on it would result in an error.

WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ),
};

//PropTypes.shapeOf is not a valid prop type in the prop-types library.
// The correct prop type to use for defining the shape of an object is PropTypes.shape.

//PropTypes.shape is used to specify that each object in the items
// array should have a text property of type string.
//The isRequired modifier is used to indicate that this property is required and must be provided.

WrappedListComponent.defaultProps = {
  items: null,
};

const List = memo(WrappedListComponent);

export default List;
