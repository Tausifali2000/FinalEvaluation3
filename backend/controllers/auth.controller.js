import { User } from "../models/user.model.js"; 
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.util.js"; 



//signup function
export async function signup(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!email || !password || !firstName) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

   //Already Existing Email 
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ success: false, field: "email", message: "Email already exists" });
    }

   

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

   
    await newUser.save();
    
    generateTokenAndSetCookie(newUser._id, res); //generate cookie

   
    res.status(201).json({
      success: true,
      message: "Account created successfully.",
      user: newUser
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function username(req, res) {
  try {
    const { username } = req.body;
    const userId = req.user.id;

    if (!username) {
      return res.status(400).json({ success: false, field: "username", message: "Username is required" });
    }

    // Check if username already exists in the database
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ success: false, field: "username", message: "Username is already taken" });
    }

    // Update the user's username
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username },
      { new: true } // Return updated user
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Username updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("Error updating username:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}


//login function
export async function signin (req, res) {
  try {
		const { username, password } = req.body; 

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    //Find Email
		const user = await User.findOne({ username: username });  
		
    if (!user) {
			return res.status(404).json({ success: false, field: "all", message: "Invalid credentials" });
		}

    //Match Password
		const isPasswordCorrect = await bcryptjs.compare(password, user.password); 

		if (!isPasswordCorrect) {
			return res.status(400).json({ success: false, field: "all", message: "Invalid credentials" });
		}

		//Generate Cookie
    generateTokenAndSetCookie(user._id, res); 

		res.status(200).json({ 
			success: true,
			user: {
				...user._doc,
				password: "", 
			},
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}

//logout function
export async function logout (req, res) {
  try {
		 //clear cookie
    res.clearCookie("jwt-spark");
		res.status(200).json({ success: true, message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}

//authCheck
export async function authCheck(req, res) {
	try {
		
		res.status(200).json({ success: true, user: req.user });
	} catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}



export async function updateUser(req, res) {
  try {
    const userId = req.user?.id;
    console.log("User ID:", userId); // Debugging

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { firstName, lastName, email, password } = req.body;

    // Validate required fields (password is optional)
    if (!firstName  || !email) {
      return res.status(400).json({
        success: false,
        message: "First name and email are required",
      });
    }

    // Find existing user
    const user = await User.findById(userId);
    console.log("Found User:", user); // Debugging

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if the new email is already taken (excluding current user's email)
    if (email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          field: "email",
          message: "Email is already registered",
        });
      }
    }

    // Update fields
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;

    // Hash and update password only if provided
    if (password?.trim()) {
      try {
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);
      } catch (hashError) {
        console.error("Error hashing password:", hashError);
        return res.status(500).json({ success: false, message: "Error hashing password" });
      }
    }

    // Save updated user
    await user.save();

    // Respond with updated user (excluding password)
    res.json({
      success: true,
      message: "User updated successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Error in updateUser controller:", error); // More detailed error logging
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
