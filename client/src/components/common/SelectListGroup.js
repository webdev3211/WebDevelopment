import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = ({
  name,
  value,
  onChange,
  error,
  options
}) => {
  const selectOptions = options.map(option => (
    // console.log(option),

    <option key={(option._id)} value={option.value}>
      {option.name}
    </option>
  ));
  return (
    <div className="form-group">

      <select
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        name={name}
        value={value}
        onChange={onChange}>
        {selectOptions}
      </select>

      {error && (<div className="invalid-feedback">{error}
      </div>)}

    </div>
  )
}


SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
}



export default SelectListGroup;