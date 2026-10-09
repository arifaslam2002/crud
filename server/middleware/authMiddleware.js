import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    const authHeader = re.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access denied please login",
      });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select(
      "_id name email role",
    );
    if (!user) {
      return res.status(401).json({
        message: "User no longer exists",
      });
    }
    req.user = {
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (error) {
    console.log(error);
  }
};
export const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      message: "Access denied Admin Only",
    });
  }
  next();
};
