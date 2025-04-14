const Profile = ({ data, setData, errors }) => {
  const { name, email, age } = data;

  const handleDataChange = (e, item) => {
    setData((prevState) => ({
      ...prevState,
      [item]: e.target.value,
    }));
  };

  return (
    <div>
      <div>
        <label htmlFor="">Name : </label>
        <input
          type="text"
          value={name}
          onChange={(e) => handleDataChange(e, 'name')}
          className="input"
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div>
        <label htmlFor="">Age : </label>
        <input
          type="number"
          value={age}
          onChange={(e) => handleDataChange(e, 'age')}
          className="input"
        />
        {errors.age && <span className="error">{errors.age}</span>}
      </div>
      <div>
        <label htmlFor="">Email : </label>
        <input
          type="text"
          value={email}
          onChange={(e) => handleDataChange(e, 'email')}
          className="input"
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
    </div>
  );
};

export default Profile;
