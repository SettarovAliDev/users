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

    const profile = await user.addProfiles(newProfile);

    const addedProfile = await Profile.findOne({
      where: {
        id: profile[0].profileId,
      },
    });

    res.status(200).send(addedProfile);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const { profileId } = req.params;

    const profile = await Profile.findOne({
      where: {
        id: profileId,
      },
    });

    await profile.destroy();

    res.status(200).send(profileId);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
