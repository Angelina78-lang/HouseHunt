import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import './FilterPanel.css'; // Will create simple overrides if needed

const FilterPanel = ({ onFilter }) => {
    const [keyword, setKeyword] = useState('');
    const [priceRange, setPriceRange] = useState([0, 2000]);
    const [bedrooms, setBedrooms] = useState('');
    const [petFriendly, setPetFriendly] = useState(false);
    const [furnished, setFurnished] = useState(false);

    const handleApply = (e) => {
        e.preventDefault();
        onFilter({
            keyword,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            bedrooms,
            petFriendly,
            furnished
        });
    };

    const handleClear = () => {
        setKeyword('');
        setPriceRange([0, 2000]);
        setBedrooms('');
        setPetFriendly(false);
        setFurnished(false);
        onFilter({});
    };

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-body">
                <h5 className="card-title mb-3">Filter Properties</h5>
                <form onSubmit={handleApply}>
                    <div className="mb-3">
                        <label className="form-label text-muted small">Location or Keyword</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="e.g. New York, Pool"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label text-muted small d-flex justify-content-between">
                            <span>Price Range</span>
                            <span>${priceRange[0]} - ${priceRange[1]}</span>
                        </label>
                        <ReactSlider
                            className="horizontal-slider"
                            thumbClassName="example-thumb"
                            trackClassName="example-track"
                            value={priceRange}
                            max={5000}
                            min={0}
                            step={50}
                            onChange={(value, index) => setPriceRange(value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label text-muted small">Bedrooms (min)</label>
                        <select className="form-select" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
                            <option value="">Any</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="petFriendly"
                                checked={petFriendly}
                                onChange={(e) => setPetFriendly(e.target.checked)}
                            />
                            <label className="form-check-label text-muted small" htmlFor="petFriendly">
                                Pet Friendly
                            </label>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="furnished"
                                checked={furnished}
                                onChange={(e) => setFurnished(e.target.checked)}
                            />
                            <label className="form-check-label text-muted small" htmlFor="furnished">
                                Furnished
                            </label>
                        </div>
                    </div>

                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary">Apply Filters</button>
                        <button type="button" className="btn btn-outline-secondary" onClick={handleClear}>Clear</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FilterPanel;
