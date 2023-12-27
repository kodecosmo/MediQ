db.createUser({
  user: 'kode',
  pwd: '2003kode',
  roles: [
    {
      role: 'readWrite',
      db: 'medi_q',
    },
  ],
});
