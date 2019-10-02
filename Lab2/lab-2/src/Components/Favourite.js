import React from 'react'
import PropTypes from 'prop-types'

const Favourite = ({name}) => (
    <li>
        {name}
    </li>
);

Favourite.propTypes = {
    name: PropTypes.string.isRequired,
};

export default Favourite
