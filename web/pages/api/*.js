export default async (req, res) => {
  res.status(404);
  res.send('Error: Endpoint does not exist');
};
