import UserModel from "../model/User.js";

export const Home = async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    const data = allUsers.map((d) => {
      const { username, email, id } = d;
      return { username, email, id };
    });
    res.json(data).status(200);
  } catch (error) {
    res.json(error.message).status(500);
  }
};
export const Profile = async (req, res) => {
  try {
    const { id } = req.query;
    const data = await UserModel.findById(id);
    res.json(data).status(200);
  } catch (error) {
    res.json(error.message).status(500);
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;
    const data = await UserModel.findById(id);
    data.username = username;
    data.email = email;
    let savedata = await data.save();
    res.json(savedata).status(200);
  } catch (error) {
    res.json(error.message).status(500);
  }
};
