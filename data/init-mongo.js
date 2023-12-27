db.createUser({
  user: 'kode',
  pwd: '2003#kode',
  roles: [
    {
      role: 'readWrite',
      db: 'medi_q',
    },
  ],
});
