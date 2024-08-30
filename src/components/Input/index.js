import "./index.scss";
const Input = ({ placeholder, labelText, type, onChange,reference,name,value,defaultValue,onKeyUp }) => {
  return (
    <>
      <div className="input-container">
        { labelText && 
          <label>{labelText}</label>
        }
        <input type={type} placeholder={placeholder} defaultValue={defaultValue} name={name} value={value}  onChange={onChange} onKeyUp={onKeyUp} {...reference}></input>
       
      </div>
    </>
  );
};

export default Input;
