const users = [
    {
        id:1,
        name:'uthpala',
    },
    {
        id:1,
        name:'uthpalaa',
    }
];

const getUsers  =(cb) => {
  cb(users);  
};

const getUsersById  =(id, cb) => {
  const user = users.find(user => user.id == id);
  cb(users);
};


exports.getUsers = getUsers;
exports.getUsersById = getUsersById;
