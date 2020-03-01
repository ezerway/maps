import PropTypes from 'prop-types';
import MarkerIcon from '../styles/images/marker.svg';

export const Abstract = () => {};

Abstract.propTypes = {
  places: PropTypes.arrayOf(PropTypes.object),
  selected: PropTypes.arrayOf(PropTypes.object),
  config: PropTypes.shape({
    markerIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    defaultZoom: PropTypes.number,
    lineWeight: PropTypes.number,
    lineColor: PropTypes.string
  })
};

Abstract.defaultProps = {
  places: [],
  selected: [],
  config: {
    markerIcon: MarkerIcon,
    defaultZoom: 8,
    lineWeight: 5,
    lineColor: '#BF93E4',
    viewport: {
      latitude: 0,
      longitude: 0
    }
    //, accessToken: 'pk.eyJ1IjoiaHVuZzE5OTZoeSIsImEiOiJjazcxa2djbngwNnNqM21ubXV1bDhyaXM1In0.G8lSCFr-AIHLyakEjSy9Mg'
    //, api_key: 'AIzaSyABi2Ci0aHYQSWeEQmP8J9asSyEpqNNmig'
  }
};

export default Abstract;
