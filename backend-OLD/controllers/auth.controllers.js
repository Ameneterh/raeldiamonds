import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import bcrypt from "bcryptjs";

// user registration
export const registerUser = async (req, res) => {
  const { fullname, email, phone, password, address, role } = req.body;

  try {
    // check if required fields are complete
    if (!fullname || !email || !phone || !password || !role) {
      throw new Error("All fields are required!");
    }

    // check if user already exists
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    // hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // save new user
    const user = new User({
      fullname,
      email,
      phone,
      password: hashedPassword,
      address,
      role,
    });

    await user.save();

    // generate and set cookie
    generateTokenAndSetCookie(res, user._id);

    res.status(201).json({
      success: true,
      message: "New User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User Credentials!" });
    }

    if (user.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "User not activated or blocked; contact Site Admin",
      });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User Credentials!" });
    }

    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.log("Error in login", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: { $in: ["client", "staff"] },
    });

    const userCounts = await User.aggregate([
      {
        $match: {
          role: {
            $in: ["client", "staff"],
          },
        },
      },
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ]);

    const formattedCounts = userCounts.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    const totalUsers = await User.countDocuments({
      role: { $in: ["client", "staff"] },
    });

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate(),
    );

    const lastMonthUsers = await User.countDocuments({
      role: { $in: ["client", "staff"] },
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
      userCounts: formattedCounts,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// update user
export const updateUser = async (req, res) => {
  const { name, email, phoneNumber, password, affiliation } = req.body;

  try {
    // check if required fields are complete
    if (!name || !email || !phoneNumber || !password) {
      throw new Error("All fields are required!");
    }

    // check if user already exists
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    // hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // generate verification code
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    // save new user
    const user = new User({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      affiliation,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();

    // generate and set cookie
    generateTokenAndSetCookie(res, user._id);

    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "New User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// verify email
export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "User email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in verifyEmail", error);
    res.status(500).json({ success: false, message: "Server Error!" });
  }
};

// logout
export const logout = async (req, res) => {
  res.clearCookie("token");
  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
};

// forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: `User not found!`,
      });
    }

    // generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 0.5 * 60 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    // send email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`,
    );

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log("Error in forgotPassword", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// reset password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or Expired Password Reset Token!",
      });
    }

    // update password
    const hashedPassword = bcrypt.hashSync(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();
    await sendResetSuccessEmail(user.email);

    res
      .status(200)
      .json({ sucess: true, message: "Password reset successful" });
  } catch (error) {
    console.log("Error in resetPassword", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// check authentication
export const CheckAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
