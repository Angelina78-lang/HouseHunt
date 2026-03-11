import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix typical Leaflet icon issue with webpack/vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Link } from 'react-router-dom';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapView = ({ properties, selectedPropertyId }) => {
    // Center roughly on US or first property
    const defaultCenter = properties?.length > 0 && properties[0].location.lat
        ? [properties[0].location.lat, properties[0].location.lng]
        : [39.8283, -98.5795];

    return (
        <MapContainer center={defaultCenter} zoom={4} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {properties && properties.map((prop) => (
                prop.location && prop.location.lat && prop.location.lng && (
                    <Marker
                        key={prop._id}
                        position={[prop.location.lat, prop.location.lng]}
                    >
                        <Popup>
                            <strong>{prop.title}</strong><br />
                            ${prop.price.toLocaleString()} {prop.purpose === 'Rent' ? '/mo' : ''}<br />
                            <Link to={`/property/${prop._id}`}>View</Link>
                        </Popup>
                    </Marker>
                )
            ))}
        </MapContainer>
    );
};

export default MapView;
