const db = require("../models");

const User = db.user;
const Profile = db.profile;

exports.addProfile = async (req, res) => {
  console.log(req.body);
  try {
    const newProfile = await Profile.create({
      name: req.body.name,
      gender: req.body.gender,
      birthdate: req.body.birthdate,
      city: req.body.city,
    });

    const user = await User.findOne({
      where: {
        id: req.body.currentUserId,
      },
    });

    await user.setProfiles(newProfile);

    res.status(200).send("Profile successfully added!!!!!!");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
