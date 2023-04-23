import React, { useEffect, useRef, useState } from "react";
import classes from "./styles.module.scss";
import clsx from "clsx";
import { BounceLoader } from "react-spinners";
import { ArrowDownBold, CloseLinear } from "../../icons";

export interface IMenuOption {
  key: string;
  value: string;

  [k: string]: any;
}

interface ICustomItemProps {
  options: IMenuOption;
  onClick: () => void;
  className?: string;
}

export interface IDefaultProps {
  name?: string;
  value?: IMenuOption; // Hint : note that the "key" property should be unique
  onChange: (value: IMenuOption) => void;
  className?: string;
  icon?: any; // input head icon , dont pass anything if u dont want icon
  size: "small" | "normal" | "big";
  options: IMenuOption[];
  placeholder?: string;
  renderItem?: React.FC<ICustomItemProps>; // pass custom Menu item if u want
  disabled?: boolean;
  readOnly?: boolean;
  onInputChange?: (value: string) => void;
  isLoading?: boolean;
}

// function for sorting menu options list in ascending alphabetical order
// const sortList = (array: IMenuOption[], input: string) => {
//   if (!input) return array;

//   return array.filter((x) => {
//     return x.value.toUpperCase().startsWith(input.toUpperCase());
//   });
// };

//calculate the deep of the child node
function calcDeep(parentElement: HTMLDivElement, childIndex: number) {
  let deep = 0;
  for (let index = 0; index < parentElement.children.length; index++) {
    const element = parentElement.children[index];
    if (index < childIndex) {
      deep += element.clientHeight;
    } else break;
  }
  return deep;
}

function calcScrollTop(
  parentElement: HTMLDivElement | null,
  childIndex: number
) {
  if (parentElement) {
    const childDeep = calcDeep(parentElement, childIndex);

    // we don't want to scroll on top. we want scroll to the middle of the menu.
    const halfDeep = Math.max(0, childDeep - parentElement.clientHeight / 2);

    // we know that scrollHeight >= scrollTop + ClientHeight
    const maxScrollTop =
      parentElement.scrollHeight - parentElement.clientHeight;
    return Math.min(maxScrollTop, halfDeep);
  }
  return 0;
}

// special input make suggestion in dropdown form
function AutoComplete({
  name,
  value,
  onChange,
  className,
  icon: Icon,
  options,
  placeholder,
  renderItem: Item,
  size,
  disabled,
  readOnly,
  onInputChange,
  isLoading,
}: IDefaultProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  // const [isFlagAddressValid, setIsFlagAddressValid] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const menuBoxRef = useRef<HTMLDivElement>(null);
  // for innner state
  const [inputText, setInputText] = useState("");
  // for innner state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    if (onInputChange) onInputChange(e.target.value);
    resetSelectedMenuItem();
  };

  // thats for selecting menu item with keyboard
  const [selectedMenuItemIndex, setSelectedMenuItemIndex] = useState(-1);

  // filtered options
  const filteredOptions = options?.filter((x: IMenuOption) =>
    x?.value?.toLowerCase()?.includes(inputText?.toLowerCase())
  );

  // function to handle click on dropdown item (close menu and set it values to input)
  const handleMenuItemClick = (op: IMenuOption) => () => {
    setIsMenuOpen(false);
    setInputText(op.value); // fot inner state
    resetSelectedMenuItem();
    onChange(op);
  };

  // function to clear input value
  const handleClearDropDown = () => {
    if (!!value?.key) {
      onChange({
        key: "",
        value: "",
      });
      resetSelectedMenuItem();
    }
  };

  // handle keyDown
  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isMenuOpen) {
      if (event.key === "Enter") {
        //to prevent form submitting
        event.preventDefault();
        if (selectedMenuItemIndex !== -1) {
          handleMenuItemClick(filteredOptions[selectedMenuItemIndex])();
          resetSelectedMenuItem();
        }
      } else if (event.key === "ArrowDown") {
        if (selectedMenuItemIndex < filteredOptions.length - 1) {
          setSelectedMenuItemIndex((prev) => {
            const scrollTop = calcScrollTop(menuBoxRef.current, prev + 1);
            menuBoxRef.current?.scrollTo({
              top: scrollTop,
              behavior: "smooth",
            });
            return prev + 1;
          });
        }
      } else if (event.key === "ArrowUp") {
        //to prevent of moving the cursor to the first letter
        event.preventDefault();
        if (selectedMenuItemIndex > 0) {
          setSelectedMenuItemIndex((prev) => {
            const scrollTop = calcScrollTop(menuBoxRef.current, prev - 1);
            menuBoxRef.current?.scrollTo({
              top: scrollTop,
              behavior: "smooth",
            });
            return prev - 1;
          });
        }
      }
    }
  };

  // reset the selected menu item index
  function resetSelectedMenuItem() {
    setSelectedMenuItemIndex(-1);
  }

  // check if the menu item is selected
  function isSelected(index: number) {
    return index === selectedMenuItemIndex;
  }

  // function to control behavior of input
  useEffect(() => {
    if (!isMenuOpen) {
      if (!!inputText) {
        // back to previous state if nothing matched with the typed string (inputText)
        if (!options.some((x) => x.value === inputText) && !!value) {
          setInputText(value?.value);
        }
      } else {
        // clear parent state when menu is closed and input is empty
        if (!!value?.key)
          onChange({
            key: "",
            value: "",
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen]);

  // if "key" property in "IMenuOption" is empty , then nothing will be selected
  useEffect(() => {
    if (!!value) {
      if (!!value.key) {
        setInputText(value.value);
      } else {
        setInputText("");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // function to check length of menu items
  const filteredOptionsHasLength = !!filteredOptions.length;

  // function to render each menu item
  const renderFilteredOptions = filteredOptions.map((op, idx) => {
    return (
      // custom menu
      !!Item ? (
        <Item
          key={op.key}
          options={op}
          onClick={handleMenuItemClick(op)}
          data-testid={`test-auto-complete-option-${op.key}`}
        />
      ) : (
        // default menu
        <div
          key={op.key}
          onClick={handleMenuItemClick(op)}
          className={clsx(["d-flex px-2 py-2", classes.menuItem])}
          data-testid={`test-auto-complete-option-${op.key}`}
          data-selected={isSelected(idx)}
        >
          {!!op?.flag && op?.flag.includes("https") && (
            <img src={op?.flag} alt={op.value} width={30} className="me-2" />
          )}
          <span>{op.value}</span>
        </div>
      )
    );
  });

  // function to close menu when clicking outside
  const handleClickOutside = (event: any) => {
    if (boxRef.current && !boxRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  // attaching click handler
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  // render component
  return (
    <div
      className={clsx([classes.inputContainer, className, "position-relative"])}
      data-testid="test-auto-complete"
    >
      <div
        data-disabled={!!disabled}
        data-size={size}
        className={classes.inputBox}
        data-validation="none"
        ref={boxRef}
      >
        {Icon && <Icon className={classes.inputHeadIcon} />}
        <input
          data-disabled={!!disabled}
          disabled={!!disabled}
          name={name}
          value={inputText}
          className={classes.input}
          placeholder={placeholder}
          readOnly={!!readOnly}
          onFocus={() => {
            if (!readOnly) setIsMenuOpen(true);
          }}
          // onBlur={() => setIsMenuOpen(false)}
          onChange={handleInputChange}
          onKeyDown={keyDownHandler}
          data-testid="test-auto-complete-input"
        />
        {/* {!!value?.key && !readOnly && (
          <button
            type="button"
            className={classes.simpleButton}
            onClick={!disabled ? handleClearDropDown : undefined}
          >
            <CloseLinear className={classes.clearIcon} />
          </button>
        )} */}
        {!!value?.key && !readOnly && (
          <button
            type="button"
            className={classes.simpleButton}
            onClick={!disabled ? handleClearDropDown : undefined}
          >
            <CloseLinear className={classes.clearIcon} />
          </button>
        )}
        {!value?.key && !readOnly && (
          <>
            {isLoading ? (
              <BounceLoader size={18} color={"#29A9E14D"} loading={true} />
            ) : (
              <ArrowDownBold
                className={clsx([
                  classes.inputTailIcon,
                  isMenuOpen ? classes.rotate : "",
                ])}
              />
            )}
          </>
        )}
      </div>
      <div
        data-open={isMenuOpen}
        className={clsx(["w-100 d-flex flex-column", classes.menuContainer])}
        data-testid="test-auto-complete-menu"
        ref={menuBoxRef}
      >
        {filteredOptionsHasLength ? (
          renderFilteredOptions
        ) : !!isLoading ? (
          <div className="d-flex justify-content-center my-1">
            <BounceLoader size={20} color={"#29A9E14D"} loading={true} />
          </div>
        ) : (
          <div className="d-flex px-4 py-2">No options</div>
        )}
      </div>
    </div>
  );
}

AutoComplete.defaultProps = {
  onChange: () => {},
  options: [],
  value: {
    key: "",
    value: "",
  },
  size: "big",
};

export default AutoComplete;
