const SideBarMode = ({ layout, handleLayoutChange }) => {
    
    return (
        <>
            <ul className="radio-wrapper">
                <li className="vertical-setting">
                    <input
                        className="form-check-input"
                        id="radio-icon-vertical"
                        type="radio"
                        name="radio-layout"
                        value="vertical"
                        checked={layout === 'vertical'}
                        onChange={handleLayoutChange}
                    />
                    <label className="form-check-label" htmlFor="radio-icon-vertical">
                        <span>Vertical</span>
                    </label>
                </li>
                <li className="horizontal-setting">
                    <input
                        className="form-check-input"
                        id="radio-icon-horizontal"
                        type="radio"
                        name="radio-layout"
                        value="horizontal"
                        checked={layout === 'horizontal'}
                        onChange={handleLayoutChange}
                    />
                    <label className="form-check-label" htmlFor="radio-icon-horizontal">
                        <span>Horizontal</span>
                    </label>
                </li>
            </ul>
        </>
    );
}

export default SideBarMode;