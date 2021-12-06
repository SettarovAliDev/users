const db = require("../models");

const User = db.user;
const Profile = db.profile;

exports.addProfile = async (req, res) => {
  try {
    const newProfile = await Profile.create({
      name: req.body.name,
      gender: req.body.gender,
      birthdate: req.body.birthdate,
      city: req.body.city,
    });

    const user = await User.findOne({
      where: {
        id: req.body.userId,
      },
    });

    await user.addProfiles(newProfile);

    const profiles = await user.getProfiles();

    res.status(200).send(profiles);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getUserProfiles = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.body.currentUserId,
      },
    });

    const profiles = await user.getProfiles();

    res.status(200).send({ profiles });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
