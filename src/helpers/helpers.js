export const getPosition = () => {
  let position = {};
  const error = {}

  const success = ({coords}) => {
    position = {
      latitude: coords.latitude,
      longitude: coords.longitude
    }
    return position
  };
  const onError = (e) => {
    return error.message = e;
  };
 
  const geo = navigator.geolocation;
  if (!geo) {
    error.message = 'Geolocation is not supported';
    return;
  }
  const watcher = geo.watchPosition(success, onError);
  return () => geo.clearWatch(watcher); 
}