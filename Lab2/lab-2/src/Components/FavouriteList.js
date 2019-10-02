import React from 'react'
import PropTypes from 'prop-types'
import Favourite from './Favourite'

const FavouritesList = ({favourites}) => (
    <ul>
        {favourites.map(todo =>
            <Favourite
                {...favourites.name}
            />
        )}
    </ul>
)

FavouritesList.propTypes = {
    favourites: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired
    }).isRequired).isRequired,
}

export default FavouritesList
