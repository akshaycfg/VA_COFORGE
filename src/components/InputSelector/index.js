import "./index.scss";

const InputSelector = ({ onChange,multiple, labelText, optionValue,name,value ,selectLabel,hideSelect,reference}) => {
  return (
    <>
      <div className="input-selector-container">
        <label>{labelText}</label>
        {console.log(selectLabel)}
        <select onChange={onChange} isClearable={false} name={name} value={value} {...reference}>
          {hideSelect ===undefined? <option value='1' selected disabled>{selectLabel!==undefined?selectLabel:"Select"}</option>:""}
          {optionValue.map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
        </select>
      </div>
    </>
  );
};

export default InputSelector;
