import React from 'react';

const Profile = ({ session }) => {
  return (
    <div>
      <h1>{session.getCurrentUser.username}</h1>
      <p>{session.getCurrentUser.email}</p>
      <p>{session.getCurrentUser.joinDate}</p>

      <ul>
        <h3>My Itineraries</h3>
        {session.getCurrentUser.wishList.map(item => {
          <li key={item._id} />;
        })}
      </ul>
    </div>
  );
};

export default Profile;
