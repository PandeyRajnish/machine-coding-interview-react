import Profile from '../components/tab-form/Profile';
import Interests from '../components/tab-form/Interests';
import Settings from '../components/tab-form/Settings';
import { useState } from 'react';

const TabForm = () => {
  const [data, setData] = useState({
    name: 'Rajnish',
    age: 27,
    email: 'rajnish@gmail.com',
    interests: ['coding', 'javascript'],
    theme: 'dark',
  });

  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      name: 'Profile',
      component: Profile,
      validate: () => {
        const err = {};
        if (!data.name || data.name.length < 2) {
          err.name = 'Name is not valid';
        }

        if (!data.age || data.age < 18) {
          err.age = 'Age is not valid';
        }
        if (!data.email || data.email < 2) {
          err.email = 'Email is not valid';
        }

        setErrors(err);
        return err.name || err.age || err.email ? false : true;
      },
    },
    {
      name: 'Interests',
      component: Interests,
      validate: () => {
        const err = {};

        if (data.interests.length < 1) {
          err.interests = 'Please select at least one interest';
        }

        setErrors(err);
        return err.interests ? false : true;
      },
    },
    {
      name: 'Settings',
      component: Settings,
      validate: () => {
        return true;
      },
    },
  ];

  const ActiveTabComponent = tabs[activeTab].component;

  const handleNextClick = () => {
    if (tabs[activeTab].validate()) {
      setActiveTab((prevState) => prevState + 1);
    }
  };

  const handlePrevClick = () => {
    if (tabs[activeTab].validate()) {
      setActiveTab((prevState) => prevState - 1);
    }
  };

  const handleSubmitClick = () => {
    // Make API call here
    console.log(data);
  };

  return (
    <div>
      <div className="heading-container">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className="heading"
            onClick={() => tabs[activeTab].validate() && setActiveTab(index)}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <div className="tab-body">
        <ActiveTabComponent data={data} setData={setData} errors={errors} />
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {activeTab > 0 && (
          <button className="border-1 px-2" onClick={handlePrevClick}>
            Prev
          </button>
        )}
        {activeTab < tabs.length - 1 && (
          <button className="border-1 px-2" onClick={handleNextClick}>
            Next
          </button>
        )}
        {activeTab === tabs.length - 1 && (
          <button className="border-1 px-2" onClick={handleSubmitClick}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};
export default TabForm;
