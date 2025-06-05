import React, { useState } from 'react';

const ThemeExample = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('option1');
  const [isChecked, setIsChecked] = useState(false);
  const [radioOption, setRadioOption] = useState('option1');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1>Theme Components Example</h1>
        <button onClick={toggleDarkMode} className="btn-outline">
          Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
      </div>
      
      <section className="mb-8">
        <h2>Button Styles</h2>
        <div className="flex flex-wrap gap-4">
          <button className="btn-primary">Primary Button</button>
          <button className="btn-secondary">Secondary Button</button>
          <button className="btn-outline">Outline Button</button>
          <button className="btn-primary" disabled>Disabled Button</button>
        </div>
      </section>
      
      <section className="mb-8">
        <h2>Typography</h2>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
        <p>Regular paragraph text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
        <p>Here is an <a href="#">inline link</a> in a paragraph.</p>
      </section>
      
      <section className="mb-8">
        <h2>Form Elements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="example-input" className="form-label">Text Input</label>
            <input 
              id="example-input" 
              type="text" 
              className="form-input" 
              placeholder="Enter text here"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="example-select" className="form-label">Select Dropdown</label>
            <select 
              id="example-select" 
              className="form-select"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
          
          <div>
            <div className="flex items-center mb-4">
              <input 
                id="example-checkbox" 
                type="checkbox" 
                className="form-checkbox" 
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <label htmlFor="example-checkbox" className="ml-2 text-sm">Checkbox option</label>
            </div>
          </div>
          
          <div>
            <div className="space-y-2">
              <div className="flex items-center">
                <input 
                  id="radio-1" 
                  name="radio-group" 
                  type="radio" 
                  className="form-radio"
                  value="option1"
                  checked={radioOption === 'option1'}
                  onChange={(e) => setRadioOption(e.target.value)}
                />
                <label htmlFor="radio-1" className="ml-2 text-sm">Radio option 1</label>
              </div>
              <div className="flex items-center">
                <input 
                  id="radio-2" 
                  name="radio-group" 
                  type="radio" 
                  className="form-radio"
                  value="option2"
                  checked={radioOption === 'option2'}
                  onChange={(e) => setRadioOption(e.target.value)}
                />
                <label htmlFor="radio-2" className="ml-2 text-sm">Radio option 2</label>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-8">
        <h2>Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <div className="card-header">
              <h3 className="m-0">Card Title</h3>
            </div>
            <div className="card-body">
              <p className="mb-4">Card content goes here. This is a basic card example with header, body, and footer.</p>
              <button className="btn-primary">Action</button>
            </div>
            <div className="card-footer text-right">
              <button className="btn-secondary">Cancel</button>
              <button className="btn-primary ml-2">Save</button>
            </div>
          </div>
          
          <div className="card">
            <div className="card-body">
              <h3>Simple Card</h3>
              <p>This is a simpler card without header and footer sections.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-8">
        <h2>Alerts</h2>
        <div className="space-y-4">
          <div className="alert-info">
            <strong>Info Alert:</strong> This is an informational alert.
          </div>
          <div className="alert-success">
            <strong>Success Alert:</strong> Operation completed successfully.
          </div>
          <div className="alert-warning">
            <strong>Warning Alert:</strong> This action requires attention.
          </div>
          <div className="alert-error">
            <strong>Error Alert:</strong> Something went wrong.
          </div>
        </div>
      </section>
      
      <section className="mb-8">
        <h2>Badges & Status Indicators</h2>
        <div className="space-y-4">
          <div>
            <span className="badge-primary mr-2">New</span>
            <span className="badge-secondary">Tag</span>
          </div>
          <div>
            <div><span className="status-active"></span> Active</div>
            <div><span className="status-pending"></span> Pending</div>
            <div><span className="status-inactive"></span> Inactive</div>
          </div>
        </div>
      </section>
      
      <section className="mb-8">
        <h2>Tables</h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th className="table-header-cell">Name</th>
                <th className="table-header-cell">Title</th>
                <th className="table-header-cell">Status</th>
                <th className="table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              <tr className="table-row">
                <td className="table-cell">John Smith</td>
                <td className="table-cell">Software Engineer</td>
                <td className="table-cell">
                  <span className="status-active"></span> Active
                </td>
                <td className="table-cell">
                  <button className="btn-primary text-xs py-1 px-2">Edit</button>
                </td>
              </tr>
              <tr className="table-row">
                <td className="table-cell">Jane Doe</td>
                <td className="table-cell">Product Manager</td>
                <td className="table-cell">
                  <span className="status-pending"></span> Pending
                </td>
                <td className="table-cell">
                  <button className="btn-primary text-xs py-1 px-2">Edit</button>
                </td>
              </tr>
              <tr className="table-row">
                <td className="table-cell">Alex Johnson</td>
                <td className="table-cell">UX Designer</td>
                <td className="table-cell">
                  <span className="status-inactive"></span> Inactive
                </td>
                <td className="table-cell">
                  <button className="btn-primary text-xs py-1 px-2">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      
      <section className="mb-8">
        <h2>Navigation</h2>
        <nav className={`${isDarkMode ? 'bg-card' : 'bg-white'} shadow rounded`}>
          <div className="flex flex-wrap">
            <a href="#" className="nav-link-active">Dashboard</a>
            <a href="#" className="nav-link">Projects</a>
            <a href="#" className="nav-link">Team</a>
            <a href="#" className="nav-link">Settings</a>
          </div>
        </nav>
      </section>
    </div>
  );
};

export default ThemeExample;