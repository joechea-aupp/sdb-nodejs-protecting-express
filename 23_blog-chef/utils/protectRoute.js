import { verifyUser } from "../controllers/user.js";
import csurl from "csurf";

const protectRoute =
  (redirectTo = "/") =>
  async (req, res, next) => {
    try {
      if (req.session.user && (await verifyUser(req.session.user.email))) {
        return next();
      }

      res.redirect(redirectTo);
    } catch {
      res.redirect(redirectTo);
    }
  };

export const csrfProtection = csurl();
export default protectRoute;
